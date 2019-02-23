import React, { Component, PureComponent } from 'react';
import dayjs from 'dayjs';
import cx from 'classnames';
import { flightTaiwan } from '../../../../source.config';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import CyRcln from '../../../../magaele/cy_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import { ClickOutSide, isJsonString, useLocalStorage, isLeapYear } from '../../../../utils';
import '../css.scss';
import '../../../component/ComposeCalendar.scss';

const Country = [
    { text: '台北松山', value: 'TSA' },
    { text: '台東', value: 'TTT' },
    { text: '高雄', value: 'KHH' },
    { text: '台中', value: 'RMQ' },
    { text: '花蓮', value: 'HUN' },
    { text: '馬公', value: 'MZG' },
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
//     console.log('optino', option);
//     for (let key in option) {
//         if (!option[key]) {
//             alert('請輸入完整資料');
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

const DateValueErrorMessage = '請輸入正確的日期格式(YYYYMMDD) EX: 20180101';
class ComposeCalendar extends PureComponent {
    static defaultProps = {
        onChange: () => {}
    };
    constructor (props) {
        super(props);
        this.state = {
            selectedStartDate: dayjs().format('YYYY-MM-DD'),
            selectedEndDate: '',
            startInputValue: dayjs().format('YYYY-MM-DD'),
            endInputValue: '',
            activeInput: null
        };
    }

    componentDidMount () {
        useLocalStorage(
            {
                panel: 'taiwanFlight',
                methods: 'get'
            },
            (data) => {
                this.validataLocalstorageData(data);
            }
        );
    }
    validataLocalstorageData = (data) => {
        const localStorageRecordTime = data.PostTime + 604800000;
        const { PC_depDate, PC_dtnDate } = data;
        if (localStorageRecordTime < new Date().getTime()) {
            console.log('超過7天予以刪除LocalStorage紀錄。');
            useLocalStorage({
                panel: 'taiwanFlight',
                methods: 'delete',
            });
            return;
        }
        const depDate = (!PC_depDate || dayjs(PC_depDate).isBefore(dayjs())) ? dayjs().format('YYYY-MM-DD') : PC_depDate; // !PC_dep 判斷是否有值
        const dtnDate = (!PC_dtnDate || dayjs(PC_dtnDate).isBefore(dayjs())) ? '' : PC_dtnDate;
        this.setState(
            {
                selectedStartDate: depDate,
                startInputValue: depDate,
                selectedEndDate: dtnDate,
                endInputValue: dtnDate
            },
            this.onChange
        );
    };

    onChange () {
        this.props.onChange(this.state);
    }

    clearValue = inputType => {
        const isStart = inputType === 'start';

        if (isStart) {
            return this.setState(
                prevState => ({
                    ...prevState,
                    startInputValue: '',
                    selectedStartDate: ''
                }),
                this.onChange
            );
        }

        return this.setState(
            prevState => ({
                ...prevState,
                selectedEndDate: '',
                endInputValue: ''
            }),
            this.onChange
        );
    };

    closeCalendar = () => {
        this.setState(prevState => ({
            ...prevState,
            activeInput: null
        }));
    };

    checkDate = inputType => {
        const todayDate = dayjs().format('YYYY-MM-DD');
        const isStart = inputType === 'start';
        const {
            selectedStartDate,
            selectedEndDate,
            startInputValue,
            endInputValue
        } = this.state;
        const inputValue = isStart ? startInputValue : endInputValue;
        const noChange = isStart
            ? inputValue === selectedStartDate
            : inputValue === selectedEndDate;

        // 若input沒有值
        if (noChange) return;

        let regex = /^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;
        // 若日期是3碼或4碼(326 > 當年/03/26, 1105 > 當年/11/05)
        if (inputValue.length === 4) regex = /^()(\d{2})(\d{2})/;
        if (inputValue.length === 3) regex = /^()(\d{1})(\d{2})/;
        const result = inputValue.match(regex);
        const isValidDate = (d) => d instanceof Date && !isNaN(d);
        const setNewDate = () => {
            if (isStart) {
                this.clickDate(todayDate);
            } else {
                this.clickDate(selectedStartDate ? dayjs(selectedStartDate).add(1, 'days').format('YYYY-MM-DD') : dayjs().add(1, 'days').format('YYYY-MM-DD'));
            }
        };
        // 輸入的字元不合規則
        if (inputValue && result === null) {
            setNewDate();
            return alert(DateValueErrorMessage);
        }

        // 月份小於10月，前面加'0'
        if (result[2].length === 1) result[2] = '0' + result[2];
        const [all, year, month, day] = result;
        let d = `${year || dayjs().year()}-${month}-${day}`;
        const date = dayjs(d);
        const calcStartDate = this.calcStartDate();
        const today = dayjs().format('YYYY-MM-DD');

        // 日期格式正確但是不存在的日期
        if (!isValidDate(new Date(d)) || !isLeapYear(d)) {
            setNewDate();
            return alert('無效的日期');
        }
        if (date.isBefore(today)) {
            setNewDate();
            return alert('日期必須大於今日');
        }
        if (date.isBefore(calcStartDate)) {
            setNewDate();
            return alert('日期小於最小可選日期');
        }

        // 都驗證正確 就更換日期
        this.clickDate(d);
    };

    inputChange = e => {
        const value = e.target.value;
        const { activeInput } = this.state;
        const target = `${activeInput}InputValue`;
        this.setState(
            prevState => ({
                ...prevState,
                [target]: value
            }),
            this.onChange
        );
    };

    inputKeyDown = (e, inputType) => {
        if (e.keyCode === 13) {
            const input = inputType === 'start' ? 'calendarInput1' : 'calendarInput2';
            this[input].inputDOM.blur();
            this.setState(prevState => ({
                activeInput: null
            }));
        }
    }

    inputFocus = target => {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target
        }));
    };

    clickDate = (date) => {
        const { activeInput, selectedStartDate, endInputValue } = this.state;
        let isStart = activeInput === 'start';
        let TRIP = this.props.TRIP === 1 ? true : false;
        let startDateValue;
        let endDateValue;
        let nowInput;
        if (TRIP) {
            // 單程
            startDateValue = date;
            if (dayjs(date).isAfter(dayjs(endInputValue))) {
                endDateValue = date;
            } else {
                endDateValue = endInputValue;
            }
            nowInput = null;
        } else {
            // 來回
            startDateValue = isStart ? date : selectedStartDate;
            if (isStart) {
                endDateValue = '';
            } else {
                endDateValue = date;
            }
            nowInput = isStart ? 'end' : null;
        }
        this.setState(
            prevState => ({
                activeInput: nowInput,
                selectedStartDate: startDateValue,
                selectedEndDate: endDateValue,
                startInputValue: startDateValue,
                endInputValue: endDateValue
            }),
            this.onChange
        );
    };
    calcStartDate () {
        const { selectedStartDate, activeInput } = this.state;

        const today = dayjs();
        if (activeInput === 'end') {
            return !selectedStartDate.length
                ? today.format('YYYY-MM-DD')
                : selectedStartDate;
        }
        return today.format('YYYY-MM-DD');
    }

    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            startInputValue,
            endInputValue,
            activeInput
        } = this.state;
        const TRIP = this.props.TRIP;
        const startDate = this.calcStartDate();

        return (
            <ClickOutSide onClickOutside={this.closeCalendar}>
                <div className="calendar_compose">
                    <div className="input_group aroundInput">
                        <IntRcln
                            ref={e => { this.calendarInput1 = e }}
                            placeholder="YYYY/MM/DD"
                            label={TRIP === 1 ? '出發日期' : '去程日期'}
                            icon={<IcRcln name="tooldate" />}
                            onFocus={() => {
                                this.inputFocus('start');
                            }}
                            onChange={this.inputChange}
                            onBlur={() => {
                                this.checkDate('start');
                            }}
                            onClearValue={() => {
                                this.clearValue('start');
                            }}
                            onKeyDown={(e) => this.inputKeyDown(e, 'start')}
                            value={startInputValue.replace(/\-/g, '/')}
                            className={TRIP === 1 ? '' : 'bor-right'}
                        />
                        {TRIP === 1 ? null : (
                            <IntRcln
                                ref={e => { this.calendarInput2 = e }}
                                placeholder="YYYY/MM/DD"
                                label="回程日期"
                                breakline
                                onChange={this.inputChange}
                                onFocus={() => {
                                    this.inputFocus('end');
                                }}
                                onBlur={() => {
                                    this.checkDate('end');
                                }}
                                onClearValue={() => {
                                    this.clearValue('end');
                                }}
                                onKeyDown={(e) => this.inputKeyDown(e, 'end')}
                                value={endInputValue.replace(/\-/g, '/')}
                            />
                        )}
                    </div>
                    {activeInput === null ? null : (
                        <div className="content">
                            <button
                                className="close_btn"
                                onClick={this.closeCalendar}
                            />
                            <CyRcln
                                doubleMonth
                                doubleChoose={TRIP === 1 ? false : true}
                                startDate={startDate}
                                activeStart={dayjs().format('YYYY-MM')}
                                activeEnd={dayjs()
                                    .add(1, 'years')
                                    .format('YYYY-MM')}
                                endDate={dayjs()
                                    .add(1, 'years')
                                    .subtract(5, 'days')
                                    .format('YYYY-MM-DD')}
                                selectedStartDate={selectedStartDate}
                                selectedEndDate={
                                    TRIP === 1 ? '' : selectedEndDate
                                }
                                onDateClick={this.clickDate}
                            />
                        </div>
                    )}
                </div>
            </ClickOutSide>
        );
    }
}

