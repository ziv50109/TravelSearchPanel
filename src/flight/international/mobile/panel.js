import React, { Component, PureComponent } from "react";
import dayjs from "dayjs";
import cx from "classnames";
import CrRcln from "../../../../magaele/cr_rcln";
import ClpRcdp from "../../../../magaele/clp_rcdp";
import StRcln from "../../../../magaele/st_rcln";
import BtRcnb from "../../../../magaele/bt_rcnb";
import IcRcln from "../../../../magaele/ic_rcln";
import IntRcln from "../../../../magaele/int_rcln";
import StRnls from "../../../../magaele/st_rnls";
import IntGpct from "../../../../magaele/int_gpct";
import Label from "../../../../magaele/int_rctg/components/Label/Label";
import DtmRcfr from "../../../../magaele/dtm_rcfr";
import ActRacp from "../../../../magaele/act_racp";
import ActRajx from "../../../../magaele/act_rajx";
import CyRcln from "../../../../magaele/cy_rcln";
// import { ClickOutSide } from '../../../../utils';
import NtbRcln, {
    Tab
} from "../../../../magaele/ntb_rcln/components/Module.js";

import NvbRslb from "../../../../magaele/nvb_rslb";
import CyRcmn from "../../../../magaele/cy_rcmn";
import "./css.scss";

// 手機板關閉開闔面板箭頭
const NvbGoBack = ({ onClick }) => (
    <span className="nvb_rslb_goBack" onClick={onClick}>
        <IcRcln name="toolbefore" />
    </span>
);

// 補字選單分區的callBack
const catalogueCallBack = [
    {
        catalogueName: "城市",
        catafilter: data => {
            return data
                .filter(item => {
                    return item.txt.split("__").length === 2;
                })
                .sort(
                    (a, b) =>
                        a.txt.length - b.txt.length || a.dataIndex - b.dataIndex
                );
        }
    },
    {
        catalogueName: "機場",
        catafilter: data => {
            return data
                .filter(item => {
                    return item.txt.split("__").length > 2;
                })
                .sort(
                    (a, b) =>
                        a.txt.length - b.txt.length || a.dataIndex - b.dataIndex
                );
        }
    }
];

// 補字選單changeKey
const actRacpChangeKey = data => {
    data.forEach(item => {
        item.txt = item.fullName;
        delete item.fullName;
    });
    return data;
};

const SearchInput = ({
    ref,
    value,
    onChange,
    onFocus,
    onBlur,
    onClearBtn,
    onClearFn,
    setRef,
    ClassName,
    searchKeyWord,
    whenItemSelect,
    InputIsFocus,
    closeActcallback,
    closeBtnClickHandleCallback,
    setSelectValue,
    placeholder
}) => {
    return (
        <React.Fragment>
            <div className="int_rcln int-tags-single noBorder">
                <input
                    ref={ref}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {onClearBtn ? (
                    <span className="clearBtn" onMouseDown={onClearFn} />
                ) : null}
            </div>
            <ActRacp
                url="./src/json/GetArrayTkt6.js"
                minimumStringQueryLength={2} // 最少輸入幾個字
                minimumStringQuery="最少輸入兩個字" // 尚未輸入文字字數到達要求會顯示此字串
                setRef={setRef} // 用來監聽點擊對象
                ClassName={ClassName} // 傳入custom class
                searchKeyWord={searchKeyWord} // 傳入篩選的字串
                whenItemSelect={whenItemSelect} // 模組回傳被選取的物件資料
                InputIsFocus={InputIsFocus} // 告訴act 上面的input是否被focus
                noMatchText="找不到資料" // 當沒有配對資料時顯示那些文字
                footer={false} // 是否顯示footer
                theme={"future"} // 樣式調整: future(站長平台)
                closeActcallback={closeActcallback} // 強勢關閉act callbackFn
                closeBtnClickHandleCallback={closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                jsonKey={"destinations"}
                setSelectValue={setSelectValue}
                changeKey={actRacpChangeKey}
                catalogue={catalogueCallBack}
            />
        </React.Fragment>
    );
};

// 排除轉機國家
class FilterTransfer extends Component {
    state = {
        // 排除轉機
        inputText: "", // 綁 input 裡面的值
        showAct: false,
        isFocus: false,
        obj: null,
        searchKeyWord: "",
        onClearValue: false // 清除資料
    };

    receive = i => {
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
        if (val !== "") {
            this.setState({ onClearValue: true });
        } else {
            this.setState({ onClearValue: false });
        }
    };

    isFocus = e => {
        if (e.target.value !== "") {
            // focus 有值時
            this.setState({ isFocus: true, showAct: true, onClearValue: true });
        } else {
            this.setState({
                isFocus: true,
                showAct: true,
                onClearValue: false
            });
        }
    };

    onBlur = () => {
        this.setState({
            isFocus: false,
            onClearValue: false
        });
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

            // this.props.onChangeValue && this.props.onChangeValue(inputText);
        }
    };

    // 清除資料
    handleonClearValue = () => {
        this.setState({
            inputText: "",
            searchKeyWord: "",
            onClearValue: false
        });
    };

    render() {
        const { inputText, showAct, isFocus, obj, searchKeyWord } = this.state;
        return (
            <div className="filterTransfer">
                <Label
                    size="lg"
                    label={"排除轉機國家"}
                    subComponent={
                        <SearchInput
                            placeholder={"請輸入國家"}
                            value={inputText}
                            onChange={this.onChange}
                            onFocus={this.isFocus}
                            onBlur={this.onBlur}
                            onClearBtn={this.state.onClearValue}
                            onClearFn={this.handleonClearValue}
                            setRef={actRef => {
                                this._actref = actRef;
                            }}
                            ClassName={!showAct && "d-no"} // 傳入custom class
                            searchKeyWord={searchKeyWord} // 傳入篩選的字串
                            whenItemSelect={this.receive}
                            InputIsFocus={isFocus}
                            closeActcallback={() =>
                                this.setState({ showAct: false })
                            }
                            closeBtnClickHandleCallback={
                                this.closeBtnClickHandleCallback
                            }
                            setSelectValue={obj ? obj.dataIndex : ""}
                        />
                    }
                />
            </div>
        );
    }
}

const ClsTypeLevel = [
    { text: "經濟艙", value: "1" },
    { text: "不限", value: "0" },
    { text: "豪華經濟艙", value: "2" },
    { text: "商務艙", value: "3" },
    { text: "頭等艙", value: "5" }
];

// 彈出視窗的自訂模組
const PeopleNumContent = props => {
    function selectCabin(val) {
        if (props.selectCabin) {
            props.selectCabin(val);
        }
    }

    return (
        <React.Fragment>
            <StRcln
                option={ClsTypeLevel}
                defaultValue="1"
                placeholder="請選擇"
                label="艙等："
                onChangeCallBack={selectCabin}
                whenClick={() => console.log("CLICK")}
            />
            <PeopleNumAdd totalNum={props.setTotalNumber} />
            <div className="con-tooltip">
                大人：以出發日為準，年滿12歲(含)以上。
                <br />
                孩童：全程搭乘日為準，年滿2歲(含)以上，未滿12歲。
                <br />
                嬰兒：全程搭乘日為準，未滿2歲(不列入幾人成行的人數計算)。
                <br />
            </div>
        </React.Fragment>
    );
};

