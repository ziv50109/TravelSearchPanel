import React, { Component } from 'react';
import { flightChinese } from '../../../../source.config';
import '../css.scss';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import CyRcmn from '../../../../magaele/cy_rcmn';
import NvbRslb from '../../../../magaele/nvb_rslb';
import BtRcnb from '../../../../magaele/bt_rcnb';
import { Tab } from '../../../../magaele/ntb_rcln';
import PpRcln from '../../../../magaele/pp_rcln';
import utils from '../../../../utils/utils';
import { useLocalStorage } from '../../../../utils';
import ChinaNvb from '../component/ChinaNvb';
import today from 'dayjs';

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
class MobileCalendar extends Component {
    state = {
        selectedStartDate: today().add(3, 'days').format('YYYY-MM-DD'),
        showCalendar: false,
    };

    componentDidMount () {
        useLocalStorage({
            panel: 'chineseFlight',
            methods: 'get',
        }, (data) => {
            let newDate;
            if (!data.sFdate) {
                newDate = today().add(3, 'days').format('YYYY-MM-DD');
            } else {
                newDate = data.sFdate;
            }
            this.setState({ selectedStartDate: newDate });
        });
    }
    calendar = null;

    showCalendar = () => {
        this.setState(prevState => ({
            ...prevState,
            showCalendar: true
        }));
    };

    handleClose = (e) => {
        e.stopPropagation();
        this.setState({
            showCalendar: false
        });
    };

    handleConfirm = (e) => {
        const { selectedStartDate } = this.calendar.state;
        e.stopPropagation();
        if (this.props.selectDate) {
            this.props.selectDate(selectedStartDate);
        }

        this.setState(prevState => ({
            selectedStartDate,
            showCalendar: false
        }));
    };

    render () {
        const { selectedStartDate, showCalendar } = this.state;

        return (
            <React.Fragment>
                <div onClick={this.showCalendar}>
                    <span>{selectedStartDate.replace(/\-/g, '/')}</span>
                </div>
                <NvbRslb visible={showCalendar} direction="right">
                    <span
                        className="nvb_rslb_goBack"
                        onClick={this.handleClose}
                    >
                        <IcRcln name="toolbefore" />
                    </span>
                    {showCalendar && (
                        <CyRcmn
                            selectedStartDate={selectedStartDate}
                            startDate={today().add(3, 'day').format('YYYY-MM-DD')}
                            endMonth={today().add(1, 'years').format('YYYY-MM')}
                            endDate={today().add(1, 'years').subtract(4, 'days').format('YYYY-MM-DD')}
                            startLabelTitle="去程日期"
                            ref={e => {
                                this.calendar = e;
                            }}
                            onClickConfirm={this.handleConfirm}
                        />
                    )}
                </NvbRslb>
            </React.Fragment>
        );
    }
}
// 主畫面
class Panel extends Component {
    static defaultProps = {
        doubleMonth: false
    };
    constructor (props) {
        super(props);
        this.state = {
            // 真正傳到後端的資料
            sFairp: 'XZM', // 出發地    _XZM_MFM 取前面
            sTairp: 'SHA', // 目的地
            sFcity: 'MFM', // 出發地    _XZM_MFM 取後面
            sTcity: 'SHA', // 目的地
            sFdate: today().add(3, 'days').format('YYYY-MM-DD'), // 出發日期
            sAdt: 1, // 人
            sChd: 0,
            sClass: 0, // 艙等1
            sTktkind: 'CN', // 大陸機票種類
            // end

            max: 10, // 人數最高
            min: 1, // 人數最低
            cabinText: '經濟艙', // 艙等
            options: [], // 出發機場，目的機場選單
            isLoaded: false // 是否 AJAX 完畢判斷
        };
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

    // 人數艙等 確認
    peopleCabinConfirm = (val) => {
        this.setState({ sClass: val.chinaClstypeLevel, sAdt: val.peopleNum });
    }

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
            useLocalStorage({
                panel: 'chineseFlight',
                methods: 'post',
                data: {
                    sFdate
                }
            });
            // 如果都沒有未填的選項，就 true 然後 window open
            if (isVaild) {
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
                <Tab label="大陸國內機票">
                    <div className="flight_chinese mobile">
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
                                <div className="st_rcln m-b-sm dpt" onClick={() => this.mCalender.showCalendar()}>
                                    <i className="ic_rcln tooldate" />
                                    <div className="dropdown-place-holder selected breakline withIcon">
                                        <span className="dropdown-label req breakline">
                                            出發日期
                                        </span>
                                        {/* <OneChoose selectDate={this.selectDate} /> */}
                                        <MobileCalendar
                                            ref={e => { this.mCalender = e }}
                                            selectDate={this.selectDate}
                                        />
                                    </div>
                                </div>

                                {/* 人數 / 艙等 */}
                                <ChinaNvb
                                    customClass={'peopleAndCabin'}
                                    title={'人數 / 艙等'}
                                    clstypeLevel={this.state.sClass} // 艙等
                                    peopleNum={this.state.sAdt}
                                    confirm={this.peopleCabinConfirm}
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
                </Tab>
            </React.Fragment>
        );
    }
}

export default Panel;
