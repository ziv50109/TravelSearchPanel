import React, { PureComponent } from 'react';
import { flightInternational } from '../../../../../source.config';
import CyRcln from '../../../../../magaele/cy_rcln';
import { ClickOutSide, isJsonString, fetchJsToObj } from '../../../../../utils'; // ClickOutSide 一定要大括弧
import StRnls from '../../../../../magaele/st_rnls';
import IntRcln from '../../../../../magaele/int_rcln';
import IcRcln from '../../../../../magaele/ic_rcln';
import IntGpct from '../../../../../magaele/int_gpct';
import StRcln from '../../../../../magaele/st_rcln';
import CrRcln from '../../../../../magaele/cr_rcln';
import ClpRcdp from '../../../../../magaele/clp_rcdp';
import ActRacp from '../../../../../magaele/act_racp';
import Label from '../../../../../magaele/int_rctg/components/Label/Label';
import BtRcnb from '../../../../../magaele/bt_rcnb';
import SingleInputMenuF from '../../../../shared/SingleInputMenu/SingleInputMenuF';
import today from 'dayjs';

// 補字選單國家 changeKey
const actRacpChangeKeyCountry = data => {
    data.forEach(item => {
        item.txt = item.fullName;
        item.country = item.fullName.split('__')[0].match(/\((.*)\)/)[1];
        // delete item.fullName;
    });
    return data;
};

// 補字選單分區的國家 callBack
const catalogueCallBackCountry = [
    {
        catafilter: data => {
            return data;
        }
    }
];

// 排除輾轉國家
class FilterTransfer extends PureComponent {
    state = {
        // 排除轉機
        inputText: '', // 綁 input 裡面的值
        showAct: false,
        isFocus: false,
        obj: null,
        searchKeyWord: '',
        onClearValue: false // 清除資料
    };

    onFocus = () => {
        this.setState({ isFocus: true, showAct: true });
    };

    onBlur = () => {
        this.setState({
            isFocus: false,
            showAct: false
        });
    };

    receive = i => {
        if (this.props.setNonprefertrans) {
            this.props.setNonprefertrans({ nonprefertrans: i.country });
        }
        this.setState({
            obj: i,
            inputText: i.txt
        });
    };

    onChange = e => {
        const val = e.target.value;
        this.setState({
            inputText: val,
            showAct: val.length >= 2 ? true : false, // 當 input 字 2 字以上時打開選單
            searchKeyWord: val
        });
        // 清除按鈕顯示
        if (val !== '') {
            this.setState({ onClearValue: true });
        } else {
            this.setState({ onClearValue: false });
        }
    };

    closeBtnClickHandleCallback = e => {
        if (
            this._actref &&
            !this._actref.contains(e.target) &&
            !this.state.isFocus
        ) {
            const { inputText } = this.state;

            this.setState({
                showAct: false,
                searchKeyWord: inputText
            });
        }
    };

    // 清除資料
    handleonClearValue = () => {
        if (this.props.clearNonprefertrans) {
            this.props.clearNonprefertrans({ nonprefertrans: '' });
        }
        this.setState({
            inputText: '',
            searchKeyWord: '',
            onClearValue: false
        });
    };

