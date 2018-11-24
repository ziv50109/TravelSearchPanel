import React, { PureComponent } from 'react';

import { fetchJsToObj } from '../../../utils';
import { travel } from '../../../source.config';

// 單純組件
import Label from '../../../magaele/int_rctg/components/Label/Label.js';            // 外框
import NvbRslb from '../../../magaele/nvb_rslb';                                    // M 版的滑出頁
import StRcln from '../../../magaele/st_rcln';                                      // select
import IntRcln from '../../../magaele/int_rcln';                                    // input
import CrRcln from '../../../magaele/cr_rcln';                                      // checkbox
import PpRcln from '../../../magaele/pp_rcln';                                      // popovers
import IcRcln from '../../../magaele/ic_rcln';                                      // icon
import BtRcnb from '../../../magaele/bt_rcnb';                                      // button
import Multiple from '../../../magaele/int_rctg/components/Multiple/Multiple.js';   // panel 目的地選單的 item
// 複合組件
import WrapperDtmRcln from '../component/WrapperDtmRcln_m.js';                      // 目的地
import CyRcmn from '../../../magaele/cy_rcmn';                                      // M 版月曆

import '../css.scss';


const ContentComponent = (props) => {
    return (
        <div className="travel_panel-pp_rcln-popup">
            <p>本公司「已成團」之旅遊團體，係指報名參團人數已達出團標準，但團體出發前若遇有以下情事，將依國外（內）團體旅遊定型化契約書取消出團：</p>
            <ul>
                <li><span>一、</span><p>不可抗力、不可歸責於雙方當事人之事由，如颱 風、海嘯、地震、洪災等不可抗力之天然災害；或罷工、戰亂抗爭、官方封閉旅遊地區、重大疫情等不可歸責之人為因素。</p></li>
                <li><span>二、</span><p>「已成團」之旅遊團體所遊覽地區或國家，經外交部領事事務局或交通部觀光局或其他官方單位列為橙色警示、或紅色警示。</p></li>
            </ul>
        </div>
    );
};

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
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

class Panel extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            // query string
            StRcln1: '',
            destination: [],
            CyRcln1: [],
            StRcln2: '',
            IntRcln: '',
            CrRcln1: false,
            CrRcln2: false,
            activeInput: 0,
            // fetch data
            data: {},
            // select options
            option1: [],
            option2: [
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
            ]
        };
        this.WrapperDtmRclnMax = 3;
        this.fetchPath = travel.place;

        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
    }
    componentDidMount () {
        const sessionData = sessionStorage.getItem(this.fetchPath);

        if (!sessionData || !isJsonString(sessionData)) {
            fetchJsToObj(this.fetchPath, (d) => {
                let stringifyData = JSON.stringify(d);
                this.setState({
                    data: d,
                    option1: this.objToOption(d.vCity)
                });
                sessionStorage.setItem(this.fetchPath, stringifyData);
            });
        } else {
            const jsonData = JSON.parse(sessionData);
            this.setState({
                data: jsonData,
                option1: this.objToOption(jsonData.vCity)
            });
        }
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
        if (CyRcln1.length < 2) {
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
            IntRcln,
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
        return `DepartureID=${StRcln1}&ArriveID=${ArriveID.join('')}&GoDateStart=${CyRcln1[0]}&GoDateEnd=${CyRcln1[1]}&Days=${StRcln2}&Keywords=${IntRcln}&IsEnsureGroup=${CrRcln1}&IsSold=${CrRcln2}`;
    }

    handleSubmit = () => {
        this.validate((boolean, warnings) => {
            if (boolean) {
                window.open('https://travel.liontravel.com/search?' + this.filterAllState(), this.props.hrefTarget);
            } else {
                alert(warnings.join('、'));
            }
        });
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

    render () {
        const {
            data,
            destination,
            activeInput,
            CyRcln1,
            option1,
            option2
        } = this.state;
        const showCalendarPage = activeInput === 2;
        const showDestinationPage = activeInput === 1;
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
            <div className="travel_panel mobile">
                <Label
                    isRequired
                    label="出發地"
                    iconName="toolmap"
                    subComponent={
                        <StRcln
                            option={option1}
                            defaultValue=""
                            onChangeCallBack={(value) => this.setState({ StRcln1: value })}
                        />
                    }
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

                <Label
                    isRequired
                    label="出發區間"
                    iconName="tooldate"
                    onClick={() => this.handleOpenPage(2)}
                    subComponent={
                        <div className="input_group">
                            <IntRcln
                                readOnly
                                placeholder="YYYY/MM/DD"
                                value={CyRcln1[0] && CyRcln1[0].replace(/\-/g, '/')}
                            />
                            <span className="cal_icon">~</span>
                            <IntRcln
                                readOnly
                                placeholder="YYYY/MM/DD"
                                value={CyRcln1[1] && CyRcln1[1].replace(/\-/g, '/')}
                            />
                        </div>
                    }
                />

                {/* <div className="travel_panel-row"> */}
                <Label
                    label="旅遊天數"
                    iconName="tooldate"
                    subComponent={
                        <StRcln
                            option={option2}
                            defaultValue=""
                            onChangeCallBack={(value) => this.setState({ StRcln2: value })}
                        />
                    }
                />
                <Label
                    label="產品名/關鍵字"
                    subComponent={
                        <IntRcln
                            placeholder="可輸入團號"
                            value={this.state.IntRcln}
                            onChange={(e) => this.setState({ IntRcln: e.target.value })}
                            onClearValue={() => this.setState({ IntRcln: '' })}
                        />
                    }
                />
                <div className="chkbox-group">
                    <CrRcln
                        textContent="只找保證出團"
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
                        whenChange={(e) => this.setState({ CrRcln2: e })}
                    />
                </div>

                <BtRcnb lg radius className={'btnSearch'} whenClick={this.handleSubmit}>搜尋</BtRcnb>


                <NvbRslb
                    className="travel_panel-nvb"
                    visible={pageVisible}
                    direction="right"
                >
                    <NvbGoBack onClick={this.handleClosePage} />
                    {
                        showDestinationPage &&
                        <WrapperDtmRcln
                            dataSource={data}
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
                            sublabel="找不到選項？請輸入關鍵字查詢"
                            emitPushData={(array) => {
                                this.setState({
                                    destination: array,
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
                            startLabelTitle="入住日期"
                            endLabelTitle="退房日期"
                            endDate={`${this.year + 3}-${this.month}-${this.day}`}
                            endMonth={`${this.year + 3}-${this.month}`}
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