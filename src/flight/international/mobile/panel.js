import React, { Component } from 'react';
import './mobile.scss';
import Header from './components/header';
import International from './container/International';

// 主畫面
class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            rtow: 0, // 頁數
            departure: [], // 出發地
            destination: [], // 目的地
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
            multiItems: []
        };
    }

    // 切換 單程、來回、多個目的地
    tripChange = (target) => {
        this.setState({ rtow: target });
    }

    // 設定 state
    setVal = (key, val) => {
        this.setState({ [key]: val });
    }

    // submit 驗證
    submit = () => {
        const { rtow, clstype, adt, chd, inf, notrans, haveseat, nonprefertrans, nonprefertransnight, sourcesystem, departure, destination, depdate1, depdate2, multiItems } = this.state;
        this.validData((isValid, warnText) => {
            if (isValid) {
                // 出發地
                const depart1 = departure[0].airport;
                const depcity1 = departure[0].city;
                const depcountry1 = departure[0].country;
                // 目的地
                const arrive1 = destination[0].airport;
                const arrcity1 = destination[0].city;
                const arrcountry1 = destination[0].country;

                // let searchkey = `rtow=${rtow}&clstype=${clstype}&adt=${adt}&chd=${chd}&inf=${inf}&notrans=${notrans}&haveseat=${haveseat}&nonprefertrans=${nonprefertrans}&nonprefertransnight=${nonprefertransnight}&SourceSystem=${sourcesystem}&depart1=${depart1}&DepCity1=${depcity1}&DepCountry1=${depcountry1}&Arrive1=${arrive1}&ArrCity1=${arrcity1}&ArrCountry1=${arrcountry1}&DepDate1=${depdate1}`;
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
                        dptText += `&depart${i + 2}=${multiItems[i]['selectDate1'][0]['airport']}&depcity${i + 2}=${multiItems[i]['selectDate1'][0]['city']}&depcountry${i + 2}=${multiItems[i]['selectDate1'][0]['country']}`;
                        dtntext += `&arrive${i + 2}=${multiItems[i]['selectDate2'][0]['airport']}&arrcity${i + 2}=${multiItems[i]['selectDate2'][0]['city']}&arrcountry${i + 2}=${multiItems[i]['selectDate2'][0]['country']}`;
                        dptDate += `&depdate${i + 2}=${multiItems[i]['selectedStartDate']}`;
                    }

                    searchkey += (dptText + dtntext + dptDate);
                }

                window.open('https://flight.liontravel.com/search?' + searchkey, this.props.hrefTarget);
            } else {
                alert('請選擇: ' + warnText.join('、'));
            }
        });
    }

    // 確認是否填空值
    validData (callBack) {
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
        callBack(warnText.length === 0, newWarnText);
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
                    setClstype={this.setVal}        // 艙等
                    setAdt={this.setVal}            // 大人
                    setChd={this.setVal}            // 小孩
                    setInf={this.setVal}            // 嬰兒
                    setNoTrans={this.setVal}        // 是否直飛
                    setHaveSeat={this.setVal}       // 只有找機位
                    setNonprefertrans={this.setVal} // 排除轉機國家
                    setSourceSystem={this.setVal}
                    setNonprefertransnight={this.setVal}
                    setDepDateItems={this.setVal}
                    setPlace={this.setVal}
                    submit={this.submit}
                />
            </div>
        );
    }
}

export default Panel;