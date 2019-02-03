import React, { Component } from 'react';
import dayjs from 'dayjs';
import { addDate, fetchJsToObj, isJsonString } from '../../../../utils';
import { vacationGroup } from '../../../../source.config';

import NvbRslb from '../../../../magaele/nvb_rslb';    // M版滑出
import StRcln from '../../../../magaele/st_rcln';      // select
import IcRcln from '../../../../magaele/ic_rcln';      // icon
import BtRcnb from '../../../../magaele/bt_rcnb';      // button
import IntRcln from '../../../../magaele/int_rcln';    // input
import CrRcln from '../../../../magaele/cr_rcln';      // checkbox
import CyRcmn from '../../../../magaele/cy_rcmn';
import LbxRcln from '../../../component/LbxRcln';

import WrapperDtmRcln from '../component/WrapperDtmRcln_m.js';      // 目的地
// import ComposeCalendar from '../../../component/ComposeCalendar';      // 日曆

import Label from '../../../../magaele/int_rctg/components/Label/Label';
import Multiple from '../../../../magaele/int_rctg/components/Multiple/Multiple';

import '../../../component/input_group.scss';
import '../css.scss';

// [ popup ]
const ContentComponent = (props) => {
    return (
        <div className={`vacationGroup-pp_rcln-popup ${props.className}`}>
            <p>本公司「成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團：</p>
            <ul>
                <li><span>一、</span><p>不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。</p></li>
                <li><span>二、</span><p>「成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。</p></li>
            </ul>
        </div>
    );
};

