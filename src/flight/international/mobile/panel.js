import React, { Component } from 'react';
import './mobile.scss';
import Header from './components/header';
import International from './container/International';
import today from 'dayjs';
import { useLocalStorage } from '../../../../utils';

// 主畫面
class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rtow: 0, // 頁數
            departure: [], // 出發地
            destination: [], // 目的地
            depdate1: today().format('YYYY-MM-DD'), // 去程日期
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
            dptSelectDate: [],
            dtnSelectDate: [],
        };
    }
    componentDidMount () {
        useLocalStorage(
            {
                panel: 'internationalFlight',
                methods: 'get'
            },
            ({ clstype, adt, chd, inf }) => {
                this.setState({ clstype, adt, chd, inf });
            }
        );
    }
    // 切換 單程、來回、多個目的地
    tripChange = (target) => {
        this.setState({ rtow: target });
    }

    // 設定 state
    setVal = (key, val) => {
        this.setState({ [key]: val });
    }

    peopleConfirm = (data) => {
        console.log('ddddd', data);
        this.setState({
            adt: data.adult,
            chd: data.child,
            inf: data.baby,
            clstype: Number(data.internationalClstypeLevel)
        });
    }

    sendData = () => {
        const {
            rtow,
            clstype,
            adt,
            chd,
            inf,
            notrans,
            haveseat,
            nonprefertrans,
            nonprefertransnight,
            sourcesystem,
            departure,
            destination,
            depdate1,
            depdate2,
            multiItems,
            dptSelectDate,
            dtnSelectDate,
        } = this.state;
        // 出發地
        const depart1 = departure[0].airport ? departure[0].airport : '';
        const depcity1 = departure[0].city;
        const depcountry1 = departure[0].country;
        // 目的地
        const arrive1 = destination[0].airport ? destination[0].airport : '';
        const arrcity1 = destination[0].city;
        const arrcountry1 = destination[0].country;

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
                let multdepAirport = multiItems[i]['selectDate1'][0]['airport'] ? multiItems[i]['selectDate1'][0]['airport'] : '';
                let multarrAirport = multiItems[i]['selectDate2'][0]['airport'] ? multiItems[i]['selectDate2'][0]['airport'] : '';
                dptText += `&depart${i + 2}=${multdepAirport}&depcity${i + 2}=${multiItems[i]['selectDate1'][0]['city']}&depcountry${i + 2}=${multiItems[i]['selectDate1'][0]['country']}`;
                dtntext += `&arrive${i + 2}=${multarrAirport}&arrcity${i + 2}=${multiItems[i]['selectDate2'][0]['city']}&arrcountry${i + 2}=${multiItems[i]['selectDate2'][0]['country']}`;
                dptDate += `&depdate${i + 2}=${multiItems[i]['selectedStartDate']}`;
            }

            searchkey += (dptText + dtntext + dptDate);
        }

        let clone = JSON.parse(JSON.stringify(this.state.multiItems));
        // clone[0].dptSelectedData = [];
        // clone[0].dtnSelectedData = [];
        console.log('clone', clone);
        const PostTime = new Date().setHours(0, 0, 0, 0);
        useLocalStorage({
            panel: 'internationalFlight',
            methods: 'post',
            data: {
                depdate1,
                depdate2,
                departure,
                destination,
                mobmultiItems: clone[0].selectedStartDate,
                mobmultiItemsDpt: clone[0].selectDate1,
                mobmultiItemsDtn: clone[0].selectDate2,
                multDptTxt: clone[0].dptSelectDate,
                multDtnTxt: clone[0].dtnSelectDate,
                dptSelectDate,
                dtnSelectDate,
                clstype,
                adt,
                chd,
                inf,
                PostTime
            }
        });

        console.log(searchkey);
        window.open('https://flight.liontravel.com/search?' + searchkey, this.props.hrefTarget);
    }

    // submit 驗證
    submit = () => {
        const { rtow, clstype, adt, chd, inf, notrans, haveseat, nonprefertrans, nonprefertransnight, sourcesystem, departure, destination, depdate1, depdate2, multiItems } = this.state;
        let isPassCheck;
        // 驗證是否為空值
        isPassCheck = this.validData();
        if (!isPassCheck) return;

        // 航段驗證
        isPassCheck = this.cityCheck(departure, destination);
        if (!isPassCheck) return;

        if (rtow === 3) {
            // 新增的航段檢驗
            for (let i = 0, seek; seek = multiItems[i]; i++) {
                isPassCheck = this.cityCheck(seek.selectDate1, seek.selectDate2);
                if (!isPassCheck) return;
            }
        }

        // 航段驗證
        isPassCheck = this.SubmitObjCheck(departure, destination, multiItems, rtow);
        if (!isPassCheck) return;

        // 人數艙等驗證
        isPassCheck = this.peopleCheck(adt, chd, inf);
        if (!isPassCheck) return;

        // 廉價航空驗證
        isPassCheck = this.sourceCheck(sourcesystem, depdate1, depdate2, rtow);
        if (!isPassCheck) return;

        // 送出資料
        this.sendData();

        // this.validData((isValid, warnText) => {
        //     if (isValid) {
        //         // 出發地
        //         const depart1 = departure[0].airport;
        //         const depcity1 = departure[0].city;
        //         const depcountry1 = departure[0].country;
        //         // 目的地
        //         const arrive1 = destination[0].airport;
        //         const arrcity1 = destination[0].city;
        //         const arrcountry1 = destination[0].country;

        //         let searchkey = `rtow=${rtow}&clstype=${clstype}&adt=${adt}&chd=${chd}&inf=${inf}&notrans=${notrans}&haveseat=${haveseat}&nonprefertrans=${nonprefertrans}&nonprefertransnight=${nonprefertransnight}&sourcesystem=${sourcesystem}`;

        //         if (rtow === 0) {
        //             let dptText = `&depart1=${depart1}&depcity1=${depcity1}&depcountry1=${depcountry1}`;
        //             let dtntext = `&arrive1=${arrive1}&arrcity1=${arrcity1}&arrcountry1=${arrcountry1}`;
        //             let dptDate = `&depdate1=${depdate1}`;

        //             searchkey += (dptText + dtntext + dptDate);
        //         }

        //         if (rtow === 1) {
        //             let dptText = `&depart1=${depart1}&depcity1=${depcity1}&depcountry1=${depcountry1}&depart2=${arrive1}&depcity2=${arrcity1}&depcountry2=${arrcountry1}`;
        //             let dtntext = `&arrive1=${arrive1}&arrcity1=${arrcity1}&arrcountry1=${arrcountry1}&arrive2=${depart1}&arrcity2=${depcity1}&arrcountry2=${depcountry1}`;
        //             let dptDate = `&depdate1=${depdate1}&depdate2=${depdate2}`;

        //             searchkey += (dptText + dtntext + dptDate);
        //         }

        //         if (rtow === 3) {
        //             let dptText = `&depart1=${depart1}&depcity1=${depcity1}&depcountry1=${depcountry1}`;
        //             let dtntext = `&arrive1=${arrive1}&arrcity1=${arrcity1}&arrcountry1=${arrcountry1}`;
        //             let dptDate = `&depdate1=${depdate1}`;
        //             for (let i = 0; i < multiItems.length; i++) {
        //                 dptText += `&depart${i + 2}=${multiItems[i]['selectDate1'][0]['airport']}&depcity${i + 2}=${multiItems[i]['selectDate1'][0]['city']}&depcountry${i + 2}=${multiItems[i]['selectDate1'][0]['country']}`;
        //                 dtntext += `&arrive${i + 2}=${multiItems[i]['selectDate2'][0]['airport']}&arrcity${i + 2}=${multiItems[i]['selectDate2'][0]['city']}&arrcountry${i + 2}=${multiItems[i]['selectDate2'][0]['country']}`;
        //                 dptDate += `&depdate${i + 2}=${multiItems[i]['selectedStartDate']}`;
        //             }

        //             searchkey += (dptText + dtntext + dptDate);
        //         }

        //         window.open('https://flight.liontravel.com/search?' + searchkey, this.props.hrefTarget);
        //     } else {
        //         alert('請選擇: ' + warnText.join('、'));
        //     }
        // });
    }

    // 確認是否填空值
    validData = () => {
        const { rtow, departure, destination, depdate1, depdate2, multiItems } = this.state;
        const warnText = [];
        if (rtow === 0 || rtow === 1) {
            if (departure.length <= 0) {
                warnText.push('出發地');
            }
            if (destination.length <= 0) {
                warnText.push('目的地');
            }
            if (depdate1 === '') {
                warnText.push('去程日期');
            }
        }
        if (rtow === 1) {
            if (depdate2 === '') {
                warnText.push('回程日期');
            }
        }
        if (rtow === 3) {
            if (departure.length <= 0) {
                warnText.push('出發地');
            }
            if (destination.length <= 0) {
                warnText.push('目的地');
            }
            if (depdate1 === '') {
                warnText.push('去程日期');
            }

            multiItems.forEach(ele => {
                console.log(ele.selectDate1);
                if (ele.selectDate1.length <= 0) {
                    warnText.push('出發地');
                }
                if (ele.selectDate2.length <= 0) {
                    warnText.push('目的地');
                }
                if (ele.selectedStartDate === 0) {
                    warnText.push('去程日期');
                }
            });
        }

        let newWarnText = warnText.filter((ele, i, arr) => {
            return arr.indexOf(ele) === i;
        });
        // callBack(warnText.length === 0, newWarnText);
        if (newWarnText.length === 0) {
            return true;
        } else {
            alert('請選擇' + newWarnText.join('、'));
            return false;
        }
    }
    // 把航段物件轉成需要的字串
    parseSeekObj = (SelectedData, targetCode) => {
        console.log('SelectedData',SelectedData)
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
                seeksdepCountry = this.parseSeekObj(seeks.selectDate1, 'country');
                seeksdepCity = this.parseSeekObj(seeks.selectDate1, 'city');
                seeksarrCountry = this.parseSeekObj(seeks.selectDate2, 'country');
                seeksarrCity = this.parseSeekObj(seeks.selectDate2, 'city');
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
        let timeLimit = today().add(8, 'days').format('YYYY/MM/DD');
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

    peopleCheck = (adt, chd, inf) => {
        // let { adt, chd, inf, totalNum } = this.state;
        let childTotal = chd + inf;
        let totalNum = adt + chd + inf;
        if (totalNum > 8) {
            alert('總人數不得超過8位');
            return false;
        } else if (adt < inf || adt * 2 < chd || adt * 2 < childTotal) {
            alert('1位大人最多帶2位孩童或1位嬰兒，請再次確認人數');
            return false;
        }
        return true;
    }
    render () {
        return (
            <div className="flight_international_mobile">
                <Header
                    rtow={this.state.rtow}
                    tripChange={v => this.tripChange(v)}
                />
                <International
                    rtow={this.state.rtow}
                    setDepdate1={this.setVal}       // 去程日期
                    setDepdate2={this.setVal}       // 回程日期
                    // setClstype={this.setVal}        // 艙等
                    // setAdt={this.setVal}            // 大人
                    // setChd={this.setVal}            // 小孩
                    // setInf={this.setVal}            // 嬰兒
                    setNoTrans={this.setVal}        // 是否直飛
                    setHaveSeat={this.setVal}       // 只有找機位
                    setNonprefertrans={this.setVal} // 排除轉機國家
                    setSourceSystem={this.setVal}
                    setNonprefertransnight={this.setVal}
                    setDepDateItems={this.setVal}
                    setPlace={this.setVal}
                    submit={this.submit}
                    adt={this.state.adt}
                    chd={this.state.chd}
                    inf={this.state.inf}
                    clstype={this.state.clstype}
                    peopleConfirm={this.peopleConfirm}

                />
            </div>
        );
    }
}

export default Panel;