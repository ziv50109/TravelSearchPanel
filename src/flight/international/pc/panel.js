import React, { Component } from 'react';
import './pc.scss';
import Header from './components/header';
import International from './container/International';
import dayjs from 'dayjs';
import { useLocalStorage, isLeapYear } from '../../../../utils';

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            depdate1: dayjs().format('YYYY-MM-DD'), // 去程日期
            depdate2: '', // 回程日期
            clstype: 1, // 艙等
            notrans: 'F', // 是否直飛(不轉機)
            haveseat: 1, // 只找有機位
            nonprefertrans: '', // 排除轉機國家
            sourcesystem: 1, // 廉價航空
            nonprefertransnight: 'F', // 排除過夜轉機航班
            adt: 1, // 大人
            chd: 0, // 小孩
            inf: 0, // 嬰兒
            multiItems: [{ // 多目的地去程日期
                id: 1,
                onFocus: false,
                activeStart: dayjs().format('YYYY-MM'),
                selectedStartDate: '',
                startDate: dayjs().format('YYYY-MM-DD'),
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
    }

    componentDidMount () {
        useLocalStorage(
            {
                panel: 'internationalFlight',
                methods: 'get'
            },
            (data) => {
                this.validataLocalstorageData(data);
            }
        );
    }
    validataLocalstorageData = (data) => {
        const localStorageRecordTime = data.PostTime + 604800000;
        if (localStorageRecordTime < new Date().getTime()) {
            console.log('超過7天予以刪除LocalStorage紀錄。');
            useLocalStorage({
                panel: 'internationalFlight',
                methods: 'delete',
            });
            return;
        }
        const clone = JSON.parse(JSON.stringify(this.state.multiItems));
        const {
            depdate1,
            depdate2,
            dptSelectedData,
            dtnSelectedData,
            multiItems,
            multiItemsDpt,
            multiItemsDtn,
            adt,
            chd,
            inf,
            clstype,
            haveseat
        } = data;
        let nowday = dayjs();
        let depDate = depdate1 && nowday.isAfter(dayjs(depdate1)) ? nowday.format('YYYY-MM-DD') : depdate1;
        let dtnDate = depdate2 && nowday.isAfter(dayjs(depdate2)) ? nowday.format('YYYY-MM-DD') : depdate2;
        // 如果起日過期，迄日要清空
        if (nowday.isAfter(dayjs(depdate1).add(1, 'day'))) dtnDate = '';

        let multDate = multiItems ? (nowday.isAfter(dayjs(multiItems)) ? nowday.format('YYYY-MM-DD') : multiItems) : '';
        if (nowday.isAfter(dayjs(depdate1).add(1, 'day'))) multDate = '';

        let dptPlace = dptSelectedData ? dptSelectedData : [];
        let dtnPlace = dtnSelectedData ? dtnSelectedData : [];
        let multDpt = multiItemsDpt ? multiItemsDpt : '';
        let multDtn = multiItemsDtn ? multiItemsDtn : '';
        clone[0].selectedStartDate = multDate;
        clone[0].startInputValue = multDate;
        clone[0].dptSelectedData = multDpt;
        clone[0].dtnSelectedData = multDtn;
        this.setState(
            {
                depdate1: depDate,
                depdate2: dtnDate,
                dptSelectedData: dptPlace,
                dtnSelectedData: dtnPlace,
                multiItems: clone,
                adt,
                chd,
                inf,
                clstype,
                haveseat
            }
        );
    };


    // 上面的 tab 切換
    tripChange = target => {
        this.props.emitRtow && this.props.emitRtow(target);
    };

    // 修改 state 參數
    setStateVal = val => {
        this.setState(val);
    };

    // 轉換日期等等方便
    transferDate (date) {
        return Date.parse(date).valueOf();
    }

    // 判斷 multi 有沒有值
    ifMultiHaveVal () {
        const { multiItems } = this.state;
        for (let i = 0; i < multiItems.length; i++) {
            if (multiItems[i].startInputValue !== '') {
                return true;
            } else {
                return false;
            }
        }
    }

    // 給 addItem 用的，來判斷開始日期
    judgeStartDate (arr) {
        const { depdate1 } = this.state;
        let max;
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].startInputValue !== '') {
                max = arr[i].startInputValue;
                break;
            } else {
                max = depdate1;
            }
        }
        return max;
    }

    // 多目的地 append item
    addItem = () => {
        const { multiItems } = this.state;
        let arr = multiItems;

        // 超過 4 個時不能再新增了
        if (arr.length >= 5) {
            return false;
        }
        arr.push({

            // id: multiItems.length + 1,
            // startDate: this.judgeStartDate(arr),
            // activeStart: this.judgeStartDate(arr).substr(0, 7),
            // selectedStartDate: this.judgeStartDate(arr),
            // startInputValue: this.judgeStartDate(arr),

            id: arr[arr.length - 1].id + 1,
            startDate: this.judgeStartDate(arr),
            activeStart: this.judgeStartDate(arr).substr(0, 7),
            selectedStartDate: '',
            startInputValue: '',

            onFocus: false,
            dptSelectedData: [],
            dtnSelectedData: [],
            cleanBtn: false,
        });
        this.setState({ multiItems: arr });
    };

    // 多目的地減少按鈕
    minusItem = (nowId, nowIndex) => {
        const { multiItems } = this.state;
        let arr = [...multiItems];

        let newArr = arr.filter(item => {
            if (nowId === item.id) {
                return false;
            } else {
                return true;
            }
        });

        for (let i = 0; i < newArr.length; i++) {
            if (typeof newArr[i + 1] !== 'undefined') {
                newArr[i + 1].activeStart = newArr[i].activeStart;
                newArr[i + 1].startDate = newArr[i].selectedStartDate ? newArr[i].selectedStartDate : newArr[i].startDate;
            }
        }

        this.setState({ multiItems: newArr });
    };

    // 減少按鈕點下時 陣列重新整理
    restMulti () {
        const { multiItems, depdate1 } = this.state;
        for (let i = 0; i < multiItems.length; i++) {
            if (typeof multiItems[i - 1] === 'undefined') {
                if (depdate1 !== '') {
                    multiItems[i].startDate = depdate1;
                } else {
                    multiItems[i].startDate = dayjs().format('YYYY-MM-DD');
                }
            } else {
                if (multiItems[i - 1].startInputValue !== '') {
                    multiItems[i].startDate = multiItems[i - 1].startInputValue;
                    multiItems[i].activeStart = multiItems[i - 1].startInputValue.substr(0, 7);
                } else {
                    multiItems[i].startDate = multiItems[i - 1].startDate;
                    multiItems[i].activeStart = multiItems[i - 1].startDate.substr(0, 7);
                }
            }
        }

        this.setState({ multiItems });
    }

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
        let newDate;

        for (let i = 0; i < arr.length; i++) {
            if (nowId === arr[i].id) {
                newDate = this.checkDate(arr[i].startInputValue);
                console.log('multiBlur', arr[i].startInputValue, newDate);
                let inputDate;
                if (newDate >= arr[i].selectedStartDate && newDate >= arr[i].startDate) {
                    inputDate = newDate;
                } else if (arr[i].selectedStartDate === '') {
                    inputDate = arr[i].selectedStartDate;
                } else {
                    inputDate = '';
                }
                arr[i].startInputValue = inputDate;
                arr[i].selectedStartDate = inputDate;
                arr[i].cleanBtn = false;
            }
            if (typeof arr[i + 1] !== 'undefined') {
                if (arr[i].selectedStartDate !== '') {
                    arr[i + 1].startDate = arr[i].selectedStartDate;
                } else {
                    arr[i + 1].startDate = arr[i].startDate;
                }
            }
        }
        this.setState({ multiItems: arr });
    }

    // 多目的地第一個 item
    clickDate = (date) => {
        const { multiItems } = this.state;
        const transferDepdate1 = this.transferDate(date.depdate1);
        multiItems.forEach((ele) => {
            const multi = this.transferDate(ele.startInputValue);
            if (!isNaN(multi)) {
                for (let i = 0; i < multiItems.length; i++) {
                    if (transferDepdate1 >= multi) {
                        ele.startInputValue = date.depdate1;
                        ele.selectedStartDate = date.depdate1;
                        ele.startDate = date.depdate1;
                    } else {
                        multiItems[0].startDate = date.depdate1;
                    }
                }
            } else {
                // ele.startInputValue = date.depdate1;
                // ele.startInputValue = date.depdate1;
                ele.selectedStartDate = date.depdate1;
                ele.startDate = date.depdate1;
            }
        });

        this.setState({ depdate1: date.depdate1, focus1: date.focus1, multiItems });
    }

    // 多目的地去程日期
    multipleClickDate = (date, nowId, nowIndex) => {
        console.log('multipleClickDate', date, nowId, nowIndex);
        const { multiItems } = this.state;
        multiItems.forEach(ele => {
            if (nowId === ele.id) {
                ele.selectedStartDate = date;
                ele.startInputValue = date;
                ele.onFocus = false;
            }
        });

        // 目前點到的去程日期，跟其他日期做比較
        for (let i = nowIndex + 1; i < multiItems.length; i++) {
            const nowMulti = this.transferDate(multiItems[nowIndex].startInputValue);
            const otherMulti = this.transferDate(multiItems[i].startInputValue);
            if (nowMulti >= otherMulti) {
                multiItems[i].startInputValue = date;
                multiItems[i].selectedStartDate = date;
                multiItems[i].startDate = date;
            } else {
                multiItems[i].startDate = date;
            }
        }

        this.setState({ multiItems });
    }

    // 雙月曆按日期
    dcClickDate = (date) => {
        const {
            dcActiveInput,
            depdate1,
        } = this.state;
        const isStart = (dcActiveInput === 'start');
        let startDateValue = isStart ? date : depdate1;
        let endDateValue = isStart ? '' : date;
        if (endDateValue < startDateValue && !isStart) {
            startDateValue = endDateValue;
            endDateValue = '';
        }
        this.setState({
            dcActiveInput: isStart ? 'end' : null,
            depdate1: startDateValue,
            depdate2: endDateValue,
        });
    }

    // 雙月曆 focus 的時候
    dcInputFocus = (val, key) => {
        const { depdate1, depdate2, clearBtn, startDate } = this.state;
        let isStart = (val === 'start');
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
        this.setState({
            dcActiveInput: val, clearBtn,
            startDate: isStart ? dayjs().format('YYYY-MM-DD') : startDate
        });
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
        console.log('is blur', key);
        const { clearBtn, depdate1, dcActiveInput } = this.state;
        let newDate = this.checkDate();
        clearBtn[key] = false;

        if (dcActiveInput !== 'end') {
            this.setState({
                clearBtn,
                depdate1: newDate ? newDate : (clearBtn[key] ? dayjs().format('YYYY-MM-DD') : ''),
                // depdate2: ''
                startDate: depdate1
            });
        } else {
            this.setState({
                clearBtn,
                depdate2: newDate && newDate >= depdate1 ? newDate : '',
                startDate: ''
            });
        }
    }

    // 檢查最小可選日期
    calcStartDate = (isStart) => {
        const {
            depdate1,
        } = this.state;

        if (!isStart) {
            return !depdate1.length ? dayjs().format('YYYY-MM-DD') : depdate1;
        }
        return dayjs().format('YYYY-MM-DD');
    }
    // 檢查日期
    // eslint-disable-next-line complexity
    checkDate = (muitDate) => {
        const {
            dcActiveInput,
            focus1,
            depdate1,
            depdate2,
        } = this.state;
        const { setOtherEnd } = this.props;
        const { rtow } = this.props;
        const isStart = dcActiveInput === 'start' || focus1;
        const inputValue = isStart ? depdate1 : (muitDate ? muitDate : (rtow === 3 ? '' : depdate2));
        let endYear = dayjs().add(361, 'days');
        let regex = /^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;

        // 若input沒有值
        if (!inputValue.length) return;

        // 若日期是3碼或4碼(326 > 當年/03/26, 1105 > 當年/11/05)
        if (inputValue.length === 4) regex = /^()(\d{2})(\d{2})/;
        if (inputValue.length === 3) regex = /^()(\d{1})(\d{2})/;
        const result = inputValue.match(regex);
        const isValidDate = (d) => d instanceof Date && !isNaN(d);
        const setNewStartDate = () => {
            return dayjs().format('YYYY-MM-DD');
        };
        const setNewEndDate = () => {
            const newEndDate = depdate1 ? dayjs(depdate1) : dayjs();
            return newEndDate.add(1, 'days').format('YYYY-MM-DD');
        };
        const isAfterOtherEnd = (d) => {
            if (isStart) return false;
            const startDate = dayjs(depdate1).add(setOtherEnd, 'day');
            return dayjs(d).isAfter(startDate);
        };

        // 輸入的字元不合規則
        if (result === null) {
            alert('請輸入正確的日期格式(YYYYMMDD) EX: 2018/01/01');
            return isStart ? setNewStartDate() : setNewEndDate();
        }

        // 月份小於10月，前面加'0'
        if (result[2].length === 1) result[2] = '0' + result[2];
        const [all, year, month, day] = result;
        let d = `${year || dayjs().year()}-${month}-${day}`;
        const date = dayjs(d);
        const calcStartDate = this.calcStartDate(isStart);
        const today = dayjs().format('YYYY-MM-DD');

        // 日期格式正確但是不存在的日期
        if (!isValidDate(new Date(d))) {
            alert('無效的日期');
            return isStart ? setNewStartDate() : setNewEndDate();
        }
        // 日期格式正確但是不存在的日期
        if (!isValidDate(new Date(d)) || !isLeapYear(d)) {
            alert('無效的日期');
            return isStart ? setNewStartDate() : setNewEndDate();
        }
        if (date.isBefore(today)) {
            alert('日期必須大於今日');
            return isStart ? setNewStartDate() : setNewEndDate();
        }
        if (date.isBefore(calcStartDate)) {
            let text = '日期必須大於今日';
            if (!isStart && depdate1 && this.props.rtow !== 3) {
                text = '回程日期不得小於去程日期！';
            }
            alert(text);
            return isStart ? setNewStartDate() : setNewEndDate();
        }

        // 日期超過 checkIn N天範圍
        if (isAfterOtherEnd(d)) {
            alert('無效的日期');
            return isStart ? setNewStartDate() : setNewEndDate();
        }

        // 驗證日期區間
        if (date > endYear) {
            let start = dayjs().format('YYYY/MM/DD');
            let end = endYear.format('YYYY/MM/DD');
            return alert(`請選擇${start}~${end}之間的日期`);
        }

        // 都驗證正確 就更換日期
        return d;
    }

    closeInputCalendar = (val) => {
        if (val === 'single') {
            this.setState({ focus1: false });
        } else if (val === 'two') {
            this.setState({ dcActiveInput: null });
        }
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


        if (obj2.length !== 0) {
            if (typeof obj2[0].value !== 'undefined') {
                obj2[0].value = '__';
            }
        }
        if (obj1.length !== 0) {
            if (typeof obj1[0].value !== 'undefined') {
                obj1[0].value = '__';
            }
        }
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
    // 資料驗證 開始
    // 出發地目的地空值驗證
    ValidData = (callback) => {
        let { depdate1, depdate2, multiItems, dptSelectedData, dtnSelectedData } = this.state;
        let { rtow } = this.props;
        let warnText = [];
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
        }
        // 過濾重複的 警告訊息
        const newWarnText = warnText.filter((ele, i, arr) => {
            return arr.indexOf(ele) === i;
        });
        // console.log('newWarnText', newWarnText);

        if (newWarnText.length === 0) {
            return true;
        } else {
            alert('請選擇' + newWarnText.join('、'));
            return false;
        }
    }

    // 把航段物件轉成需要的字串
    parseSeekObj = (SelectedData, targetCode) => {
        let data = SelectedData[0];
        // let result = txt.match(/[A-Z]+(?=\))/g);
        switch (targetCode) {
            case 'country':
                return data.country;
            case 'city':
                return data.city;
            case 'airport':
                return data.airport ? data.airport : '';
            default:
                return data.country;
        }
    }


    // 國際機票搜尋規則驗證
    SubmitObjCheck = (dptSelectedData, dtnSelectedData, multiItems, rtow) => {
        let isPassTest = true;
        const depCountry = this.parseSeekObj(dptSelectedData, 'country');
        const depCity = this.parseSeekObj(dptSelectedData, 'city');
        const arrCountry = this.parseSeekObj(dtnSelectedData, 'country');
        const arrCity = this.parseSeekObj(dtnSelectedData, 'city');
        // 香港及澳門是例外城市
        const excludeCity = /HKG|MFM/;
        if (rtow !== 3) {
            if (depCountry === arrCountry && depCountry === 'TW') {
                if (rtow !== 3) {
                    isPassTest = false;
                    alert('很抱歉，目前暫不提供台灣境內線航班查詢');
                }
            } else if (depCountry === arrCountry && depCountry === 'CN') {
                if (!excludeCity.test(depCity) && !excludeCity.test(arrCity)) {
                    if (rtow !== 3) {
                        isPassTest = false;
                        alert('很抱歉，目前暫不提供中國境內線航班查詢');
                    }
                }
            }
        } else {
            let seeksArrayCountry = [];
            let seeksArrayCity = [];
            let seeksdepCountry;
            let seeksdepCity;
            let seeksarrCountry;
            let seeksarrCity;
            seeksArrayCountry.push(depCountry, arrCountry);
            seeksArrayCity.push(depCity, arrCity);
            for (let i = 0, seeks; seeks = multiItems[i]; i++) {
                seeksdepCountry = this.parseSeekObj(seeks.dptSelectedData, 'country');
                seeksdepCity = this.parseSeekObj(seeks.dptSelectedData, 'city');
                seeksarrCountry = this.parseSeekObj(seeks.dtnSelectedData, 'country');
                seeksarrCity = this.parseSeekObj(seeks.dtnSelectedData, 'city');
                seeksArrayCountry.push(seeksdepCountry, seeksarrCountry);
                seeksArrayCity.push(seeksdepCity, seeksarrCity);
            }
            let allChina = seeksArrayCountry.every(function (item, index) {
                return item === 'CN';
            });
            let allTaiwan = seeksArrayCountry.every(function (item, index) {
                return item === 'TW';
            });
            let outsideCity = seeksArrayCity.some(function (item, index) {
                return item === 'HKG' || item === 'MFM';
            });
            if (allChina) {
                if (!outsideCity) {
                    isPassTest = false;
                    alert('很抱歉，目前暫不提供中國境內線航班查詢');
                } else {
                    isPassTest = true;
                }
            } else if (allTaiwan) {
                isPassTest = false;
                alert('很抱歉，目前暫不提供台灣境內線航班查詢');
            } else {
                isPassTest = true;
            }
        }
        return isPassTest;
    }


    cityCheck = (dptSelectedData, dtnSelectedData) => {
        let isPassTest = true;
        let depCity = this.parseSeekObj(dptSelectedData, 'city');
        let depAirport = this.parseSeekObj(dptSelectedData, 'airport');
        let arrCity = this.parseSeekObj(dtnSelectedData, 'city');
        let arrAirport = this.parseSeekObj(dtnSelectedData, 'airport');

        if (depCity === arrCity) {
            if (arrAirport !== '' || depAirport !== '') {
                if (arrAirport === depAirport) {
                    alert('出發地機場與目的地機場不能相同');
                    isPassTest = false;
                } else {
                    isPassTest = true;
                }
            } else {
                alert('出發地與目的地不能相同');
                isPassTest = false;
            }

        }
        return isPassTest;
    }


    sourceCheck = (sourcesystem, depdate1, depdate2, rtow) => {
        // let { depdate1, depdate2, sourcesystem } = this.state;
        let timeLimit = dayjs().add(8, 'days').format('YYYY/MM/DD');
        let depDate = Date.parse(depdate1.replace(/-/g, '/')).valueOf();
        let arrDate = Date.parse(depdate2.replace(/-/g, '/')).valueOf();
        let limitDate = Date.parse(timeLimit).valueOf();
        if (rtow === 3) { return true }
        if (Number(sourcesystem) === 2) {
            if (depDate < limitDate || arrDate < limitDate) {
                alert('廉價航空僅提供7天後的訂購');
                return false;
            }
        }
        return true;
    }

    peopleCheck = (adt, chd, inf, totalNum) => {
        // let { adt, chd, inf, totalNum } = this.state;
        let childTotal = chd + inf;
        if (totalNum > 8) {
            alert('總人數不得超過8位');
            return false;
        } else if (adt < inf || adt * 2 < chd || adt * 2 < childTotal) {
            alert('1位大人最多帶2位孩童或1位嬰兒，請再次確認人數');
            return false;
        }
        return true;
    }

    sendData = () => {

        const {
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
            dtnSelectedData,
        } = this.state;
        const { rtow } = this.props;


        const depart1 = dptSelectedData[0].airport ? dptSelectedData[0].airport : '';
        const depcity1 = dptSelectedData[0].city;
        const depcountry1 = dptSelectedData[0].country;
        // 目的地
        const arrive1 = dtnSelectedData[0].airport ? dtnSelectedData[0].airport : '';
        const arrcity1 = dtnSelectedData[0].city;
        const arrcountry1 = dtnSelectedData[0].country;

        let searchkey = `rtow=${rtow}&clstype=${clstype}&adt=${adt}&chd=${chd}&inf=${inf}&notrans=${notrans}&haveseat=${haveseat}&nonprefertrans=${nonprefertrans}&nonprefertransnight=${nonprefertransnight}&sourcesystem=${sourcesystem}`;

        if (rtow === 0) {
            let dptText = `&depart1=${depart1}&depcity1=${depcity1}&depcountry1=${depcountry1}`;
            let dtntext = `&arrive1=${arrive1}&arrcity1=${arrcity1}&arrcountry1=${arrcountry1}`;
            let dptDate = `&depdate1=${depdate1}`;

            searchkey += (dptText + dtntext + dptDate);
        }

        if (rtow === 1) {
            let dptText = `&depart1=${depart1}&depcity1=${depcity1}&depcountry1=${depcountry1}&depart2=${arrive1}&depcity2=${arrcity1}&depcountry2=${arrcountry1}`;
            let dtntext = `&arrive1=${arrive1}&arrcity1=${arrcity1}&arrcountry1=${arrcountry1}&arrive2=${depart1}&arrcity2=${depcity1}&arrcountry2=${depcountry1}`;
            let dptDate = `&depdate1=${depdate1}&depdate2=${depdate2}`;

            searchkey += (dptText + dtntext + dptDate);
        }

        if (rtow === 3) {
            let dptText = `&depart1=${depart1}&depcity1=${depcity1}&depcountry1=${depcountry1}`;
            let dtntext = `&arrive1=${arrive1}&arrcity1=${arrcity1}&arrcountry1=${arrcountry1}`;
            let dptDate = `&depdate1=${depdate1}`;
            for (let i = 0; i < multiItems.length; i++) {
                let multdepAirport = multiItems[i]['dptSelectedData'][0]['airport'] ? multiItems[i]['dtnSelectedData'][0]['airport'] : '';
                let multarrAirport = multiItems[i]['dtnSelectedData'][0]['airport'] ? multiItems[i]['dtnSelectedData'][0]['airport'] : '';
                dptText += `&depart${i + 2}=${multdepAirport}&depcity${i + 2}=${multiItems[i]['dptSelectedData'][0]['city']}&depcountry${i + 2}=${multiItems[i]['dptSelectedData'][0]['country']}`;
                dtntext += `&arrive${i + 2}=${multarrAirport}&arrcity${i + 2}=${multiItems[i]['dtnSelectedData'][0]['city']}&arrcountry${i + 2}=${multiItems[i]['dtnSelectedData'][0]['country']}`;
                dptDate += `&depdate${i + 2}=${multiItems[i]['startInputValue']}`;
            }

            searchkey += (dptText + dtntext + dptDate);
        }

        let clone = JSON.parse(JSON.stringify(this.state.multiItems));
        // clone[0].dptSelectedData = [];
        // clone[0].dtnSelectedData = [];
        const PostTime = new Date().setHours(0, 0, 0, 0);
        useLocalStorage({
            panel: 'internationalFlight',
            methods: 'post',
            data: {
                depdate1,
                depdate2,
                dptSelectedData,
                dtnSelectedData,
                multiItems: clone[0].selectedStartDate,
                multiItemsDpt: clone[0].dptSelectedData,
                multiItemsDtn: clone[0].dtnSelectedData,
                clstype,
                adt,
                chd,
                inf,
                haveseat,
                PostTime
            }
        });

        console.log(searchkey);
        window.open('https://flight.liontravel.com/search?' + searchkey, this.props.hrefTarget);
    }


    // 參數送出
    submit = () => {
        const {
            adt,
            chd,
            inf,
            depdate1,
            depdate2,
            sourcesystem,
            multiItems,
            dptSelectedData,
            dtnSelectedData,
            totalNum
        } = this.state;
        const { rtow } = this.props;

        let isPassCheck;

        // 驗證是否為空值
        isPassCheck = this.ValidData();
        if (!isPassCheck) return;

        // 航段驗證
        isPassCheck = this.cityCheck(dptSelectedData, dtnSelectedData);
        if (!isPassCheck) return;

        if (rtow === 3) {
            // 新增的航段檢驗
            for (let i = 0, seek; seek = multiItems[i]; i++) {
                isPassCheck = this.cityCheck(seek.dptSelectedData, seek.dtnSelectedData);
                if (!isPassCheck) return;
            }
        }

        // 航段驗證
        isPassCheck = this.SubmitObjCheck(dptSelectedData, dtnSelectedData, multiItems, rtow);
        if (!isPassCheck) return;

        // 人數艙等驗證
        isPassCheck = this.peopleCheck(adt, chd, inf, totalNum);
        if (!isPassCheck) return;

        // 廉價航空驗證
        isPassCheck = this.sourceCheck(sourcesystem, depdate1, depdate2, rtow);
        if (!isPassCheck) return;

        // 送出資料
        this.sendData();


    }
    // 資料驗證結束

    singleInputChange = (e) => {
        this.setState({
            depdate1: e
        });
    }
    dcInputChange = (e, target) => {
        if (target === 'start') {
            this.setState({ depdate1: e });
        } else {
            this.setState({ depdate2: e });
        }
    }

    muitInputChange = (e, id) => {
        console.log('muit', e, id);
        let clone = JSON.parse(JSON.stringify(this.state.multiItems));
        clone.forEach(item => {
            if (id === item.id) {
                item.startInputValue = e;
            }
        });
        this.setState({
            multiItems: clone
        });
    }

    render () {
        const {
            depdate1,
            depdate2,
            focus1,
            dcActiveInput,
            totalNum,
            adt,
            chd,
            inf,
            clstype,
            multiItems,
            clearBtn,
            dptSelectedData,
            dtnSelectedData,
            haveseat
        } = this.state;
        const { rtow } = this.props;
        return (
            <div className="flight_international_pc">
                <Header
                    rtow={rtow}
                    tripChange={v => this.tripChange(v)}
                />
                <International
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
                    singleInputChange={this.singleInputChange}

                    // 去程日期、來回日期
                    dcStartInputValue={depdate1}
                    dcEndInputValue={depdate2}
                    dcClickDate={this.dcClickDate}
                    dcInputFocus={this.dcInputFocus}
                    dcActiveInput={dcActiveInput}
                    dcCleanBtn1={clearBtn['dcCleanBtn1']}
                    dcCleanBtn2={clearBtn['dcCleanBtn2']}
                    startDate={this.state.startDate}
                    dcInputChange={this.dcInputChange}

                    // 人數、艙等LocalStorage要回來的資料
                    adtNum={adt}
                    chdNum={chd}
                    infNum={inf}
                    // 人數、艙等
                    totalPeople={totalNum}
                    cabinNumber={clstype}
                    selectCabin={this.setStateVal}
                    setPeople={this.setStateVal}
                    setTotalPeople={this.setStateVal}
                    // 直飛，找機位
                    setNoTrans={this.setStateVal}
                    haveseat={haveseat}
                    setHaveSeat={this.setStateVal}
                    // 排除轉機國家
                    setNonprefertrans={this.setStateVal}
                    clearNonprefertrans={this.setStateVal}
                    // 廉價航空
                    setSourceSystem={this.setStateVal}
                    sourceSystem={this.state.sourcesystem}
                    // 排除過夜轉機航班
                    setnonprefertransnight={this.setStateVal}
                    // 檢查日期
                    checkDate={this.checkDate}
                    // 關日曆
                    closeInputCalendar={this.closeInputCalendar}
                    // 按下搜尋
                    submit={this.submit}
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
                    muitInputChange={this.muitInputChange}
                />
            </div>
        );
    }
}

export default Panel;