    render () {
        const {
            inputText,
            showAct,
            isFocus,
            obj,
            searchKeyWord,
            onClearValue
        } = this.state;
        return (
            <div className="filterTransfer">
                <Label
                    size="lg"
                    label={'排除轉機國家'}
                    onClick={() => this.transferInput.focus()}
                    subComponent={
                        <React.Fragment>
                            <div className="int_rcln int-tags-single noBorder">
                                <input
                                    ref={e => { this.transferInput = e }}
                                    type="text"
                                    value={inputText}
                                    placeholder="請輸入國家"
                                    onChange={this.onChange}
                                    onFocus={this.onFocus}
                                    onBlur={this.onBlur}
                                />
                                {onClearValue ? (
                                    <span
                                        className="clearBtn"
                                        onMouseDown={this.handleonClearValue}
                                    />
                                ) : null}
                            </div>
                            <ActRacp
                                url={flightInternational.filter}
                                minimumStringQueryLength={2} // 最少輸入幾個字
                                minimumStringQuery="最少輸入兩個字" // 尚未輸入文字字數到達要求會顯示此字串
                                setRef={actRef => {
                                    this._actref = actRef;
                                }} // 用來監聽點擊對象
                                ClassName={!showAct && 'd-no'} // 傳入custom class
                                searchKeyWord={searchKeyWord} // 傳入篩選的字串
                                whenItemSelect={this.receive} // 模組回傳被選取的物件資料
                                InputIsFocus={isFocus} // 告訴act 上面的input是否被focus
                                noMatchText="找不到資料" // 當沒有配對資料時顯示那些文字
                                footer={false} // 是否顯示footer
                                theme={'future'} // 樣式調整: future(站長平台)
                                closeActcallback={() =>
                                    this.setState({ showAct: false })
                                } // 強勢關閉act callbackFn
                                closeBtnClickHandleCallback={
                                    this.closeBtnClickHandleCallback
                                } // 點擊關閉視窗icon callbackFn
                                // jsonKey={'destinations'}
                                setSelectValue={obj ? obj.dataIndex : ''}
                                changeKey={actRacpChangeKeyCountry}
                                catalogue={catalogueCallBackCountry}
                            />
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}

// 人數增加，減少
class PeopleNumAdd extends PureComponent {
    constructor (props) {
        super(props);
        this.maxSum = 8;
        this.state = {
            title: {
                adult: '大人(12+)',
                child: '孩童(2-11)',
                baby: '嬰兒(<2)'
            },
            adultObj: {
                min: 1,
                max: 8,
                count: 1
            },
            childObj: {
                min: 0,
                max: 5,
                count: 0
            },
            babyObj: {
                min: 0,
                max: 3,
                count: 0
            }
        };
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps !== this.props) {
            this.updatedPeopleNum();
        }
    }

    updatedPeopleNum = () => {
        const {
            adultObj,
            childObj,
            babyObj
        } = this.state;
        const {
            adtNum,
            chdNum,
            infNum
        } = this.props;

        this.setState({
            adultObj: {
                ...adultObj,
                count: adtNum
            },
            childObj: {
                ...childObj,
                count: chdNum
            },
            babyObj: {
                ...babyObj,
                count: infNum
            }
        });
    }

    renderState (adultCount, childCount, babyCount) {
        const total = adultCount + childCount + babyCount;
        const {
            adultObj: { min: adultMin, max: adultMax },
            childObj: { min: childMin, max: childMax },
            babyObj: { min: babyMin, max: babyMax }
        } = this.state;


        // 傳回總人數
        if (this.props.setTotalPeople) {
            this.props.setTotalPeople({ totalNum: total });
        }

        // 傳回各別人數
        if (this.props.setPeople) {
            this.props.setPeople({
                adt: adultCount,
                chd: childCount,
                inf: babyCount
            });
        }
        this.setState({
            adultObj: {
                min: 1,
                max: 8,
                count: adultCount
            },
            childObj: {
                min: 0,
                max: 5,
                count: childCount
            },
            babyObj: {
                min: 0,
                max: 3,
                count: babyCount
            }
        });
    }

    onClickAdd = target => {
        let {
            adultObj: { count: adultCount, max: adultMax },
            childObj: { count: childCount, max: childMax },
            babyObj: { count: babyCount, max: babyMax }
        } = this.state;
        switch (target) {
            case 'adultObj':
                adultCount = adultCount >= adultMax ? adultMax : adultCount += 1;
                break;
            case 'childObj':
                childCount = childCount >= childMax ? childMax : childCount += 1;
                break;
            case 'babyObj':
                babyCount = babyCount >= babyMax ? babyMax : babyCount += 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };

    onClickMinus = target => {
        let {
            adultObj: { count: adultCount, min: adultMin },
            childObj: { count: childCount, min: childMin },
            babyObj: { count: babyCount, min: babyMin }
        } = this.state;
        switch (target) {
            case 'adultObj':
                adultCount = adultCount <= adultMin ? adultMin : adultCount -= 1;
                if (this.props.setAdt) {
                    this.props.setAdt(adultCount);
                }
                break;
            case 'childObj':
                childCount = childCount <= childMin ? childMin : childCount -= 1;
                if (this.props.setChd) {
                    this.props.setChd(childCount);
                }
                break;
            case 'babyObj':
                babyCount = babyCount <= babyMin ? babyMin : babyCount -= 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };

    render () {
        return (
            <div className="con-people">
                <div className="num-people">
                    <span>{this.state.title.adult}</span>
                    <IntGpct
                        id="peopleAdult"
                        xin
                        max={this.state.adultObj.max}
                        min={this.state.adultObj.min}
                        count={this.state.adultObj.count > this.state.adultObj.max ? this.state.adultObj.max : this.state.adultObj.count}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            this.onClickAdd('adultObj');
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus('adultObj');
                        }} // 按下減少
                    />
                </div>
                <div className="num-people">
                    <span>{this.state.title.child}</span>
                    <IntGpct
                        id="peopleChild"
                        xin
                        max={this.state.childObj.max}
                        min={this.state.childObj.min}
                        count={this.state.childObj.count}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            this.onClickAdd('childObj');
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus('childObj');
                        }} // 按下減少
                    />
                </div>
                <div className="num-people">
                    <span>{this.state.title.baby}</span>
                    <IntGpct
                        id="peopleBaby"
                        xin
                        max={this.state.babyObj.max}
                        min={this.state.babyObj.min}
                        count={this.state.babyObj.count}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            this.onClickAdd('babyObj');
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus('babyObj');
                        }} // 按下減少
                    />
                </div>
            </div>
        );
    }
}

