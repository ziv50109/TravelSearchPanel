import React, { Component } from 'react';
import { vacationTaiwan } from '../../../../source.config';

// 單純組件
import Label from '../../../../magaele/int_rctg/components/Label/Label.js';
import CrRcln from '../../../../magaele/cr_rcln';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import CyRcmn from '../../../../magaele/cy_rcmn';
import NvbRslb from '../../../../magaele/nvb_rslb';
import ActRajax from '../../../../magaele/act_rajx';

// 複合組件
import SingleInputMenuM from '../SingleInputMenu/SingleInputMenu_m';
import SearchInput from '../SingleInput/SearchInput';
import dayjs from 'dayjs';
import '../../../component/ComposeCalendar';
import '../css.scss';

const inlineStyle = {
    display: 'inline-block',
    marginBottom: 10 + 'px',
    width: 100 + '%',
    verticalAlign: 'top'
};
const widthCollection = {
    desktop: {
        // width: 390 + 'px',
        marginBottom: 10 + 'px'
    }
};
function responsiveStyle () {
    return Object.assign({}, widthCollection.desktop, inlineStyle);
}
// 顯示的自訂內容-目的地
class DestinationContentComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: this.props.selectedData || [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            dptSelectedData: [],
            dtnSelectedData: []
        };
        this.fetchPath = vacationTaiwan.destination;
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
        const { dptSelectedData } = this.state;
        let arr = [];
        if (dptSelectedData.some(item => data.value === item.value)) {
            arr = dptSelectedData.filter(item => data.value !== item.value);
        } else if (data.value) {
            arr.push(data);
        }
        this.setState({ dptSelectedData: arr });
    };

    dtnHandleChange = data => {
        const { dtnSelectedData } = this.state;
        let arr = [];
        if (dtnSelectedData.some(item => data.value === item.value)) {
            arr = dtnSelectedData.filter(item => data.value !== item.value);
        } else if (data.value) {
            arr.push(data);
        }
        this.setState({ dtnSelectedData: arr });
    };

    handleChange = data => {
        const { selectedData } = this.state;
        let arr = [];
        if (data.value) {
            arr.push(data);
        }
        this.setState({ selectedData: arr });
    };
    closeNvbRslb () {
        this.props.closeNvbRslb();
    }
    setValue = obj => {
        this.setState({ obj: obj });
    };
    getSelect = () => {
        if (this.state.selectedData.length > 0) {
            const datavTcity = this.state.selectedData[0].vTcity.replace('_', '');
            const datavTcityTxt = this.state.selectedData[0].text;
            this.props.getdatavTcity(datavTcity, datavTcityTxt, this.state.selectedData);
            return;
        }
        const datavTcity = '';
        const datavTcityTxt = '';
        this.props.getdatavTcity(datavTcity, datavTcityTxt, this.state.selectedData);
    }
    render () {
        const { selectedData, dptSelectedData, dtnSelectedData } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())} className="nvbRslb_destination">
                <span className="nvb_rslb_goBack" onClick={() => { this.closeNvbRslb() }}>
                    <IcRcln name="toolbefore" />
                </span>
                <SingleInputMenuM
                    className="SingleInputMenu"
                    /* int_rctg/Label */
                    size="" // 框高
                    /* subComponent */
                    fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                    selectedData={selectedData} // 所選擇的資料集
                    // max={this.WrapperDtmRclnMax}
                    /* int_rcln */
                    placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                    getSelect={this.getSelect}
                    /* act_racp */
                    minimumStringQueryLength={2} // 最少輸入幾個字
                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                    /* dtm rcln */
                    subLabel="找不到選項？請輸入關鍵字查詢"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
