import React, { Component } from 'react';
import './pc.scss';
import Header from './components/header';
import InternationalBody from './container/InternationalBody';
import today from 'dayjs';
// import TaiwanPC from './container/TaiwanBody';
// import ChinaPC from './container/chinaBody';


class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rtow: 0, // 頁數
            depdate1: '', // 去程日期
            depdate2: '', // 回程日期
            clstype: 1, // 艙等
            notrans: 'F', // 是否直飛(不轉機)
            haveseat: 'F', // 只找有機位
            nonprefertrans: '', // 排除轉機國家
            sourcesystem: '', // 廉價航空
            nonprefertransnight: 'F', // 排除過夜轉機航班
            adt: 1, // 大人
            chd: 0, // 小孩
            inf: 0, // 嬰兒
            multiItems: [{ // 多目的地去程日期
                id: 1,
                onFocus: false,
                activeStart: today().format('YYYY-MM'),
                selectedStartDate: '',
                startDate: today().format('YYYY-MM-DD'),
                startInputValue: '',

                dptSelectedData: [],
                dtnSelectedData: [],

                cleanBtn: false,
            }],
            // 出發地目的地
            dptSelectedData: [],
            dtnSelectedData: [],
            // 人數、艙等
            totalNum: 1, // 人數總數
            clstypeText: '經濟艙', // 艙等文字
            // 單月曆 focus
            focus1: false,
            // 雙月曆 focus
            dcActiveInput: null,
            // 清除按鈕
            clearBtn: {
                clean1: false,
                dcCleanBtn1: false,
                dcCleanBtn2: false
            }
        };
        this.fetchPath = './json/TRS1NEWTRAVEL.js';
    }

    // 上面的 tab 切換
    tripChange = target => {
        this.setState({
            rtow: target
        });
    };

    // 多目的地 append item
    addItem = () => {
        const { multiItems } = this.state;
        let arr = [...multiItems];
        let newId = Math.floor(Math.random() * 500);
        let maxDate = '';
        const max = arr[0].startInputValue;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].startInputValue >= max) {
                maxDate = arr[i].startInputValue;
            }
        }

        // 超過 4 個時不能再新增了
        if (arr.length >= 5) {
            return false;
        } else {
            arr.push({
                id: newId,
                activeStart: maxDate.substr(0, 7),
                startDate: maxDate,
                selectedStartDate: maxDate,
                startInputValue: maxDate,
                onFocus: false,

                dptSelectedData: [],
                dtnSelectedData: [],

                cleanBtn: false,
            });
        }

        this.setState({ multiItems: arr });
    };

    // 多目的地減少按鈕
    minusItem = nowId => {
        const { multiItems } = this.state;
        let arr = [...multiItems];
        let newArr = arr.filter(item => {
            if (nowId === item.id) {
                // 假如點擊的 id 跟我目前 state 的陣列裡的 id 相同我就不要
                return false;
            } else {
                return true;
            }
        });

        this.setState({ multiItems: newArr });
    };

    // focus 狀態時 calendar 打開
    onFocusInput = (nowId) => {
        const { multiItems } = this.state;
        const arr = multiItems;

        arr.forEach(ele => {
            if (nowId === ele.id) {
                ele.onFocus = true;
                if (ele.startInputValue !== '') {
                    ele.cleanBtn = true;
                }
            }
        });

        this.setState({ multiItems: arr });
    }

    // 關閉 calendar
    closeCalendar = (nowId) => {
        const { multiItems } = this.state;
        const arr = multiItems;

        arr.forEach(ele => {
            if (nowId === ele.id) {
                ele.onFocus = false;
            }
        });

        this.setState({ multiItems: arr });
    }

    // 多目的地去程日期
    multipleClickDate = (date, nowId, nowIndex) => {
        const { multiItems } = this.state;
        const arr = multiItems;

        arr.forEach(ele => {
            if (nowId === ele.id) {
                ele.selectedStartDate = date;
                ele.startInputValue = date;
                ele.onFocus = false;
            }
        });

        for (let i = nowIndex + 1; i < arr.length; i++) {
            if (arr[nowIndex].startInputValue.replace(/\-/g, ' ') > arr[i].startInputValue.replace(/\-/g, ' ')) { // 點擊當下的日期如果大於下面
                arr[i].startInputValue = arr[nowIndex].startInputValue;
                arr[i].selectedStartDate = arr[nowIndex].startInputValue;
                arr[i].startDate = arr[nowIndex].startInputValue;
                arr[i].activeStart = arr[nowIndex].startInputValue.substr(0, 7);
            } else {
                arr[i].startDate = arr[0].startInputValue;
            }
        }

        this.setState({ multiItems: arr });
    }

    // 多目的地 清除去程
    multiClearValue = (nowId) => {
        const { multiItems } = this.state;
        let arr = multiItems;
        arr.forEach(ele => {
            if (nowId === ele.id) {
                ele.selectedStartDate = '';
                ele.startInputValue = '';
            }
        });

        this.setState({ multiItems: arr });
    }

    // 多目的地 去程日期 blur 時
    multiBlur = (nowId) => {
        const { multiItems } = this.state;
        let arr = multiItems;
        arr.forEach(ele => {
            if (nowId === ele.id) {
                ele.cleanBtn = false;
            }
        });

        this.setState({ multiItems: arr });
    }

    // 多目的地第一個 item
    clickDate = (date) => {
        const { multiItems } = this.state;
        const arr = multiItems;
        arr.forEach((ele) => {
            if (date.depdate1.replace(/\-/g, '') >= ele.startInputValue.replace(/\-/g, '')) { // 如果第一個item日期大於所有的item就變更
                ele.startDate = date.depdate1;
                ele.selectedStartDate = date.depdate1;
                ele.startInputValue = date.depdate1;
                ele.activeStart = date.depdate1.substr(0, 7); // 只取年，月 ex: 2018-12
            } else {
                ele.activeStart = date.depdate1.substr(0, 7);
                ele.startDate = date.depdate1;
            }
        });
        this.setState({ depdate1: date.depdate1, focus1: date.focus1, multiItems: arr });
    }

    // 修改 state 參數
    setStateVal = val => {
        this.setState(val);
    };

    // 雙月曆按日期
    dcClickDate = (date) => {
        const {
            dcActiveInput,
            depdate1,
        } = this.state;

        const isStart = (dcActiveInput === 'start');
        const startDateValue = isStart ? date : depdate1;
        const endDateValue = isStart ? '' : date;

        this.setState({
            dcActiveInput: isStart ? 'end' : null,
            depdate1: startDateValue,
            depdate2: endDateValue,
        });
    }

    // 雙月曆 focus 的時候
    dcInputFocus = (val, key) => {
        const { depdate1, depdate2, clearBtn } = this.state;
        if (key === 'depdate1') {
            if (depdate1 !== '') {
                clearBtn['dcCleanBtn1'] = true;
            } else {
                clearBtn['dcCleanBtn1'] = false;
            }
        }

        if (key === 'depdate2') {
            if (depdate2 !== '') {
                clearBtn['dcCleanBtn2'] = true;
            } else {
                clearBtn['dcCleanBtn2'] = false;
            }
        }

        this.setState({ dcActiveInput: val, clearBtn });
    }

    // 單月曆 focus 的時候
    singleInputFocus = (val) => {
        const { depdate1, clearBtn } = this.state;
        if (depdate1 !== '') {
            clearBtn['clean1'] = true;
        }

        this.setState({ focus1: true, clearBtn });
    }

    singleOnBlur = (key) => {
        const { clearBtn } = this.state;
        clearBtn[key] = false;
        this.setState({ clearBtn });
    }

    // 出發地、目的地
    placeChange = (data, key) => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        this.setState({ [key]: arr });
    }

    // 出發地、目的地
    switch = () => {
        const {
            dptSelectedData,
            dtnSelectedData
        } = this.state;

        const obj1 = JSON.parse(JSON.stringify(dptSelectedData));
        const obj2 = JSON.parse(JSON.stringify(dtnSelectedData));

        this.setState({ dptSelectedData: obj2, dtnSelectedData: obj1 });
    }

    // 多目的地 出發地 目的地
    multiPlaceChange = (obj, nowId, key) => {
        const { multiItems } = this.state;
        let arr = multiItems;
        let selectData = [];
        if (typeof obj === 'object') {
            selectData.push(obj);
        }
        arr.forEach(ele => {
            if (nowId === ele.id) {
                ele[key] = selectData;
            }
        });

        this.setState({ multiItems: arr });
    }

    // 多目的地 交換
    multiSwitch = (nowId) => {
        const { multiItems } = this.state;
        let arr = multiItems;
        arr.forEach((ele) => {
            if (nowId === ele.id) {
                const obj1 = JSON.parse(JSON.stringify(ele.dtnSelectedData));
                const obj2 = JSON.parse(JSON.stringify(ele.dptSelectedData));

                ele.dptSelectedData = obj1;
                ele.dtnSelectedData = obj2;
            }
        });

        this.setState({ multiItems: arr });
    }

    // 驗證
    ValidData = (callback) => {
        const { rtow, depdate1, depdate2, multiItems, dptSelectedData, dtnSelectedData } = this.state;
        let warnText = [];
        const depdateArr = [];
        if (rtow === 0) { // 單程
            warnText = [];
            if (dptSelectedData.length === 0) {
                warnText.push('出發地');
            }
            if (dtnSelectedData.length === 0) {
                warnText.push('目的地');
            }
            if (depdate1 === '') {
                warnText.push('去程日期');
            }
        }

        if (rtow === 1) { // 來回
            warnText = [];
            if (dptSelectedData.length === 0) {
                warnText.push('出發地');
            }
            if (dtnSelectedData.length === 0) {
                warnText.push('目的地');
            }
            if (depdate1 === '') {
                warnText.push('去程日期');
            }
            if (depdate2 === '') {
                warnText.push('回程日期');
            }
        }

        if (rtow === 3) { // 多個目的地
            warnText = [];
            if (depdate1 === '') {
                warnText.push('去程日期');
            }

            multiItems.forEach(ele => {
                if (ele.startInputValue === '') {
                    warnText.push('去程日期');
                }
                if (ele.dptSelectedData.length === 0) {
                    warnText.push('出發地');
                }
                if (ele.dtnSelectedData.length === 0) {
                    warnText.push('目的地');
                }
            });

            if (warnText.length === 0) {
                for (let i = 0; i < multiItems.length; i++) {
                    depdateArr.push(multiItems[i].startInputValue);
                }
            }
        }

        // 過濾重複的 警告訊息
        const newWarnText = warnText.filter((ele, i, arr) => {
            return arr.indexOf(ele) === i;
        });

        callback(newWarnText.length === 0, newWarnText, depdateArr);
    }

    // 參數送出
    submit = () => {
        const {
            rtow,
            adt,
            chd,
            inf,
            clstype,
            depdate1,
            depdate2,
            haveseat,
            nonprefertrans,
            nonprefertransnight,
            notrans,
            sourcesystem,
            multiItems,
            dptSelectedData,
            dtnSelectedData
        } = this.state;

        // 如果驗證都 okay 就執行 window open
        this.ValidData((isValid, warnText, depdateArr) => {
            if (isValid) {
                let depdateText = '';
                let placeText = '';
                if (rtow === 1) {
                    depdateText += `&depdate2=${depdate2.replace(/\-/g, '/')}`;
                }
                if (rtow === 3) {
                    if (depdateArr.length > 0) { // 多個目的地 去程日期
                        for (let i = 0; i < depdateArr.length; i++) {
                            depdateText += `&depdate${(i + 2)}=${depdateArr[i].replace(/\-/g, '/')}`;
                        }
                    }

                    for (let i = 0; i < multiItems.length; i++) { // 多個目的地 出發地 目的地
                        console.log(multiItems[i]);
                        const itemsdpt = multiItems[i].dptSelectedData[0];
                        const itemsdtn = multiItems[i].dtnSelectedData[0];
                        placeText += `&depart${(i + 2)}=${itemsdpt.airport}&depcity${(i + 2)}=${itemsdpt.city}&depcountry${(i + 2)}=${itemsdpt.country}&arrive${(i + 2)}=${itemsdtn.airport}&arrcity${(i + 2)}=${itemsdtn.city}&arrcountry${(i + 2)}=${itemsdtn.country}`;
                    }
                }
                let searchVal = `rtow=${rtow}&clsType=${clstype}&adt=${adt}&chd=${chd}&inf=${inf}&notrans=${notrans}&haveseat=${haveseat}&nonprefertrans=${nonprefertrans}&nonprefertransnight=${nonprefertransnight}&sourcesystem=${sourcesystem}&depart1=${dptSelectedData[0].airport}&depcity1=${dptSelectedData[0].city}&depcountry1=${dptSelectedData[0].country}&arrive1=${dtnSelectedData[0].airport}&arrcity1=${dtnSelectedData[0].city}&arrcountry1=${dtnSelectedData[0].country}&depdate1=${depdate1.replace(/\-/g, '/')}`;
                searchVal += placeText;
                searchVal += depdateText;
                window.open('https://flight.liontravel.com/search?' + searchVal);
            } else {
                alert('請選擇' + warnText.join('、'));
            }
        });
    }

    render () {
        const {
            rtow,
            depdate1,
            depdate2,
            focus1,
            dcActiveInput,
            totalNum,
            clstypeText,
            clstype,
            multiItems,
            clearBtn,
            dptSelectedData,
            dtnSelectedData
        } = this.state;

        return (
            <div className="flight_international_pc">
                <Header
                    rtow={rtow}
                    tripChange={v => this.tripChange(v)}
                />
                <InternationalBody
                    // 目前哪一頁
                    rtow={rtow}
                    // 去程日期
                    onClickOutside={() => {
                        this.setState(prevState => ({
                            ...prevState,
                            focus1: false
                        }));
                    }}
                    clickDate={this.clickDate}
                    inputFocus={this.setStateVal}
                    startInputValue={depdate1}
                    onFocus={focus1}
                    clearValue={this.setStateVal}
                    Clean1={clearBtn['clean1']}
                    singleInputFocus={this.singleInputFocus}
                    singleOnBlur={this.singleOnBlur}
                    // 去程日期、來回日期
                    dcStartInputValue={depdate1}
                    dcEndInputValue={depdate2}
                    dcClickDate={this.dcClickDate}
                    dcInputFocus={this.dcInputFocus}
                    dcActiveInput={dcActiveInput}
                    dcCleanBtn1={clearBtn['dcCleanBtn1']}
                    dcCleanBtn2={clearBtn['dcCleanBtn2']}
                    // 人數、艙等
                    totalPeople={totalNum}
                    cabinName={clstypeText}
                    cabinNumber={clstype}
                    selectCabin={this.setStateVal}
                    setPeople={this.setStateVal}
                    setTotalPeople={this.setStateVal}
                    // 直飛，找機位
                    setNoTrans={this.setStateVal}
                    setHaveSeat={this.setStateVal}
                    // 排除轉機國家
                    setNonprefertrans={this.setStateVal}
                    clearNonprefertrans={this.setStateVal}
                    // 廉價航空
                    setSourceSystem={this.setStateVal}
                    // 排除過夜轉機航班
                    setnonprefertransnight={this.setStateVal}
                    // 機票 fetch
                    fetchPath={this.fetchPath}
                    // 檢查日期
                    checkDate={this.checkDate}
                    // 按下搜尋
                    sendData={this.submit}
                    // 出發地，目的地
                    placeChange={this.placeChange}
                    dptSelectedData={dptSelectedData}
                    dtnSelectedData={dtnSelectedData}
                    switch={this.switch}
                    // 多目的地
                    onFocusInput={this.onFocusInput}
                    closeCalendar={this.closeCalendar}
                    addItem={this.addItem}
                    minusItem={this.minusItem}
                    multiPlaceChange={this.multiPlaceChange}
                    multiSwitch={this.multiSwitch}
                    multiItems={multiItems}
                    multipleClickDate={this.multipleClickDate}
                    multiClearValue={this.multiClearValue}
                    multiBlur={this.multiBlur}
                />
            </div>
        );
    }
}

export default Panel;