const ClsTypeLevel = [
    { text: '不限', value: 0 },
    { text: '經濟艙', value: 1 },
    { text: '豪華經濟艙', value: 2 },
    { text: '商務艙', value: 3 },
    { text: '頭等艙', value: 4 }
];

const cheapFlightOptions = [
    { text: '不限', value: 1 },
    { text: '只要廉價航空', value: 2 },
    { text: '排除廉價航空', value: 3 }
];

const renameKey = (obj, fn) => {
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let newKey = keys[i];
        let val = obj[key];
        let str = fn(newKey, val);
        if (typeof str === 'string' && str !== '') {
            newKey = str;
            delete obj[key];
        }
        obj[newKey] = val;
    }
    return;
};

class International extends PureComponent {
// const International = props => {
    constructor (props) {
        super(props);
        this.state = {
            rcfrDataResouce: {},
            newCity: {},
            activeInput: null,
            haveseat: true,
            isSwitch: false,
            cabinNumber: this.props.cabinNumber || 0,
            clstypeText: '經濟艙', // 艙等文字,
            total: 1
        };
    }
    componentDidMount () {
        const sessionData = sessionStorage.getItem(flightInternational.place);

        if (sessionData && isJsonString(sessionData)) {
            this._formatDtmRcfrData(sessionData);
            this._getDataCallBack(sessionData);
        } else {
            fetchJsToObj(flightInternational.place, (d) => {
                let stringifyData = JSON.stringify(d);
                this._formatDtmRcfrData(stringifyData);
                this._getDataCallBack(stringifyData);
                sessionStorage.setItem(flightInternational.place, stringifyData);
            });
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps !== this.props) {
            this.updateCabinNumber();
            this.updateTotalNum();
            this.updateHaveseat();
        }
    }
    updateCabinNumber = () => {
        const { cabinNumber } = this.props;
        let clstypeText = '';
        ClsTypeLevel.forEach((obj, i) => {
            if (obj.value === cabinNumber) {
                clstypeText = obj.text;
            }
        });

        this.setState({ cabinNumber, clstypeText });
    }
    updateTotalNum = () => {
        const {
            adtNum,
            chdNum,
            infNum
        } = this.props;
        const total = adtNum + chdNum + infNum;
        this.setState({ total });
    }
    updateHaveseat = () => {
        const { haveseat } = this.props;
        const newHaveseat = haveseat === 1 ? true : false;
        this.setState({
            haveseat: newHaveseat
        });
    }

