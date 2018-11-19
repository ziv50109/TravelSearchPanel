import React, { Component } from 'react';
import { fetchJsToObj } from '../../../../utils';

import StRcln from '../../../../magaele/st_rcln';      // select
import IcRcln from '../../../../magaele/ic_rcln';      // icon
import BtRcnb from '../../../../magaele/bt_rcnb';      // button
import IntRcln from '../../../../magaele/int_rcln';    // input
import CrRcln from '../../../../magaele/cr_rcln';      // checkbox
import PpRcln from '../../../../magaele/pp_rcln';      // popup

import Label from '../../../../magaele/int_rctg/components/Label/Label';

import WrapperDtmRcln from '../component/WrapperDtmRcln.js'; // 目的地
import ComposeCalendar from '../../../component/ComposeCalendar';// 日曆

import '../css.scss';

// [ popup ]
const ContentComponent = (props) => {
    return (
        <div className="popup">
            <p>本公司「已成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團：</p>
            <ul>
                <li><span>一、</span><p>不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。</p></li>
                <li><span>二、</span><p>「已成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。</p></li>
            </ul>
        </div>
    );
};

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            DepartureID: '',
            wrapperDtmRcln: [],
            GoDateStart: '',
            GoDateEnd: '',
            Keywords: '',
            IsEnsureGroup: false,
            IsSold: false,
        };
        this.WrapperDtmRclnMax = 3;
        // this.fetchPath = './json/TRS1NEWTRAVEL.js';
        this.fetchPath = './json/TRS1NEWTRAVELFIT.js';
        this.option1 = [];
    }

    componentDidMount () {
        fetchJsToObj(this.fetchPath, (d) => {
            this.option1 = this.objToOption(d.vCity);
            this.forceUpdate();
        });
    }

    shouldComponentUpdate (nextProps, nextState) {
        return this.state !== nextState;
    }

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

    handleSubmit = () => {
        this.validate((boolean, warnings) => {
            if (boolean) {
                window.open('https://travel.liontravel.com/search?' + this.filterAllState(), this.props.hrefTarget);
                console.log('網址列參數===', this.filterAllState());
            } else {
                alert(warnings.join('、'));
            }
        });
    }

    // cbfn = callback function. return 驗證結果[boolean] & 警告文字[array]
    validate = (cbfn) => {
        const {
            wrapperDtmRcln,
            CyRcln,
            GoDateStart,
            GoDateEnd
        } = this.state;
        let warningText = [];
        if (wrapperDtmRcln.length < 1) {
            warningText.push('請輸入 / 選擇目的地');
        }
        if (!GoDateStart && !GoDateEnd) {
            warningText.push('請選擇出發日期');
        }
        cbfn(warningText.length === 0, warningText);
    }

    // 組合參數
    filterAllState = () => {
        const {
            // ThemeID,
            DepartureID,
            // ArriveID,
            wrapperDtmRcln,
            GoDateStart,
            GoDateEnd,
            // Days,
            Keywords,
            IsEnsureGroup,
            IsSold,
        } = this.state;
        // 目的地
        const ArriveID = wrapperDtmRcln.map(item => {
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
        const ArriveTEXT = wrapperDtmRcln.map(item => {
            return `${item.text}-${item.vLinetravelText}`;
        });

        return `Country=TW&WebCode=B2C&TravelType=2&Page=1&PageSize=20&DepartureID=${DepartureID}&GoDateStart=${GoDateStart}&GoDateEnd=${GoDateEnd}&IsEnsureGroup=${IsEnsureGroup}&IsSold=${IsSold}&Keywords=${Keywords}&ArriveID=${ArriveID.join('')}&ArriveTEXT=${ArriveTEXT}`;
    }

    changeDestination = (() => {
        return {
            add: (data) => {
                const { wrapperDtmRcln } = this.state;
                const checkLevel = this.changeDestination.checkLevel;
                let arr = [];

                // 點擊更大層數的處理
                if (data.vLinetravel === '_') {
                    // console.log('點第一層');
                    let newArr = [...wrapperDtmRcln].filter(item => item.vLine !== data.vLine);
                    arr = [...newArr, data];

                } else if (data.vLinewebarea === '_') {
                    let newArr = [...wrapperDtmRcln].filter(item => item.vLinetravel !== data.vLinetravel);
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
                        arr = [...wrapperDtmRcln, data].filter(item => item.vLinetravel !== '_' || item.vLine !== data.vLine);
                    } else if (checkLevel(data, 'vLinewebarea', 'vLinetravel')) {
                        // console.log('塊陶阿!!!有第二層的選項在!!!');
                        arr = [...wrapperDtmRcln, data].filter(item => item.vLinewebarea !== '_' || item.vLinetravel !== data.vLinetravel);
                    } else {
                        // console.log('點第三層');
                        arr = [...wrapperDtmRcln, data];
                    }
                }

                return arr;
            },
            remove: (data) => {
                const { wrapperDtmRcln } = this.state;
                return wrapperDtmRcln.filter(item => data.value !== item.value);
            },
            checkLevel: (data, condition1, condition2) => {
                const { wrapperDtmRcln } = this.state;
                return wrapperDtmRcln.some(item => {
                    return item[condition1] === '_' && item[condition2] === data[condition2];
                });
            }
        };
    })();

    render () {
        const { wrapperDtmRcln } = this.state;
        return (

            <div className="vacationGroup">

                <StRcln
                    option={this.option1}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={''}
                    ClassName="strcln_custom"
                    req
                    breakline
                    onChangeCallBack={(e) => this.setState({ DepartureID: e.split('_').join('') })}
                />

                <Label
                    isRequired
                    label="目的地"
                    iconName="toolmap"
                    subComponent={
                        <WrapperDtmRcln
                            fetchPath={this.fetchPath}
                            selectedData={wrapperDtmRcln}
                            max={this.WrapperDtmRclnMax}
                            // int rcln
                            placeholder="請選擇/可輸入目的地、景點關鍵字"
                            // act racp
                            minimumStringQueryLength={2}            // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字"  // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目"   // 當沒有配對資料時顯示那些文字
                            // dtm rcln
                            sublabel="找不到選項？請輸入關鍵字查詢"
                            onChange={(data) => {
                                if (wrapperDtmRcln.some(item => data.value === item.value)) {
                                    this.setState({
                                        wrapperDtmRcln: this.changeDestination.remove(data)
                                    });
                                } else if (wrapperDtmRcln.length < this.WrapperDtmRclnMax) {
                                    this.setState({
                                        wrapperDtmRcln: this.changeDestination.add(data)
                                    });
                                } else {
                                    return;
                                }
                            }}
                        />
                    }
                />

                <ComposeCalendar
                    onChange= {(e) => this.setState({ GoDateStart: e.startInputValue, GoDateEnd: e.endInputValue })}
                    setEndDate={36}
                    setActiveEnd={36}
                />

                <IntRcln
                    placeholder="可輸入團號"
                    label="產品名稱/關鍵字"
                    breakline
                    onChange={(e, data) => {
                        this.setState({ Keywords: data });
                    }}
                    onClearValue={(inputDOM) => {
                        inputDOM.value = '';
                        this.setState({ Keywords: '' }); // 用 setState 去清除
                    }}
                />

                <CrRcln
                    type="checkbox"
                    textContent="只找保證出團"
                    className="d-ib"
                    whenChange={(e) => this.setState({ IsEnsureGroup: e })}
                />
                <PpRcln
                    CustomComponent={<IcRcln name="toolif" className="md-fz-smd" />}
                    ContentComponent={<ContentComponent />}
                    moduleClassName="PpRcln1 m-l-xs lightgray"
                    events={['click']}
                    width="360px"
                    position={['bottom', 'horizon_center']}
                />

                <CrRcln
                    type="checkbox"
                    textContent="只找可報名團體"
                    className="d-ib m-l-lg"
                    whenChange={(e) => this.setState({ IsSold: e })}
                />

                <div className="txt-right">
                    <BtRcnb prop="string" className="h-sm" whenClick={this.handleSubmit} lg radius>搜尋</BtRcnb>
                </div>
            </div>

        );
    }
}

export default Panel;
