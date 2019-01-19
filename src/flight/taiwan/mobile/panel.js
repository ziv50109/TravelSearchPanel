import React, { Component } from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import { flightTaiwan } from '../../../../source.config';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import NvbRslb from '../../../../magaele/nvb_rslb';
import CyRcmn from '../../../../magaele/cy_rcmn';
import { isJsonString, useLocalStorage } from '../../../../utils';
import '../css.scss';


const Country = [
    { text: '台北松山', value: 'TSA' },
    { text: '台東豐年', value: 'TTT' },
    { text: '高雄小港', value: 'KHH' },
    { text: '台中', value: 'RMQ' },
    { text: '花蓮', value: 'HUN' },
    { text: '澎湖馬公', value: 'MZG' },
    { text: '金門', value: 'KNH' }
];

const level = [
    { text: '1位', value: '1' },
    { text: '2位', value: '2' },
    { text: '3位', value: '3' },
    { text: '4位', value: '4' }
];
const childLevel = [
    { text: '0位', value: '0' },
    { text: '1位', value: '1' },
    { text: '2位', value: '2' },
    { text: '3位', value: '3' }
];

// function arrangeData (data) {
//     console.log('arrangeData');
//     let option = data;
//     let newOption = {};
//     for (let key in option) {
//         if (option['TRIP'] === 1) {
//             if (key !== 'RETURN_DATE') {
//                 newOption[key] = option[key];
//             }
//         } else {
//             newOption[key] = option[key];
//         }
//     }
//     checkData(newOption);
// }


// function checkData (data) {
//     console.log('checkData');
//     let option = data;
//     let checkingOK;
//     for (let key in option) {
//         if (!option[key]) {
//             console.log('請輸入完整資料');
//             checkingOK = false;
//             break;
//         } else {
//             if (key === 'DEPARTURE_DATE') {
//                 let date = option[key].replace(/\//g, '-');
//                 option[key] = date;
//             }
//             if (key === 'RETURN_DATE') {
//                 let date = option[key].replace(/\//g, '-');
//                 option[key] = date;
//             }
//             checkingOK = true;
//         }
//     }
//     console.log('checkingOK', checkingOK);
//     if (checkingOK) {
//         toQueryString(option);
//     }
// }

// function toQueryString (data) {
//     console.log('toQueryString');
//     console.log(data);
//     let option = data;
//     let string = '';
//     let optionLength = Object.keys(option).length;
//     let i = 0;
//     for (let key in option) {
//         if ((Object.prototype.hasOwnProperty.call(option, key))) {
//             i++;
//             if (i >= optionLength) {
//                 string += key + '=' + option[key];
//             } else {
//                 string += key + '=' + option[key] + '&';
//             }
//         }
//     }
//     window.open('https://twflight.liontravel.com/search?' + string, this.props.hrefTarget);
//     console.log(string);
// }

class MobileCalendar extends Component {

    showCalendar (target) {
        this.props.showCalendar(target);
    }
    handleClose = () => {
        this.props.showCalendar(null);
    }
    handleConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;

        this.props.hadelChangeDate(selectedStartDate, selectedEndDate, null);
    }
    render () {
        const {
            activeInput,
            DEPARTURE_DATE,
            RETURN_DATE,
            TRIP,
        } = this.props;

        const visible = activeInput === 0 || activeInput === 1;
        return (
            <div>
                <div className="input_group aroundInput">
                    <IntRcln
                        placeholder="YYYY/MM/DD"
                        label={TRIP === 1 ? '出發日期' : '去程日期'}
                        icon={<IcRcln name="tooldate" />}
                        value={DEPARTURE_DATE.replace(/\-/g, '/')}
                        className={TRIP === 1 ? '' : 'bor-right'}
                        onClick={() => { this.showCalendar(0) }}
                        readOnly
                    />
                    {
                        TRIP === 1 ? null : (
                            <IntRcln
                                placeholder="YYYY/MM/DD"
                                label="回程日期"
                                breakline
                                onClick={() => { this.showCalendar(1) }}
                                value={RETURN_DATE.replace(/\-/g, '/')}
                                readOnly
                            />
                        )
                    }

                </div>
                <NvbRslb

                    visible={visible}
                    direction="right"
                >
                    <span className="nvb_rslb_goBack" onClick={this.handleClose}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        visible && (
                            <CyRcmn
                                doubleChoose={TRIP === 1 ? false : true}
                                selectedStartDate={DEPARTURE_DATE}
                                selectedEndDate={TRIP === 1 ? '' : RETURN_DATE}
                                activeInput={activeInput}
                                startMonth={dayjs().format('YYYY-MM')}
                                endMonth={dayjs().add(12, 'months').format('YYYY-MM')}
                                startDate={dayjs().format('YYYY-MM-DD')}
                                endDate={dayjs().add(1, 'years').subtract(5, 'days').format('YYYY-MM-DD')}
                                startLabelTitle="去程日期"
                                endLabelTitle="回程日期"
                                ref={e => { this.calendar = e }}
                                onClickConfirm={this.handleConfirm.bind(this)}
                                customDiffTxt={diffDate => {
                                    const showTxt = diffDate + 1;
                                    return '共' + showTxt + '天';
                                }}
                            />
                        )
                    }
                </NvbRslb>
            </div>
        );
    }
}