// 顯示的自訂內容-關鍵字
class ContentComponentKeyword extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            searchKeyWord: '',
            selectText: '',
            isFocus: false,
            show: true,
            // showText: Math.random() > 0.5 ? '請先點選出發地' : '',
            selectedData: [],
        };
        this.fetchData = this.fetchData.bind(this);
        this.AbortController = null;
    }
    _inputOnChangeHandler (value) {
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.fetchData(value);
        }, 500);
    }
    fetchData (value) {
        this.AbortController && this.AbortController.abort();
        this.AbortController = new AbortController();
        const signal = this.AbortController.signal;

        let url = vacationTaiwan.keyword;

        this.props.parentStcity && fetch(`${url}?citycode=${this.props.parentStcity}`, {
            method: 'GET',
            mode: 'no-cors',
            signal,
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }),
        })
            .then(res => {
                return res.json();
            })
            .then(d => this.processData(d, value))
            .catch(res => console.error('request has error', res));
    }
    filterData (arrData, inputText) {
        let arr = [];
        if (arrData.length) {
            const matchStr = inputText.toUpperCase();
            arr = arrData.filter(v => v.txt.indexOf(matchStr) !== -1);
        }
        return arr;
    }
    clearWord (value) {
        this.setState({ searchKeyWord: value, selectText: value });
    }
    isFocus (bool) {
        let show = false;
        if (!this.state.show) {
            show = true;
        }
        this.setState({ isFocus: bool, show: true });
    }
    processData (d, value) {
        let p = new Promise(function (resolve, reject) {
            d.Data.map((item) => {
                item.level2 = '飯店';
                item.level3 = item.HotelCode;
                item.txt = item.HotelName;
            });
            resolve(d);
        });
        p.then(d => {
            const arr = this.filterData(d.Data, value);
            this.setState({ data: d.Data, showData: arr, searchKeyWord: value });
        });

        return p;
    }
    closeNvbRslb () {
        this.props.closeNvbRslb();
    }
    getSelect () {
        this.props.getdataKeyword(this.state.selectText);
    }
    render () {
        const selectedData = this.state.selectedData;
        const txt = (selectedData.length > 0) ? selectedData[0].text : '';
        const selected = selectedData.map(v => v.value);
        return (
            <div>
                <div className="nvb_rslb_title">
                    <span className="nvb_rslb_goBack" onClick={() => { this.closeNvbRslb() }}>
                        <IcRcln name="toolbefore" />
                    </span>
                    <div className="txt-center">關鍵字</div>
                </div>
                <div className="m_keyWord">
                    <SearchInput
                        placeholderText="請輸入飯店名稱"
                        keyWord={this.state.selectText}
                        clearWord={(value) => this.clearWord(value)}
                        onChange={(value) => this._inputOnChangeHandler(value)}
                        isFocus={(bool) => this.isFocus(bool)}
                    />
                    <BtRcnb prop="string" md radius whenClick={() => { this.getSelect() }}>確定</BtRcnb>
                </div>
                <ActRajax
                    containerClass={(!this.state.show && 'd-no')}
                    data={this.state.showData}
                    matchWord={this.state.searchKeyWord}
                    closeBtnOnClick={() => this.setState({ show: false })}
                    getItemClickValue={(v) => this.setState({ selectText: v.txt })}
                    isFocus={this.state.isFocus}
                    showText={this.state.showText}
                    noMatchText="很抱歉，找不到符合的項目"
                    minimumStringQuery={this.props.parentStcity ? '請至少輸入兩個字' : '請先選擇目的地'}
                    minimumStringQueryLength={2}
                    footer={true}
                    rules={[
                        {
                            title: '飯店',
                        }
                    ]}
                ></ActRajax>
            </div>
        );
    }
}