// 分頁 component 回上一頁箭頭
const NvbGoBack = ({ onClick }) => (
    <span
        className="nvb_rslb_goBack"
        onClick={onClick}
    >
        <IcRcln name="toolbefore" />
    </span>
);

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
        this.defaultStartDate = dayjs().add(15, 'day').format('YYYY-MM-DD');
        this.defaultEndtDate = dayjs().add(30, 'day').format('YYYY-MM-DD');

        this.state = {
            DepartureID: '',
            destination: [],
            CyRcln1: [this.defaultStartDate, this.defaultEndtDate],
            Keywords: '',
            IsEnsureGroup: false,
            IsSold: false,
            data: {},
            option1: [],
            activeInput: null,
            lbxRclnisOpen: false
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
        //     CyRcln1,
        //     Keywords,
        //     IsEnsureGroup,
        //     IsSold
        // } = this.state;
        // const GoDateStart = CyRcln1[0];
        // const GoDateEnd = CyRcln1[1];

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
                //         IsSold
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
            CyRcln1,
            GoDateStart,
            GoDateEnd
        } = this.state;
        let warningText = [];
        if (destination.length < 1) {
            warningText.push('請輸入 / 選擇目的地');
        }
        if (CyRcln1.length < 2) {
            warningText.push('請選擇出發日期');
        }
        cbfn(warningText.length === 0, warningText);
    }

    // 組合參數
    filterAllState = () => {
        const {
            DepartureID,
            destination,
            CyRcln1,
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

        return `Country=TW&WebCode=B2C&TravelType=2&Page=1&PageSize=20&DepartureID=${_DepartureID}&GoDateStart=${CyRcln1[0]}&GoDateEnd=${CyRcln1[1]}&IsEnsureGroup=${IsEnsureGroup}&IsSold=${IsSold}&Keywords=${Keywords}&ArriveID=${ArriveID.join('')}&ArriveTEXT=${ArriveTEXT}`;
    }

    handleOpenPage = (value) => {
        this.setState({
            activeInput: value,
        });
    }
    handleClosePage = () => {
        this.setState({
            activeInput: null,
        });
    }
    toggleLbxRcln = () => {
        this.setState((prevState) => ({ lbxRclnisOpen: !prevState.lbxRclnisOpen }));
    }

    submitBtn () {
        console.log('click');
    }
    render () {
        const {
            data,
            option1,
            activeInput,
            DepartureID,
            destination,
            Keywords,
            CyRcln1,
            IsEnsureGroup,
            IsSold,
            lbxRclnisOpen
        } = this.state;

        const showCalendarPage = activeInput === 0 || activeInput === 1;
        const showDestinationPage = activeInput === 2;
        const pageVisible = showCalendarPage || showDestinationPage;

        const query = destination.map(item => {
            let text = '';
            if (item.vLinewebarea === '_') {
                text = item.txt || item.text;
            } else {
                text = `${item.text}-${item.vLinetravelText}`;
            }
            return text;
        });
        return (

            <div className="vacationGroup">
                <StRcln
                    option={option1}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={DepartureID || ''}
                    ClassName="strcln_custom m-b-sm"
                    req
                    breakline
                    onChangeCallBack={(e) => this.setState({ DepartureID: e })}
                />

                <Label
                    isRequired
                    label="目的地"
                    iconName="toolmap"
                    onClick={() => this.handleOpenPage(2)}
                    subComponent={
                        <div className="m-dtm_wrap" onClick={() => this.handleOpenPage(2)}>
                            <Multiple
                                maxLength={this.WrapperDtmRclnMax}
                                placeholder={!destination.length ? '請選擇/可輸入目的地、景點關鍵字' : ''}
                                query={query}
                                readOnly
                            />
                        </div>
                    }
                />

                <div className="input_group calendar_compose">
                    <IntRcln
                        request
                        readOnly
                        placeholder="YYYY/MM/DD"
                        label="出發區間"
                        icon={<IcRcln name="tooldate" />}
                        onClick={() => this.handleOpenPage(0)}
                        value={CyRcln1[0] && CyRcln1[0].replace(/\-/g, '/')}
                    />
                    <span className="cal_icon">~</span>
                    <IntRcln
                        readOnly
                        placeholder="YYYY/MM/DD"
                        onClick={() => this.handleOpenPage(1)}
                        value={CyRcln1[1] && CyRcln1[1].replace(/\-/g, '/')}
                    />
                </div>

                <div className="intRclnWrap">
                    <IntRcln
                        placeholder="可輸入團號"
                        label="產品名/關鍵字"
                        className="m-b-sm"
                        value={Keywords}
                        breakline
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
                <IcRcln
                    name="toolif"
                    size="x1"
                    className="pp_rcln m-l-xs m-r-md"
                    onClick={this.toggleLbxRcln}
                />
                <LbxRcln open={lbxRclnisOpen} closeLbxRcln={this.toggleLbxRcln}>
                    <ContentComponent className="lbx_wrap" />
                </LbxRcln>
                <CrRcln
                    type="checkbox"
                    textContent="只找可報名團體"
                    className="d-ib m-l-xl"
                    checked={IsSold}
                    whenChange={(e) => this.setState({ IsSold: e })}
                />

                <BtRcnb prop="string" className="h-sm fluid m-t-30" whenClick={this.handleSubmit} md radius>搜尋</BtRcnb>

                <NvbRslb
                    className="vacationGroup-nvb"
                    visible={pageVisible}
                    direction="right"
                >
                    <NvbGoBack onClick={this.handleClosePage} />
                    {
                        showDestinationPage &&
                            <WrapperDtmRcln
                                travelDataSource={data}
                                fetchPath={this.fetchPath}
                                selectedData={destination}
                                max={this.WrapperDtmRclnMax}
                                // int rcln
                                placeholder="請選擇/可輸入目的地、景點關鍵字"
                                // act racp
                                minimumStringQueryLength={2}            // 最少輸入幾個字
                                minimumStringQuery="請輸入至少兩個文字"  // 尚未輸入文字字數到達要求會顯示此字串
                                noMatchText="很抱歉，找不到符合的項目"   // 當沒有配對資料時顯示那些文字
                                // dtm rcln
                                sublabel="找不到選項?請輸入關鍵字查詢 / 最多可選擇3則目的地"
                                parentData={destination}
                                emitPushData={(array) => {
                                    this.setState({
                                        destination: array,
                                        activeInput: null
                                    });
                                }}
                            />
                    }
                    {
                        showCalendarPage &&
                        <div className="vacationGroup-cyRcmnWrap">
                            <CyRcmn
                                doubleChoose
                                selectedStartDate={CyRcln1[0]}
                                selectedEndDate={CyRcln1[1]}
                                startLabelTitle="最早出發日"
                                endLabelTitle="最晚出發日"
                                activeInput={activeInput}
                                endMonth={dayjs().add(3, 'years').format('YYYY-MM')}
                                // endDate={dayjs().add(3, 'years').format('YYYY-MM-DD')}
                                ref={e => { this.calendar = e }}
                                onClickConfirm={() => {
                                    const {
                                        selectedStartDate,
                                        selectedEndDate,
                                    } = this.calendar.state;
                                    this.setState({
                                        CyRcln1: [selectedStartDate, selectedEndDate],
                                        activeInput: null
                                    });
                                }}
                            />
                        </div>
                    }
                </NvbRslb>
            </div>

        );
    }
}

export default Panel;
