import React, { Component } from 'react';
import { flightInternational } from '../../source.config';
import { isJsonString, fetchJsToObj } from '../../utils';
import IcRcln from '../../magaele/ic_rcln';
import SingleInputMenu from '../shared/SingleInputMenu/SingleInputMenu';
import SingleInputMenuF from '../shared/SingleInputMenu/SingleInputMenuF';
import SingleChange from '../shared/SingleChange';
import Single from '../shared/Single';
import NvbRslb from '../../magaele/nvb_rslb';
import SingleInputMenuFM from '../shared/SingleInputMenu/SingleInputMenuFM';
import InternationalNvb from './NvbRslb/InternationalNvb';
import ChinaNvb from './NvbRslb/ChinaNvb';

const inlineStyle = {
    display: 'inline-block',
    marginLeft: 20 + 'px',
    verticalAlign: 'top'
};
const widthCollection = {
    desktop: {
        // width: 390 + 'px',
        marginLeft: 20 + 'px'
    }
};
const renameKey = (obj, fn) => {
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let newKey = keys[i];
        let val = obj[key];
        let str = fn(newKey, val);
        if (typeof str === 'string' && str !== '') {
            newKey = str;
            delete obj[key];
        }
        obj[newKey] = val;
    }
    return;
};
function responsiveStyle () {
    return Object.assign({}, widthCollection.desktop, inlineStyle);
}

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            dptSelectedData: [],
            dtnSelectedData: [],
            nvbOpen: false,
            selectedDataM: [],
            selectedDataMkeyword: '',
            // SingleInputMenuF 改父層餵資料
            rcfrDataResouce: {},
            newCity: {},
            // 人數艙等 (國際機場)
            internationalClstypeLevel: 0,
            adult: 1,
            child: 0,
            baby: 0,
            // 人數艙等 (大陸機場)
            chinaClstypeLevel: 0,
            peopleNum: 1,
        };
        this.fetchPath = './json/TRS1NEWTRAVEL.js';
    }

    componentDidMount () {
        const sessionData = sessionStorage.getItem(flightInternational.place);

        if (sessionData && isJsonString(sessionData)) {
            this._formatDtmRcfrData(sessionData);
            this._getDataCallBack(sessionData);
        } else {
            fetchJsToObj(flightInternational.place, (d) => {
                let stringifyData = JSON.stringify(d);
                this._formatDtmRcfrData(stringifyData);
                this._getDataCallBack(stringifyData);
                sessionStorage.setItem(flightInternational.place, stringifyData);
            });
        }
    }

    // 快速選單吃的資料
    _formatDtmRcfrData = (d) => {
        let data = JSON.parse(d);
        // 改造第一層資料
        renameKey(data.line, (key) => {
            return key + 'A';
        });
        // 加上第二層資料
        data._line = {};
        for (let i in data.line) {
            if (Object.prototype.hasOwnProperty.call(data.line, i)) {
                let newKey = i.split('A')[0];
                data._line[i] = { [newKey]: data.line[i] };
            }
        }
        // 更改第三層資料
        for (let i in data.city) {
            if (Object.prototype.hasOwnProperty.call(data.city, i)) {
                for (let j in data.city[i]) {
                    if (Object.prototype.hasOwnProperty.call(data.city[i], j)) {
                        let matchStr = data.city[i][j].split('__')[1].split('-');
                        data.city[i][j] = i === '_5' ?
                            matchStr.length < 3 ? matchStr[0] : matchStr[0] + '-' + matchStr[1] :
                            matchStr.length <= 3 ? matchStr[0].replace(/<|>/g, '') : matchStr[0].replace(/<|>/g, '') + '-' + matchStr[1];
                    }
                }
            }
        }
        this.setState({ rcfrDataResouce: data });
    }

    // 處理 fetch 回來的 data 成為 newCity
    _getDataCallBack = (d) => {
        let data = JSON.parse(d);
        // 重構 city 資料
        let arr = [];
        for (let key in data.city) {
            if (Object.keys(data.city)) {
                arr.push(data.city[key]);
            }
        }
        this.setState({ newCity: Object.assign({}, ...arr) });
    }

    // 交換
    switch = () => {
        const obj1 = JSON.parse(JSON.stringify(this.state.dptSelectedData)); // dptObj
        const obj2 = JSON.parse(JSON.stringify(this.state.dtnSelectedData)); // dtnObj
        this.setState({
            dptSelectedData: obj2,
            dtnSelectedData: obj1
        });
    };

    dptHandleChange = data => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        console.log(arr);
        this.setState({ dptSelectedData: arr });
    };

    dtnHandleChange = data => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        this.setState({ dtnSelectedData: arr });
    };

    handleChange = data => {
        const { selectedData } = this.state;
        let arr = [];
        if (selectedData.some(item => data.value === item.value)) {
            arr = selectedData.filter(item => data.value !== item.value);
        } else if (data.value) {
            arr.push(data);
        }
        this.setState({ selectedData: arr });
    };

    handleChangeF = data => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        this.setState({ selectedData: arr });
    };

    setValue = obj => {
        this.setState({ obj: obj });
    };

    // 控制手機板開合
    handleToggleNvbOpen = () => {
        this.setState({ nvbOpen: !this.state.nvbOpen });
    }

    // 人數艙等確定
    confirm = (val) => {
        console.log(val);
        this.setState({ ...val });
    }

    // 人數艙等，設定人數
    setPeople = (obj) => {
        this.setState({
            adult: obj.adt,
            child: obj.chd,
            baby: obj.inf,
        });
    }

    render () {
        const { selectedData, dptSelectedData, dtnSelectedData, rcfrDataResouce, newCity } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <h3>SingleInputMenu - 機票</h3>
                <SingleInputMenuF
                    className="SingleInputMenu"
                    isRequired
                    size="lg"
                    label={'出發地'}
                    iconName={'toolmap'}
                    rcfrDataResouce={rcfrDataResouce}
                    newCity={newCity}
                    racpDataResouce={flightInternational.placeAutoComplete}
                    selectedData={selectedData}
                    placeholder="請輸入/城市/國家/機場"
                    minimumStringQueryLength={2}
                    minimumStringQuery="請輸入至少兩個文字"
                    noMatchText="很抱歉，找不到符合的項目"
                    subLabel="找不到選項？請輸入關鍵字查詢"
                    onChange={val =>
                        this.handleChange(val)
                    }
                />

                <h3>Single</h3>
                <Single />

                <h3>SingleChange</h3>
                <SingleChange />

                <h3>SingleChange - Dtm - 真．機票</h3>
                <div className="single-change">
                    <SingleInputMenuF
                        className="SingleInputMenu"
                        isRequired
                        size="lg"
                        label={'出發地'}
                        iconName={'toolmap'}
                        rcfrDataResouce={rcfrDataResouce}
                        newCity={newCity}
                        racpDataResouce={flightInternational.placeAutoComplete}
                        selectedData={dptSelectedData}
                        placeholder="請輸入/城市/國家/機場"
                        minimumStringQueryLength={2}
                        minimumStringQuery="請輸入至少兩個文字"
                        noMatchText="很抱歉，找不到符合的項目"
                        subLabel="找不到選項？請輸入關鍵字查詢"
                        onChange={val =>
                            this.dptHandleChange(val)
                        }
                    />
                    <div className="changeBtn" onClick={this.switch}>
                        {/* <IcRcln name={'valuechange changeBtn'} /> */}
                    </div>
                    <SingleInputMenuF
                        className="SingleInputMenu"
                        isRequired
                        size="lg"
                        label={'目的地'}
                        iconName={'toolmap'}
                        rcfrDataResouce={rcfrDataResouce}
                        newCity={newCity}
                        racpDataResouce={flightInternational.placeAutoComplete}
                        selectedData={dtnSelectedData}
                        placeholder="請輸入/城市/國家/機場"
                        minimumStringQueryLength={2}
                        minimumStringQuery="請輸入至少兩個文字"
                        noMatchText="很抱歉，找不到符合的項目"
                        subLabel="找不到選項？請輸入關鍵字查詢"
                        onChange={val =>
                            this.dtnHandleChange(val)
                        }
                    />
                </div>

                <h3>SingleChange - Dtm - 真．機票 M</h3>
                <input type="text" value={this.state.selectedDataMkeyword || ''} onFocus={this.handleToggleNvbOpen} placeholder="選擇吧！" readOnly />

                <h3>SingleInputMenu - Dtm</h3>
                <SingleInputMenu
                    className="SingleInputMenu"
                    /* int_rctg/Label */
                    isRequired // 是否為必填欄位
                    size="lg" // 框高
                    label={'出發地'} // 標籤
                    iconName={'toolmap'} // icon
                    /* subComponent */
                    fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                    selectedData={selectedData} // 所選擇的資料集
                    // max={this.WrapperDtmRclnMax}
                    /* int_rcln */
                    placeholder="請選擇/可輸入目的地、景點關鍵字" // placeholder 輸入提示字
                    /* act_racp */
                    minimumStringQueryLength={2} // 最少輸入幾個字
                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                    /* dtm rcln */
                    subLabel="找不到選項？請輸入關鍵字查詢"
                    onChange={this.handleChange}
                />

                <NvbRslb
                    className="panel-nvb_rslb"
                    visible={this.state.nvbOpen}
                    direction="right"
                >
                    <span className="nvb_rslb_goBack" onClick={this.handleToggleNvbOpen}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        this.state.nvbOpen &&
                            <SingleInputMenuFM
                                className="SingleInputMenu"
                                /* int_rctg/Label */
                                isRequired // 是否為必填欄位
                                size="lg" // 框高
                                label={'目的地'} // 標籤
                                iconName={'toolmap'} // icon
                                /* subComponent */
                                fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                                selectedData={this.state.selectedDataM} // 所選擇的資料集
                                // max={this.WrapperDtmRclnMax}
                                /* int_rcln */
                                placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                                /* act_racp */
                                minimumStringQueryLength={2} // 最少輸入幾個字
                                minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                                noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                                /* dtm rcln */
                                subLabel="找不到選項？請輸入關鍵字查詢"
                                onChange={(data, keyword) => {
                                    let arr = [];
                                    if (typeof data === 'object') {
                                        arr.push(data);
                                    }
                                    this.setState({
                                        selectedDataM: arr,
                                        selectedDataMkeyword: arr.length ? keyword : '',
                                        nvbOpen: false
                                    });
                                }}
                            />
                    }
                </NvbRslb>

                {/* 人數 / 艙等 */}
                <h3>手機板: 人數 / 艙等 (國際機票版) ModuleName: InternationalNvb </h3>
                <InternationalNvb
                    customClass={'peopleAndCabin'}
                    title={'人數 / 艙等'}
                    clstypeLevel={this.state.internationalClstypeLevel} // 艙等
                    adult={this.state.adult} // 大人
                    child={this.state.child} // 小孩
                    baby={this.state.baby} // 嬰兒
                    confirm={this.confirm} // 確認送出
                />

                <h3>手機板: 人數 / 艙等 (大陸機票版) ModuleName: ChinaNvb </h3>
                <ChinaNvb
                    customClass={'peopleAndCabin'}
                    title={'人數 / 艙等'}
                    clstypeLevel={this.state.chinaClstypeLevel} // 艙等
                    peopleNum={this.state.peopleNum}
                    confirm={this.confirm} // 確認送出
                />
            </div>
        );
    }
}
export default Panel;
