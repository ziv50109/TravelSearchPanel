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
        // console.log('key: ', key);
        // console.log('value: ', val);
        this.setState({ [key]: val });
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
                />
            </div>
        );
    }
}

export default Panel;