class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            BOARD_POINT: '', // 出發地
            OFF_POINT: '', // 目的地
            TRIP: 1, // 行程
            DEPARTURE_DATE: dayjs().format('YYYY-MM-DD'), // 出發日期
            RETURN_DATE: '', // 回程日期
            PASSENGER_ADULTNUM: 1, // default大人人數1位
            PASSENGER_CHILDNUM: 0, // default孩童人數0位
            activeInput: null,
            isLoaded: false,
            itemList: [],
            depList: Country,
            arrList: Country,
            depPlaceholder: '松山',
            arrPlaceholder: '金門'
        };
    }

    componentDidMount () {
        const sessionData = sessionStorage.getItem(flightTaiwan.place);
        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            this.handleServerItemsLoad(jsonData);
        } else {
            fetch(flightTaiwan.place)
                .then((response) => {
                    // ok 代表狀態碼在範圍 200-299
                    if (!response.ok) throw new Error(response.statusText);
                    return response.json();
                })
                .then((itemList) => {
                    let stringifyData = JSON.stringify(itemList);
                    this.handleServerItemsLoad(itemList);
                    sessionStorage.setItem(flightTaiwan.place, stringifyData);
                })
                .catch((error) => {
                    // 這裡可以顯示一些訊息
                    console.error(error);
                });
        }

    }

    handleServerItemsLoad = (itemList) => {
        let placeSets = Object.keys(itemList).map(function (objectKey, index) {
            let value = itemList[objectKey];
            return value;
        });
        let depPlaces = ((itemList) => {
            let uniqueKey = [];
            for (let i = 0; i < itemList.length; i++) {
                uniqueKey[i] = {};
                uniqueKey[i]['text'] = itemList[i]['<BOARD_POINT_NAME>'];
                uniqueKey[i]['value'] = itemList[i]['<BOARD_POINT_CODE>'];
            }
            let result = uniqueKey.filter(function (element, index, arr) {
                if (index > 0) {
                    return arr[index - 1].text.toString() !== arr[index].text.toString();
                } else {
                    return arr[index].text;
                }
            });
            return result;
        })(placeSets);

        this.setState({
            isLoaded: true,
            depList: depPlaces, // 出發地選單
            itemList: placeSets, // 原始資料
            // BOARD_POINT: depPlaces[0].value, // 出發地選擇
            // depPlaceholder: depPlaces[0].text, // 出發地選擇松山
        }, this.getLocalStorage);

        // this.changeOption(depPlaces[0].value); // 模擬出發地input被chnage
    }

    getLocalStorage () {
        useLocalStorage({
            panel: 'taiwanFlight',
            methods: 'get',
        }, ({
            M_trip,
            M_depDate,
            M_dtnDate,
            M_depPlace,
            M_dtnPlace,
            M_adult,
            M_child
        }) => {
            // 驗證 LocalStorage 是否 undefined
            const trip = !M_trip ? 1 : M_trip;
            const depDate = !M_depDate ? dayjs().format('YYYY-MM-DD') : M_depDate;
            const dtnDate = !M_dtnDate ? '' : M_dtnDate;
            const depPlace = !M_depPlace ? 'TSA' : M_depPlace;
            const dtnPlace = !M_dtnPlace ? 'KNH' : M_dtnPlace;
            const adult = !M_adult ? '1' : M_adult;
            const child = !M_child ? '0' : M_child;

            // 設定 State Default
            this.setState({
                DEPARTURE_DATE: depDate, RETURN_DATE: dtnDate
            }, this.setDefaultVal(depPlace, dtnPlace, adult, child, trip));
        });
    }

    // 設定預設值
    setDefaultVal (depPlace, dtnPlace, adult, child, trip) {
        this.boardPointChange(depPlace);
        this.offPointChange(dtnPlace);
        this.passengerChange(adult, 'p');
        this.passengerChange(child, 'c');
        this.tripChange(trip);
    }

    boardPointChange (selectValue) {
        let depList = this.state.depList;
        let nowPlace = depList.filter(function (ele, index, arr) {
            return arr[index].value === selectValue;
        });

        this.setState({
            BOARD_POINT: selectValue,
            depPlaceholder: nowPlace[0].text,
        });
        this.changeOption(selectValue);
    }

    offPointChange (selectValue) {
        let arrList = this.state.arrList;
        let nowPlace = arrList.filter(function (ele, index, arr) {
            return arr[index].value === selectValue;
        });

        this.setState({
            OFF_POINT: selectValue,
            arrPlaceholder: nowPlace[0].text
        });
    }

    changeOption (selectValue) {
        let itemList = this.state.itemList;
        if (itemList.length !== 0) {
            let nowValue = selectValue;
            let secondList = itemList.filter(function (item, index, arr) { // 篩選出發地可到達的目的地選單
                return arr[index]['<BOARD_POINT_CODE>'] === nowValue;
            });
            let newList = [];
            for (let i = 0; i < secondList.length; i++) { // 整理符合模組的資料格式
                newList[i] = {};
                newList[i]['text'] = secondList[i]['<OFF_POINT_NAME>'];
                newList[i]['value'] = secondList[i]['<OFF_POINT_CODE>'];
            }

            // 如果目的地選擇的項目 與 下次出發地選擇的項目相同 則設定成該項目
            let lastArr = this.state.OFF_POINT;
            let index;
            if (lastArr !== '') {
                for (let i = 0; i < newList.length; i++) {
                    if (newList[i].value === lastArr) {
                        index = i;
                    } else {
                        index = 0;
                    }
                }
            } else {
                index = 0;
            }
            this.setState({
                arrList: newList, // 目的地選單
                arrPlaceholder: newList[index].text, // 目的地選擇
                OFF_POINT: newList[index].value, // 目的地選擇
            });
        }
    }

    passengerChange (selectValue, from) {
        if (from === 'p') {
            this.setState({
                PASSENGER_ADULTNUM: selectValue
            });
        } else if (from === 'c') {
            this.setState({
                PASSENGER_CHILDNUM: selectValue
            });
        } else {
            return;
        }
    }

    tripChange (target) {
        this.setState({
            TRIP: target,
        });
    }
    clearVaule (e) {
        this.setState({
            DEPARTURE_DATE: ''
        });
    }

    roundDate (e) {
        console.log(e);
        this.setState({
            DEPARTURE_DATE: e.startInputValue,
            RETURN_DATE: e.endInputValue
        });
    }
    showCalendar (target) {
        console.log(target);
        this.setState({
            activeInput: target
        });
    }
    hadelChangeDate (start, end, target) {
        this.setState({
            DEPARTURE_DATE: start,
            RETURN_DATE: end,
            activeInput: target
        });
    }

    // 按下送出，並且去驗證
    handleSubmit () {
        const {
            TRIP,
            BOARD_POINT,
            OFF_POINT,
            DEPARTURE_DATE,
            RETURN_DATE,
            PASSENGER_ADULTNUM,
            PASSENGER_CHILDNUM
        } = this.state;

        this.validDate((isValid, warnText) => {
            const M_trip = TRIP;
            const M_depPlace = BOARD_POINT; // 出發地
            const M_dtnPlace = OFF_POINT; // 目的地
            const M_depDate = DEPARTURE_DATE; // 去程日期
            const M_dtnDate = RETURN_DATE; // 回程日期
            const M_adult = PASSENGER_ADULTNUM; // 大人
            const M_child = PASSENGER_CHILDNUM; // 孩童
            useLocalStorage({
                panel: 'taiwanFlight',
                methods: 'post',
                data: {
                    M_trip,
                    M_depPlace,
                    M_dtnPlace,
                    M_depDate,
                    M_dtnDate,
                    M_adult,
                    M_child
                }
            });
            if (isValid) {
                let searchString;
                if (TRIP === 1) {
                    searchString = `TRIP=${TRIP}&BOARD_POINT=${BOARD_POINT}&OFF_POINT=${OFF_POINT}&DEPARTURE_DATE=${DEPARTURE_DATE}&PASSENGER_ADULTNUM=${PASSENGER_ADULTNUM}&PASSENGER_CHILDNUM=${PASSENGER_CHILDNUM}`;
                } else if (TRIP === 2) {
                    searchString = `TRIP=${TRIP}&BOARD_POINT=${BOARD_POINT}&OFF_POINT=${OFF_POINT}&DEPARTURE_DATE=${DEPARTURE_DATE}&RETURN_DATE=${RETURN_DATE}&PASSENGER_ADULTNUM=${PASSENGER_ADULTNUM}&PASSENGER_CHILDNUM=${PASSENGER_CHILDNUM}`;
                }
                window.open('https://twflight.liontravel.com/search?' + searchString, this.props.hrefTarget);
            } else {
                alert(`請選擇${warnText.join('、')}`);
            }
        });
    }

    // 驗證
    validDate (callback) {
        const {
            TRIP,
            DEPARTURE_DATE,
            RETURN_DATE,
        } = this.state;
        const warnText = [];

        if (TRIP === 1) {
            if (!DEPARTURE_DATE) {
                warnText.push('去程日期');
            }
        } else if (TRIP === 2) {
            if (!DEPARTURE_DATE) {
                warnText.push('去程日期');
            }
            if (!RETURN_DATE) {
                warnText.push('回程日期');
            }
        }

        callback(warnText.length === 0, warnText);
    }

    render () {
        const {
            TRIP,
            DEPARTURE_DATE,
            RETURN_DATE,
            activeInput,
            depList,
            depPlaceholder,
            arrList,
            arrPlaceholder,
            PASSENGER_ADULTNUM,
            PASSENGER_CHILDNUM,
            BOARD_POINT, // 出發地
            OFF_POINT // 目的地
        } = this.state;

        return (
            <div className="flight_taiwan mobile">
                <div>
                    <ul className="Rtow">
                        <li className={cx({ 'active': TRIP === 1 })} onClick={() => { this.tripChange(1) }}>單程</li>
                        <li className={cx({ 'active': TRIP === 2 })} onClick={() => { this.tripChange(2) }}>來回</li>
                    </ul>
                </div>
                <div className="m-t-sm">
                    <StRcln
                        ClassName="m-b-sm"
                        option={depList}
                        placeholder={depPlaceholder}
                        label="出發地"
                        icon={<IcRcln name="planeairplane" />}
                        req
                        breakline
                        onChangeCallBack={(e) => { this.boardPointChange(e) }}
                        defaultValue={BOARD_POINT || 'TSA'}
                    />
                    <StRcln
                        ClassName="m-b-sm"
                        option={arrList}
                        placeholder={arrPlaceholder}
                        label="目的地"
                        icon={<IcRcln name="toolmap" />}
                        req
                        breakline
                        onChangeCallBack={(e) => { this.offPointChange(e) }}
                        defaultValue={OFF_POINT || 'KNH'}
                    />
                    <MobileCalendar
                        TRIP={TRIP}
                        showCalendar={(e) => { this.showCalendar(e) }}
                        activeInput={activeInput}
                        hadelChangeDate={(start, end, target) => { this.hadelChangeDate(start, end, target) }}
                        DEPARTURE_DATE={DEPARTURE_DATE}
                        RETURN_DATE={RETURN_DATE}
                    ></MobileCalendar>
                    <div className="m-b-sm m-t-sm">
                        <StRcln
                            ClassName="m-b-sm"
                            option={level}
                            placeholder={`${PASSENGER_ADULTNUM}` || '1位'}
                            label="大人"
                            icon={<IcRcln name="toolstaff" />}
                            req
                            breakline
                            whenMouseDown={() => console.log('父層whenMouseDown')}
                            onChangeCallBack={(e) => { this.passengerChange(e, 'p') }}
                            defaultValue={`${PASSENGER_ADULTNUM}` || '1位'}
                        />
                        <StRcln
                            ClassName="m-b-sm"
                            option={childLevel}
                            placeholder={`${PASSENGER_CHILDNUM}` || '0位'}
                            label="孩童"
                            icon={<IcRcln name="toolchild" />}
                            req
                            breakline
                            whenMouseDown={() => console.log('父層whenMouseDown')}
                            onChangeCallBack={(e) => { this.passengerChange(e, 'c') }}
                            defaultValue={`${PASSENGER_CHILDNUM}` || '0位'}
                        />
                    </div>
                    <div className="footer">
                        <div className="footerInfo"><div><IcRcln name="toolif" className="p-r-xs" />注意事項：目前僅華信航空提供線上即時訂購。</div><a>參考其他航空</a></div>
                    </div>
                    <BtRcnb radius prop="string" className="h-sm w-full" lg whenClick={() => { this.handleSubmit() }}>搜尋</BtRcnb>
                </div>
            </div>
        );
    }
}
export default Panel;