class PeopleNumAdd extends Component {
    constructor(props) {
        super(props);
        this.maxSum = 8;
        this.state = {
            title: {
                adult: "大人(12+)",
                child: "孩童(2-11)",
                baby: "嬰兒(<2)"
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
    renderState(adultCount, childCount, babyCount) {
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

        if (this.props.totalNum) {
            this.props.totalNum(total);
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
                count: adultCount > babyMax ? adultCount : babyCount
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
            case "adultObj":
                adultCount += 1;
                break;
            case "childObj":
                childCount += 1;
                break;
            case "babyObj":
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
            case "adultObj":
                adultCount -= 1;
                break;
            case "childObj":
                childCount -= 1;
                break;
            case "babyObj":
                babyCount -= 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };
    render() {
        const setPanelState = this.props.setPanelState;
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
                            this.onClickAdd("adultObj");
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus("adultObj");
                        }} // 按下減少
                        onChange={(prevValue, Val) => {
                            setPanelState({ adultObj: Val });
                        }}
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
                            this.onClickAdd("childObj");
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus("childObj");
                        }} // 按下減少
                        onChange={(prevValue, Val) => {
                            setPanelState({ childObj: Val });
                        }}
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
                            this.onClickAdd("babyObj");
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus("babyObj");
                        }} // 按下減少
                        onChange={(prevValue, Val) => {
                            setPanelState({ babyObj: Val });
                        }}
                    />
                </div>
            </div>
        );
    }
}

// 人數 / 艙等
class PeopleNumInputIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: "", // 輸入值 = searchKeyWord
            classRoom: "",
            peopleNum: 1
            // isFocus: false, // 是否處於 focus 狀態
            // showAct: false, // 傳入 custom class
            // value: 0,
            // obj: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
    }
    setClassRoom = txt => {
        if (txt !== null) {
            this.setState = {
                classRoom: txt
            };
        }
    };

    inputValue = txt => {
        if (txt !== null) {
            this.setState = {
                inputValue:
                    "共" + this.state.peopleNum + "，" + this.state.classRoom
            };
        }
    };

    handleClick() {
        this.setState({
            test: true
        });
    }
    handleFocus() {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur() {
        this.setState({ isFocus: false, showAct: false });
    }
    handleKeyUp() {}

    setValues(val) {
        if (typeof val === "object") {
            this.setState(val);
        }
    }
    render() {
        // const { query, maxLength, inputValue } = this.state;
        const { cabin, peopleNumber } = this.props;
        return (
            <IntRcln
                request
                value={`共${peopleNumber}人，${[cabin]}`}
                label="人數/艙等"
                icon={<IcRcln name="toolmember" />}
                readOnly
                cabin={cabin}
                peopleNumber={peopleNumber}
            />
        );
    }
}

// 廉航valuechange
const cheapFlightOptions = [
    { text: "不限", value: 1 },
    { text: "只要廉價航空", value: 2 },
    { text: "排除廉價航空", value: 3 }
];

const ClpRcdpComponent = props => {
    return (
        <React.Fragment>
            <div className="search_more">
                <FilterTransfer onChangeValue={props.sendNonPreferTrans} />
                {/* 廉價航空多目的地不出現 */}
                {props.rtow !== 3 ? (
                    <StRcln
                        ClassName="cheepfight"
                        option={cheapFlightOptions}
                        placeholder="請選擇"
                        label="廉價航空"
                        req
                        breakline
                        onChangeCallBack={props.sendSourceSystem}
                        defaultValue={1}
                    />
                ) : null}
            </div>
            <CrRcln
                type="checkbox"
                textContent="排除過夜轉機航班"
                whenChange={props.sendNonPreferTransNight}
            />
        </React.Fragment>
    );
};

