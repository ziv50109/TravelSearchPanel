import React, { Component } from 'react';
import { flightChinese } from '../../../../source.config';
import '../css.scss';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import IntGpct from '../../../../magaele/int_gpct';
import CyRcln from '../../../../magaele/cy_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import { ClickOutSide, useLocalStorage } from '../../../../utils';
import StRnls from '../../../../magaele/st_rnls';
import PpRcln from '../../../../magaele/pp_rcln';
import utils from '../../../../utils/';
import dayjs from 'dayjs';

// 人數艙等
const PeopleAndCabin = props => {
    return (
        <IntRcln
            request
            value={`共${props.peopleNumber}人，${[props.cabin]}`}
            label="人數/艙等"
            icon={<IcRcln name="toolstaff" />}
            readOnly
        />
    );
};

const CustomComponent = props => {
    return (
        <div className="footerInfo">
            <IcRcln name="toolif" className="p-r-xs" />
            若欲訂購來回程機票，請分開訂位。
        </div>
    );
};

// 彈出視窗的自訂模組
const ContentComponent = props => {
    return (
        <p>
            例如:需預訂上海 → 北京 → 上海來回機票，請上海 →
            北京單程票預定一張訂票，北京 → 上海單程票另外預定一張訂單
        </p>
    );
};

// 單選月曆
class PcCalendar extends Component {
    static defaultProps = {
        doubleMonth: true
    };

    state = {
        selectedStartDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
        startInputValue: dayjs().add(3, 'day').format('YYYY-MM-DD'),
        onFocus: false
    };

    componentDidMount () {
        useLocalStorage({
            panel: 'chineseFlight',
            methods: 'get',
        }, (data) => {
            let newDate;
            if (!data.sFdate) {
                newDate = dayjs().add(3, 'days').format('YYYY-MM-DD');
            } else {
                newDate = data.sFdate;
            }
            this.setState({ selectedStartDate: newDate, startInputValue: newDate });
        });
    }
    openCyRcln = () => {
        this.setState(prevState => ({
            ...prevState,
            onFocus: true
        }));
    }
    clickDate = date => {
        if (this.props.selectDate) {
            this.props.selectDate(date);
        }
        this.setState(prevState => ({
            onFocus: false,
            selectedStartDate: date,
            startInputValue: date
        }));
    };

    inputChange = e => {
        const value = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            startInputValue: value
        }));
    };

    onClickOutside = () => {
        this.checkDate('start');
        this.setState(prevState => ({
            ...prevState,
            onFocus: false,
        }), this.props.selectDate(this.state.startInputValue));
    }

    // 日期驗證
    checkDate (inputType) {
        const DateValueErrorMessage = '請輸入正確的日期格式(YYYYMMDD) EX: 20180101';
        const todayAfterThree = dayjs().add(3, 'days').format('YYYY-MM-DD'); // 今天日期三天後
        const {
            startInputValue,
        } = this.state;

        // 若input沒有值
        if (!startInputValue.length) return;

        let regex = /^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;
        // 若日期是3碼或4碼(326 > 當年/03/26, 1105 > 當年/11/05)
        if (startInputValue.length === 4) regex = /^()(\d{2})(\d{2})/;
        if (startInputValue.length === 3) regex = /^()(\d{1})(\d{2})/;
        const result = startInputValue.match(regex);
        const isValidDate = (d) => d instanceof Date && !isNaN(d);

        // 輸入的字元不合規則
        if (result === null) {
            this.setState({ startInputValue: todayAfterThree, selectedStartDate: todayAfterThree });
            return alert(DateValueErrorMessage);
        }

        // 月份小於10月，前面加'0'
        if (result[2].length === 1) result[2] = '0' + result[2];
        const [all, year, month, day] = result; // all 一定要在 !! 因為他是存放陣第一個雖然沒用到
        const d = `${year || dayjs().year()}-${month}-${day}`;
        const date = dayjs(d);
        const calcStartDate = this.calcStartDate();

        // 日期格式正確但是不存在的日期
        if (!isValidDate(new Date(d))) {
            this.setState({ startInputValue: todayAfterThree, selectedStartDate: todayAfterThree });
            return alert('無效的日期');
        }

        if (date.isBefore(calcStartDate)) {
            this.setState({ startInputValue: todayAfterThree, selectedStartDate: todayAfterThree });
            return alert('日期小於最小可選日期');
        }

        // 都驗證正確 就更換日期
        this.setState({ startInputValue: d, selectedStartDate: d });
    }

    // 判斷目前日期小於最小可選
    calcStartDate () {
        const {
            selectedStartDate,
            activeInput,
        } = this.state;

        const today = dayjs();
        if (activeInput === 'end') {
            return !selectedStartDate.length ? today.add(3, 'days').format('YYYY-MM-DD') : selectedStartDate;
        }
        return today.add(3, 'days').format('YYYY-MM-DD');
    }

    clearValue = () => {
        this.setState({ startInputValue: '', selectedStartDate: '' }, this.props.selectDate(''));
    }

    render () {
        const { selectedStartDate, startInputValue, onFocus } = this.state;

        const { doubleMonth } = this.props;
        const today = dayjs();
        return (
            <ClickOutSide
                className="pcCalendarCont m-b-sm"
                onClickOutside={this.onClickOutside}
            >
                <IntRcln
                    request
                    placeholder="YYYY/MM/DD"
                    label={'出發日期'}
                    icon={<IcRcln name="tooldate" />}
                    onFocus={() => {
                        this.setState(prevState => ({
                            ...prevState,
                            onFocus: true
                        }));
                    }}
                    onChange={this.inputChange}
                    onClearValue={this.clearValue}
                    value={startInputValue.replace(/\-/g, '/')}
                />
                {!onFocus ? null : (
                    <div className="content">
                        <button className="close_btn" onClick={this.onClickOutside}>×</button>
                        <CyRcln
                            doubleMonth={doubleMonth}
                            activeStart={today.format('YYYY-MM')}
                            activeEnd={today.add(1, 'years').format('YYYY-MM')}
                            startDate={today.add(3, 'days').format('YYYY-MM-DD')}
                            endDate={today.add(1, 'years').subtract(4, 'days').format('YYYY-MM-DD')}
                            selectedStartDate={selectedStartDate}
                            onDateClick={this.clickDate}
                        />
                    </div>
                )}
            </ClickOutSide>
        );
    }
}