    // 快速選單吃的資料
    _formatDtmRcfrData = (d) => {
        let data = JSON.parse(d);
        // 改造第一層資料
        renameKey(data.line, (key) => {
            return key + 'A';
        });
        // 加上第二層資料
        data._line = {};
        for (let i in data.line) {
            if (Object.prototype.hasOwnProperty.call(data.line, i)) {
                let newKey = i.split('A')[0];
                data._line[i] = { [newKey]: data.line[i] };
            }
        }
        // 更改第三層資料
        for (let i in data.city) {
            if (Object.prototype.hasOwnProperty.call(data.city, i)) {
                for (let j in data.city[i]) {
                    if (Object.prototype.hasOwnProperty.call(data.city[i], j)) {
                        let matchStr = data.city[i][j].split('__')[1].split('-');
                        data.city[i][j] = i === '_5' ?
                            matchStr.length < 3 ? matchStr[0] : matchStr[0] + '-' + matchStr[1] :
                            matchStr.length <= 3 ? matchStr[0].replace(/<|>/g, '') : matchStr[0].replace(/<|>/g, '') + '-' + matchStr[1];
                    }
                }
            }
        }
        this.setState({ rcfrDataResouce: data });
    }
    // 處理 fetch 回來的 data 成為 newCity
    _getDataCallBack = (d) => {
        let data = JSON.parse(d);
        // 重構 city 資料
        let arr = [];
        for (let key in data.city) {
            if (Object.keys(data.city)) {
                arr.push(data.city[key]);
            }
        }
        this.setState({ newCity: Object.assign({}, ...arr) });
    }
    // 去程日期input change
    singleInputChange = (e) => {
        // console.log('ddd', e.target.value);
        this.props.singleInputChange && this.props.singleInputChange(e.target.value);
    }
    singleInputKeyDown = (e, inputType) => {
        if (e.keyCode === 13) {
            this.cinput1.blur();
            this.props.closeInputCalendar('single');
        }
    }

    dcInputChange = (e, target) => {
        this.props.dcInputChange && this.props.dcInputChange(e.target.value, target);
    }
    dcInputKeyDown = (e, inputType) => {
        if (e.keyCode === 13) {
            this.cinput2.blur();
            this.cinput3.blur();
            this.props.closeInputCalendar('two');
        }
    }

    muitInputChange = (e, index) => {
        this.props.muitInputChange && this.props.muitInputChange(e.target.value, index);
    }
    muitInputKeyDown = (e, i) => {
        if (e.keyCode === 13) {
            this[`cinput4${i}`].blur();
            this.props.closeCalendar(i + 1);
        }
    }
    handleSwitch = () => {
        this.setState({ isSwitch: true }, () => {
            this.setState({ isSwitch: false });
        });
    }

