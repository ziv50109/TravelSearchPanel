import React, { PureComponent } from 'react';

import { addDate, fetchJsToObj, isJsonString } from '../../../utils';
import { travel } from '../../../source.config';

// 單純組件
import Label from '../../../magaele/int_rctg/components/Label/Label.js';    // 外框
import StRcln from '../../../magaele/st_rcln';                              // select
import IntRcln from '../../../magaele/int_rcln';                            // input
import CrRcln from '../../../magaele/cr_rcln';                              // checkbox
import PpRcln from '../../../magaele/pp_rcln';                              // popovers
import IcRcln from '../../../magaele/ic_rcln';                              // icon
import BtRcnb from '../../../magaele/bt_rcnb';                              // button
// 複合組件
import WrapperDtmRcln from '../component/WrapperDtmRcln.js';                // 目的地
import Calendar from '../../component/ComposeCalendar';
import dayjs from 'dayjs';

import '../css.scss';


const ContentComponent = (props) => {
    return (
        <div className="travel_panel-pp_rcln-popup">
            <p>本公司「成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團：</p>
            <ul>
                <li><span>一、</span><p>不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。</p></li>
                <li><span>二、</span><p>「成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。</p></li>
            </ul>
        </div>
    );
};

class Panel extends PureComponent {
    constructor (props) {
        super(props);

        this.WrapperDtmRclnMax = 3;
        this.fetchPath = travel.place;
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.today = `${this.year}-${this.month}-${this.day}`;
        this.defaultStartDate = dayjs().add(15, 'day').format('YYYY-MM-DD');
        this.defaultEndtDate = dayjs().add(30, 'day').format('YYYY-MM-DD');

        this.state = {
            // query string
            StRcln1: '',
            destination: [],
            CyRcln1: [this.defaultStartDate, this.defaultEndtDate],
            StRcln2: '',
            IntRcln1: '',
            CrRcln1: false,
            CrRcln2: false,
            // fetch data
            data: {},
            // select options
            option1: [],
            // option2: [
            //     { text: '不限', value: '' },
            //     { text: '1天', value: 1 },
            //     { text: '2天', value: 2 },
            //     { text: '3天', value: 3 },
            //     { text: '4天', value: 4 },
            //     { text: '5天', value: 5 },
            //     { text: '6天', value: 6 },
            //     { text: '7天', value: 7 },
            //     { text: '8天', value: 8 },
            //     { text: '9天', value: 9 },
            //     { text: '10天及以上', value: 10 }
            // ]
            option2: [
                { text: '不限', value: '' },
                { text: '1~5天', value: '1,2,3,4,5' },
                { text: '6~10天', value: '6,7,8,9,10' },
                { text: '10天以上', value: '10' }
            ]
        };
    }
    componentDidMount () {
        const sessionData = sessionStorage.getItem(this.fetchPath);
        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            this.setState({
                data: jsonData,
                option1: this.objToOption(jsonData.vCity)
            });
        } else {
            fetchJsToObj(this.fetchPath, (d) => {
                let stringifyData = JSON.stringify(d);
                this.setState({
                    data: d,
                    option1: this.objToOption(d.vCity)
                });
                sessionStorage.setItem(this.fetchPath, stringifyData);
            });
        }

