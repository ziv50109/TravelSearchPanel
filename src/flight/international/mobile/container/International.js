import React, { Component } from 'react';
import IcRcln from '../../../../../magaele/ic_rcln';
import IntGpct from '../../../../../magaele/int_gpct';
import IntRcln from '../../../../../magaele/int_rcln';
import StRnls from '../../../../../magaele/st_rnls';
import StRcln from '../../../../../magaele/st_rcln';
import CrRcln from '../../../../../magaele/cr_rcln';
import ClpRcdp from '../../../../../magaele/clp_rcdp';
import Label from '../../../../../magaele/int_rctg/components/Label/Label';
import ActRacp from '../../../../../magaele/act_racp';
import BtRcnb from '../../../../../magaele/bt_rcnb';
import today from 'dayjs';
import PlaceChange from '../components/doublePlaceM';
import SingleCalendar from '../components/singleCalendar';
import DoubleCalendar from '../components/doubleCalendar';

// 補字選單國家 changeKey
const actRacpChangeKeyCountry = data => {
    data.forEach(item => {
        item.txt = item.fullName;
        delete item.fullName;
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
class FilterTransfer extends Component {
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
            this.props.setNonprefertrans('nonprefertrans', i.txt);
        }
        this.setState({
            obj: i,
            inputText: i.txt
        });
    };

    onChange = e => {
        const val = e.target.value;
        if (this.props.setNonprefertrans) {
            this.props.setNonprefertrans('nonprefertrans', val);
        }
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
        if (this.props.setNonprefertrans) {
            this.props.setNonprefertrans('nonprefertrans', '');
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
                    subComponent={
                        <React.Fragment>
                            <div className="int_rcln int-tags-single noBorder">
                                <input
                                    type="text"
                                    value={inputText}
                                    placeholder="請選擇"
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
                                url="./src/json/country.json"
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
class PeopleNumAdd extends Component {
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
                max: 8,
                count: 0
            },
            babyObj: {
                min: 0,
                max: 1,
                count: 0
            }
        };
    }

    renderState (adultCount, childCount, babyCount) {
        const total = adultCount + childCount + babyCount;
        const {
            adultObj: { min: adultMin, max: adultMax },
            childObj: { min: childMin, max: childMax },
            babyObj: { min: babyMin, max: babyMax }
        } = this.state;

        if (
            total > this.maxSum ||
            adultCount > adultMax ||
            adultCount < adultMin ||
            childCount > childMax ||
            childCount < childMin ||
            babyCount > babyMax ||
            babyCount < babyMin
        ) {
            return;
        }

        // 傳回總人數
        if (this.props.setTotalPeople) {
            this.props.setTotalPeople({ totalNum: total });
        }

        // 傳回個各格個值
        if (this.props.setAdt) {
            this.props.setAdt('adt', adultCount);
        }
        if (this.props.setChd) {
            this.props.setChd('chd', childCount);
        }
        if (this.props.setInf) {
            this.props.setInf('inf', adultCount < babyMax ? adultCount : babyCount);
        }

        this.setState({
            adultObj: {
                min: 1,
                max: this.maxSum - childCount - babyCount,
                count: adultCount
            },
            childObj: {
                min: 0,
                max: this.maxSum - adultCount - babyCount,
                count: childCount
            },
            babyObj: {
                min: 0,
                max:
                    childCount + adultCount * 2 <= this.maxSum ||
                    adultCount < babyMax
                        ? adultCount
                        : this.maxSum - adultCount - childCount,
                count: adultCount < babyMax ? adultCount : babyCount
            }
        });
    }

    onClickAdd = target => {
        let {
            adultObj: { count: adultCount },
            childObj: { count: childCount },
            babyObj: { count: babyCount }
        } = this.state;

        switch (target) {
            case 'adultObj':
                adultCount += 1;
                break;
            case 'childObj':
                childCount += 1;
                break;
            case 'babyObj':
                babyCount += 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };

    onClickMinus = target => {
        let {
            adultObj: { count: adultCount },
            childObj: { count: childCount },
            babyObj: { count: babyCount }
        } = this.state;

        switch (target) {
            case 'adultObj':
                adultCount -= 1;
                break;
            case 'childObj':
                childCount -= 1;
                break;
            case 'babyObj':
                babyCount -= 1;
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
                        count={this.state.adultObj.count}
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

class International extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // 月曆
            selectedStartDate: '', // 去程
            selectedEndDate: '',   // 回程
            showCalendar: false,
            activeInput: null,

            // 人數、艙等
            clstypeText: '',
            clstype: 0,
            totalNum: 1,

            // 多目的地
            multiItems: [
                {
                    id: 1,
                    startDate: today().format('YYYY-MM-DD'),
                    selectedStartDate: '',
                    showCalendar: false,

                    nvbOpen1: false,
                    nvbOpen2: false,
                    selectDate1: [],
                    selectDate2: [],
                    dptSelectDate: [],
                    dtnSelectDate: [],
                }
            ],

            // 出發地、目的地
            nvbOpen1: false,
            nvbOpen2: false,
            selectDate1: [],
            selectDate2: [],
            dptSelectDate: [],
            dtnSelectDate: [],
        };
        this.ClsTypeLevel = [
            { text: '不限', value: 0 },
            { text: '經濟艙', value: 1 },
            { text: '豪華經濟艙', value: 2 },
            { text: '商務艙', value: 3 },
            { text: '頭等艙', value: 4 }
        ];
        this.cheapFlightOptions = [
            { text: '不限', value: 1 },
            { text: '只要廉價航空', value: 2 },
            { text: '排除廉價航空', value: 3 }
        ];
        this.fetchPath = './json/TRS1NEWTRAVEL.js';
    }

    componentDidMount () {
        const { multiItems } = this.state;
        this.props.setDepDateItems('multiItems', multiItems);
    }

    // 雙月曆
    dcConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;

        if (this.props.setDepdate1) {
            this.props.setDepdate1('depdate1', selectedStartDate);
        }

        if (this.props.setDepdate2) {
            this.props.setDepdate1('depdate2', selectedEndDate);
        }

        this.setState({
            selectedStartDate,
            selectedEndDate,
            activeInput: null,
        });
    }

    // 艙等
    setCabin = (val) => {
        let numVal = Number(val);
        if (this.props.setClstype) {
            this.props.setClstype('clstype', val);
        }
        this.setState({ clstype: numVal, clstypeText: this.ClsTypeLevel[val].text });
    }

    // 比較日期大小
    compare = (compareVal) => {
        const { multiItems } = this.state;
        let arr = [...multiItems];
        let maxDate = ''; // 設一個最大變數
        const compareReplace = compareVal.replace(/\-/g, '/');
        const compared = Date.parse(compareReplace).valueOf();
        for (let i = 0; i < arr.length; i++) {
            const itemsReplace = arr[i].selectedStartDate.replace(/\-/g, '/');
            const itemsDate = Date.parse(itemsReplace).valueOf();
            if (itemsDate >= compared) {
                maxDate = arr[i].selectedStartDate;
            } else {
                maxDate = compareVal;
            }
        }
        return maxDate; // 跟陣列比大小
    }

    // 增加
    addItem = () => {
        const { multiItems } = this.state;
        let arr = [...multiItems];
        let newId = Math.floor(Math.random() * 500);
        const maxDate = this.compare(arr[0].selectedStartDate); // 比較日期大小
        // 超過 4 個時不能再新增了
        if (arr.length >= 5) {
            return false;
        } else {
            arr.push({
                id: newId,
                startDate: maxDate,
                selectedStartDate: maxDate,
                showCalendar: false,

                nvbOpen1: false,
                nvbOpen2: false,
                selectDate1: [],
                selectDate2: [],
                dptSelectDate: [],
                dtnSelectDate: [],
            });
        }
        if (this.props.setDepDateItems) {
            this.props.setDepDateItems('multiItems', arr);
        }
        this.setState({ multiItems: arr });
    }

    // 刪除
    minusItem = (nowId) => {
        const { multiItems } = this.state;
        const newArr = multiItems.filter((item) => {
            if (nowId === item.id) {
                return false;
            } else {
                return true;
            }
        });

        if (this.props.setDepDateItems) {
            this.props.setDepDateItems('multiItems', newArr);
        }
        this.setState({ multiItems: newArr });
    }

    // 轉換格式
    transform (val) {
        const replaceVal = val.replace(/\-/g, '/');
        const transform = Date.parse(replaceVal).valueOf();
        return transform;
    }

    // 單月曆 checkDate
    handleConfirm = () => {
        const {
            selectedStartDate,
        } = this.calendar.state;

        const { multiItems } = this.state;
        const arr = multiItems;

        arr.forEach(ele => {
            ele.startDate = selectedStartDate;
            ele.selectedStartDate = this.compare(selectedStartDate);
        });

        this.setState({
            selectedStartDate,
            showCalendar: false,
            multiItems: arr
        });

        if (this.props.setDepdate1) {
            this.props.setDepdate1('depdate1', selectedStartDate);
        }
    }

    nowDateCompareOther (nowIndex, date) { // 目前點到的 Date 去比較全部
        const {
            selectedStartDate,
        } = this.calendar.state;
        const { multiItems } = this.state;
        const nowDate = this.transform(date); // 現在點擊去程日期跟裡面所有跟陣列比較

        let changeDate = '';
        for (let i = nowIndex + 1; i < multiItems.length; i++) {
            const itemsDate = this.transform(multiItems[i].selectedStartDate);
            if (nowDate >= itemsDate) {
                changeDate = multiItems[i].selectedStartDate;
                this.updateState('selectedStartDate', selectedStartDate, multiItems[i].id);
            } else {
                changeDate = multiItems[nowIndex].selectedStartDate;
                this.updateState('startDate', changeDate, multiItems[i].id);
            }
        }
    }

    // item 確定日期
    itemConfirmDate = (nowId, nowIndex) => {
        const {
            selectedStartDate,
        } = this.calendar.state;
        const { multiItems } = this.state;

        this.updateState('selectedStartDate', selectedStartDate, nowId);
        this.updateState('showCalendar', false, nowId);

        if (typeof multiItems[nowIndex + 1] === 'undefined') { // 點擊最後一個時
            return;
        } else {
            this.updateState('startDate', multiItems[nowIndex].selectedStartDate, multiItems[nowIndex + 1].id);
        }

        this.nowDateCompareOther(nowIndex, multiItems[nowIndex].selectedStartDate);
    }

    updateState = (key, val, nowId) => {
        const { multiItems } = this.state;
        if (typeof nowId === 'undefined') { // 假如有傳 id 就更新 陣列
            this.setState({ [key]: val });
        } else {
            for (let i in multiItems) {
                if (multiItems[i].id === nowId) {
                    multiItems[i][key] = val;
                    break;
                }
            }
            if (this.props.setDepDateItems) {
                this.props.setDepDateItems('multiItems', multiItems);
            }
            this.setState({ multiItems });
        }
    }

    placeChange = (data, keyword, datakey, selectKey, openKey, nowId) => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        if (typeof nowId === 'undefined') {
            this.setState({
                [datakey]: arr.length ? keyword : '',
                [selectKey]: arr,
                [openKey]: false
            });
        } else {
            this.updateState(datakey, arr.length ? keyword : '', nowId);
            this.updateState(selectKey, arr, nowId);
            this.updateState(openKey, false, nowId);
        }
    }

    switch = () => {
        alert();
    }

    render () {
        const {
            selectedStartDate, // 去程日期
            selectedEndDate,
            showCalendar,
            clstype,
            clstypeText,
            totalNum,
            activeInput,
            multiItems,
            dptSelectDate,
            dtnSelectDate,
            selectDate1,
            selectDate2,
            nvbOpen1,
            nvbOpen2
        } = this.state;

        const { rtow } = this.props;

        const changeStyle = rtow === 3 && 'threeStyle';
        const isShow = rtow === 3 ? ' show' : ' hide';
        const doubleisShow = rtow === 1 ? 'show' : 'hide';
        const singleisShow = rtow === 0 || rtow === 3 ? 'show' : 'hide';

        return (
            <React.Fragment>
                {/* 出發地、目的地 */}
                <div className={changeStyle}>
                    <PlaceChange
                        customClass={'doubleChangeStyle'}
                        value1={dptSelectDate || ''}
                        value2={dtnSelectDate || ''}
                        nvbOpen1={() => this.updateState('nvbOpen1', true)}
                        nvbOpen2={() => this.updateState('nvbOpen2', true)}
                        nvbClose1={() => this.updateState('nvbOpen1', false)}
                        nvbClose2={() => this.updateState('nvbOpen2', false)}
                        switch={this.switch}
                        visible1={nvbOpen1}
                        visible2={nvbOpen2}
                        selectDate1={selectDate1}
                        selectDate2={selectDate2}
                        onChange1={
                            (data, keyword) => this.placeChange(data, keyword, 'dptSelectDate', 'selectDate1', 'nvbOpen1')
                        }
                        onChange2={
                            (data, keyword) => this.placeChange(data, keyword, 'dtnSelectDate', 'selectDate2', 'nvbOpen2')
                        }
                    />

                    {/* 去程日期 */}
                    <div className={singleisShow}>
                        <SingleCalendar
                            customClass={'singleCalendar'}
                            dateVal={selectedStartDate}
                            visible={showCalendar}
                            calendarRef={e => { this.calendar = e }}
                            nvbOpen={() => this.updateState('showCalendar', true)}
                            nvbClose={() => this.updateState('showCalendar', false)}
                            confirmDate={this.handleConfirm}
                        />
                    </div>
                </div>

                {/* 去程回程 */}
                <div className={doubleisShow}>
                    <DoubleCalendar
                        customClass={'doubleCalendar'}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        activeInput={activeInput}
                        calendarRef={e => { this.calendar = e }}
                        nvbOpen1={() => this.updateState('activeInput', 0)}
                        nvbOpen2={() => this.updateState('activeInput', 1)}
                        nvbClose={() => this.updateState('activeInput', null)}
                        confirmDate={this.dcConfirm}
                    />
                </div>

                {/* 多目的地 Append 出來的 Item */}
                {multiItems.map((item, i) =>
                    <div key={i} className={changeStyle + isShow}>
                        <PlaceChange
                            customClass={'doubleChangeStyle'}
                            value1={item.dptSelectDate || ''}
                            value2={item.dtnSelectDate || ''}
                            nvbOpen1={() => this.updateState('nvbOpen1', true, item.id)}
                            nvbOpen2={() => this.updateState('nvbOpen2', true, item.id)}
                            nvbClose1={() => this.updateState('nvbOpen1', false, item.id)}
                            nvbClose2={() => this.updateState('nvbOpen2', false, item.id)}
                            // switch={this.switch}
                            visible1={item.nvbOpen1}
                            visible2={item.nvbOpen2}
                            selectDate1={item.selectDate1}
                            selectDate2={item.selectDate2}
                            onChange1={
                                (data, keyword) => this.placeChange(data, keyword, 'dptSelectDate', 'selectDate1', 'nvbOpen1', item.id)
                            }
                            onChange2={
                                (data, keyword) => this.placeChange(data, keyword, 'dtnSelectDate', 'selectDate2', 'nvbOpen2', item.id)
                            }
                        />

                        {/* 去程日期 */}
                        <div className="haveMinus">
                            <SingleCalendar
                                customClass={'singleCalendar'}
                                dateVal={item.selectedStartDate}
                                startDate={item.startDate}
                                visible={item.showCalendar}
                                calendarRef={e => { this.calendar = e }}
                                nvbOpen={() => this.updateState('showCalendar', true, item.id)}
                                nvbClose={() => this.updateState('showCalendar', false, item.id)}
                                confirmDate={() => this.itemConfirmDate(item.id, i)}
                            />

                            {/* 減少 */}
                            {i !== 0 && (
                                <BtRcnb
                                    prop="string"
                                    className="minus-items mulitMinus"
                                    whenClick={() =>
                                        this.minusItem(item.id)
                                    }
                                >
                                    <IcRcln name="toolcancelb" size="x15" />
                                </BtRcnb>
                            )}
                        </div>
                    </div>
                )}

                {/* 增加 */}
                {multiItems.length !== 5 && (
                    <div className={isShow}>
                        <BtRcnb
                            prop="string"
                            className="add-items mulitAdd"
                            whenClick={this.addItem}
                        >
                            <IcRcln name="tooladdb" size="x15" /> 增加航段
                        </BtRcnb>
                    </div>
                )}

                {/* 人數 / 艙等 */}
                <StRnls
                    CustomComponent={
                        <IntRcln
                            request
                            value={`共${totalNum}人，${clstypeText}`}
                            label="人數/艙等"
                            icon={<IcRcln name="toolmember" />}
                            readOnly
                        />
                    }
                    ContentComponent={
                        <div className="flight_international peopleCabinStyle">
                            <StRcln
                                option={this.ClsTypeLevel}
                                placeholder="請選擇"
                                label="艙等："
                                onChangeCallBack={val =>
                                    this.setCabin(Number(val))
                                }
                                defaultValue={clstype}
                            />
                            <PeopleNumAdd
                                setTotalPeople={(val) => this.setState(val)}
                                setAdt={this.props.setAdt}
                                setChd={this.props.setChd}
                                setInf={this.props.setInf}
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
                    moduleClassName="StRnls1 peopleCabin"
                    appendToBody
                    width="100%"
                    innerComponentClass={['outClass']}
                />

                {/* 直飛、只有找機位 */}
                <div className="checkBoxContainer">
                    <CrRcln
                        type="checkbox"
                        textContent="直飛(含中停)"
                        whenChange={e => this.props.setNoTrans('notrans', e ? 'T' : 'F')}
                    />
                    <CrRcln
                        className="checkBoxMagin"
                        type="checkbox"
                        textContent="只找有機位"
                        whenChange={e => this.props.setHaveSeat('haveseat', e ? 1 : 2)}
                    />
                </div>

                {/* 更多搜尋 */}
                <ClpRcdp
                    titleText="更多搜尋選項"
                    ContentComponent={
                        <React.Fragment>
                            <div className="searchMoreTop">
                                {/* 排除轉機國家 */}
                                <FilterTransfer
                                    setNonprefertrans={this.props.setNonprefertrans}
                                />
                                <StRcln
                                    option={this.cheapFlightOptions}
                                    placeholder="請選擇"
                                    label="廉價航空"
                                    breakline
                                    onChangeCallBack={e =>
                                        this.props.setSourceSystem('sourcesystem', e)
                                    }
                                    defaultValue={1}
                                />
                            </div>
                            <CrRcln
                                className="checkBoxMagin"
                                type="checkbox"
                                textContent="排除過夜轉機航班"
                                whenChange={e =>
                                    this.props.setNonprefertransnight(
                                        'nonprefertransnight', e ? 'T' : 'F'
                                    )
                                }
                            />
                        </React.Fragment>
                    }
                    moduleClassName="openMoreOptions"
                    isRightLeft={{
                        destination: 'right',
                        name: 'toolnext'
                    }}
                />

                {/* 搜尋 */}
                <BtRcnb
                    prop="string"
                    className="lg submitBtn"
                    whenClick={this.props.sendData}
                >
                搜尋
                </BtRcnb>

            </React.Fragment>
        );
    }
}

export default International;