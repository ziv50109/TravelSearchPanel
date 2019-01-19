import React, { Component } from 'react';
import { addDate, fetchJsToObj, isJsonString } from '../../../../utils';
import { vacationGroup } from '../../../../source.config';

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
            <p>本公司「成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團：</p>
            <ul>
                <li><span>一、</span><p>不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。</p></li>
                <li><span>二、</span><p>「成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。</p></li>
            </ul>
        </div>
    );
};

class Panel extends Component {
    constructor (props) {
        super(props);
        this.WrapperDtmRclnMax = 3;
        this.fetchPath = vacationGroup.place;
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.today = `${this.year}-${this.month}-${this.day}`;
        this.defaultStartDate = `${addDate(this.today, 15)[1]}-${addDate(this.today, 15)[2]}-${addDate(this.today, 15)[3]}`;
        this.defaultEndtDate = `${addDate(this.today, 30)[1]}-${addDate(this.today, 30)[2]}-${addDate(this.today, 30)[3]}`;

        this.state = {
            DepartureID: '',
            destination: [],
            GoDateStart: this.defaultStartDate,
            GoDateEnd: this.defaultEndtDate,
            Keywords: '',
            IsEnsureGroup: false,
            IsSold: false,
            data: {},
            option1: []
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
        //     panel: 'groupVacation',
        //     methods: 'get',
        // }, (data) => {
        //     this.localStorageDataToState(data);
        // });
    }

    shouldComponentUpdate (nextProps, nextState) {
        return this.state !== nextState;
    }

    // localStorageDataToState = (data) => {
    //     let newData = { ...data };
    //     if (new Date(data.CyRcln1[0]).getTime() < this.date.getTime()) {
    //         newData.CyRcln1 = [this.defaultStartDate, this.defaultEndtDate];
    //         newData.GoDateStart = this.defaultStartDate;
    //         newData.GoDateEnd = this.defaultEndtDate;
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

    handleSubmit = () => {
        // const {
        //     DepartureID,
        //     destination,
        //     GoDateStart,
        //     GoDateEnd,
        //     Keywords,
        //     IsEnsureGroup,
        //     IsSold,
        // } = this.state;
        // const CyRcln1 = [GoDateStart, GoDateEnd];

        this.validate((boolean, warnings) => {
            if (boolean) {
                // useLocalStorage({
                //     panel: 'groupVacation',
                //     methods: 'post',
                //     data: {
                //         DepartureID,
                //         destination,
                //         GoDateStart,
                //         GoDateEnd,
                //         CyRcln1,
                //         Keywords,
                //         IsEnsureGroup,
                //         IsSold,
                //     }
                // });
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
            destination,
            CyRcln,
            GoDateStart,
            GoDateEnd
        } = this.state;
        let warningText = [];
        if (destination.length < 1) {
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
            destination,
            GoDateStart,
            GoDateEnd,
            // Days,
            Keywords,
            IsEnsureGroup,
            IsSold,
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
        const ArriveTEXT = destination.map(item => {
            return `${item.text}-${item.vLinetravelText}`;
        });
        const _DepartureID = DepartureID.split('_').join('');

        return `Country=TW&WebCode=B2C&TravelType=2&Page=1&PageSize=20&DepartureID=${_DepartureID}&GoDateStart=${GoDateStart}&GoDateEnd=${GoDateEnd}&IsEnsureGroup=${IsEnsureGroup}&IsSold=${IsSold}&Keywords=${Keywords}&ArriveID=${ArriveID.join('')}&ArriveTEXT=${ArriveTEXT}`;
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
            option1,
            DepartureID,
            destination,
            GoDateStart,
            GoDateEnd,
            Keywords,
            IsEnsureGroup,
            IsSold
        } = this.state;
        return (

            <div className="vacationGroup pc">

                <StRcln
                    option={option1}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={DepartureID || ''}
                    ClassName="strcln_custom"
                    req
                    breakline
                    onChangeCallBack={(e) => this.setState({ DepartureID: e })}
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
                            placeholder={!destination.length ? '請選擇/可輸入目的地、景點關鍵字' : ''}
                            // act racp
                            minimumStringQueryLength={2}            // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字"  // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目"   // 當沒有配對資料時顯示那些文字
                            // dtm rcln
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

                <ComposeCalendar
                    titleTxt="出發日期"
                    totleNights={true}
                    onChange={(e) => this.setState({ GoDateStart: e.startInputValue, GoDateEnd: e.endInputValue })}
                    setEndDate={36}  // 月曆可選日期最大上限(單位/月),不設定則預設是12個月;
                    setActiveEnd={36}  // 月曆最大上限(單位/月),不設定則預設是12個月;
                    startTxt="最早"
                    endTxt="最晚"
                    defaultStartDate={GoDateStart}
                    defaultEndDate={GoDateEnd}
                />

                <div className="intRclnWrap">
                    <IntRcln
                        placeholder="可輸入團號"
                        label="產品名/關鍵字"
                        breakline
                        value={Keywords}
                        onChange={(e, data) => {
                            this.setState({ Keywords: data });
                        }}
                        onClearValue={(inputDOM) => {
                            inputDOM.value = '';
                            this.setState({ Keywords: '' }); // 用 setState 去清除
                        }}
                    />
                </div>

                <CrRcln
                    type="checkbox"
                    textContent="只找成團"
                    className="d-ib"
                    checked={IsEnsureGroup}
                    whenChange={(e) => this.setState({ IsEnsureGroup: e })}
                />
                <PpRcln
                    CustomComponent={<IcRcln name="toolif" className="md-fz-smd" />}
                    ContentComponent={<ContentComponent />}
                    moduleClassName="PpRcln1 m-l-xs lightgray"
                    events={['hover']}
                    width="360px"
                    position={['bottom', 'horizon_center']}
                />

                <CrRcln
                    type="checkbox"
                    textContent="只找可報名團體"
                    className="d-ib m-l-lg"
                    checked={IsSold}
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
