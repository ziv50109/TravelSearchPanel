import React, { Component } from 'react';
import dayjs from 'dayjs';
import { fetchJsToObj } from '../../../utils';

import NvbRslb from '../../../magaele/nvb_rslb';    // M版滑出
import StRcln from '../../../magaele/st_rcln';      // select
import IcRcln from '../../../magaele/ic_rcln';      // icon
import BtRcnb from '../../../magaele/bt_rcnb';      // button
import IntRcln from '../../../magaele/int_rcln';    // input
import CrRcln from '../../../magaele/cr_rcln';      // checkbox
import PpRcln from '../../../magaele/pp_rcln';      // popup
import CyRcmn from '../../../magaele/cy_rcmn';

import WrapperDtmRcln from '../component/WrapperDtmRcln_m.js';      // 目的地
// import ComposeCalendar from '../component/ComposeCalendar';      // 日曆

import Label from '../../../magaele/int_rctg/components/Label/Label';
import Multiple from '../../../magaele/int_rctg/components/Multiple/Multiple';

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
        this.state = {
            ThemeID: '',
            DepartureID: '',
            wrapperDtmRcln: [],
            CyRcln1: [],
            Days: '',
            Keywords: '',
            IsEnsureGroup: false,
            IsSold: false,
            activeInput: 0,
        };
        this.WrapperDtmRclnMax = 3;
        this.fetchPath = './json/TRS1PSUBJECT.js';
        // this.fetchPath = './json/TRS1NEWTRAVEL.js';
        this.themeOptions = [];
        this.option1 = [];
        this.option2 = [
            { text: '不限', value: '' },
            { text: '1日', value: 1 },
            { text: '2日', value: 2 },
            { text: '3日', value: 3 },
            { text: '4日', value: 4 },
            { text: '5日', value: 5 },
            { text: '6日', value: 6 },
            { text: '7日', value: 7 },
            { text: '8日', value: 8 },
            { text: '9日', value: 9 },
            { text: '10日及以上', value: 10 }
        ];
    }
    componentDidMount () {
        fetchJsToObj(this.fetchPath, (d) => {
            this.themeOptions = this.objToOption(d.vPsubject);
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
            CyRcln1,
            GoDateStart,
            GoDateEnd
        } = this.state;
        let warningText = [];
        if (wrapperDtmRcln.length < 1) {
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
            ThemeID,
            DepartureID,
            wrapperDtmRcln,
            CyRcln1,
            Days,
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

        return `Country=TW&WebCode=B2C&TravelType=0&Page=1&PageSize=20&ThemeID=${ThemeID}&DepartureID=${DepartureID}&GoDateStart=${CyRcln1[0]}&GoDateEnd=${CyRcln1[1]}&Days=${Days}&IsEnsureGroup=${IsEnsureGroup}&IsSold=${IsSold}&Keywords=${Keywords}&ArriveID=${ArriveID.join('')}&ArriveTEXT=${ArriveTEXT}`;
    }

    handleOpenPage = (value) => {
        this.setState({
            activeInput: value,
        });
    }
    handleClosePage = () => {
        this.setState({
            activeInput: 0,
        });
    }

    submitBtn () {
        console.log('click');
    }
    render () {
        const {
            wrapperDtmRcln,
            activeInput,
            CyRcln1
        } = this.state;

        const showCalendarPage = activeInput === 2;
        const showDestinationPage = activeInput === 1;
        const pageVisible = showCalendarPage || showDestinationPage;

        const query = wrapperDtmRcln.map(item => {
            let text = '';
            if (item.vLinewebarea === '_') {
                text = item.txt || item.text;
            } else {
                text = `${item.text}-${item.vLinetravelText}`;
            }
            return text;
        });
        return (

            <div className="themeTravel">

                <StRcln
                    option={this.themeOptions}
                    placeholder="請選擇"
                    label="旅遊主題"
                    icon={<IcRcln name="productrefer" />}
                    defaultValue={'_'}
                    ClassName="strcln_custom m-b-sm"
                    req
                    breakline
                    onChangeCallBack={(e) => this.setState({ ThemeID: e.split('_').join('') })}
                />

                <StRcln
                    option={this.option1}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={'_'}
                    ClassName="strcln_custom m-b-sm"
                    req
                    breakline
                    onChangeCallBack={(e) => this.setState({ DepartureID: e.split('_').join('') })}
                />

                <Label
                    isRequired
                    label="目的地"
                    iconName="toolmap"
                    subComponent={
                        <div onClick={() => this.handleOpenPage(1)}>
                            <Multiple
                                maxLength={this.WrapperDtmRclnMax}
                                placeholder={'請選擇/可輸入目的地、景點關鍵字'}
                                query={query}
                            />
                        </div>
                    }
                />

                <div className="input_group calendar_compose" onClick={() => this.handleOpenPage(2)}>
                    <IntRcln
                        request
                        readOnly
                        placeholder="YYYY/MM/DD"
                        label="出發日期"
                        icon={<IcRcln name="tooldate" />}
                        value={CyRcln1[0] && CyRcln1[0].replace(/\-/g, '/')}
                    />
                    <span className="cal_icon">~</span>
                    <IntRcln
                        readOnly
                        placeholder="YYYY/MM/DD"
                        value={CyRcln1[1] && CyRcln1[1].replace(/\-/g, '/')}
                    />
                </div>

                <StRcln
                    option={this.option2}
                    placeholder="請選擇"
                    label="旅遊天數"
                    icon={<IcRcln name="tooldate" />}
                    defaultValue={''}
                    ClassName="strcln_custom m-b-sm"
                    breakline
                    onChangeCallBack={(e) => this.setState({ Days: e })}
                />

                <IntRcln
                    placeholder="可輸入團號"
                    label="產品名稱/關鍵字"
                    className="m-b-sm"
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
                    className="d-ib m-l-xl"
                    whenChange={(e) => this.setState({ IsSold: e })}
                />

                <BtRcnb prop="string" className="h-sm fluid m-t-80" whenClick={this.handleSubmit} md radius>搜尋</BtRcnb>

                <NvbRslb
                    className="themeTravel-nvb"
                    visible={pageVisible}
                    direction="right"
                >
                    <NvbGoBack onClick={this.handleClosePage} />
                    {
                        showDestinationPage &&
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
                                parentData={wrapperDtmRcln}
                                emitPushData={(array) => {
                                    this.setState({
                                        wrapperDtmRcln: array,
                                        activeInput: 0
                                    });
                                }}
                            />
                    }
                    {
                        showCalendarPage &&
                            <CyRcmn
                                doubleChoose
                                selectedStartDate={CyRcln1[0]}
                                selectedEndDate={CyRcln1[1]}
                                startLabelTitle="最早出發日"
                                endLabelTitle="最晚出發日"
                                endMonth={dayjs().add(3, 'years').format('YYYY-MM')}
                                endDate={dayjs().add(3, 'years').format('YYYY-MM-DD')}
                                ref={e => { this.calendar = e }}
                                onClickConfirm={() => {
                                    const {
                                        selectedStartDate,
                                        selectedEndDate,
                                    } = this.calendar.state;
                                    this.setState({
                                        CyRcln1: [selectedStartDate, selectedEndDate],
                                        activeInput: 0
                                    });
                                }}
                                customDiffTxt={diffDate => {
                                    const showTxt = diffDate + 1;
                                    return '共' + showTxt + '天';
                                }}
                            />
                    }
                </NvbRslb>
            </div>

        );
    }
}

export default Panel;