class TaiwanBody extends Component {
    constructor (props) {
        super(props);
        this.state = {
            BOARD_POINT: '', // 出發地
            OFF_POINT: 'KNH', // 目的地
            TRIP: 1, // 行程
            DEPARTURE_DATE: '', // 出發日期
            RETURN_DATE: '', // 回程日期
            PASSENGER_ADULTNUM: 1, // default大人人數1位
            PASSENGER_CHILDNUM: 0, // default孩童人數0位
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
                .then(response => {
                    // ok 代表狀態碼在範圍 200-299
                    if (!response.ok) throw new Error(response.statusText);
                    return response.json();
                })
                .then(itemList => {
                    let stringifyData = JSON.stringify(itemList);
                    this.handleServerItemsLoad(itemList);
                    sessionStorage.setItem(flightTaiwan.place, stringifyData);
                })
                .catch(error => {
                    // 這裡可以顯示一些訊息
                    console.error(error);
                });
        }
    }

    handleServerItemsLoad = itemList => {
        let placeSets = Object.keys(itemList).map(function (objectKey, index) {
            let value = itemList[objectKey];
            return value;
        });
        let depPlaces = (itemList => {
            let uniqueKey = [];
            for (let i = 0; i < itemList.length; i++) {
                uniqueKey[i] = {};
                uniqueKey[i]['text'] = itemList[i]['<BOARD_POINT_NAME>'];
                uniqueKey[i]['value'] = itemList[i]['<BOARD_POINT_CODE>'];
            }
            let result = uniqueKey.filter(function (element, index, arr) {
                if (index > 0) {
                    return (
                        arr[index - 1].text.toString() !==
                        arr[index].text.toString()
                    );
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
            // depPlaceholder: depPlaces[0].text // 出發地選擇松山
        }, this.getLocalStorage);

        // this.changeOption(depPlaces[0].value); // 模擬出發地input被chnage
    };

    // 取到 LocalStorage 值
    getLocalStorage () {
        useLocalStorage({
            panel: 'taiwanFlight',
            methods: 'get',
        }, ({
            PC_trip,
            PC_depPlace,
            PC_dtnPlace,
            PC_adult,
            PC_child
        }) => {
            // 驗證 LocalStorage 是否有值
            const trip = !PC_trip ? 1 : PC_trip;
            const depPlace = !PC_depPlace ? 'TSA' : PC_depPlace;
            const dtnPlace = !PC_dtnPlace ? 'KNH' : PC_dtnPlace;
            const adult = !PC_adult ? '1' : PC_adult;
            const child = !PC_child ? '0' : PC_child;

            // 設定 State Default
            this.setDefaultVal(depPlace, dtnPlace, adult, child, trip);
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
            depPlaceholder: nowPlace[0].text
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
            let secondList = itemList.filter(function (item, index, arr) {
                // 篩選出發地可到達的目的地選單
                return arr[index]['<BOARD_POINT_CODE>'] === nowValue;
            });
            let newList = [];
            for (let i = 0; i < secondList.length; i++) {
                // 整理符合模組的資料格式
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
                OFF_POINT: newList[index].value // 目的地選擇
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
            TRIP: target
        });
    }
    clearVaule (e) {
        this.setState({ DEPARTURE_DATE: '' });
    }

    roundDate (e) {
        this.setState({
            DEPARTURE_DATE: e.startInputValue,
            RETURN_DATE: e.endInputValue
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
        const PostTime = new Date().setHours(0, 0, 0, 0);

        this.validDate((isValid, warnText) => {
            if (isValid) {
                const PC_trip = TRIP;
                const PC_depPlace = BOARD_POINT; // 出發地
                const PC_dtnPlace = OFF_POINT; // 目的地
                const PC_depDate = DEPARTURE_DATE; // 去程日期
                const PC_dtnDate = RETURN_DATE; // 回程日期
                const PC_adult = PASSENGER_ADULTNUM; // 大人
                const PC_child = PASSENGER_CHILDNUM; // 孩童

                useLocalStorage({
                    panel: 'taiwanFlight',
                    methods: 'post',
                    data: {
                        PC_trip,
                        PC_depPlace,
                        PC_dtnPlace,
                        PC_depDate,
                        PC_dtnDate,
                        PC_adult,
                        PC_child,
                        PostTime
                    }
                });
                let searchString;
                if (TRIP === 1) {
                    searchString = `TRIP=${TRIP}&BOARD_POINT=${BOARD_POINT}&OFF_POINT=${OFF_POINT}&DEPARTURE_DATE=${DEPARTURE_DATE}&PASSENGER_ADULTNUM=${PASSENGER_ADULTNUM}&PASSENGER_CHILDNUM=${PASSENGER_CHILDNUM}`;
                } else if (TRIP === 2) {
                    searchString = `TRIP=${TRIP}&BOARD_POINT=${BOARD_POINT}&OFF_POINT=${OFF_POINT}&DEPARTURE_DATE=${DEPARTURE_DATE}&RETURN_DATE=${RETURN_DATE}&PASSENGER_ADULTNUM=${PASSENGER_ADULTNUM}&PASSENGER_CHILDNUM=${PASSENGER_CHILDNUM}`;
                }
                window.open(
                    'https://twflight.liontravel.com/search?' + searchString,
                    this.props.hrefTarget
                );
            } else {
                alert(`請選擇${warnText.join('、')}`);
            }
        });
    }

    // 驗證
    validDate (callback) {
        const { TRIP, DEPARTURE_DATE, RETURN_DATE } = this.state;
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
            depList,
            depPlaceholder,
            arrList,
            arrPlaceholder,
            PASSENGER_ADULTNUM,
            PASSENGER_CHILDNUM,
            BOARD_POINT,
            OFF_POINT
        } = this.state;
        return (
            <div className="flight_taiwan">
                <div>
                    <ul className="Rtow">
                        <li
                            className={cx({ active: TRIP === 1 })}
                            onClick={() => {
                                this.tripChange(1);
                            }}
                        >
                            單程
                        </li>
                        <li
                            className={cx({ active: TRIP === 2 })}
                            onClick={() => {
                                this.tripChange(2);
                            }}
                        >
                            來回
                        </li>
                    </ul>
                </div>
                <div className="p-t-sm">
                    <StRcln
                        ClassName="m-b-sm"
                        option={depList}
                        placeholder={depPlaceholder}
                        label="出發地"
                        icon={<IcRcln name="planeairplane" />}
                        req
                        breakline
                        onChangeCallBack={e => {
                            this.boardPointChange(e);
                        }}
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
                        onChangeCallBack={e => {
                            this.offPointChange(e);
                        }}
                        defaultValue={OFF_POINT || 'KNH'}
                    />
                    <ComposeCalendar
                        onChange={e => {
                            this.roundDate(e);
                        }}
                        TRIP={TRIP}
                    />
                    <div className="m-b-sm m-t-sm aroundInput">
                        <StRcln
                            ClassName="m-r-xs w-full"
                            option={level}
                            placeholder={`${PASSENGER_ADULTNUM}位`}
                            label="大人"
                            icon={<IcRcln name="toolstaff" />}
                            req
                            breakline
                            whenMouseDown={() =>
                                console.log('父層whenMouseDown')
                            }
                            onChangeCallBack={e => {
                                this.passengerChange(e, 'p');
                            }}
                            defaultValue={`${PASSENGER_ADULTNUM}`}
                        />
                        <StRcln
                            ClassName="m-l-xs w-full"
                            option={childLevel}
                            placeholder={`${PASSENGER_CHILDNUM}位`}
                            label="孩童"
                            icon={<IcRcln name="toolchild" />}
                            req
                            breakline
                            whenMouseDown={() =>
                                console.log('父層whenMouseDown')
                            }
                            onChangeCallBack={e => {
                                this.passengerChange(e, 'c');
                            }}
                            defaultValue={`${PASSENGER_CHILDNUM}`}
                        />
                    </div>
                    <div className="footer">
                        <div className="footerInfo">
                            <IcRcln name="toolif" className="p-r-xs" />
                            <span > 注意事項：目前僅華信航空提供線上即時訂購。</span>
                            <a href="https://www.liontravel.com/info/twairline/uni.asp">
                                參考其他航空
                            </a>
                        </div>
                        <BtRcnb
                            radius
                            prop="string"
                            className="h-sm m-l-md"
                            lg
                            whenClick={() => {
                                this.handleSubmit();
                            }}
                        >
                            搜尋
                        </BtRcnb>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaiwanBody;
