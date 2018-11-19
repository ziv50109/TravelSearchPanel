import React, { Component } from 'react';
import CyRcln from '../../../../../magaele/cy_rcln';
import { ClickOutSide } from '../../../../../utils'; // ClickOutSide 一定要大括弧
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
            this.props.setNonprefertrans({ nonprefertrans: i.txt });
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

        // 傳回各別人數
        if (this.props.setPeople) {
            this.props.setPeople({
                adt: adultCount,
                chd: childCount,
                inf: adultCount < babyMax ? adultCount : babyCount
            });
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
                if (this.props.setAdt) {
                    this.props.setAdt(adultCount);
                }
                break;
            case 'childObj':
                childCount -= 1;
                console.log(childCount);
                if (this.props.setChd) {
                    this.props.setChd(childCount);
                }
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

const InternationalBody = props => {
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

    let appendItemClass = 'AppendContainer';
    props.rtow === 3 ? appendItemClass += ' show' : appendItemClass += ' hide';

    return (
        <div>
            <div className={props.rtow === 3 ? 'ThreeRtowStyle' : null}>
                <div
                    className={props.rtow === 3 ? 'ItemStyle' : 'ZeroOneRtowStyle'}
                >
                    {/* 出發地、目的地 單程、來回 */}
                    <div className="single-change">
                        <SingleInputMenuF
                            className="SingleInputMenu"
                            /* int_rctg/Label */
                            isRequired // 是否為必填欄位
                            size="lg" // 框高
                            label={'出發地'} // 標籤
                            iconName={'toolmap'} // icon
                            /* subComponent */
                            fetchPath={props.fetchPath} // dtm_rcfr 快速選單資料
                            selectedData={props.dptSelectedData} // 所選擇的資料集
                            // max={this.WrapperDtmRclnMax}
                            /* int_rcln */
                            placeholder="請選擇/可輸入出發地" // placeholder 輸入提示字
                            /* act_racp */
                            minimumStringQueryLength={2} // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                            /* dtm rcln */
                            subLabel="找不到選項？請輸入關鍵字查詢"
                            onChange={(val) => props.placeChange(val, 'dptSelectedData')}
                        />
                        <div className="changeBtn" onClick={props.switch}></div>
                        <SingleInputMenuF
                            className="SingleInputMenu"
                            /* int_rctg/Label */
                            isRequired // 是否為必填欄位
                            size="lg" // 框高
                            label={'目的地'} // 標籤
                            iconName={'toolmap'} // icon
                            /* subComponent */
                            fetchPath={props.fetchPath} // dtm_rcfr 快速選單資料
                            selectedData={props.dtnSelectedData} // 所選擇的資料集
                            // max={this.WrapperDtmRclnMax}
                            /* int_rcln */
                            placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                            /* act_racp */
                            minimumStringQueryLength={2} // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                            /* dtm rcln */
                            subLabel="找不到選項？請輸入關鍵字查詢"
                            onChange={(val) => props.placeChange(val, 'dtnSelectedData')}
                        />
                    </div>


                    {props.rtow === 0 || props.rtow === 3 ? ( // 假如點到 0、3　頁時顯示單選月曆
                        // 去程 單程
                        <ClickOutSide onClickOutside={props.onClickOutside}>
                            <Label
                                isRequired
                                size="lg"
                                label={'去程日期'}
                                iconName={'tooldate'}
                                subComponent={
                                    <div className="inputStyle">
                                        <input
                                            type="text"
                                            placeholder="選擇日期"
                                            value={props.startInputValue.replace(/\-/g, '/')}
                                            onFocus={() =>
                                                props.singleInputFocus({
                                                    focus1: true
                                                })
                                            }
                                            onBlur={() => {
                                                props.singleOnBlur('clean1');
                                            }}
                                            readOnly
                                        />
                                        {props.Clean1 &&
                                            <span className="clearBtn" onMouseDown={() => props.clearValue({ depdate1: '' })} />
                                        }
                                    </div>
                                }
                            />

                            {props.onFocus && (
                                <div className="calendarStyle">
                                    <CyRcln
                                        doubleMonth={true}
                                        activeStart={today().format('YYYY-MM')}
                                        activeEnd={today().add(1, 'years').format('YYYY-MM')}
                                        startDate={today().format('YYYY-MM-DD')}
                                        endDate={today().add(1, 'years').format('YYYY-MM-DD')}
                                        selectedStartDate={
                                            props.startInputValue
                                        }
                                        onDateClick={val =>
                                            props.clickDate({
                                                depdate1: val,
                                                goDateFocus: false
                                            })
                                        }
                                    />
                                    <div
                                        className="close_btn"
                                        onClick={props.onClickOutside}
                                    >×</div>
                                </div>
                            )}
                        </ClickOutSide>
                    ) : (
                        // 去程來回 來回
                        <ClickOutSide
                            onClickOutside={() => props.dcInputFocus(null)}
                        >
                            <div className="doubleCanlendarStyle">
                                <Label
                                    isRequired
                                    size="lg"
                                    label={'去程日期'}
                                    iconName={'tooldate'}
                                    subComponent={
                                        <div className="inputStyle">
                                            <input
                                                type="text"
                                                placeholder="開始日期"
                                                value={props.dcStartInputValue.replace(/\-/g, '/')}
                                                onFocus={() =>
                                                    props.dcInputFocus('start', 'depdate1')
                                                }
                                                onChange={() => {}}
                                                onBlur={() => props.singleOnBlur('dcCleanBtn1')}
                                            />
                                            {props.dcCleanBtn1 &&
                                                <span className="clearBtn" onMouseDown={() => props.clearValue({ depdate1: '' })} />
                                            }
                                        </div>
                                    }
                                />
                                <Label
                                    isRequired
                                    size="lg"
                                    label={'回程日期'}
                                    subComponent={
                                        <div className="inputStyle">
                                            <input
                                                type="text"
                                                placeholder="結束日期"
                                                value={props.dcEndInputValue.replace(/\-/g, '/')}
                                                onFocus={() =>
                                                    props.dcInputFocus('end', 'depdate2')
                                                }
                                                onBlur={() => props.singleOnBlur('dcCleanBtn2')}
                                                onChange={() => {}}
                                            />
                                            {props.dcCleanBtn2 &&
                                                <span className="clearBtn" onMouseDown={() => props.clearValue({ depdate2: '' })} />
                                            }
                                        </div>
                                    }
                                />
                            </div>
                            {!props.dcActiveInput ? null : (
                                <div className="calendarStyle">
                                    <CyRcln
                                        doubleMonth={true}
                                        doubleChoose
                                        activeStart={today().format('YYYY-MM')}
                                        activeEnd={today().add(1, 'years').format('YYYY-MM')}
                                        startDate={today().format('YYYY-MM-DD')}
                                        endDate={today().add(1, 'years').format('YYYY-MM-DD')}
                                        selectedStartDate={props.dcStartInputValue}
                                        selectedEndDate={props.dcEndInputValue}
                                        onDateClick={(date) => props.dcClickDate(date)}
                                    />
                                    <div
                                        className="close_btn"
                                        onClick={() => props.dcInputFocus(null)}
                                    >×</div>
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
                            value={`共${props.totalPeople}人，${[props.cabinName]}`}
                            label="人數/艙等"
                            icon={<IcRcln name="toolmember" />}
                        />
                    }
                    ContentComponent={
                        <div className="flight_international peopleCabinStyle">
                            <StRcln
                                option={ClsTypeLevel}
                                placeholder="請選擇"
                                label="艙等："
                                onChangeCallBack={val =>
                                    props.selectCabin({
                                        clstypeText: ClsTypeLevel[val].text,
                                        clstype: val
                                    })
                                }
                                defaultValue={props.cabinNumber}
                            />
                            <PeopleNumAdd
                                setPeople={props.setPeople}
                                setTotalPeople={props.setTotalPeople}
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
                    width="448px"
                    innerComponentClass={['outClass']}
                />
            </div>


            {/* append Items */}
            <div className={appendItemClass}>
                {props.multiItems.map((item, i) => (
                    <div key={i} className="AppendItemStyle">
                        <div className="ItemStyle">
                            {/* 出發地、目的地  多目的地 */}
                            <div className="single-change">
                                <SingleInputMenuF
                                    className="SingleInputMenu"
                                    /* int_rctg/Label */
                                    isRequired // 是否為必填欄位
                                    size="lg" // 框高
                                    label={'出發地'} // 標籤
                                    iconName={'toolmap'} // icon
                                    /* subComponent */
                                    fetchPath={props.fetchPath} // dtm_rcfr 快速選單資料
                                    selectedData={item.dptSelectedData} // 所選擇的資料集
                                    // max={this.WrapperDtmRclnMax}
                                    /* int_rcln */
                                    placeholder="請選擇/可輸入出發地" // placeholder 輸入提示字
                                    /* act_racp */
                                    minimumStringQueryLength={2} // 最少輸入幾個字
                                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                                    /* dtm rcln */
                                    subLabel="找不到選項？請輸入關鍵字查詢"
                                    onChange={(val) => props.multiPlaceChange(val, item.id, 'dptSelectedData')}
                                />
                                <div className="changeBtn" onClick={() => props.multiSwitch(item.id)}></div>
                                <SingleInputMenuF
                                    className="SingleInputMenu"
                                    /* int_rctg/Label */
                                    isRequired // 是否為必填欄位
                                    size="lg" // 框高
                                    label={'目的地'} // 標籤
                                    iconName={'toolmap'} // icon
                                    /* subComponent */
                                    fetchPath={props.fetchPath} // dtm_rcfr 快速選單資料
                                    selectedData={item.dtnSelectedData} // 所選擇的資料集
                                    // max={this.WrapperDtmRclnMax}
                                    /* int_rcln */
                                    placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                                    /* act_racp */
                                    minimumStringQueryLength={2} // 最少輸入幾個字
                                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                                    /* dtm rcln */
                                    subLabel="找不到選項？請輸入關鍵字查詢"
                                    onChange={(val) => props.multiPlaceChange(val, item.id, 'dtnSelectedData')}
                                />
                            </div>


                            {/* 去程日期 多目的地 */}
                            <ClickOutSide
                                onClickOutside={() => props.closeCalendar(item.id)
                                }
                            >
                                <Label
                                    isRequired
                                    size="lg"
                                    label={'去程日期'}
                                    iconName={'tooldate'}
                                    subComponent={
                                        <div className="inputStyle">
                                            <input
                                                type="text"
                                                placeholder="選擇日期"
                                                value={item.startInputValue.replace(/\-/g, '/')}
                                                onFocus={() =>
                                                    props.onFocusInput(item.id)
                                                }
                                                onBlur={() => props.multiBlur(item.id)}
                                                onChange={() => {}}
                                            />
                                            {item.cleanBtn &&
                                                <span className="clearBtn" onMouseDown={() => props.multiClearValue(item.id)} />
                                            }
                                        </div>
                                    }
                                />
                                {item.onFocus && (
                                    <div className="calendarStyle">
                                        <CyRcln
                                            doubleMonth={true}
                                            activeStart={item.activeStart}
                                            startDate={item.startDate}
                                            endDate={today().add(1, 'years').format('YYYY-MM-DD')}
                                            selectedStartDate={
                                                item.selectedStartDate
                                            }
                                            onDateClick={e =>
                                                props.multipleClickDate(
                                                    e,
                                                    item.id,
                                                    i
                                                )
                                            }
                                        />
                                        <div
                                            className="close_btn"
                                            onClick={() => props.closeCalendar(item.id)}
                                        >×</div>
                                    </div>
                                )}
                            </ClickOutSide>
                        </div>

                        {/* 減少 多目的地 */}
                        {i !== 0 && (
                            <BtRcnb
                                prop="string"
                                className="minus-items mulitMinus"
                                whenClick={() =>
                                    props.minusItem(item.id)
                                }
                            >
                                <IcRcln name="toolcancelb" size="x15" />
                            </BtRcnb>
                        )}

                    </div>
                ))}

                {/* 增加 多目的地 */}
                {props.multiItems.length !== 5 && (
                    <BtRcnb
                        prop="string"
                        className="add-items mulitAdd"
                        whenClick={props.addItem}
                    >
                        <IcRcln name="tooladdb" size="x15" />
                    </BtRcnb>
                )}
            </div>

            {/* 直飛、找機位 */}
            <CrRcln
                type="checkbox"
                textContent="直飛(含中停)"
                whenChange={e => props.setNoTrans({ notrans: e ? 'T' : 'F' })}
            />
            <CrRcln
                className="checkBoxMagin"
                type="checkbox"
                textContent="只找有機位"
                whenChange={e => props.setHaveSeat({ haveseat: e ? 1 : 2 })}
            />

            {/* 更多搜尋選項 */}
            <ClpRcdp
                titleText="更多搜尋選項"
                ContentComponent={
                    <React.Fragment>
                        <div className="searchMoreTop">
                            <FilterTransfer
                                setNonprefertrans={props.setNonprefertrans}
                                clearNonprefertrans={props.clearNonprefertrans}
                            />
                            <StRcln
                                option={cheapFlightOptions}
                                placeholder="請選擇"
                                label="廉價航空"
                                breakline
                                onChangeCallBack={e =>
                                    props.setSourceSystem({ sourcesystem: e })
                                }
                                defaultValue={1}
                            />
                        </div>
                        <CrRcln
                            className="checkBoxMagin"
                            type="checkbox"
                            textContent="排除過夜轉機航班"
                            whenChange={e =>
                                props.setnonprefertransnight({
                                    nonprefertransnight: e ? 'T' : 'F'
                                })
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
            <BtRcnb
                prop="string"
                className="lg submitBtn"
                whenClick={props.sendData}
            >
                搜尋
            </BtRcnb>
        </div>
    );
};

export default InternationalBody;