        // useLocalStorage({
        //     panel: 'travel',
        //     methods: 'get',
        // }, (data) => {
        //     this.localStorageDataToState(data);
        // });
    }
    // localStorageDataToState = (data) => {
    //     let newData = { ...data };
    //     if (new Date(data.CyRcln1[0]).getTime() < this.date.getTime()) {
    //         newData.CyRcln1 = [this.defaultStartDate, this.defaultEndtDate];
    //     }
    //     this.setState({ ...newData });
    // }

    objToOption = (obj) => {
        let arr = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push({
                    text: obj[key],
                    value: key
                });
            }
        }
        return arr;
    };
    // cbfn = callback function. return 驗證結果[boolean] & 警告文字[array]
    validate = (cbfn) => {
        const {
            destination,
            CyRcln1
        } = this.state;
        let warningText = [];

        if (destination.length < 1) {
            warningText.push('請輸入 / 選擇目的地');
        }
        if (!CyRcln1[0].length || !CyRcln1[1].length) {
            warningText.push('請選擇出發日期');
        }
        cbfn(warningText.length === 0, warningText);
    }

    // 組合參數
    filterAllState = () => {
        const {
            StRcln1,
            destination,
            CyRcln1,
            StRcln2,
            IntRcln1,
            CrRcln1,
            CrRcln2
        } = this.state;
        // 目的地
        const ArriveID = destination.map(item => {
            // 第一層
            if (item.vLinewebarea === '_' && item.vLinetravel === '_') {
                return `-${item.vLine.split('_').join('-')},`;
            // 第二層
            } else if (item.vLinetravel === '_') {
                return `${item.vLine.split('_').join('-')},`;
            // 第三層
            } else {
                return `${item.vLinewebarea.match(/^.(.*)$/)[1]}${item.vLinetravel.split('_').join('-')},`;
            }
        });
        return `DepartureID=${StRcln1}&ArriveID=${ArriveID.join('')}&GoDateStart=${CyRcln1[0]}&GoDateEnd=${CyRcln1[1]}&Days=${StRcln2}&Keywords=${IntRcln1}&IsEnsureGroup=${CrRcln1}&IsSold=${CrRcln2}`;
    }

    handleSubmit = () => {
        // const {
        //     StRcln1,
        //     destination,
        //     CyRcln1,
        //     StRcln2,
        //     IntRcln1,
        //     CrRcln1,
        //     CrRcln2
        // } = this.state;

        this.validate((boolean, warnings) => {
            if (boolean) {
                // useLocalStorage({
                //     panel: 'travel',
                //     methods: 'post',
                //     data: {
                //         StRcln1,
                //         destination,
                //         CyRcln1,
                //         StRcln2,
                //         IntRcln1,
                //         CrRcln1,
                //         CrRcln2
                //     }
                // });
                window.open('https://travel.liontravel.com/search?' + this.filterAllState(), this.props.hrefTarget);
            } else {
                alert(warnings.join('、'));
            }
        });
    }
    changeDestination = (() => {
        return {
            add: (data) => {
                const { destination } = this.state;
                const checkLevel = this.changeDestination.checkLevel;
                let arr = [];

                // 點擊更大層數的處理
                if (data.vLinetravel === '_') {
                    // console.log('點第一層');
                    let newArr = [...destination].filter(item => item.vLine !== data.vLine);
                    arr = [...newArr, data];

                } else if (data.vLinewebarea === '_') {
                    let newArr = [...destination].filter(item => item.vLinetravel !== data.vLinetravel);
                    if (checkLevel(data, 'vLinetravel', 'vLine')) {
                        // console.log('塊陶阿!!!有第一層的選項在!!!');
                        arr = [...newArr, data].filter(item => item.vLinetravel !== '_' || item.vLine !== data.vLine);
                    } else {
                        // console.log('點第二層');
                        arr = [...newArr, data];
                    }
                } else {
                    if (checkLevel(data, 'vLinetravel', 'vLine')) {
                        // console.log('塊陶阿!!!有第一層的選項在!!!');
                        arr = [...destination, data].filter(item => item.vLinetravel !== '_' || item.vLine !== data.vLine);
                    } else if (checkLevel(data, 'vLinewebarea', 'vLinetravel')) {
                        // console.log('塊陶阿!!!有第二層的選項在!!!');
                        arr = [...destination, data].filter(item => item.vLinewebarea !== '_' || item.vLinetravel !== data.vLinetravel);
                    } else {
                        // console.log('點第三層');
                        arr = [...destination, data];
                    }
                }

                return arr;
            },
            remove: (data) => {
                const { destination } = this.state;
                return destination.filter(item => data.value !== item.value);
            },
            checkLevel: (data, condition1, condition2) => {
                const { destination } = this.state;
                return destination.some(item => {
                    return item[condition1] === '_' && item[condition2] === data[condition2];
                });
            }
        };
    })();

    render () {
        const {
            data,
            StRcln1,
            destination,
            StRcln2,
            IntRcln1,
            CyRcln1,
            CrRcln1,
            CrRcln2,
            option1,
            option2
        } = this.state;
        return (
            <div className="travel_panel pc">
                <StRcln
                    option={option1}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={StRcln1}
                    ClassName="strcln_custom"
                    req
                    breakline
                    onChangeCallBack={(value) => this.setState({ StRcln1: value })}
                />

                <Label
                    isRequired
                    label="目的地"
                    iconName="toolmap"
                    onClick={() => this.dtmChild.handleOpenMenu()}
                    subComponent={
                        <WrapperDtmRcln
                            ref={ref => { this.dtmChild = ref }}
                            travelDataSource={data}
                            fetchPath={this.fetchPath}
                            selectedData={destination}
                            max={this.WrapperDtmRclnMax}
                            // int rcln
                            placeholder={!destination.length ? '請選擇/可輸入目的地、景點' : ''}
                            // act racp
                            minimumStringQueryLength={2}            // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字"  // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目"   // 當沒有配對資料時顯示那些文字
                            // dtm rcln
                            // sublabel="找不到選項？請輸入關鍵字查詢"
                            sublabel="找不到選項?請輸入關鍵字查詢 / 最多可選擇3則目的地"
                            onChange={(data) => {
                                if (destination.some(item => data.value === item.value)) {
                                    this.setState({
                                        destination: this.changeDestination.remove(data)
                                    });
                                } else if (destination.length < this.WrapperDtmRclnMax) {
                                    this.setState({
                                        destination: this.changeDestination.add(data)
                                    });
                                } else {
                                    return;
                                }
                            }}
                        />
                    }
                />

                <Calendar
                    titleTxt="出發區間"
                    totleNights={true}
                    onChange={(d) => this.setState({ CyRcln1: [d.startInputValue, d.endInputValue] })}
                    setEndDate={36}  // 月曆可選日期最大上限(單位/月),不設定則預設是12個月;
                    setActiveEnd={36}  // 月曆最大上限(單位/月),不設定則預設是12個月;
                    startTxt="最早"
                    endTxt="最晚"
                    defaultStartDate={CyRcln1[0]}
                    defaultEndDate={CyRcln1[1]}
                />

                <div className="travel_panel-row">
                    <StRcln
                        option={option2}
                        placeholder="請選擇"
                        label="旅遊天數"
                        icon={<IcRcln name="toolmap" />}
                        defaultValue={StRcln2}
                        ClassName="strcln_custom"
                        breakline
                        onChangeCallBack={(value) => this.setState({ StRcln2: value })}
                    />
                    <Label
                        label="產品名/關鍵字"
                        onClick={() => this.intChild.inputDOM.focus()}
                        subComponent={
                            <IntRcln
                                ref={ref => { this.intChild = ref }}
                                placeholder="可輸入團號"
                                value={IntRcln1}
                                onChange={(e) => this.setState({ IntRcln1: e.target.value })}
                                onClearValue={() => this.setState({ IntRcln1: '' })}
                            />
                        }
                    />
                </div>

                <div>
                    <CrRcln
                        textContent="只找成團"
                        checked={CrRcln1}
                        whenChange={(e) => this.setState({ CrRcln1: e })}
                    />
                    <PpRcln
                        CustomComponent={<IcRcln name="toolif" size="x1" />}
                        ContentComponent={<ContentComponent />}
                        moduleClassName="PpRcln1 m-l-xs m-r-md"
                        width="360px"
                        events={['click', 'hover']}
                        position={['bottom', 'horizon_center']}
                    />
                    <CrRcln
                        textContent="只找可報名團體"
                        checked={CrRcln2}
                        whenChange={(e) => this.setState({ CrRcln2: e })}
                    />
                </div>

                <BtRcnb lg radius whenClick={this.handleSubmit}>搜尋</BtRcnb>
            </div>
        );
    }
}

export default Panel;