    render () {
        const { rcfrDataResouce, newCity, isSwitch } = this.state;
        let appendItemClass = 'AppendContainer';
        this.props.rtow === 3
            ? (appendItemClass += ' show')
            : (appendItemClass += ' hide');

        let moreOptionsStyle = this.props.rtow === 3 ? ' MoreOptionThreeRtow' : '';


        return (
            <div>
                <div
                    className={
                        this.props.rtow === 3 ? 'ThreeRtowStyle' : 'OneTwoRtowStyle'
                    }
                >
                    <div
                        className={
                            this.props.rtow === 3 ? 'ItemStyle' : 'ZeroOneRtowStyle'
                        }
                    >
                        {/* 出發地、目的地 單程、來回 */}
                        <div className="single-change">
                            <SingleInputMenuF
                                isSwitch={isSwitch}
                                className="SingleInputMenu"
                                isRequired
                                size="lg"
                                label={'出發地'}
                                iconName={'toolmap'}
                                rcfrDataResouce={rcfrDataResouce}
                                newCity={newCity}
                                racpDataResouce={flightInternational.placeAutoComplete}
                                selectedData={this.props.dptSelectedData}
                                placeholder="城市/國家/機場"
                                minimumStringQueryLength={2}
                                minimumStringQuery="請輸入至少兩個文字"
                                noMatchText="很抱歉，找不到符合的項目"
                                subLabel="找不到選項？請輸入關鍵字查詢"
                                onChange={val =>
                                    this.props.placeChange(val, 'dptSelectedData')
                                }
                            />
                            <div className="changeBtn"
                                onClick={() => {
                                    this.handleSwitch();
                                    this.props.switch();
                                }}
                            />
                            <SingleInputMenuF
                                isSwitch={isSwitch}
                                className="SingleInputMenu"
                                isRequired
                                size="lg"
                                label={'目的地'}
                                iconName={'toolmap'}
                                rcfrDataResouce={rcfrDataResouce}
                                newCity={newCity}
                                racpDataResouce={flightInternational.placeAutoComplete}
                                selectedData={this.props.dtnSelectedData}
                                placeholder="城市/國家/機場"
                                minimumStringQueryLength={2}
                                minimumStringQuery="請輸入至少兩個文字"
                                noMatchText="很抱歉，找不到符合的項目"
                                subLabel="找不到選項？請輸入關鍵字查詢"
                                onChange={val => {
                                    // console.log('aaaaaaaaaa', val);
                                    this.props.placeChange(val, 'dtnSelectedData');
                                }
                                }
                            />
                        </div>

                        {this.props.rtow === 0 || this.props.rtow === 3 ? ( // 假如點到 0, 3 頁時顯示單選月曆
                            // 去程 單程
                            <ClickOutSide onClickOutside={this.props.onClickOutside}>
                                <Label
                                    isRequired
                                    size="lg"
                                    label={'去程日期'}
                                    iconName={'tooldate'}
                                    onClick={() => this.cinput1.focus()}
                                    subComponent={
                                        <div className="inputStyle">
                                            <input
                                                ref={ref => { this.cinput1 = ref }}
                                                type="text"
                                                placeholder="YYYY/MM/DD"
                                                value={this.props.startInputValue.replace(
                                                    /\-/g,
                                                    '/'
                                                )}
                                                onFocus={() =>
                                                    this.props.singleInputFocus({
                                                        focus1: true
                                                    })
                                                }
                                                onBlur={() => {
                                                    this.props.singleOnBlur('clean1');
                                                }}
                                                // readOnly
                                                onChange={value => this.singleInputChange(value)}
                                                onKeyDown={(e) => this.singleInputKeyDown(e, 'start')}
                                            />
                                            {this.props.Clean1 && (
                                                <div className="clearBtnWrap">
                                                    <span
                                                        className="clearBtn"
                                                        onMouseDown={() =>
                                                            this.props.clearValue({
                                                                depdate1: ''
                                                            })
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    }
                                />

                                {this.props.onFocus && (
                                    <div className="calendarStyle">
                                        <div className="calendarStyleIn">
                                            <CyRcln
                                                doubleMonth={true}
                                                activeStart={today().format(
                                                    'YYYY-MM'
                                                )}
                                                activeEnd={today()
                                                    .add(1, 'years')
                                                    .format('YYYY-MM')}
                                                startDate={today().format(
                                                    'YYYY-MM-DD'
                                                )}
                                                endDate={today()
                                                    .add(361, 'days')
                                                    .format('YYYY-MM-DD')}
                                                selectedStartDate={
                                                    this.props.startInputValue
                                                }
                                                onDateClick={val =>
                                                    this.props.clickDate({
                                                        depdate1: val,
                                                        goDateFocus: false
                                                    })
                                                }
                                            />
                                            <div
                                                className="close_btn"
                                                onClick={this.props.onClickOutside}
                                            >
                                                ×
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ClickOutSide>
                        ) : (
                            // 去程來回 來回
                            <ClickOutSide
                                onClickOutside={() => this.props.dcInputFocus(null)}
                            >
                                <div className="doubleCanlendarStyle">
                                    <Label
                                        isRequired
                                        size="lg"
                                        label={'去程日期'}
                                        iconName={'tooldate'}
                                        onClick={() => this.cinput2.focus()}
                                        subComponent={
                                            <div className="inputStyle">
                                                <input
                                                    ref={ref => { this.cinput2 = ref }}
                                                    type="text"
                                                    placeholder="YYYY/MM/DD"
                                                    value={this.props.dcStartInputValue.replace(
                                                        /\-/g,
                                                        '/'
                                                    )}
                                                    onFocus={() =>
                                                        this.props.dcInputFocus(
                                                            'start',
                                                            'depdate1'
                                                        )
                                                    }
                                                    onChange={(e) => this.dcInputChange(e, 'start')}
                                                    onBlur={() =>
                                                        this.props.singleOnBlur(
                                                            'dcCleanBtn1'
                                                        )
                                                    }
                                                    onKeyDown={(e) => this.dcInputKeyDown(e, 'start')}
                                                />
                                                {this.props.dcCleanBtn1 && (
                                                    <div className="clearBtnWrap">
                                                        <span
                                                            className="clearBtn"
                                                            onMouseDown={() =>
                                                                this.props.clearValue({
                                                                    depdate1: ''
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                    <Label
                                        isRequired
                                        size="lg"
                                        label={'回程日期'}
                                        onClick={() => this.cinput3.focus()}
                                        subComponent={
                                            <div className="inputStyle">
                                                <input
                                                    ref={ref => { this.cinput3 = ref }}
                                                    type="text"
                                                    placeholder="YYYY/MM/DD"
                                                    value={this.props.dcEndInputValue.replace(
                                                        /\-/g,
                                                        '/'
                                                    )}
                                                    onFocus={() =>
                                                        this.props.dcInputFocus(
                                                            'end',
                                                            'depdate2'
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        this.props.singleOnBlur(
                                                            'dcCleanBtn2'
                                                        )
                                                    }
                                                    onChange={(e) => this.dcInputChange(e, 'end')}
                                                    onKeyDown={(e) => this.dcInputKeyDown(e, 'end')}
                                                />
                                                {this.props.dcCleanBtn2 && (
                                                    <div className="clearBtnWrap">
                                                        <span
                                                            className="clearBtn"
                                                            onMouseDown={() =>
                                                                this.props.clearValue({
                                                                    depdate2: ''
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                </div>
                                {!this.props.dcActiveInput ? null : (
                                    <div className="calendarStyle">
                                        <div className="calendarStyleIn">
                                            <CyRcln
                                                doubleMonth={true}
                                                doubleChoose
                                                activeStart={today().format('YYYY-MM')}
                                                activeEnd={today().add(1, 'years').format('YYYY-MM')}
                                                startDate={this.props.startDate ? this.props.startDate : today().format('YYYY-MM-DD')}
                                                endDate={today().add(361, 'days').format('YYYY-MM-DD')}
                                                selectedStartDate={
                                                    this.props.dcStartInputValue
                                                }
                                                selectedEndDate={
                                                    this.props.dcEndInputValue
                                                }
                                                onDateClick={date =>
                                                    this.props.dcClickDate(date)
                                                }
                                            />
                                            <div
                                                className="close_btn"
                                                onClick={() =>
                                                    this.props.dcInputFocus(null)
                                                }
                                            >
                                                ×
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ClickOutSide>
                        )}
                    </div>

                    {/* 人數、艙等 */}
                    <StRnls
                        CustomComponent={
                            <IntRcln
                                request
                                value={`共${this.state.total}人，${this.state.clstypeText}`}
                                label="人數/艙等"
                                icon={<IcRcln name="toolmember" />}
                            />
                        }
                        ContentComponent={
                            <div className="flight_international peopleCabinStyle">
                                <StRcln
                                    option={ClsTypeLevel}
                                    label="艙等："
                                    onChangeCallBack={val => {
                                        this.setState({
                                            cabinNumber: val
                                        }, () => {
                                            this.props.selectCabin({
                                                clstype: this.state.cabinNumber
                                            });
                                        });
                                    }}
                                    defaultValue={this.state.cabinNumber}
                                />
                                <PeopleNumAdd
                                    adtNum={this.props.adtNum}
                                    chdNum={this.props.chdNum}
                                    infNum={this.props.infNum}
                                    setPeople={this.props.setPeople}
                                    setTotalPeople={this.props.setTotalPeople}
                                />
                                <div className="con-tooltip">
                                    大人：以出發日為準，年滿12歲(含)以上。
                                    <br />
                                    孩童：全程搭乘日為準，年滿2歲(含)以上，未滿12歲。
                                    <br />
                                    嬰兒：全程搭乘日為準，未滿2歲(不列入幾人成行的人數計算)。
                                    <br />
                                </div>
                            </div>
                        }
                        moduleClassName="StRnls1 peopleCabinStyle"
                        appendToBody
                        // width="448px"
                        innerComponentClass={['outClass']}
                    />
                </div>

                {/* append Items */}
                <div className={appendItemClass}>
                    {this.props.multiItems.map((item, i) => (
                        <div key={i} className="AppendItemStyle">
                            <div className="ItemStyle">
                                {/* 出發地、目的地  多目的地 */}
                                <div className="single-change">
                                    <SingleInputMenuF
                                        isSwitch={isSwitch}
                                        className="SingleInputMenu"
                                        isRequired
                                        size="lg"
                                        label={'出發地'}
                                        iconName={'toolmap'}
                                        rcfrDataResouce={rcfrDataResouce}
                                        newCity={newCity}
                                        racpDataResouce={flightInternational.placeAutoComplete}
                                        selectedData={item.dptSelectedData}
                                        placeholder="城市/國家/機場"
                                        minimumStringQueryLength={2}
                                        minimumStringQuery="請輸入至少兩個文字"
                                        noMatchText="很抱歉，找不到符合的項目"
                                        subLabel="找不到選項？請輸入關鍵字查詢"
                                        onChange={val =>
                                            this.props.multiPlaceChange(
                                                val,
                                                item.id,
                                                'dptSelectedData'
                                            )
                                        }
                                    />
                                    <div
                                        className="changeBtn"
                                        onClick={() => {
                                            this.handleSwitch();
                                            this.props.multiSwitch(item.id);
                                        }}
                                    />
                                    <SingleInputMenuF
                                        isSwitch={isSwitch}
                                        className="SingleInputMenu"
                                        isRequired
                                        size="lg"
                                        label={'目的地'}
                                        iconName={'toolmap'}
                                        rcfrDataResouce={rcfrDataResouce}
                                        newCity={newCity}
                                        racpDataResouce={flightInternational.placeAutoComplete}
                                        selectedData={item.dtnSelectedData}
                                        placeholder="城市/國家/機場"
                                        minimumStringQueryLength={2}
                                        minimumStringQuery="請輸入至少兩個文字"
                                        noMatchText="很抱歉，找不到符合的項目"
                                        subLabel="找不到選項？請輸入關鍵字查詢"
                                        onChange={val =>
                                            this.props.multiPlaceChange(
                                                val,
                                                item.id,
                                                'dtnSelectedData'
                                            )
                                        }
                                    />
                                </div>

                                {/* 去程日期 多目的地 */}
                                <ClickOutSide
                                    onClickOutside={() =>
                                        this.props.closeCalendar(item.id)
                                    }
                                >
                                    <Label
                                        isRequired
                                        size="lg"
                                        label={'去程日期'}
                                        iconName={'tooldate'}
                                        onClick={() => this[`cinput4${i}`].focus()}
                                        subComponent={
                                            <div className="inputStyle">
                                                <input
                                                    ref={ref => { this[`cinput4${i}`] = ref }}
                                                    type="text"
                                                    placeholder="YYYY/MM/DD"
                                                    value={item.startInputValue.replace(
                                                        /\-/g,
                                                        '/'
                                                    )}
                                                    onFocus={() =>
                                                        this.props.onFocusInput(item.id)
                                                    }
                                                    onBlur={() =>
                                                        this.props.multiBlur(item.id)
                                                    }
                                                    onChange={(e) => this.muitInputChange(e, item.id)}
                                                    onKeyDown={(e) => this.muitInputKeyDown(e, i)}
                                                />
                                                {item.cleanBtn && (
                                                    <div className="clearBtnWrap">
                                                        <span
                                                            className="clearBtn"
                                                            onMouseDown={() =>
                                                                this.props.multiClearValue(
                                                                    item.id
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        }
                                    />
                                    {item.onFocus && (
                                        <div className="calendarStyle">
                                            <div className="calendarStyleIn">
                                                <CyRcln
                                                    doubleMonth={true}
                                                    activeStart={item.activeStart}
                                                    activeEnd={today().add(1, 'years').format('YYYY-MM')}
                                                    startDate={item.startDate}
                                                    endDate={today()
                                                        .add(361, 'days')
                                                        .format('YYYY-MM-DD')}
                                                    selectedStartDate={
                                                        item.selectedStartDate
                                                    }
                                                    onDateClick={e =>
                                                        this.props.multipleClickDate(
                                                            e,
                                                            item.id,
                                                            i
                                                        )
                                                    }
                                                />
                                                <div
                                                    className="close_btn"
                                                    onClick={() =>
                                                        this.props.closeCalendar(item.id)
                                                    }
                                                >
                                                    ×
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </ClickOutSide>
                            </div>

                            {/* 減少 多目的地 */}
                            {i !== 0 && (
                                <BtRcnb
                                    prop="string"
                                    className="minus-items mulitMinus"
                                    whenClick={() => this.props.minusItem(item.id, i)}
                                >
                                    <IcRcln name="toolcancelb" size="x15" />
                                </BtRcnb>
                            )}
                        </div>
                    ))}

                    {/* 增加 多目的地 */}
                    {this.props.multiItems.length !== 5 && (
                        <BtRcnb
                            prop="string"
                            className="add-items mulitAdd"
                            whenClick={this.props.addItem}
                        >
                            <IcRcln name="tooladdb" size="x15" />
                        </BtRcnb>
                    )}
                </div>

                {/* 直飛、找機位 */}
                <CrRcln
                    type="checkbox"
                    textContent="直飛(含中停)"
                    whenChange={e => this.props.setNoTrans({ notrans: e ? 'T' : 'F' })}
                />
                <CrRcln
                    className="checkBoxMagin"
                    type="checkbox"
                    textContent="只想找有機位的結果"
                    whenChange={e => this.props.setHaveSeat({ haveseat: e ? 1 : 2 })}
                    checked={this.state.haveseat}
                />

                {/* 更多搜尋選項 */}
                <ClpRcdp
                    titleText="更多搜尋選項"
                    ContentComponent={
                        <React.Fragment>
                            <div className="searchMoreTop">
                                <FilterTransfer
                                    setNonprefertrans={this.props.setNonprefertrans}
                                    clearNonprefertrans={this.props.clearNonprefertrans}
                                />
                                {this.props.rtow === 3 ? null : (
                                    <StRcln
                                        option={cheapFlightOptions}
                                        placeholder="請選擇"
                                        label="廉價航空"
                                        breakline
                                        onChangeCallBack={e =>
                                            this.props.setSourceSystem({
                                                sourcesystem: e
                                            })
                                        }
                                        defaultValue={this.props.sourceSystem}
                                    />
                                )}
                            </div>
                            <CrRcln
                                className="checkBoxMagin"
                                type="checkbox"
                                textContent="排除過夜轉機航班"
                                whenChange={e =>
                                    this.props.setnonprefertransnight({
                                        nonprefertransnight: e ? 'T' : 'F'
                                    })
                                }
                            />
                        </React.Fragment>
                    }
                    moduleClassName={'openMoreOptions' + moreOptionsStyle}
                    isRightLeft={{
                        destination: 'right',
                        name: 'toolnext'
                    }}
                />
                <BtRcnb
                    prop="string"
                    className="lg submitBtn"
                    whenClick={this.props.submit}
                >
                    搜尋
                </BtRcnb>
            </div>
        );
    }
}

export default International;
