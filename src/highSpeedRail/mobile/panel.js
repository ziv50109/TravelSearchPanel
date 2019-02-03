import React, { Component } from 'react';
import { vacationTaiwan } from '../../../source.config';

// 單純組件
import CrRcln from '../../../magaele/cr_rcln';
import StRcln from '../../../magaele/st_rcln';
import IcRcln from '../../../magaele/ic_rcln';
import IntRcln from '../../../magaele/int_rcln';
import BtRcnb from '../../../magaele/bt_rcnb';
import CyRcmn from '../../../magaele/cy_rcmn';
import NvbRslb from '../../../magaele/nvb_rslb';
import ActRajax from '../../../magaele/act_rajx';

import { useLocalStorage } from '../../../utils';

// 複合組件
import SingleInputMenuM from '../SingleInputMenu/SingleInputMenu_m';
import SearchInput from '../SingleInput/SearchInput';
import dayjs from 'dayjs';
import '../../component/ComposeCalendar';
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
            selectedData: this.props.selectedData ? this.props.selectedData : [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            dptSelectedData: [],
            dtnSelectedData: []
        };
        this.fetchPath = vacationTaiwan.destination;
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.selectedData !== this.props.selectedData) {
            this.updateSelectedData();
        }
    }
    updateSelectedData = () => {
        this.setState({
            selectedData: this.props.selectedData
        });
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
        console.log('selectedData', this.state.selectedData);
        const { selectedData } = this.state;
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
            searchKeyWord: this.props.sHotelName ? this.props.sHotelName : '',
            selectText: this.props.sHotelName ? this.props.sHotelName : '',
            isFocus: false,
            show: true,
            // showText: Math.random() > 0.5 ? '請先點選出發地' : '',
            selectedData: [],
        };
        this.fetchData = this.fetchData.bind(this);
        this.AbortController = null;
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.sHotelName !== this.props.sHotelName) {
            this.updateSearchKeyWord();
        }
        if (prevProps.parentStcity !== this.props.parentStcity) {
            this.clearShowData();
        }
    }
    updateSearchKeyWord = () => {
        this.setState({
            searchKeyWord: this.props.sHotelName,
            selectText: this.props.sHotelName
        });
        this._inputOnChangeHandler(this.props.sHotelName);
    }
    clearShowData = () => {
        this.setState({ showData: [] });
    }
    _inputOnChangeHandler (value) {
        if (!this.props.parentStcity) return;
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.fetchData(value);
        }, 500);
    }
    fetchData (value) {
        if (value.length < 2) return;
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
        this.setState({ isFocus: bool, show: true });
    }
    processData (d, value) {
        let p = new Promise(function (resolve, reject) {
            d.Data.forEach((item) => {
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
                    noMatchText={this.props.parentStcity ? '很抱歉，找不到符合的項目' : '請先選擇目的地'}
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
        // sTcitytxt: this.props.sTcitytxt ? this.props.sTcitytxt : '',
        allData: this.props.selectedData ? this.props.selectedData : [],
    };
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.selectedData !== this.props.selectedData) {
            // console.log('中間', this.props.selectedData);
            this.updateSelectedData();
        }
    }
    updateSelectedData = () => {
        this.setState({
            allData: this.props.selectedData
        });
    }

    openPage = (e, value, input) => {
        input.blur();
        this.setState({
            visible: true,
        });
    }
    getdatavTcity = (e, data, allData) => {
        this.setState({
            sTcity: e,
            // sTcitytxt: data,
            visible: false,
            allData: allData
        });
        this.props.getdatavTcity(e, data, allData);
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
                    value={this.state.allData.length > 0 ? this.state.allData[0].text : ''}
                    onClick={this.openPage}
                />
                <NvbRslb
                    visible={this.state.visible}
                    ContentComponent={this.state.visible &&
                        <DestinationContentComponent
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
        sHotelName: this.props.sHotelName ? this.props.sHotelName : ''

    };

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.sHotelName !== this.props.sHotelName) {
            this.updateSHotelName();
        }
    }

    updateSHotelName = () => {
        this.setState({
            sHotelName: this.props.sHotelName
        });
    }
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
                            sHotelName={this.state.sHotelName}
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
            selectedStartDate: dayjs().add(5, 'days').format('YYYY-MM-DD'),
            selectedEndDate: dayjs().add(30, 'days').format('YYYY-MM-DD'),
            activeInput: null,

            sFcountry: 'TW',
            sFcity: '',

            sTcountry: 'TW',
            sTcity: '',

            // sTcitytxt: '',
            selectedData: [],

            sFreekind: '',
            sFreekind1: '',

            sDatef: dayjs().add(5, 'days').format('YYYY-MM-DD'),
            sDatet: dayjs().add(30, 'days').format('YYYY-MM-DD'),

            sHotelName: '',
            Tools: [1]
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
        this.calendar = null;
    }
    componentDidMount () {
        useLocalStorage(
            {
                panel: 'highSpeedRail',
                methods: 'get'
            },
            (data) => {
                this.validataLocalstorageData(data);
            }
        );
    }
    validataLocalstorageData = (data) => {
        const localStorageRecordTime = data.PostTime + 604800000;
        const { sFcity, sTcity, sDatef, sDatet, Tools, selectText, selectedData, sHotelName } = data;
        if (localStorageRecordTime < new Date().getTime()) {
            console.log('超過7天予以刪除LocalStorage紀錄。');
            useLocalStorage({
                panel: 'highSpeedRail',
                methods: 'delete',
            });
            return;
        }
        let cStart = dayjs(sDatef).isBefore(dayjs()) ? dayjs().format('YYYY-MM-DD') : sDatef;
        let cEnd = dayjs(sDatet).isBefore(dayjs()) ? dayjs().add(30, 'days').format('YYYY-MM-DD') : sDatet;
        this.setState(
            {
                sFcity: sFcity,
                sTcity: sTcity,
                sDatef: cStart,
                sDatet: cEnd,
                Tools: Tools,
                selectedData: selectedData,
                sHotelName: selectText || sHotelName
            }
        );
    };

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
    getdataKeyword (data) {
        this.setState({
            sHotelName: data,
        });
    }
    getdatavTcity (e, data, allData) {
        this.setState({
            sTcity: e,
            // sTcitytxt: data,
            selectedData: allData
        });
    }
    handleAllSubmit () {
        const {
            sFcity,
            sTcity,
            // sDatef,
            // sDatet,
            selectedStartDate,
            selectedEndDate,
            Tools,
            // sTcitytxt,
            selectedData,
            sHotelName,
        } = this.state;
        useLocalStorage({
            panel: 'highSpeedRail',
            methods: 'post',
            data: {
                sFcity,
                sTcity,
                // sDatef,
                // sDatet,
                selectedStartDate,
                selectedEndDate,
                Tools,
                // sTcitytxt,
                selectedData,
                sHotelName
            }
        });
        window.open(`https://www.liontravel.com/webft/webftse01.aspx?sFcountry=TW&sTcountry=TW&sFreekind1=&sFcity=${sFcity}&sTcity=${sTcity}&sDatef=${selectedStartDate.replace(/-/g, '')}&sDatet=${selectedEndDate.replace(/-/g, '')}&sTools=${Tools}&sHotelName=${sHotelName}`, this.props.hrefTarget);
    }
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            activeInput,
        } = this.state;
        const visible = activeInput === 0 || activeInput === 1;
        return (
            <div className="high_speed_rail_m">
                <StRcln ClassName="fwb-b m-b-sm"
                    option={this.option}
                    placeholder="目的地"
                    label="出發地"
                    // defaultValue={'_'}
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={this.state.sFcity ? this.state.sFcity : '_'}
                    breakline
                    req
                    onChangeCallBack={(value) => this.setState({ sFcity: value })}>
                </StRcln>
                <Destination
                    getdatavTcity={(e, data, allData) => { this.getdatavTcity(e, data, allData) }}
                    selectedData={this.state.selectedData}
                // sTcitytxt={this.state.sTcitytxt}
                />
                <div className="calendar_compose">
                    <div className="input_group">
                        <IntRcln
                            request
                            readOnly
                            placeholder="YYYY/MM/DD"
                            label="出發區間"
                            icon={<IcRcln name="tooldate" />}
                            onClick={() => { this.showCalendar(0) }}
                            value={dayjs(selectedStartDate).format('YYYY/MM/DD')}
                        />
                        <span className="cal_icon">~</span>
                        <IntRcln
                            readOnly
                            placeholder="YYYY/MM/DD"
                            onClick={() => { this.showCalendar(1) }}
                            value={dayjs(selectedEndDate).format('YYYY/MM/DD')}
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
                                    startDate={dayjs().format('YYYY-MM-DD')}
                                    // startDate={dayjs().add(1, 'days').format('YYYY-MM-DD')}
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
                <Keyword
                    getdataKeyword={(data) => { this.getdataKeyword(data) }}
                    parentStcity={this.state.sTcity}
                    sHotelName={this.state.sHotelName}
                />
                <div className="txt-right">
                    <BtRcnb prop="string" lg radius whenClick={() => this.handleAllSubmit()}>搜尋</BtRcnb>
                </div>
            </div>
        );
    }
}


export default Panel;