// 主畫面
class ChinaBody extends Component {
    static defaultProps = {
        doubleMonth: true
    };
    constructor (props) {
        super(props);
        this.state = {
            // 真正傳到後端的資料
            sFairp: 'XZM', // 出發地    _XZM_MFM 取前面
            sTairp: 'SHA', // 目的地
            sFcity: 'MFM', // 出發地    _XZM_MFM 取後面
            sTcity: 'SHA', // 目的地
            sFdate: '', // 出發日期
            sAdt: 1, // 人
            sChd: 0,
            sClass: 0, // 艙等
            sTktkind: 'CN', // 大陸機票種類
            // end

            max: 8, // 人數最高
            min: 1, // 人數最低
            cabinText: '經濟艙', // 艙等
            options: [], // 出發機場，目的機場選單
            isLoaded: false // 是否 AJAX 完畢判斷
        };
        this.ClsTypeLevel = [
            { text: '經濟艙', value: 0 },
            { text: '商務艙', value: 1 },
        ];
    }

    componentDidMount () {
        this.getOptionData(); // 去 AJAX 資料下來
    }

    // get 選單裡面的資料
    getOptionData = () => {
        const sessionData = sessionStorage.getItem(flightChinese.place);
        if (sessionData && utils.isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            this.getData(jsonData);
        } else {
            utils.fetchJsToObj(flightChinese.place, (d) => {
                let stringifyData = JSON.stringify(d);
                this.getData(d);
                sessionStorage.setItem(flightChinese.place, stringifyData);
            });
        }
    };
    getData = data => {
        this.handleGetData(data.vCity); // 把傳過來的資料做整理
    };
    // 把 AJAX 過來的資料做整理
    handleGetData = data => {
        let arr = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let newObject = {
                    text: data[key],
                    value: key
                };
                arr.push(newObject);
            }
        }
        this.setState({ isLoaded: true, options: arr });
    };

    // 出發機場
    dptChange (val) {
        let handledVal = val.split('_');
        let fairp = handledVal[1];
        let fcity = handledVal[2];
        this.setState({
            sFairp: fairp,
            sFcity: fcity
        });
    }

    // 目的機場
    dtnChange (val) {
        let handledVal = val.split('_');
        let tairp = handledVal[1];
        let tcity = handledVal[2];
        this.setState({
            sTairp: tairp,
            sTcity: tcity
        });
    }

    // 出發日期
    selectDate = date => {
        this.setState({
            sFdate: date
        });
    };

    // 艙等
    selectCabin = val => {
        val = parseInt(val);
        this.setState({
            sClass: val,
            cabinText: this.ClsTypeLevel[val].text
        });
    };

    // 按下增加
    onClickAdd = () => {
        const { sAdt, max } = this.state;
        console.log('add:' + this.state.sAdt);
        let peopleNunber = sAdt + 1;
        if (peopleNunber >= max) {
            peopleNunber = max;
        }
        this.setState({ sAdt: peopleNunber });
    };

    // 按下減少
    onClickMinus = () => {
        const { sAdt, min } = this.state;
        console.log('add:' + this.state.sAdt);
        let number = sAdt - 1;
        if (number <= min) {
            number = min;
        }
        this.setState({ sAdt: number });
    };

    // 按下搜尋時
    handleSubmit = () => {
        const {
            sFcity,
            sTcity,
            sFdate,
            sAdt,
            sClass,
            sTktkind,
            sChd,
            sTairp,
            sFairp
        } = this.state;
        this.validate((isVaild, warnText) => {
            // 如果都沒有未填的選項，就 true 然後 window open
            if (isVaild) {
                useLocalStorage({
                    panel: 'chineseFlight',
                    methods: 'post',
                    data: {
                        sFdate
                    }
                });
                let searchVal = `sFcity=${sFcity}&sTcity=${sTcity}&sFdate=${sFdate.replace(/\-/g, '')}&sAdt=${sAdt}&sClass=${sClass}&sTktkind=${sTktkind}&sChd=${sChd}&sTairp=${sTairp}&sFairp=${sFairp}`;
                window.open('https://www.liontravel.com/webtk/webtkcn01.aspx?' + searchVal, this.props.hrefTarget);
            } else {
                alert('請選擇' + warnText.join('、'));
            }
        });
    };

    // 送出參數時驗證
    validate = callback => {
        const { sFairp, sTairp, sFcity, sTcity } = this.state;
        let warnText = [];

        if (sFairp === '' || sFcity === '') {
            warnText.push('出發機場');
        }

        if (sTairp === '' || sTcity === '') {
            warnText.push('目的機場');
        }
        callback(warnText.length === 0, warnText);
    };

    render () {
        const { isLoaded, options } = this.state;

        return (
            <React.Fragment>
                <div className="flight_chinese">
                    {isLoaded && options.length > 0 ? ( // AJAX load完，陣列裡有東西才開始 render
                        <React.Fragment>
                            {/* 出發機場 */}
                            <StRcln
                                ClassName={'m-b-sm'}
                                option={options}
                                placeholder="請選擇"
                                label="出發機場"
                                icon={<IcRcln name="planeairplane" />}
                                req
                                breakline
                                // whenMouseDown={() => console.log('父層whenMouseDown')}
                                onChangeCallBack={e => {
                                    this.dptChange(e);
                                }}
                                defaultValue={'_PEK_PEK'}
                            />

                            {/* 目的機場 */}
                            <StRcln
                                ClassName={'m-b-sm'}
                                option={options}
                                placeholder="請選擇"
                                label="目的機場"
                                icon={<IcRcln name="toolmap" />}
                                req
                                breakline
                                // whenMouseDown={() => console.log('父層whenMouseDown')}
                                onChangeCallBack={e => {
                                    this.dtnChange(e);
                                }}
                                defaultValue={'_SHA_SHA'}
                            />

                            {/* 出發日期 */}
                            <PcCalendar
                                selectDate={this.selectDate}
                            />

                            {/* 人數 / 艙等 */}
                            <StRnls
                                moduleClassName="peopleAndCabin"
                                CustomComponent={
                                    <PeopleAndCabin
                                        cabin={this.state.cabinText}
                                        peopleNumber={this.state.sAdt}
                                    />
                                }
                                ContentComponent={
                                    <React.Fragment>
                                        <StRcln
                                            option={this.ClsTypeLevel}
                                            ClassName="peopleAndCabin"
                                            placeholder={this.state.cabinText}
                                            label="艙等"
                                            req
                                            whenCloseCallBack={() =>
                                                console.log(
                                                    '父層whenCloseCallBack'
                                                )
                                            }
                                            defaultValue={this.state.sClass}
                                            onChangeCallBack={e =>
                                                this.selectCabin(e)
                                            }
                                        />
                                        <div className="peopleContent">
                                            <p>人數</p>
                                            <IntGpct
                                                max={this.state.max}
                                                min={this.state.min}
                                                count={this.state.sAdt}
                                                btnClassMinus="ic_rcln toolcancelb"
                                                btnClassAdd="ic_rcln tooladdb"
                                                onClickAdd={this.onClickAdd} // 按下增加
                                                onClickMinus={
                                                    this.onClickMinus
                                                }
                                            />
                                        </div>
                                    </React.Fragment>
                                }
                                whenOpen={e =>
                                    console.log('Demo Panel Open')
                                }
                                whenClose={e =>
                                    console.log('Demo Panel Close')
                                }
                            />

                            {/* footer 泡泡框 、 搜尋 */}
                            <div className="footer">
                                <PpRcln
                                    CustomComponent={<CustomComponent />}
                                    ContentComponent={<ContentComponent />}
                                    moduleClassName="PpRcln2 m-r-xxl"
                                    events={['click', 'hover']}
                                    position={['bottom', 'horizon_center']}
                                    width="210px"
                                />

                                <BtRcnb
                                    radius
                                    prop="string"
                                    className="h-sm"
                                    lg
                                    whenClick={() => {
                                        this.handleSubmit();
                                    }}
                                >
                                    搜尋
                                </BtRcnb>
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}

export default ChinaBody;
