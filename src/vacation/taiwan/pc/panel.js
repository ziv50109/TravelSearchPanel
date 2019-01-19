import React, { Component } from 'react';
import { vacationTaiwan } from '../../../../source.config';

// 單純組件
// import StRcln from '../../../../magaele/st_rcln';
import CrRcln from '../../../../magaele/cr_rcln';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import ActRajax from '../../../../magaele/act_rajx';

import { ClickOutSide, useLocalStorage } from '../../../../utils';

// 複合組件

import SearchInput from '../SingleInput/SearchInput';
import Label from '../../../../magaele/int_rctg/components/Label/Label.js';
import ComposeCalendar from '../../../component/ComposeCalendar';
import SingleInputMenu from '../SingleInputMenu/SingleInputMenu';

import '../css.scss';

const Country = [
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
            selectedData: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
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
        if (arr.length > 0) {
            let datavTcity = arr[0].vTcity.replace('_', '');
            this.props.getdatavTcity(datavTcity);
        } else {
            this.props.getdatavTcity('');
        }
    };
    setValue = obj => {
        this.setState({ obj: obj });
    };
    render () {
        const { selectedData } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <React.Fragment>
                    <SingleInputMenu
                        className="SingleInputMenu m-b-sm"
                        /* int_rctg/Label */
                        isRequired // 是否為必填欄位
                        size="lg" // 框高
                        label={'目的地'} // 標籤
                        iconName={'toolmap'} // icon
                        /* subComponent */
                        fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                        selectedData={selectedData} // 所選擇的資料集
                        // max={this.WrapperDtmRclnMax}
                        /* int_rcln */
                        placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                        /* act_racp */
                        minimumStringQueryLength={2} // 最少輸入幾個字
                        minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                        noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                        /* dtm rcln */
                        subLabel="找不到選項？請輸入關鍵字查詢"
                        onChange={this.handleChange}
                    />
                </React.Fragment>
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
            show: false,
            // showText: Math.random() > 0.5 ? '請先點選出發地' : ''
        };
        this.fetchData = this.fetchData.bind(this);
        this.AbortController = null;
    }
    _inputOnChangeHandler (value) {
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.props.getkeywordData(value);
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
        this.setState({
            searchKeyWord: value,
            selectText: value
        });
    }
    isFocus (bool) {
        let show = false;
        if (!this.state.show) {
            show = true;
        }
        this.setState({ isFocus: true, show: bool });
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
    getItemClickValueState (v) {
        this.setState({
            selectText: v.txt,
            show: false,
            isFocus: false
        });
        this.props.getkeywordtxt(v.txt);
    }
    closeDestnMenu = () => {
        const { searchKeyWord, selectText, } = this.state;
        searchKeyWord === selectText && this.props.getkeywordtxt(searchKeyWord);
        this.setState({ isFocus: false });
    }

    render () {
        const { selectedData, dptSelectedData, dtnSelectedData } = this.state;
        return (
            <ClickOutSide className="pc_keyWord m-b-sm" onClickOutside={this.closeDestnMenu}>
                <Label
                    ref={e => { this.qq = e }}
                    label="關鍵字"
                    subComponent={
                        <SearchInput
                            containerClass="int_rcln blue request"
                            labelClass="d-no"
                            inputClass=""
                            placeholderText="請輸入飯店名稱"
                            keyWord={this.state.selectText}
                            parentStcity={this.props.parentStcity}
                            clearWord={(value) => this.clearWord(value)}
                            onChange={(value) => this._inputOnChangeHandler(value)}
                            isFocus={(bool) => this.isFocus(bool)}
                        />
                    }
                />
                <div className="act_wrap">
                    <span className={this.state.isFocus ? 'closeBtn' : 'closeBtn d-no'} onClick={this.closeDestnMenu}></span>
                    <ActRajax
                        containerClass={this.state.isFocus ? '' : 'd-no'}
                        isFocus={this.state.isFocus}
                        data={this.state.showData}
                        matchWord={this.state.searchKeyWord}
                        getItemClickValue={(v) => this.getItemClickValueState(v)}
                        showText={this.state.showText}
                        noMatchText="很抱歉，找不到符合的項目"
                        minimumStringQuery={this.props.parentStcity ? '請至少輸入兩個字' : '請先選擇目的地'}
                        minimumStringQueryLength={2}
                        footer={true}
                        closeBtnOnClick={() => setTimeout(this.closeDestnMenu, 0)}
                        rules={[
                            {
                                title: '飯店',
                                icon: <IcRcln name="hotelforeignBookingf" key={1} />
                            }
                        ]}
                    ></ActRajax>
                </div>
            </ClickOutSide>
        );
    }
}
class Panel extends Component {
    state = {
        selectedData: [],
        sTcity: '',
    }
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            searchKeyWord: '',
            selectText: '',
            isFocus: false,
            show: false,
            selectedData: [],
            sFcity: '',
            sTcity: '',
            sFreekind: '',
            sFreekind1: '',
            sDatef: '',
            sDatet: '',
            items: {
                '0': false,
                '1': false,
                '2': false,
                '3': false,
                '4': false,
            },
            Tools: []
        };
    }
    onClickItem = (data) => {
        this.setState(prevState => {
            return {
                selectedData: [data],
                sTcity: '',
            };
        });
    };
    getAlldate (e) {
        this.setState({
            sDatef: e.startInputValue,
            sDatet: e.endInputValue,
        });
    }
    kkk (e) {
        this.setState({
            sFcity: e,
        });
    }
    getdatavTcity (e) {
        this.setState({
            sTcity: e,
        });
    }
    getkeywordData (e) {
        this.setState({
            searchKeyWord: e,
        });
    }
    getkeywordtxt (txt) {
        this.setState({
            selectText: txt,
        });
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
    closeNvbRslb () {
        this.props.closeNvbRslb();
    }
    componentDidMount () {
        useLocalStorage(
            {
                panel: 'taiwanVacation',
                methods: 'get'
            },
            ({ sFcity, sTcity, sDatef, sDatet, Tools, selectText }) => {
                // console.log('=================', sFcity, sTcity, sDatef, sDatet, Tools, selectText);
                const mmm = {
                    'startInputValue': sDatef,
                    'endInputValue': sDatet,
                };
                this.setState(
                    {
                        sFcity: sFcity,
                        sTcity: sTcity,
                        sDatef: sDatef,
                        sDatet: sDatet,
                        Tools: Tools,
                        selectText: selectText,
                    },
                    this.getAlldate(mmm)
                );

            }
        );
    }
    handleAllSubmit () {
        const {
            sFcity,
            sTcity,
            sDatef,
            sDatet,
            Tools,
            selectText,
            sHotelName
        } = this.state;
        useLocalStorage({
            panel: 'taiwanVacation',
            methods: 'post',
            data: {
                sFcity,
                sTcity,
                sDatef,
                sDatet,
                Tools,
                selectText,
                sHotelName
            }
        });

        window.open('https://www.liontravel.com/webft/webftse01.aspx?' + `sFcountry=TW&sTcountry=TW&sFreekind1=&sFcity=${sFcity}&sTcity=${sTcity}&sDatef=${sDatef.replace(/-/g, '')}&sDatef=${sDatet.replace(/-/g, '')}&sTools=${Tools}&sHotelName=${sHotelName}`, this.props.hrefTarget);
    }
    render () {
        const selectedData = this.state.selectedData;
        const txt = (selectedData.length > 0) ? selectedData[0].text : '';
        const selected = selectedData.map(v => v.value);
        const arrck = [
            { name: '1', value: 'highRail', text: '高鐵' },
            { name: '2', value: 'train', text: '火車' },
            { name: '3', value: 'airCraft', text: '飛機' },
            { name: '4', value: 'bus', text: '巴士' },
            { name: '5', value: 'carRental', text: '租車' }
        ];
        return (
            <div className="vacation_taiwan_pc m-t-xs">
                <StRcln ClassName="m-b-sm fwb-b"
                    option={Country}
                    placeholder="出發地"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    req breakline
                    onChangeCallBack={(e) => this.kkk(e)}>
                </StRcln>
                <DestinationContentComponent getdatavTcity={(e) => this.getdatavTcity(e)}></DestinationContentComponent>
                <ComposeCalendar
                    defaultStartDate={this.state.sDatef ? this.state.sDatef : ''}
                    defaultEndDate={this.state.sDatet ? this.state.sDatet : ''}
                    ClassName="m-b-sm"
                    startTxt="最早"
                    endTxt="最晚"
                    onChange={(e) => this.getAlldate(e)}>
                </ComposeCalendar>
                <ContentComponentKeyword
                    getkeywordData={(e) => this.getkeywordData(e)}
                    getkeywordtxt={(txt) => this.getkeywordtxt(txt)}
                    parentStcity={this.state.sTcity}
                ></ContentComponentKeyword>
                <div className="sss m-b-sm">
                    {
                        arrck.map((item, index) => {
                            return (
                                <CrRcln type="checkbox" defaultChecked={true} key={index} name={item.name} value={item.value}
                                    className="blue m-r-sm " textContent={item.text}
                                    whenChange={(e) => this.getTools(item.name - 1, e)}
                                />
                            );
                        })
                    }
                </div>
                <div className="txt-right">
                    <BtRcnb prop="string" className="submitBtn" lg radius whenClick={() => this.handleAllSubmit()}>搜尋</BtRcnb>
                </div>
            </div>
        );
    }
}


export default Panel;