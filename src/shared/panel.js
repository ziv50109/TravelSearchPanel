import React, { Component } from 'react';
import IcRcln from '../../magaele/ic_rcln';
import SingleInputMenu from '../shared/SingleInputMenu/SingleInputMenu';
import SingleInputMenuF from '../shared/SingleInputMenu/SingleInputMenuF';
// import SingleChange from '../shared/SingleInputMenu/SingleInputMenu';
// import SingleChangeMobile from '../shared/SingleChangeMobile';
import SingleChange from '../shared/SingleChange';
import Single from '../shared/Single';


import NvbRslb from '../../magaele/nvb_rslb';
import SingleInputMenuFM from '../shared/SingleInputMenu/SingleInputMenuFM';

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
            // isFocus: false, // 是否處於 focus 狀態
            // showAct: false, // 傳入 custom class
            // value: 0,
            // obj: null


            nvbOpen: false,
            selectedDataM: [],
            selectedDataMkeyword: '',


        };
        this.fetchPath = './json/TRS1NEWTRAVEL.js';
    }

    // 交換
    switch = () => {
        // const {
        //     dptSelectedData: arr1,
        //     dtnSelectedData: arr2,
        // } = this.state;
        const obj1 = JSON.parse(JSON.stringify(this.state.dptSelectedData)); // dptObj
        const obj2 = JSON.parse(JSON.stringify(this.state.dtnSelectedData)); // dtnObj
        this.setState({
            dptSelectedData: obj2,
            dtnSelectedData: obj1
        });
    };

    dptHandleChange = data => {
        // console.log(data);
        // const { dptSelectedData } = this.state;
        // // if (selectedData.some(item => data.value === item.value)) {
        // //     let arr = selectedData.filter(item => data.value !== item.value);
        // //     this.setState({ selectedData: arr });
        // // } else if (selectedData.length < this.selectedDataMax) {
        // //     this.setState({ selectedData: [...selectedData, data] });
        // // } else {
        // //     return;
        // // }
        // let arr = [];
        // if (dptSelectedData.some(item => data.value === item.value)) {
        //     arr = dptSelectedData.filter(item => data.value !== item.value);
        // } else if (data.value) {
        //     arr.push(data);
        // }
        // this.setState({ dptSelectedData: arr });
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        console.log(arr);
        this.setState({ dptSelectedData: arr });
    };

    dtnHandleChange = data => {
        // console.log(data);
        // const { dtnSelectedData } = this.state;
        // // if (selectedData.some(item => data.value === item.value)) {
        // //     let arr = selectedData.filter(item => data.value !== item.value);
        // //     this.setState({ selectedData: arr });
        // // } else if (selectedData.length < this.selectedDataMax) {
        // //     this.setState({ selectedData: [...selectedData, data] });
        // // } else {
        // //     return;
        // // }
        // let arr = [];
        // if (dtnSelectedData.some(item => data.value === item.value)) {
        //     arr = dtnSelectedData.filter(item => data.value !== item.value);
        // } else if (data.value) {
        //     arr.push(data);
        // }
        // this.setState({ dtnSelectedData: arr });
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        this.setState({ dtnSelectedData: arr });
    };

    handleChange = data => {
        const { selectedData } = this.state;
        // if (selectedData.some(item => data.value === item.value)) {
        //     let arr = selectedData.filter(item => data.value !== item.value);
        //     this.setState({ selectedData: arr });
        // } else if (selectedData.length < this.selectedDataMax) {
        //     this.setState({ selectedData: [...selectedData, data] });
        // } else {
        //     return;
        // }
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


    handleToggleNvbOpen = () => {
        this.setState({ nvbOpen: !this.state.nvbOpen });
    }


    render () {
        const { selectedData, dptSelectedData, dtnSelectedData } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <React.Fragment>
                    <h3>SingleInputMenu - 機票</h3>
                    <SingleInputMenuF
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
                        onChange={this.handleChangeF}
                    />

                    <h3>Single</h3>
                    <Single />
                    <h3>SingleChange</h3>
                    <SingleChange
                        dptChange={123} // 改變出發地 val 的方法
                        dtnChange={123} // 改變目的地 val 的方法
                        switch={123} // 交換
                        dptVal={123}
                        dtnVal={123}
                    />

                    <h3>SingleChange - Dtm - 真．機票</h3>
                    <div className="single-change">
                        <SingleInputMenuF
                            className="SingleInputMenu"
                            /* int_rctg/Label */
                            isRequired // 是否為必填欄位
                            size="lg" // 框高
                            label={'出發地'} // 標籤
                            iconName={'toolmap'} // icon
                            /* subComponent */
                            fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                            selectedData={dptSelectedData} // 所選擇的資料集
                            // max={this.WrapperDtmRclnMax}
                            /* int_rcln */
                            placeholder="請輸入國家/城市/機場" // placeholder 輸入提示字
                            /* act_racp */
                            minimumStringQueryLength={2} // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                            /* dtm rcln */
                            subLabel="找不到選項？請輸入關鍵字查詢"
                            onChange={this.dptHandleChange}
                        />
                        <div className="changeBtn" onClick={this.switch}>
                            {/* <IcRcln name={'valuechange changeBtn'} /> */}
                        </div>
                        <SingleInputMenuF
                            className="SingleInputMenu"
                            /* int_rctg/Label */
                            isRequired // 是否為必填欄位
                            size="lg" // 框高
                            label={'目的地'} // 標籤
                            iconName={'toolmap'} // icon
                            /* subComponent */
                            fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                            selectedData={dtnSelectedData} // 所選擇的資料集
                            // max={this.WrapperDtmRclnMax}
                            /* int_rcln */
                            placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                            /* act_racp */
                            minimumStringQueryLength={2} // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                            /* dtm rcln */
                            subLabel="找不到選項？請輸入關鍵字查詢"
                            onChange={this.dtnHandleChange}
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


                </React.Fragment>
            </div>
        );
    }
}
export default Panel;