// 日期
class MobileCalendar extends Component {
    showCalendar(target) {
        this.props.showCalendar(target);
    }
    handleClose = () => {
        this.props.showCalendar(null);
    };
    handleConfirm = () => {
        const { selectedStartDate, selectedEndDate } = this.calendar.state;

        this.props.hadelChangeDate(selectedStartDate, selectedEndDate, null);
    };
    render() {
        const { activeInput, DEPARTURE_DATE, RETURN_DATE, rtow } = this.props;
        const showCalendarPage = activeInput === 0 || activeInput === 1;

        return (
            <React.Fragment>
                <div className="input_group">
                    <IntRcln
                        request
                        placeholder="YYYY/MM/DD"
                        label="去程日期"
                        icon={<IcRcln name="tooldate" />}
                        value={DEPARTURE_DATE.replace(/\-/g, "/")}
                        className={rtow === 0 || rtow === 3 ? "" : "bor-right"}
                        onClick={() => {
                            this.showCalendar(0);
                        }}
                    />
                    {rtow === 1 ? (
                        <React.Fragment>
                            <span className="icon_line" />
                            <IntRcln
                                request
                                placeholder="YYYY/MM/DD"
                                label="回程日期"
                                breakline
                                onClick={() => {
                                    this.showCalendar(1);
                                }}
                                value={RETURN_DATE.replace(/\-/g, "/")}
                            />
                        </React.Fragment>
                    ) : null}
                </div>
                <NvbRslb visible={showCalendarPage} direction="right">
                    <span
                        className="nvb_rslb_goBack"
                        onClick={this.handleClose}
                    >
                        <IcRcln name="toolbefore" />
                    </span>
                    {showCalendarPage && (
                        <CyRcmn
                            doubleChoose={
                                rtow === 0 || rtow === 3 ? false : true
                            }
                            selectedStartDate={DEPARTURE_DATE}
                            selectedEndDate={
                                rtow === 0 || rtow === 3 ? "" : RETURN_DATE
                            }
                            activeInput={activeInput}
                            startMonth={dayjs().format("YYYY-MM")}
                            endMonth={dayjs()
                                .add(12, "months")
                                .format("YYYY-MM")}
                            startDate="2018-10-15"
                            endDate="2019-08-12"
                            startLabelTitle="去程日期"
                            endLabelTitle="回程日期"
                            ref={e => {
                                this.calendar = e;
                            }}
                            onClickConfirm={this.handleConfirm.bind(this)}
                            customDiffTxt={diffDate => {
                                const showTxt = diffDate + 1;
                                return "共" + showTxt + "天";
                            }}
                        />
                    )}
                </NvbRslb>
            </React.Fragment>
        );
    }
}

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 印在畫面上
            totalNum: 1, // 人數總數
            clstypeText: "經濟艙", // 艙等
            inputText: "",
            inputTextDes: "",
            inputTextDep: "",
            selectedData: [],
            showDtm: true,
            actAllData: null,
            actShowData: [], // 補字選單show的資料
            rajxDataUrl: "",
            rajxHead: "https://hotel.liontravel.com/search/keyword?keyWord=",
            dtmDataSrc: "./json/hotelMenu.json",
            actRules: [
                {
                    title: "城市",
                    icon: <IcRcln name="toolmapf" key={1} />
                },
                {
                    title: "區域",
                    icon: <IcRcln name="traffictrafficcruiseshipf" key={2} />
                },
                {
                    title: "行政區",
                    icon: <IcRcln name="hotelbusinesscen" key={3} />
                },
                {
                    title: "商圈",
                    icon: <IcRcln name="productpricef" key={4} />
                },
                {
                    title: "地標",
                    icon: <IcRcln name="hotelwify" key={5} />
                },
                {
                    title: "飯店",
                    icon: <IcRcln name="hotelforeignBookingf" key={6} />
                }
            ],

            // 真正要給後端的參數
            rtow: 0,
            adt: 1,
            chd: 0,
            inf: 0,
            notrans: "F", // 是否直飛(不轉機)
            clstype: 1,
            nonprefertrans: [],
            nonprefertransnight: "F", // 排除過夜轉機航班
            sourcesystem: 1,
            haveseat: 2,
            depart1: "", // 出發機場
            depcity1: "", // 出發城市
            depcountry1: "", // 出發國家
            arrive1: "", // 目的機場
            arrcity1: "", // 目的城市
            arrcountry1: "", // 目的國家
            depdate1: "", // 去程日期
            depdate2: "" // 去程日期 or 回程日期
        };
    }

    // 出發地&目的地
    transformActFetchData = data => {
        // 補字選單調整fetch到的資料格式
        const { Destinations } = data;
        const dataArray = [];

        for (let i = 0; i < Destinations.length; i++) {
            const dataObj = {
                txt: Destinations[i].Name,
                level2: Destinations[i].KindName,
                level3: Destinations[i].Code,
                Kind: Destinations[i].Kind
            };
            dataArray.push(dataObj);
        }
        return dataArray;
    };

    transformDtmData = data => {
        let kind = 10;
        let country = data.vCountry.split("_")[1];
        let city = data.vCity.split("_");
        switch (country) {
            case "PCT":
                kind = 10;
                break;
            case "PCTZ":
                kind = 18;
                break;
            case "PCTP":
                kind = 80;
                break;
        }
        if (country === "PCT" && city[0] === "TW" && city.length === 3) {
            kind = 85;
        }
        if (
            country === "PCTZ" &&
            typeof city[0] === "string" &&
            city[0] === "TW"
        ) {
            kind = 84;
        }
        this.setState(prevState => ({
            Kind: kind
        }));
    };

    onClickDestnDtmItem = data => {
        this.transformDtmData(data);
        const Code = data.vCity;
        this.setState(prevState => ({
            selectedData: [data],
            inputTextDep: data.text,
            inputTextDes: data.text,
            Txt: data.text,
            hasValue: false,
            Code
        }));
    };

    openDestnMenu = () => {
        const { hasValue, actShowData } = this.state;
        if (this.state.inputTextDes || this.state.inputTextDep) {
            if (hasValue) {
                this.setState({
                    showAct: true,
                    showDtm: false
                });
            } else {
                this.setState({
                    showAct: false,
                    showDtm: true
                });
            }
            if (actShowData.length > 0) {
                this.setState({
                    showAct: true,
                    showDtm: false
                });
            }
        } else {
            this.setState({
                showAct: false,
                showDtm: true
            });
        }
    };

    closeDestnMenu = () => {
        const { actShowData, inputTextDep, inputTextDes, showAct } = this.state;

        if (actShowData.length > 0) {
            const filterData = actShowData.filter(item => {
                if (inputTextDep) {
                    return item.txt === inputTextDep;
                } else if (inputTextDes) {
                    return item.txt === inputTextDes;
                }
            });

            if (filterData.length === 0) {
                let data = actShowData[0];
                this.setState({
                    inputTextDep: data.txt,
                    inputTextDes: data.txt,
                    Kind: data.Kind,
                    Code: data.level3,
                    Txt: data.txt
                });
            }
        } else {
            if (showAct) {
                this.setState({
                    inputTextDep: "",
                    inputTextDes: "",
                    showAct: false,
                    showDtm: true,
                    hasValue: false
                });
            }
        }

        this.setState({
            hasValue: false,
            activeInput: null
        });
    };

    handleDestnKeyDown = e => {
        if (e.keyCode === 8) {
            this.setState(prevState => ({
                hasValue: true
            }));
        }
    };

    onClickDestnAct = data => {
        const { txt: inputText } = data;

        this.setState(prevState => ({
            inputText,
            dtmSelected: [],
            selectedData: [data],
            hasValue: false
        }));
    };

    clearDestnValue = () => {
        this.setState({
            selectedData: [],
            inputTextDep: "",
            inputTextDes: "",
            showAct: false,
            showDtm: true,
            actShowData: [],
            Code: "",
            Kind: "",
            Txt: ""
        });
    };

    onDestnInputChange = e => {
        const inputText = e.target.value;
        const { rajxHead } = this.state;
        const showAct = inputText.length > 0;
        this.setState(prevState => ({
            inputText,
            selectedData: [],
            dtmSelected: [],
            showAct: showAct,
            showDtm: !showAct
        }));
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const rajxDataUrl = rajxHead + encodeURI(inputText);
            this.fetchDestnActData(rajxDataUrl, inputText);
        }, 500);
    };

    fetchDestnActData = url => {
        fetch(url)
            .then(r => r.json())
            .then(data => {
                const dataArr = this.transformActFetchData(data);
                this.setState(prevState => ({
                    actShowData: dataArr
                }));
            });
    };

    // 開M版panel
    showNvbPage(target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target
        }));
    }

    closeNvbPage = () => {
        this.setState({
            activeInput: null
        });
    };

    tripChange(target) {
        this.setState({
            rtow: target
        });
    }

    setClassRoom = obj => {
        if (obj && typeof obj === "object") {
            this.setState(obj);
        }
    };

    sendNoTrans = e => {
        if (e) {
            this.setState({
                notrans: "T"
            });
        } else {
            this.setState({
                notrans: "F"
            });
        }
    };

    sendHaveSeat = e => {
        if (e) {
            this.setState({
                haveseat: 1
            });
        } else {
            this.setState({
                haveseat: 2
            });
        }
    };

    roundDate(e) {
        console.log(e);
        this.setState({
            depdate: e.startInputValue,
            depdate2: e.endInputValue
        });
    }

    selectCabin = val => {
        console.log("選擇艙等: ", val);
        let text;

        for (let i = 0; i < ClsTypeLevel.length; i++) {
            if (val === ClsTypeLevel[i].value) {
                text = ClsTypeLevel[i].text;
                break;
            }
        }
        this.setState({
            clstype: val,
            clstypeText: text
        });
    };

    setTotalNumber = val => {
        console.log("peopleALLNUM", val);
        this.setState({
            totalNum: val
        });
    };

    sendSourceSystem = val => {
        this.setState({
            sourcesystem: val
        });
    };

    sendNonPreferTransNight = e => {
        if (e) {
            this.setState({
                nonprefertransnight: "T"
            });
        } else {
            this.setState({
                nonprefertransnight: "F"
            });
        }
    };

    sendNonPreferTrans = val => {
        console.log(val);
    };

    sendParameter = () => {
        const { rtow } = this.state;
        // console.log('rtow: ', rtow);
        if (rtow === 0) {
            console.log("單程");
            const {
                clstype,
                adt,
                chd,
                inf,
                notrans,
                haveseat,
                nonprefertransnight,
                sourcesystem,
                depart1,
                depcity1,
                depcountry1,
                arrive1,
                arrcity1,
                arrcountry1,
                depdate1
            } = this.state;
        } else if (rtow === 1) {
            console.log("來回");
        } else if (rtow === 3) {
            console.log("多目的地");
        }
    };

    showCalendar(target) {
        console.log(target);
        this.setState({
            activeInput: target
        });
    }

    hadelChangeDate(start, end, target) {
        this.setState({
            depdate1: start,
            depdate2: end,
            activeInput: target
        });
    }
    // 交換
    switch = () => {
        const obj1 = JSON.parse(JSON.stringify(this.state.dptSelectedData)); // dptObj
        const obj2 = JSON.parse(JSON.stringify(this.state.dtnSelectedData)); // dtnObj
        this.setState({
            dptSelectedData: obj2,
            dtnSelectedData: obj1
        });
    };

    render() {
        const TripClass =
            this.state.rtow === 3 ? "padder-v-sm trip3" : "padder-v-sm";
        const {
            clstypeText,
            totalNum,
            inputText,
            inputTextDep,
            inputTextDes,
            selectedData,
            showDtm,
            showAct,
            dtmDataSrc,
            actShowData,
            actRules,
            cabin,
            totalNumber,
            peopleNumber,
            rtow,
            activeInput,
            depdate1,
            depdate2
        } = this.state;
        const shwoDestinationsPage = activeInput === "destinationlist";
        const shwoDeparturePage = activeInput === "departurelist";

        const selected = selectedData.map(v => v.value);
        const dtm_wrap_classes = cx("wrap_container", {
            "d-no": !showDtm
        });
        const act_wrap_classes = cx("act_wrap_container", {
            "d-no": !showAct
        });
        return (
            <React.Fragment>
                <NtbRcln
                    activeTabIndex={0}
                    customClass="search_panel_two flight_international_mobile"
                >
                    <Tab label="國際機票預訂">
                        <div className="flight_international_mobile">
                            <ul className="Rtow">
                                <li
                                    className={cx({
                                        active: this.state.rtow === 0
                                    })}
                                    onClick={() => {
                                        this.tripChange(0);
                                    }}
                                >
                                    單程
                                </li>
                                <li
                                    className={cx({
                                        active: this.state.rtow === 1
                                    })}
                                    onClick={() => {
                                        this.tripChange(1);
                                    }}
                                >
                                    來回
                                </li>
                                <li
                                    className={cx({
                                        active: this.state.rtow === 3
                                    })}
                                    onClick={() => {
                                        this.tripChange(3);
                                    }}
                                >
                                    多個目的地
                                </li>
                            </ul>
                            <div className={TripClass}>
                                {/* 單程 & 來回 */}
                                <div className="row-mutiple">
                                    <div className="con-deparr-place">
                                        <div className="departure">
                                            <IntRcln
                                                placeholder="請輸入國家/城市/機場"
                                                label="出發地"
                                                readOnly
                                                request
                                                breakline
                                                value={inputTextDep}
                                                onClick={() => {
                                                    this.showNvbPage(
                                                        "departurelist"
                                                    );
                                                }}
                                            />
                                            <NvbRslb
                                                className="hotelsRectM-destination"
                                                visible={shwoDeparturePage}
                                                direction="right"
                                            >
                                                <NvbGoBack
                                                    onClick={
                                                        this.closeDestnMenu
                                                    }
                                                />
                                                <div className="nvb_content">
                                                    <header>
                                                        <h3 className="txt-center m-b-md">
                                                            出發地
                                                        </h3>
                                                        <div className="search_input">
                                                            <IntRcln
                                                                placeholder="請輸入國家/城市/機場"
                                                                value={
                                                                    inputTextDep
                                                                }
                                                                onChange={
                                                                    this
                                                                        .onDestnInputChange
                                                                }
                                                                onClearValue={
                                                                    this
                                                                        .clearDestnValue
                                                                }
                                                                onKeyDown={
                                                                    this
                                                                        .handleDestnKeyDown
                                                                }
                                                                onClick={
                                                                    this
                                                                        .openDestnMenu
                                                                }
                                                            />
                                                            <BtRcnb
                                                                radius
                                                                whenClick={
                                                                    this
                                                                        .closeDestnMenu
                                                                }
                                                            >
                                                                確定
                                                            </BtRcnb>
                                                        </div>
                                                    </header>
                                                    <div className="destinationOpation">
                                                        <div
                                                            className={
                                                                dtm_wrap_classes
                                                            }
                                                        >
                                                            <p
                                                                style={{
                                                                    color:
                                                                        "#24a07d"
                                                                }}
                                                                className="dtm_rcfr-label"
                                                            >
                                                                {
                                                                    "找不到選項？請輸入關鍵字查詢"
                                                                }
                                                            </p>
                                                            <DtmRcfr
                                                                levelKey={[
                                                                    "inTaiwan",
                                                                    "vLine",
                                                                    "vCountry",
                                                                    "vCity"
                                                                ]}
                                                                onClickItem={
                                                                    this
                                                                        .onClickDestnDtmItem
                                                                }
                                                                dataResouce={
                                                                    dtmDataSrc
                                                                }
                                                                replaceRegular={
                                                                    /[a-zA-Z\(\)\s]/g
                                                                }
                                                                selectedData={
                                                                    selected
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            className={
                                                                act_wrap_classes
                                                            }
                                                        >
                                                            <ActRajx
                                                                titleClass={
                                                                    showAct
                                                                        ? ""
                                                                        : "d-no"
                                                                }
                                                                data={
                                                                    actShowData
                                                                }
                                                                matchWord={
                                                                    inputTextDep
                                                                }
                                                                getItemClickValue={
                                                                    this
                                                                        .onClickDestnAct
                                                                }
                                                                minimumStringQuery={
                                                                    "請至少輸入兩個字"
                                                                }
                                                                noMatchText="很抱歉，找不到符合的項目"
                                                                minimumStringQueryLength={
                                                                    2
                                                                }
                                                                footer={false}
                                                                rules={actRules}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </NvbRslb>
                                        </div>
                                        <div
                                            className="changeBtn"
                                            onClick={this.switch}
                                        />
                                        <div className="destination">
                                            <IntRcln
                                                placeholder="請輸入國家/城市/機場"
                                                label="目的地"
                                                readOnly
                                                request
                                                breakline
                                                value={inputTextDes}
                                                onClick={() => {
                                                    this.showNvbPage(
                                                        "destinationlist"
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <NvbRslb
                                        className="hotelsRectM-destination"
                                        visible={shwoDestinationsPage}
                                        direction="right"
                                    >
                                        <NvbGoBack
                                            onClick={this.closeDestnMenu}
                                        />
                                        <div className="nvb_content">
                                            <header>
                                                <h3 className="txt-center m-b-md">
                                                    目的地
                                                </h3>
                                                <div className="search_input">
                                                    <IntRcln
                                                        placeholder="請輸入國家/城市/機場"
                                                        value={inputTextDes}
                                                        onChange={
                                                            this
                                                                .onDestnInputChange
                                                        }
                                                        onClearValue={
                                                            this.clearDestnValue
                                                        }
                                                        onKeyDown={
                                                            this
                                                                .handleDestnKeyDown
                                                        }
                                                        onClick={
                                                            this.openDestnMenu
                                                        }
                                                    />
                                                    <BtRcnb
                                                        radius
                                                        whenClick={
                                                            this.closeDestnMenu
                                                        }
                                                    >
                                                        確定
                                                    </BtRcnb>
                                                </div>
                                            </header>
                                            <div className="destinationOpation">
                                                <div
                                                    className={dtm_wrap_classes}
                                                >
                                                    <p
                                                        style={{
                                                            color: "#24a07d"
                                                        }}
                                                        className="dtm_rcfr-label"
                                                    >
                                                        {
                                                            "找不到選項？請輸入關鍵字查詢"
                                                        }
                                                    </p>
                                                    <DtmRcfr
                                                        levelKey={[
                                                            "inTaiwan",
                                                            "vLine",
                                                            "vCountry",
                                                            "vCity"
                                                        ]}
                                                        onClickItem={
                                                            this
                                                                .onClickDestnDtmItem
                                                        }
                                                        dataResouce={dtmDataSrc}
                                                        replaceRegular={
                                                            /[a-zA-Z\(\)\s]/g
                                                        }
                                                        selectedData={selected}
                                                    />
                                                </div>
                                                <div
                                                    className={act_wrap_classes}
                                                >
                                                    <ActRajx
                                                        titleClass={
                                                            showAct
                                                                ? ""
                                                                : "d-no"
                                                        }
                                                        data={actShowData}
                                                        matchWord={inputTextDes}
                                                        getItemClickValue={
                                                            this.onClickDestnAct
                                                        }
                                                        minimumStringQuery={
                                                            "請至少輸入兩個字"
                                                        }
                                                        noMatchText="很抱歉，找不到符合的項目"
                                                        minimumStringQueryLength={
                                                            2
                                                        }
                                                        footer={false}
                                                        rules={actRules}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </NvbRslb>
                                    <MobileCalendar
                                        rtow={rtow}
                                        showCalendar={e => {
                                            this.showCalendar(e);
                                        }}
                                        activeInput={activeInput}
                                        hadelChangeDate={(
                                            start,
                                            end,
                                            target
                                        ) => {
                                            this.hadelChangeDate(
                                                start,
                                                end,
                                                target
                                            );
                                        }}
                                        DEPARTURE_DATE={depdate1}
                                        RETURN_DATE={depdate2}
                                    />
                                </div>
                                {this.state.rtow === 3 ? (
                                    // 多目的地
                                    <React.Fragment>
                                        <div className="con-mutiple">
                                            <div className="row-mutiple">
                                                <div className="con-deparr-place">
                                                    <div className="departure">
                                                        <IntRcln
                                                            placeholder="請輸入國家/城市/機場"
                                                            label="出發地"
                                                            readOnly
                                                            request
                                                            breakline
                                                            value={inputTextDep}
                                                            onClick={() => {
                                                                this.showNvbPage(
                                                                    "departurelist"
                                                                );
                                                            }}
                                                        />
                                                        <NvbRslb
                                                            className="hotelsRectM-destination"
                                                            visible={
                                                                shwoDeparturePage
                                                            }
                                                            direction="right"
                                                        >
                                                            <NvbGoBack
                                                                onClick={
                                                                    this
                                                                        .closeDestnMenu
                                                                }
                                                            />
                                                            <div className="nvb_content">
                                                                <header>
                                                                    <h3 className="txt-center m-b-md">
                                                                        出發地
                                                                    </h3>
                                                                    <div className="search_input">
                                                                        <IntRcln
                                                                            placeholder="請輸入國家/城市/機場"
                                                                            value={
                                                                                inputTextDep
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .onDestnInputChange
                                                                            }
                                                                            onClearValue={
                                                                                this
                                                                                    .clearDestnValue
                                                                            }
                                                                            onKeyDown={
                                                                                this
                                                                                    .handleDestnKeyDown
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .openDestnMenu
                                                                            }
                                                                        />
                                                                        <BtRcnb
                                                                            radius
                                                                            whenClick={
                                                                                this
                                                                                    .closeDestnMenu
                                                                            }
                                                                        >
                                                                            確定
                                                                        </BtRcnb>
                                                                    </div>
                                                                </header>
                                                                <div className="destinationOpation">
                                                                    <div
                                                                        className={
                                                                            dtm_wrap_classes
                                                                        }
                                                                    >
                                                                        <p
                                                                            style={{
                                                                                color:
                                                                                    "#24a07d"
                                                                            }}
                                                                            className="dtm_rcfr-label"
                                                                        >
                                                                            {
                                                                                "找不到選項？請輸入關鍵字查詢"
                                                                            }
                                                                        </p>
                                                                        <DtmRcfr
                                                                            levelKey={[
                                                                                "inTaiwan",
                                                                                "vLine",
                                                                                "vCountry",
                                                                                "vCity"
                                                                            ]}
                                                                            onClickItem={
                                                                                this
                                                                                    .onClickDestnDtmItem
                                                                            }
                                                                            dataResouce={
                                                                                dtmDataSrc
                                                                            }
                                                                            replaceRegular={
                                                                                /[a-zA-Z\(\)\s]/g
                                                                            }
                                                                            selectedData={
                                                                                selected
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            act_wrap_classes
                                                                        }
                                                                    >
                                                                        <ActRajx
                                                                            titleClass={
                                                                                showAct
                                                                                    ? ""
                                                                                    : "d-no"
                                                                            }
                                                                            data={
                                                                                actShowData
                                                                            }
                                                                            matchWord={
                                                                                inputTextDep
                                                                            }
                                                                            getItemClickValue={
                                                                                this
                                                                                    .onClickDestnAct
                                                                            }
                                                                            minimumStringQuery={
                                                                                "請至少輸入兩個字"
                                                                            }
                                                                            noMatchText="很抱歉，找不到符合的項目"
                                                                            minimumStringQueryLength={
                                                                                2
                                                                            }
                                                                            footer={
                                                                                false
                                                                            }
                                                                            rules={
                                                                                actRules
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </NvbRslb>
                                                    </div>
                                                    <div
                                                        className="changeBtn"
                                                        onClick={this.switch}
                                                    />
                                                    <div className="destination">
                                                        <IntRcln
                                                            placeholder="請輸入國家/城市/機場"
                                                            label="目的地"
                                                            readOnly
                                                            request
                                                            breakline
                                                            value={inputTextDes}
                                                            onClick={() => {
                                                                this.showNvbPage(
                                                                    "destinationlist"
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <NvbRslb
                                                    className="hotelsRectM-destination"
                                                    visible={
                                                        shwoDestinationsPage
                                                    }
                                                    direction="right"
                                                >
                                                    <NvbGoBack
                                                        onClick={
                                                            this.closeDestnMenu
                                                        }
                                                    />
                                                    <div className="nvb_content">
                                                        <header>
                                                            <h3 className="txt-center m-b-md">
                                                                目的地
                                                            </h3>
                                                            <div className="search_input">
                                                                <IntRcln
                                                                    placeholder="請輸入國家/城市/機場"
                                                                    value={
                                                                        inputTextDes
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .onDestnInputChange
                                                                    }
                                                                    onClearValue={
                                                                        this
                                                                            .clearDestnValue
                                                                    }
                                                                    onKeyDown={
                                                                        this
                                                                            .handleDestnKeyDown
                                                                    }
                                                                    onClick={
                                                                        this
                                                                            .openDestnMenu
                                                                    }
                                                                />
                                                                <BtRcnb
                                                                    radius
                                                                    whenClick={
                                                                        this
                                                                            .closeDestnMenu
                                                                    }
                                                                >
                                                                    確定
                                                                </BtRcnb>
                                                            </div>
                                                        </header>
                                                        <div className="destinationOpation">
                                                            <div
                                                                className={
                                                                    dtm_wrap_classes
                                                                }
                                                            >
                                                                <p
                                                                    style={{
                                                                        color:
                                                                            "#24a07d"
                                                                    }}
                                                                    className="dtm_rcfr-label"
                                                                >
                                                                    {
                                                                        "找不到選項？請輸入關鍵字查詢"
                                                                    }
                                                                </p>
                                                                <DtmRcfr
                                                                    levelKey={[
                                                                        "inTaiwan",
                                                                        "vLine",
                                                                        "vCountry",
                                                                        "vCity"
                                                                    ]}
                                                                    onClickItem={
                                                                        this
                                                                            .onClickDestnDtmItem
                                                                    }
                                                                    dataResouce={
                                                                        dtmDataSrc
                                                                    }
                                                                    replaceRegular={
                                                                        /[a-zA-Z\(\)\s]/g
                                                                    }
                                                                    selectedData={
                                                                        selected
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    act_wrap_classes
                                                                }
                                                            >
                                                                <ActRajx
                                                                    titleClass={
                                                                        showAct
                                                                            ? ""
                                                                            : "d-no"
                                                                    }
                                                                    data={
                                                                        actShowData
                                                                    }
                                                                    matchWord={
                                                                        inputTextDes
                                                                    }
                                                                    getItemClickValue={
                                                                        this
                                                                            .onClickDestnAct
                                                                    }
                                                                    minimumStringQuery={
                                                                        "請至少輸入兩個字"
                                                                    }
                                                                    noMatchText="很抱歉，找不到符合的項目"
                                                                    minimumStringQueryLength={
                                                                        2
                                                                    }
                                                                    footer={
                                                                        false
                                                                    }
                                                                    rules={
                                                                        actRules
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NvbRslb>
                                                <MobileCalendar
                                                    rtow={rtow}
                                                    showCalendar={e => {
                                                        this.showCalendar(e);
                                                    }}
                                                    activeInput={activeInput}
                                                    hadelChangeDate={(
                                                        start,
                                                        end,
                                                        target
                                                    ) => {
                                                        this.hadelChangeDate(
                                                            start,
                                                            end,
                                                            target
                                                        );
                                                    }}
                                                    DEPARTURE_DATE={depdate1}
                                                    RETURN_DATE={depdate2}
                                                />
                                            </div>
                                            <div className="row-mutiple has-btn-minus">
                                                <div className="con-deparr-place">
                                                    <div className="departure">
                                                        <IntRcln
                                                            placeholder="請輸入國家/城市/機場"
                                                            label="出發地"
                                                            readOnly
                                                            request
                                                            breakline
                                                            value={inputTextDep}
                                                            onClick={() => {
                                                                this.showNvbPage(
                                                                    "departurelist"
                                                                );
                                                            }}
                                                        />
                                                        <NvbRslb
                                                            className="hotelsRectM-destination"
                                                            visible={
                                                                shwoDeparturePage
                                                            }
                                                            direction="right"
                                                        >
                                                            <NvbGoBack
                                                                onClick={
                                                                    this
                                                                        .closeDestnMenu
                                                                }
                                                            />
                                                            <div className="nvb_content">
                                                                <header>
                                                                    <h3 className="txt-center m-b-md">
                                                                        出發地
                                                                    </h3>
                                                                    <div className="search_input">
                                                                        <IntRcln
                                                                            placeholder="請輸入國家/城市/機場"
                                                                            value={
                                                                                inputTextDep
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .onDestnInputChange
                                                                            }
                                                                            onClearValue={
                                                                                this
                                                                                    .clearDestnValue
                                                                            }
                                                                            onKeyDown={
                                                                                this
                                                                                    .handleDestnKeyDown
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .openDestnMenu
                                                                            }
                                                                        />
                                                                        <BtRcnb
                                                                            radius
                                                                            whenClick={
                                                                                this
                                                                                    .closeDestnMenu
                                                                            }
                                                                        >
                                                                            確定
                                                                        </BtRcnb>
                                                                    </div>
                                                                </header>
                                                                <div className="destinationOpation">
                                                                    <div
                                                                        className={
                                                                            dtm_wrap_classes
                                                                        }
                                                                    >
                                                                        <p
                                                                            style={{
                                                                                color:
                                                                                    "#24a07d"
                                                                            }}
                                                                            className="dtm_rcfr-label"
                                                                        >
                                                                            {
                                                                                "找不到選項？請輸入關鍵字查詢"
                                                                            }
                                                                        </p>
                                                                        <DtmRcfr
                                                                            levelKey={[
                                                                                "inTaiwan",
                                                                                "vLine",
                                                                                "vCountry",
                                                                                "vCity"
                                                                            ]}
                                                                            onClickItem={
                                                                                this
                                                                                    .onClickDestnDtmItem
                                                                            }
                                                                            dataResouce={
                                                                                dtmDataSrc
                                                                            }
                                                                            replaceRegular={
                                                                                /[a-zA-Z\(\)\s]/g
                                                                            }
                                                                            selectedData={
                                                                                selected
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            act_wrap_classes
                                                                        }
                                                                    >
                                                                        <ActRajx
                                                                            titleClass={
                                                                                showAct
                                                                                    ? ""
                                                                                    : "d-no"
                                                                            }
                                                                            data={
                                                                                actShowData
                                                                            }
                                                                            matchWord={
                                                                                inputTextDep
                                                                            }
                                                                            getItemClickValue={
                                                                                this
                                                                                    .onClickDestnAct
                                                                            }
                                                                            minimumStringQuery={
                                                                                "請至少輸入兩個字"
                                                                            }
                                                                            noMatchText="很抱歉，找不到符合的項目"
                                                                            minimumStringQueryLength={
                                                                                2
                                                                            }
                                                                            footer={
                                                                                false
                                                                            }
                                                                            rules={
                                                                                actRules
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </NvbRslb>
                                                    </div>
                                                    <div
                                                        className="changeBtn"
                                                        onClick={this.switch}
                                                    />
                                                    <div className="destination">
                                                        <IntRcln
                                                            placeholder="請輸入國家/城市/機場"
                                                            label="目的地"
                                                            readOnly
                                                            request
                                                            breakline
                                                            value={inputTextDes}
                                                            onClick={() => {
                                                                this.showNvbPage(
                                                                    "destinationlist"
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <NvbRslb
                                                    className="hotelsRectM-destination"
                                                    visible={
                                                        shwoDestinationsPage
                                                    }
                                                    direction="right"
                                                >
                                                    <NvbGoBack
                                                        onClick={
                                                            this.closeDestnMenu
                                                        }
                                                    />
                                                    <div className="nvb_content">
                                                        <header>
                                                            <h3 className="txt-center m-b-md">
                                                                目的地
                                                            </h3>
                                                            <div className="search_input">
                                                                <IntRcln
                                                                    placeholder="請輸入國家/城市/機場"
                                                                    value={
                                                                        inputTextDes
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .onDestnInputChange
                                                                    }
                                                                    onClearValue={
                                                                        this
                                                                            .clearDestnValue
                                                                    }
                                                                    onKeyDown={
                                                                        this
                                                                            .handleDestnKeyDown
                                                                    }
                                                                    onClick={
                                                                        this
                                                                            .openDestnMenu
                                                                    }
                                                                />
                                                                <BtRcnb
                                                                    radius
                                                                    whenClick={
                                                                        this
                                                                            .closeDestnMenu
                                                                    }
                                                                >
                                                                    確定
                                                                </BtRcnb>
                                                            </div>
                                                        </header>
                                                        <div className="destinationOpation">
                                                            <div
                                                                className={
                                                                    dtm_wrap_classes
                                                                }
                                                            >
                                                                <p
                                                                    style={{
                                                                        color:
                                                                            "#24a07d"
                                                                    }}
                                                                    className="dtm_rcfr-label"
                                                                >
                                                                    {
                                                                        "找不到選項？請輸入關鍵字查詢"
                                                                    }
                                                                </p>
                                                                <DtmRcfr
                                                                    levelKey={[
                                                                        "inTaiwan",
                                                                        "vLine",
                                                                        "vCountry",
                                                                        "vCity"
                                                                    ]}
                                                                    onClickItem={
                                                                        this
                                                                            .onClickDestnDtmItem
                                                                    }
                                                                    dataResouce={
                                                                        dtmDataSrc
                                                                    }
                                                                    replaceRegular={
                                                                        /[a-zA-Z\(\)\s]/g
                                                                    }
                                                                    selectedData={
                                                                        selected
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    act_wrap_classes
                                                                }
                                                            >
                                                                <ActRajx
                                                                    titleClass={
                                                                        showAct
                                                                            ? ""
                                                                            : "d-no"
                                                                    }
                                                                    data={
                                                                        actShowData
                                                                    }
                                                                    matchWord={
                                                                        inputTextDes
                                                                    }
                                                                    getItemClickValue={
                                                                        this
                                                                            .onClickDestnAct
                                                                    }
                                                                    minimumStringQuery={
                                                                        "請至少輸入兩個字"
                                                                    }
                                                                    noMatchText="很抱歉，找不到符合的項目"
                                                                    minimumStringQueryLength={
                                                                        2
                                                                    }
                                                                    footer={
                                                                        false
                                                                    }
                                                                    rules={
                                                                        actRules
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NvbRslb>
                                                <MobileCalendar
                                                    rtow={rtow}
                                                    showCalendar={e => {
                                                        this.showCalendar(e);
                                                    }}
                                                    activeInput={activeInput}
                                                    hadelChangeDate={(
                                                        start,
                                                        end,
                                                        target
                                                    ) => {
                                                        this.hadelChangeDate(
                                                            start,
                                                            end,
                                                            target
                                                        );
                                                    }}
                                                    DEPARTURE_DATE={depdate1}
                                                    RETURN_DATE={depdate2}
                                                />
                                                <div className="btns-group-multiple">
                                                    <BtRcnb
                                                        prop="string"
                                                        className="m-sm minus-items"
                                                        whenClick={() =>
                                                            console.log("minus")
                                                        }
                                                    >
                                                        <IcRcln
                                                            name="toolcancelb"
                                                            size="x15"
                                                        />
                                                    </BtRcnb>
                                                </div>
                                            </div>
                                            <div className="row-mutiple has-btn-minus">
                                                <div className="con-deparr-place">
                                                    <div className="departure">
                                                        <IntRcln
                                                            placeholder="請輸入國家/城市/機場"
                                                            label="出發地"
                                                            readOnly
                                                            request
                                                            breakline
                                                            value={inputTextDep}
                                                            onClick={() => {
                                                                this.showNvbPage(
                                                                    "departurelist"
                                                                );
                                                            }}
                                                        />
                                                        <NvbRslb
                                                            className="hotelsRectM-destination"
                                                            visible={
                                                                shwoDeparturePage
                                                            }
                                                            direction="right"
                                                        >
                                                            <NvbGoBack
                                                                onClick={
                                                                    this
                                                                        .closeDestnMenu
                                                                }
                                                            />
                                                            <div className="nvb_content">
                                                                <header>
                                                                    <h3 className="txt-center m-b-md">
                                                                        出發地
                                                                    </h3>
                                                                    <div className="search_input">
                                                                        <IntRcln
                                                                            placeholder="請輸入國家/城市/機場"
                                                                            value={
                                                                                inputTextDep
                                                                            }
                                                                            onChange={
                                                                                this
                                                                                    .onDestnInputChange
                                                                            }
                                                                            onClearValue={
                                                                                this
                                                                                    .clearDestnValue
                                                                            }
                                                                            onKeyDown={
                                                                                this
                                                                                    .handleDestnKeyDown
                                                                            }
                                                                            onClick={
                                                                                this
                                                                                    .openDestnMenu
                                                                            }
                                                                        />
                                                                        <BtRcnb
                                                                            radius
                                                                            whenClick={
                                                                                this
                                                                                    .closeDestnMenu
                                                                            }
                                                                        >
                                                                            確定
                                                                        </BtRcnb>
                                                                    </div>
                                                                </header>
                                                                <div className="destinationOpation">
                                                                    <div
                                                                        className={
                                                                            dtm_wrap_classes
                                                                        }
                                                                    >
                                                                        <p
                                                                            style={{
                                                                                color:
                                                                                    "#24a07d"
                                                                            }}
                                                                            className="dtm_rcfr-label"
                                                                        >
                                                                            {
                                                                                "找不到選項？請輸入關鍵字查詢"
                                                                            }
                                                                        </p>
                                                                        <DtmRcfr
                                                                            levelKey={[
                                                                                "inTaiwan",
                                                                                "vLine",
                                                                                "vCountry",
                                                                                "vCity"
                                                                            ]}
                                                                            onClickItem={
                                                                                this
                                                                                    .onClickDestnDtmItem
                                                                            }
                                                                            dataResouce={
                                                                                dtmDataSrc
                                                                            }
                                                                            replaceRegular={
                                                                                /[a-zA-Z\(\)\s]/g
                                                                            }
                                                                            selectedData={
                                                                                selected
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            act_wrap_classes
                                                                        }
                                                                    >
                                                                        <ActRajx
                                                                            titleClass={
                                                                                showAct
                                                                                    ? ""
                                                                                    : "d-no"
                                                                            }
                                                                            data={
                                                                                actShowData
                                                                            }
                                                                            matchWord={
                                                                                inputTextDep
                                                                            }
                                                                            getItemClickValue={
                                                                                this
                                                                                    .onClickDestnAct
                                                                            }
                                                                            minimumStringQuery={
                                                                                "請至少輸入兩個字"
                                                                            }
                                                                            noMatchText="很抱歉，找不到符合的項目"
                                                                            minimumStringQueryLength={
                                                                                2
                                                                            }
                                                                            footer={
                                                                                false
                                                                            }
                                                                            rules={
                                                                                actRules
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </NvbRslb>
                                                    </div>
                                                    <div
                                                        className="changeBtn"
                                                        onClick={this.switch}
                                                    />
                                                    <div className="destination">
                                                        <IntRcln
                                                            placeholder="請輸入國家/城市/機場"
                                                            label="目的地"
                                                            readOnly
                                                            request
                                                            breakline
                                                            value={inputTextDes}
                                                            onClick={() => {
                                                                this.showNvbPage(
                                                                    "destinationlist"
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <NvbRslb
                                                    className="hotelsRectM-destination"
                                                    visible={
                                                        shwoDestinationsPage
                                                    }
                                                    direction="right"
                                                >
                                                    <NvbGoBack
                                                        onClick={
                                                            this.closeDestnMenu
                                                        }
                                                    />
                                                    <div className="nvb_content">
                                                        <header>
                                                            <h3 className="txt-center m-b-md">
                                                                目的地
                                                            </h3>
                                                            <div className="search_input">
                                                                <IntRcln
                                                                    placeholder="請輸入國家/城市/機場"
                                                                    value={
                                                                        inputTextDes
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .onDestnInputChange
                                                                    }
                                                                    onClearValue={
                                                                        this
                                                                            .clearDestnValue
                                                                    }
                                                                    onKeyDown={
                                                                        this
                                                                            .handleDestnKeyDown
                                                                    }
                                                                    onClick={
                                                                        this
                                                                            .openDestnMenu
                                                                    }
                                                                />
                                                                <BtRcnb
                                                                    radius
                                                                    whenClick={
                                                                        this
                                                                            .closeDestnMenu
                                                                    }
                                                                >
                                                                    確定
                                                                </BtRcnb>
                                                            </div>
                                                        </header>
                                                        <div className="destinationOpation">
                                                            <div
                                                                className={
                                                                    dtm_wrap_classes
                                                                }
                                                            >
                                                                <p
                                                                    style={{
                                                                        color:
                                                                            "#24a07d"
                                                                    }}
                                                                    className="dtm_rcfr-label"
                                                                >
                                                                    {
                                                                        "找不到選項？請輸入關鍵字查詢"
                                                                    }
                                                                </p>
                                                                <DtmRcfr
                                                                    levelKey={[
                                                                        "inTaiwan",
                                                                        "vLine",
                                                                        "vCountry",
                                                                        "vCity"
                                                                    ]}
                                                                    onClickItem={
                                                                        this
                                                                            .onClickDestnDtmItem
                                                                    }
                                                                    dataResouce={
                                                                        dtmDataSrc
                                                                    }
                                                                    replaceRegular={
                                                                        /[a-zA-Z\(\)\s]/g
                                                                    }
                                                                    selectedData={
                                                                        selected
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    act_wrap_classes
                                                                }
                                                            >
                                                                <ActRajx
                                                                    titleClass={
                                                                        showAct
                                                                            ? ""
                                                                            : "d-no"
                                                                    }
                                                                    data={
                                                                        actShowData
                                                                    }
                                                                    matchWord={
                                                                        inputTextDes
                                                                    }
                                                                    getItemClickValue={
                                                                        this
                                                                            .onClickDestnAct
                                                                    }
                                                                    minimumStringQuery={
                                                                        "請至少輸入兩個字"
                                                                    }
                                                                    noMatchText="很抱歉，找不到符合的項目"
                                                                    minimumStringQueryLength={
                                                                        2
                                                                    }
                                                                    footer={
                                                                        false
                                                                    }
                                                                    rules={
                                                                        actRules
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </NvbRslb>
                                                <MobileCalendar
                                                    rtow={rtow}
                                                    showCalendar={e => {
                                                        this.showCalendar(e);
                                                    }}
                                                    activeInput={activeInput}
                                                    hadelChangeDate={(
                                                        start,
                                                        end,
                                                        target
                                                    ) => {
                                                        this.hadelChangeDate(
                                                            start,
                                                            end,
                                                            target
                                                        );
                                                    }}
                                                    DEPARTURE_DATE={depdate1}
                                                    RETURN_DATE={depdate2}
                                                />
                                                <div className="btns-group-multiple">
                                                    <BtRcnb
                                                        prop="string"
                                                        className="m-sm minus-items"
                                                        whenClick={() =>
                                                            console.log("minus")
                                                        }
                                                    >
                                                        <IcRcln
                                                            name="toolcancelb"
                                                            size="x15"
                                                        />
                                                    </BtRcnb>
                                                </div>
                                            </div>
                                            {/* plus button */}
                                            <div className="btns-group-multiple">
                                                <BtRcnb
                                                    prop="string"
                                                    className="m-sm plus-items"
                                                    whenClick={() =>
                                                        console.log("minus")
                                                    }
                                                >
                                                    <IcRcln
                                                        name="tooladdb"
                                                        size="x15"
                                                    />
                                                </BtRcnb>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ) : null}

                                <StRnls
                                    CustomComponent={
                                        <PeopleNumInputIn
                                            cabin={clstypeText}
                                            peopleNumber={totalNum}
                                        />
                                    }
                                    ContentComponent={
                                        <PeopleNumContent
                                            onClick={this.setClassRoom}
                                            selectCabin={this.selectCabin}
                                            setTotalNumber={this.setTotalNumber}
                                        />
                                    }
                                    moduleClassName="StRnls1"
                                    appendToBody
                                    width="448px"
                                    whenOpen={e =>
                                        console.log("PeopleNum Open!")
                                    }
                                    whenClose={e =>
                                        console.log("PeopleNum Close!")
                                    }
                                    innerComponentClass={["outClass"]}
                                />

                                <CrRcln
                                    type="checkbox"
                                    className="p-r-md m-b-sm"
                                    textContent="直飛(含中停)"
                                    whenChange={this.sendNoTrans}
                                />
                                <CrRcln
                                    type="checkbox"
                                    textContent="只找有機位"
                                    whenChange={this.sendHaveSeat}
                                />

                                <ClpRcdp
                                    titleText="更多搜尋選項"
                                    ContentComponent={
                                        <ClpRcdpComponent
                                            rtow={this.state.rtow}
                                            sendSourceSystem={
                                                this.sendSourceSystem
                                            }
                                            sendNonPreferTrans={
                                                this.sendNonPreferTrans
                                            }
                                            sendNonPreferTransNight={
                                                this.sendNonPreferTransNight
                                            }
                                        />
                                    }
                                    moduleClassName="openMoreOptions"
                                    isRightLeft={{
                                        destination: "right",
                                        name: "toolnext"
                                    }}
                                />
                                <BtRcnb
                                    radius
                                    prop="string"
                                    className="pos-fix pos-bottom h-sm w-full"
                                    lg
                                    whenClick={this.sendParameter}
                                >
                                    搜尋
                                </BtRcnb>
                            </div>
                        </div>
                    </Tab>
                    <Tab label="大陸境內機票">
                        <h1>大陸境內機票</h1>
                    </Tab>
                    <Tab label="台灣境內機票">
                        <h1>台灣境內機票</h1>
                    </Tab>
                </NtbRcln>
            </React.Fragment>
        );
    }
}

export default Panel;
