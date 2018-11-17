import React, { Component } from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import NvbRslb from '../../../../magaele/nvb_rslb';
import CyRcmn from '../../../../magaele/cy_rcmn';
import '../../../../magaele/core/core';
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


function arrangeData (data) {
    console.log('arrangeData');
    let option = data;
    let newOption = {};
    for (let key in option) {
        if (option['TRIP'] === 1) {
            if (key !== 'RETURN_DATE') {
                newOption[key] = option[key];
            }
        } else {
            newOption[key] = option[key];
        }
    }
    checkData(newOption);
}


function checkData (data) {
    console.log('checkData');
    let option = data;
    let checkingOK;
    for (let key in option) {
        if (!option[key]) {
            console.log('請輸入完整資料');
            checkingOK = false;
            break;
        } else {
            if (key === 'DEPARTURE_DATE') {
                let date = option[key].replace(/\//g, '-');
                option[key] = date;
            }
            if (key === 'RETURN_DATE') {
                let date = option[key].replace(/\//g, '-');
                option[key] = date;
            }
            checkingOK = true;
        }
    }
    console.log('checkingOK', checkingOK);
    if (checkingOK) {
        toQueryString(option);
    }
}

function toQueryString (data) {
    console.log('toQueryString');
    console.log(data);
    let option = data;
    let string = '';
    let optionLength = Object.keys(option).length;
    let i = 0;
    for (let key in option) {
        if ((Object.prototype.hasOwnProperty.call(option, key))) {
            i++;
            if (i >= optionLength) {
                string += key + '=' + option[key];
            } else {
                string += key + '=' + option[key] + '&';
            }
        }
    }
    window.open('https://twflight.liontravel.com/search?' + string);
    console.log(string);
}

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
                        placeholder="YYYYMMDD"
                        label={TRIP === 1 ? '出發日期' : '去程日期'}
                        icon={<IcRcln name="tooldate" />}
                        value={DEPARTURE_DATE.replace(/\-/g, '/')}
                        className={TRIP === 1 ? '' : 'bor-right'}
                        onClick={() => { this.showCalendar(0) }}
                    />
                    {
                        TRIP === 1 ? null : (
                            <IntRcln
                                placeholder="YYYYMMDD"
                                label="回程日期"
                                breakline
                                onClick={() => { this.showCalendar(1) }}
                                value={RETURN_DATE.replace(/\-/g, '/')}
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
                                startDate="2018-10-15"
                                endDate="2019-08-12"
                                startLabelTitle="入住日期"
                                endLabelTitle="退房日期"
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
            DEPARTURE_DATE: '', // 出發日期
            RETURN_DATE: '', // 回程日期
            PASSENGER_NUMBER: '', // 旅客人數
            activeInput: null,
            isLoaded: false,
            itemList: [],
            depList: Country,
            arrList: Country,
            depPlaceholder: '松山',
            arrPlaceholder: '馬公'
        };
    }
    UNSAFE_componentWillMount () {
        fetch('../json/twflightdest.json')
            .then((response) => {
                // ok 代表狀態碼在範圍 200-299
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((itemList) => { this.handleServerItemsLoad(itemList) })
            .catch((error) => {
                // 這裡可以顯示一些訊息
                // console.error(error)
            });
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
            BOARD_POINT: depPlaces[0].value, // 出發地選擇
            depPlaceholder: depPlaces[0].text, // 出發地選擇松山
        });

        this.changeOption(depPlaces[0].value); // 模擬出發地input被chnage
    }
    boardPointChange (selectValue) {
        let depList = this.state.depList;
        // let arrList = this.state.arrList;
        let nowPlace = depList.filter(function (ele, index, arr) {
            return arr[index].value === selectValue;
        });
        this.setState({
            BOARD_POINT: selectValue,
            depPlaceholder: nowPlace[0].text,
            // arrPlaceholder: arrList[0].text
        });
        this.changeOption(selectValue);
    }
    offPointChange (selectValue) {
        let arrList = this.state.arrList;
        let nowPlace = arrList.filter(function (ele, index, arr) {
            return arr[index].value === selectValue;
        });
        console.log('offPointChange arrList', arrList);
        console.log('offPointChange nowPlace', nowPlace);
        this.setState({
            OFF_POINT: selectValue,
            arrPlaceholder: nowPlace[0].text
        });
    }

    changeOption (selectValue) {
        let itemList = this.state.itemList;
        if (itemList.length !== 0) {
            console.log('changeOption');
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
            console.log('下一次目的地選單', newList);
            console.log('目的地', this.state.OFF_POINT);
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
            console.log('index', index);
            this.setState({
                arrList: newList, // 目的地選單
                arrPlaceholder: newList[index].text, // 目的地選擇
                OFF_POINT: newList[index].value, // 目的地選擇
            });
        }
    }

    passengerChange (selectValue) {
        this.setState({
            PASSENGER_NUMBER: selectValue
        });
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
    handleSubmit () {
        let info = {
            'TRIP': this.state.TRIP,
            'BOARD_POINT': this.state.BOARD_POINT,
            'OFF_POINT': this.state.OFF_POINT,
            'DEPARTURE_DATE': this.state.DEPARTURE_DATE,
            'RETURN_DATE': this.state.RETURN_DATE,
            'PASSENGER_NUMBER': this.state.PASSENGER_NUMBER
        };
        console.log('submit');
        arrangeData(info);
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
        } = this.state;


        return (
            <div className="flight_taiwan">
                <div>
                    <ul className="Rtow">
                        <li className={cx({ 'active': TRIP === 1 })} onClick={() => { this.tripChange(1) }}>單程</li>
                        <li className={cx({ 'active': TRIP === 2 })} onClick={() => { this.tripChange(2) }}>來回</li>
                    </ul>
                </div>
                <div className="padder-v-sm">
                    <StRcln
                        ClassName="m-b-sm"
                        option={depList}
                        placeholder={depPlaceholder}
                        label="出發地"
                        icon={<IcRcln name="planeairplane" />}
                        req
                        breakline
                        onChangeCallBack={(e) => { this.boardPointChange(e) }}
                        // defaultValue={'TSA'}
                    ></StRcln>
                    <StRcln
                        ClassName="m-b-sm"
                        option={arrList}
                        placeholder={arrPlaceholder}
                        label="目的地"
                        icon={<IcRcln name="toolmap" />}
                        req
                        breakline
                        onChangeCallBack={(e) => { this.offPointChange(e) }}
                        // defaultValue={'MZG'}
                    ></StRcln>
                    <MobileCalendar
                        TRIP={TRIP}
                        showCalendar={(e) => { this.showCalendar(e) }}
                        activeInput={activeInput}
                        hadelChangeDate={(start, end, target) => { this.hadelChangeDate(start, end, target) }}
                        DEPARTURE_DATE={DEPARTURE_DATE}
                        RETURN_DATE={RETURN_DATE}
                    ></MobileCalendar>
                    <StRcln ClassName="m-b-sm" option={level} placeholder="請選擇" label="人數" icon={<IcRcln name="toolstaff" />} req breakline whenMouseDown={() => console.log('父層whenMouseDown')} onChangeCallBack={(e) => { this.passengerChange(e) }}></StRcln>
                    <div className="footer p-b-xl">
                        <div className="footerInfo"><IcRcln name="toolif" className="p-r-xs" />注意事項：目前僅華信航空提供線上即時訂購。<a>參考其他航空</a></div>
                    </div>
                    <BtRcnb radius prop="string" className="pos-fix pos-bottom h-sm w-full" lg whenClick={() => { this.handleSubmit() }}>搜尋</BtRcnb>
                </div>
            </div>
        );
    }
}
export default Panel;