class Destination extends Component {
    state = {
        visible: false,
        sTcity: '',
        sTcitytxt: '',
        allData: []
    };
    openPage = (e, value, input) => {
        input.blur();
        this.setState({
            visible: true,
        });
    }
    getdatavTcity = (e, data, allData) => {
        this.setState({
            sTcity: e,
            sTcitytxt: data,
            visible: false,
            allData: allData
        });
        this.props.getdatavTcity(e);
    }
    render () {
        return (
            <div className="Destination m-b-sm">
                <IntRcln
                    request
                    label="目的地"
                    placeholder="請輸入/選擇目的地"
                    breakline
                    icon={<IcRcln name="toolmap" />}
                    value={this.state.sTcitytxt}
                    onClick={this.openPage}
                />
                <NvbRslb
                    visible={this.state.visible}
                    ContentComponent={this.state.visible && <DestinationContentComponent
                        getdatavTcity={(e, data, allData) => this.getdatavTcity(e, data, allData)}
                        closeNvbRslb={value => { this.setState({ visible: false }) }}
                        selectedData={this.state.allData}
                    />}
                    direction="right"
                    width="100%"
                />
            </div>
        );
    }
}
class Keyword extends Component {
    state = {
        visible: false,
        sHotelName: ''

    };
    openPage = () => {
        this.setState({
            visible: true,
        });
    }
    getdataKeyword (data) {
        this.setState({
            visible: false,
            sHotelName: data
        });
        this.props.getdataKeyword(data);
    }
    render () {
        return (
            <div className="keywordComponent m-b-sm">
                <IntRcln
                    label="關鍵字"
                    placeholder="請輸入飯店名稱"
                    breakline
                    value={this.state.sHotelName}
                    onClick={this.openPage}
                    // 清除按鈕: 用 onMouseDown 去呼叫 handleClearValue，會傳回當下 input 的 value
                    onClearValue={value => {
                        this.setState({ value: '' });
                    }}
                />
                <NvbRslb
                    visible={this.state.visible}
                    className="m_keywordComponent"
                    ContentComponent={
                        <ContentComponentKeyword
                            closeNvbRslb={value => { this.setState({ visible: false }) }}
                            getdataKeyword={(data) => { this.getdataKeyword(data) }}
                            getSelect={(data) => { this.getSelect(data) }}
                            parentStcity={this.props.parentStcity}
                        />
                    }
                    direction="right"
                    width="100%"
                />
            </div>
        );
    }
}
class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            searchKeyWord: '',
            selectedStartDate: '',
            selectedEndDate: '',
            activeInput: null,

            sFcountry: 'TW',
            sFcity: '',

            sTcountry: 'TW',
            sTcity: '',


            sFreekind: '',
            sFreekind1: '',

            sDatef: '20181023',
            sDatet: '20181031',

            sHotelName: '',
            items: {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false,
            },
            Tools: []
        };
        this.option = [
            { text: '不限', value: '_' },
            { text: '台北', value: '_TPE' },
            { text: '板橋', value: '_PAN' },
            { text: '桃園', value: '_TAO' },
            { text: '新竹', value: '_HCU' },
            { text: '苗栗', value: '_MLI' },
            { text: '台中', value: '_TCH' },
            { text: '彰化', value: '_CHA' },
            { text: '南投', value: '_NTO' },
            { text: '雲林', value: '_YLI' },
            { text: '嘉義', value: '_CYI' },
            { text: '台南', value: '_TNN' },
            { text: '高雄', value: '_KHH' },
            { text: '屏東', value: '_PIN' },
            { text: '花蓮', value: '_HLN' },
            { text: '台東', value: '_TTT' }
        ];
    }
    // state = {
    //     data: [],
    //     searchKeyWord: '',
    //     selectedStartDate: '',
    //     selectedEndDate: '',
    //     activeInput: null,

    //     sFcountry: 'TW',
    //     sFcity: '',

    //     sTcountry: 'TW',
    //     sTcity: '',


    //     sFreekind: '',
    //     sFreekind1: '',

    //     sDatef: '20181023',
    //     sDatet: '20181031',

    //     sHotelName: '',
    //     items: {
    //         '0': false,
    //         '1': false,
    //         '2': false,
    //         '3': false,
    //         '4': false,
    //     },
    //     Tools: []

    // }
    calendar = null;
    showCalendar (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    handleClose = () => {
        this.setState({
            activeInput: null,
        });
    }
    handleConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;

        this.setState(prevState => ({
            selectedStartDate,
            selectedEndDate,
            activeInput: null,
        }));
    }
    selectSFcity = (e) => {
        if (e) {
            this.setState({
                sFcity: e,
            });
        }
    }
    getTools = (data, e) => {
        let old = this.state.items;
        let arrnew = [];
        old[data] = e;
        for (let i = 0; i < 5; i++) {
            if (old[i]) {
                arrnew.push(i + 1);
            }
        }
        this.setState({
            items: old,
            Tools: arrnew,
        });

    }
    getdataKeyword (data) {
        this.setState({
            sHotelName: data,
        });
    }
    getdatavTcity (e) {
        this.setState({
            sTcity: e,
        });
    }
    handleAllSubmit () {
        const {
            sFcity,
            sTcity,
            sDatef,
            sDatet,
            Tools,
            sHotelName,
        } = this.state;

        window.open('https://www.liontravel.com/webft/webftse01.aspx?' + `sFcountry=TW&sTcountry=TW&sFreekind1=&sFcity=${sFcity}&sTcity=${sTcity}&sDatef=${sDatef.replace(/-/g, '')}&sDatef=${sDatet.replace(/-/g, '')}&sTools=${Tools}&sHotelName=${sHotelName}`, this.props.hrefTarget);
    }
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            activeInput,
        } = this.state;
        const visible = activeInput === 0 || activeInput === 1;
        const arrck = [
            { name: '1', value: 'highRail', text: '高鐵' },
            { name: '2', value: 'train', text: '火車' },
            { name: '3', value: 'airCraft', text: '飛機' },
            { name: '4', value: 'bus', text: '巴士' },
            { name: '5', value: 'carRental', text: '租車' }
        ];
        return (
            <div className="vacation_taiwan_m m-t-sm">
                <StRcln ClassName="fwb-b m-b-sm"
                    option={this.option}
                    placeholder="目的地"
                    label="出發地"
                    // defaultValue={'_'}
                    icon={<IcRcln name="toolmap" />}
                    breakline
                    req
                    onChangeCallBack={(value) => this.setState({ sFcity: value })}>
                </StRcln>
                <Destination getdatavTcity={(e) => { this.getdatavTcity(e) }}></Destination>
                <div className="calendar_compose">
                    <div className="input_group">
                        <IntRcln
                            request
                            readOnly
                            placeholder="YYYY/MM/DD"
                            label="出發區間"
                            icon={<IcRcln name="tooldate" />}
                            onClick={() => { this.showCalendar(0) }}
                            value={selectedStartDate}
                        />
                        <span className="cal_icon">~</span>
                        <IntRcln
                            readOnly
                            placeholder="YYYY/MM/DD"
                            onClick={() => { this.showCalendar(1) }}
                            value={selectedEndDate}
                        />
                    </div>
                    <NvbRslb
                        visible={visible}
                        direction="right"
                        className="confirmBtn_span_d-no"
                    >
                        <span className="nvb_rslb_goBack" onClick={this.handleClose}>
                            <IcRcln name="toolbefore" />
                        </span>
                        {
                            visible && (
                                <CyRcmn
                                    ClassName="mm"
                                    doubleChoose
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    endMonth={dayjs().add(12, 'months').format('YYYY-MM')}
                                    startDate={dayjs().add(1, 'days').format('YYYY-MM-DD')}
                                    activeInput={activeInput}
                                    startLabelTitle="最早出發日"
                                    endLabelTitle="最晚出發日"
                                    startTxt="最早"
                                    endTxt="最晚"
                                    ref={e => { this.calendar = e }}
                                    onClickConfirm={this.handleConfirm}
                                    customDiffTxt={diffDate => {
                                        const showTxt = diffDate + 1;
                                        return '共' + showTxt + '天';
                                    }}
                                />
                            )
                        }
                    </NvbRslb>
                </div>
                <Keyword getdataKeyword={(data) => { this.getdataKeyword(data) }} parentStcity={this.state.sTcity}></Keyword>
                <div>
                    {
                        arrck.map((item, index) => {
                            return (
                                <CrRcln defaultChecked={true} type="checkbox" key={index} name={item.name} value={item.value}
                                    className="blue m-r-sm " textContent={item.text}
                                    whenChange={(e) => this.getTools(item.name - 1, e)}
                                />
                            );
                        })
                    }
                </div>
                <div className="txt-right">
                    <BtRcnb prop="string" lg radius whenClick={() => this.handleAllSubmit()}>搜尋</BtRcnb>
                </div>
            </div>
        );
    }
}


export default Panel;