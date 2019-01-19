import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import IntRctg from './components/Module.js';
import IcRcln from '../ic_rcln';
import DtmRcln from '../dtm_rcln';
import ActRacp from '../act_racp';
import StRcln from '../st_rcln';
import Single from './components/Single/Single';
import Multiple from './components/Multiple/Multiple';
import Label from './components/Label/Label';
import SingleActRacp from './components/act_racp.js';   // Single + ActRacp
import SingleActRacpWithDtmRcfr from './components/Racp/SingleActRacpWithDtmRcfr'; // Single + ActRacp +DtmRcfr
import './css.scss';
import IntRctgInput from './components/IntRctgInput.js';
const inlineStyle = {
    display: 'inline-block',
    marginLeft: 20 + 'px',
    verticalAlign: 'top'
};
const widthCollection = {
    desktop: {
        width: 390 + 'px',
        marginLeft: 20 + 'px',
    }
};
function responsiveStyle () {
    return Object.assign({}, widthCollection.desktop, inlineStyle);
}
// 補字選單分區的callBack
const catalogueCallBack = [
    {
        catalogueName: '城市',
        catafilter: (data) => {
            return data.filter(item => {
                return (item.txt.split('__').length === 2);
            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
        },
        // icon: (<IcRcln name="toolmapf" />)
    },
    {
        catalogueName: '機場',
        catafilter: (data) => {
            return data.filter(item => {
                return (item.txt.split('__').length > 2);
            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
        },
        // icon: (<IcRcln name="toolmapf" />)
    }
];

// 補字選單changeKey
const actRacpChangeKey = (data) => {
    data.forEach((item) => {
        item.txt = item.fullName;
        delete item.fullName;
    });
    return data;
};
class Demo extends Component {
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    render () {
        return (
            <div style={Object.assign({}, widthCollection.desktop)}>
                <div>
                    <h3>1. Label</h3>
                    <Label
                        size={'md'}
                        maxLength={1}
                    />
                    <Label
                        required                    // 是否為必填欄位
                        label={'目的地'}             // 輸入標籤
                        iconName={'toolmap'}
                    />
                    <Label
                        isRequired
                        size={'lg'}                 // 提示框高度
                        maxLength={3}               // 輸入最大項目數
                        label={'目的地'}             // 輸入標籤
                        iconName={'toolmap'}        // 輸入圖樣
                    />
                    <Label
                        isRequired                    // 是否為必填欄位
                        maxLength={3}               // 輸入最大項目數
                        label={'目的地'}             // 輸入標籤
                        iconName={'toolmap'}        // 輸入圖樣
                        subComponent={
                            <IntRctgInput />
                        }
                    />
                </div>
            </div>
        );
    }
}
class DemoSingle extends Component {
    static defaultProps = {
        query: [''],
        inputValue: '',
        isFocus: false
    };
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            query: ['北陸名古一'],
        };
        this.setValues = this.setValues.bind(this);
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            inputValue,
            query
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>2. Single</h3>
                    <Single
                        placeholder={'請輸入/選擇目的地'}
                        inputValue={inputValue}
                        query={query}
                        onKeyUp={this.handleKeyUp}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                        setValues={this.setValues}
                    />
                </div>
            </div>
        );
    }
}
class DemoMultiple extends Component {
    static defaultProps = {
        query: [''],
        inputValue: '',
        isFocus: false
    };
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            query: ['北陸名古一', '北陸名古二', '北陸名古三'],
        };
        this.setValues = this.setValues.bind(this);
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            inputValue,
            query
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>3. Multiple</h3>
                    <Multiple
                        maxLength={3}
                        placeholder={'請輸入/選擇目的地'}
                        inputValue={inputValue}
                        query={query}
                        onKeyUp={this.handleKeyUp}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                        setValues={this.setValues}
                    />
                </div>
            </div>
        );
    }
}
class DemoLabelWithSingle1 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: ['北陸名古一'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: '',                    // 輸入值 = searchKeyWord
            isFocus: false,                    // 是否處於 focus 狀態
            // isMax: false,                      // 是否達到項目最大上限
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            query,
            inputValue
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>Example: Label + Single</h3>
                    <Label
                        size="md"
                        subComponent={
                            <Single
                                placeholder={'placeholder'}
                                query={query}
                                inputValue={inputValue}
                                onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onClick={this.handleClick}
                                setValues={this.setValues}

                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
class DemoLabelWithSingle2 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: ['北陸名古'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: '',                    // 輸入值 = searchKeyWord
            isFocus: false,                    // 是否處於 focus 狀態
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            query,
            inputValue
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>Example2: Label + Single</h3>

                    <Label
                        label={'目的地'}             // 輸入標籤
                        iconName={'toolmap'}         // 輸入圖樣
                        subComponent={
                            <Single
                                placeholder={'請輸入'}
                                query={query}
                                inputValue={inputValue}
                                onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onClick={this.handleClick}
                                setValues={this.setValues}

                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
class DemoSingleWithRacp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: ['北陸名古'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: '',                    // 輸入值 = searchKeyWord
            isFocus: false,                    // 是否處於 focus 狀態
            showAct: false,                    // 傳入 custom class
            value: 0,
            obj: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.clearWord = this.clearWord.bind(this);
        this.isFocus = this.isFocus.bind(this);
        this.closeBtnClickHandleCallback = this.closeBtnClickHandleCallback.bind(this);
    }
    searchHandler (txt) {
        // 輸入大於兩個字才能搜尋
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({ keyword: '' });
            (txt.length >= 2 || txt.length === 0) && self.setState({ keyword: txt, selectVal: txt });
        }, 500);
    }
    receive (i) {
        const { query } = this.state;
        this.setState({ selectVal: i.txt, obj: i });
        console.log('主頁面接收到', i);
        let arr = [...query];
        arr.push(i.txt);
        this.setState({
            query: arr,
            inputValue: '',
            // isMax: arr.length === maxLength
        });
    }
    clearWord (text) {
        this.setState({ selectVal: text });
    }
    isFocus (flag) {
        this.setState({ isFocus: flag });
        if (flag) { this.setState({ showAct: true }) }
    }
    closeBtnClickHandleCallback (e) {
        if (this._actref && !this._actref.contains(e.target) && !this.state.isFocus) {
            console.log('點在act外面');
            this.setState({ showAct: false });
        }
    }
    searchMore () {
        console.log('searchMore CallbackClick');
        window.open('https://uwww.liontravel.com/', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=250,left=500,width=400,height=400');
    }
    showText () {
        this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    handleKeyUp () {
    }

    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            query,
            inputValue
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3> + ActRacp</h3>
                    <Label
                        isRequired                         // 是否為必填欄位
                        size="lg"
                        label={'Label'}
                        iconName={'toolmap'}
                        subComponent={
                            <Single
                                query={query}
                                inputValue={inputValue}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onClick={this.handleClick}
                                onFocus={this.handleFocus}
                                onKeyUp={this.handleKeyUp}
                                setValues={this.setValues}
                            />
                        }
                    />
                    <ActRacp
                        url={'/json/GetArrayTkt6.js'}
                        minimumStringQueryLength={2} // 最少輸入幾個字
                        minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                        setRef={(actRef) => { this._actref = actRef }} // 用來監聽點擊對象
                        ClassName={(!this.state.showAct && 'd-no')} // 傳入custom class
                        searchKeyWord={inputValue} // 傳入篩選的字串
                        showText={''}// 顯示預設文字
                        whenItemSelect={this.receive.bind(this)} // 模組回傳被選取的物件資料
                        InputIsFocus={this.isFocus} // 告訴act 上面的input是否被focus
                        noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                        footer={false}  // 是否顯示footer
                        theme={'future'} // 樣式調整: future(站長平台)
                        closeActcallback={this.handleBlur} // 強勢關閉act callbackFn
                        closeBtnClickHandleCallback={this.closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                        searchMore={this.searchMore} // 搜尋更多"xxx"的產品 callback
                        jsonKey={'destinations'}
                        setSelectValue={this.state.obj ? this.state.obj.dataIndex : ''}
                        changeKey={actRacpChangeKey}
                        catalogue={catalogueCallBack}
                    />
                </div>
            </div>
        );
    }
}
class DemoSingleWithRacp2 extends Component {
    render () {
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <h3> + ActRacp</h3>
                <Label
                    isRequired
                    size="lg"
                    label={'Label'}
                    iconName={'toolmap'}
                    subComponent={
                        <SingleActRacp
                            placeholderText="placeholderText here"
                            url="/json/GetArrayTkt6.js"
                            minimumStringQueryLength={2} // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                        />
                    }
                />
            </div>
        );
    }
}
class DemoSingleWithRacp3 extends Component {
    constructor () {
        super();
        this.state = {
            selectedData: [],
            keyword: ''
        };
        this.labelBlock = React.createRef();
    }
    setValues=(obj) => {
        if (typeof obj === 'object') { this.setState(prevState => (obj)) }
    }
    render () {
        const dtmStyle = {
            'position': 'absolute',
            'width': '657px',
            'height': '478px'
        };
        const { selectedData, keyword } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <h3> + DtmRcfr</h3>
                <Label
                    isRequired
                    size="lg"
                    label={'出發地'}
                    iconName={'toolmap'}
                    ref={this.labelBlock}
                    subComponent={
                        <SingleActRacpWithDtmRcfr
                            placeholderText="請輸入 / 選擇出發地"
                            url="../../json/GetArrayTkt6.js"
                            keyword={keyword}
                            minimumStringQueryLength={2} // 最少輸入幾個字
                            minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                            noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                            setValues={this.setValues}
                            selectedData={selectedData}
                            positionDOM={this.labelBlock}
                        />
                    }
                />
            </div>
        );
    }
}


// 我是 singlechange 的唷
const SearchInput = ({ ref, value, onChange, onFocus, onBlur, onClearBtn, onClearFn, setRef, ClassName, searchKeyWord, whenItemSelect, InputIsFocus, closeActcallback, closeBtnClickHandleCallback, setSelectValue }) => {
    return (
        <React.Fragment>
            <div className="int_rcln int-tags-single noBorder">
                <input
                    ref={ref}
                    type="text"
                    value={value}
                    placeholder="我是placeholder"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {onClearBtn ? (
                    <span
                        className="clearBtn"
                        onMouseDown={onClearFn}
                    />
                ) : null}
            </div>
            <ActRacp
                url="/json/GetArrayTkt6.js"
                minimumStringQueryLength={2} // 最少輸入幾個字
                minimumStringQuery="最少輸入兩個字" // 尚未輸入文字字數到達要求會顯示此字串
                setRef={setRef} // 用來監聽點擊對象
                ClassName={ClassName} // 傳入custom class
                searchKeyWord={searchKeyWord} // 傳入篩選的字串
                whenItemSelect={whenItemSelect} // 模組回傳被選取的物件資料
                InputIsFocus={InputIsFocus} // 告訴act 上面的input是否被focus
                noMatchText="找不到資料"// 當沒有配對資料時顯示那些文字
                footer={false}  // 是否顯示footer
                theme={'future'} // 樣式調整: future(站長平台)
                closeActcallback={closeActcallback} // 強勢關閉act callbackFn
                closeBtnClickHandleCallback={closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                jsonKey={'destinations'}
                setSelectValue={setSelectValue}
                changeKey={actRacpChangeKey}
                catalogue={catalogueCallBack}
            />
        </React.Fragment>
    );
};

class DemoSingleChangeWithRacp extends Component {
    constructor () {
        super();
        this.state = {
            // 出發地
            dptInputText: '',     // 真正選到的值
            dptShowAct: false,    // 是否開啟選單
            dptIsFocus: false,    // 是否目前為 Focus 狀態
            dptObj: null,         // 收到的出發地相關物件
            dptSearchKeyWord: '', // 搜尋時用的關鍵字 (暫存值)
            dptClearValue: false, // 清除資料按鈕 true 為打開

            // 目的地
            dtnInputText: '',     // 真正選到的值
            dtnShowAct: false,    // 是否開啟選單
            dtnIsFocus: false,    // 是否目前為 Focus 狀態
            dtnObj: null,         // 收到的目的地相關物件
            dtnSearchKeyWord: '', // 搜尋時用的關鍵字 (暫存值)
            dtnClearValue: false, // 清除資料按鈕 true 為打開
        };
    }

    // 當選完選單收到資料時
    dptReceive = (i) => {
        this.setState({
            dptObj: i,
            dptInputText: i.txt,
        });
    }

    // 當 input 有打字或刪除時
    dptOnChange = (e) => {
        const val = e.target.value;

        this.setState({
            dptInputText: val,
            dptShowAct: val.length >= 2 ? true : false, // 當 input 字 2 字以上時打開選單
            dptSearchKeyWord: val,
        });
        // 清除按鈕顯示
        if (val !== '') {
            this.setState({ dptClearValue: true });
        } else {
            this.setState({ dptClearValue: false });
        }
    }

    // 當 input focus 時
    dptIsFocus = (e) => {
        if (e.target.value !== '') { // focus 有值時
            this.setState({ dptIsFocus: true, dptShowAct: true, dptClearValue: true });
        } else {
            this.setState({ dptIsFocus: true, dptShowAct: true, dptClearValue: false });
        }
    }

    // 當 input blur 時
    dptOnBlur = () => {
        this.setState({
            dptIsFocus: false,
            dptClearValue: false
        });
    }

    // 關閉選單
    closeBtnClickHandleCallback = (e) => {
        if (this._actref && !this._actref.contains(e.target) && !this.state.dptIsFocus) {
            const {
                dptInputText
            } = this.state;
            this.setState({
                dptShowAct: false,
                dptSearchKeyWord: dptInputText,
            });
        }
    }

    // 清除資料
    handleDptClearValue = () => {
        this.setState({ dptInputText: '', dptSearchKeyWord: '', dptClearValue: false });
    }

    // 交換
    switch = () => {
        const {
            dptInputText: txt1,
            dptSearchKeyWord: search1,
            dtnInputText: txt2,
            dtnSearchKeyWord: search2,
        } = this.state;

        const obj1 = JSON.parse(JSON.stringify(this.state.dptObj)); // dptObj
        const obj2 = JSON.parse(JSON.stringify(this.state.dtnObj)); // dtnObj

        this.setState({
            dptInputText: txt2,
            dptObj: obj2,
            dptSearchKeyWord: search2,
            dtnInputText: txt1,
            dtnObj: obj1,
            dtnSearchKeyWord: search1,
        });
    }

    dtnReceive = (i) => {
        this.setState({
            dtnObj: i,
            dtnInputText: i.txt,
        });
    }
    dtnOnChange = (e) => {
        const val = e.target.value;
        this.setState({
            dtnInputText: val,
            dtnShowAct: val.length >= 2 ? true : false,
            dtnSearchKeyWord: val,
        });
        if (val !== '') {
            this.setState({ dtnClearValue: true });
        } else {
            this.setState({ dtnClearValue: false });
        }
    }
    dtnIsFocus = (e) => {
        if (e.target.value !== '') {
            this.setState({ dtnIsFocus: true, dtnShowAct: true, dtnClearValue: true });
        } else {
            this.setState({ dtnIsFocus: true, dtnShowAct: true, dtnClearValue: false });
        }
    }
    dtnOnBlur = () => {
        this.setState({
            dtnIsFocus: false,
            dtnClearValue: false
        });
    }
    closeBtnClickHandleCallback2 = (e) => {
        if (this._actref2 && !this._actref2.contains(e.target) && !this.state.dtnIsFocus) {
            const {
                dtnInputText
            } = this.state;
            this.setState({
                dtnShowAct: false,
                dtnSearchKeyWord: dtnInputText,
            });
        }
    }

    handleDtnClearValue = () => {
        this.setState({ dtnInputText: '', dtnSearchKeyWord: '', dtnClearValue: false });
    }


    render () {
        const {
            dptInputText,
            dptShowAct,
            dptIsFocus,
            dptObj,
            dptSearchKeyWord,

            dtnInputText,
            dtnShowAct,
            dtnIsFocus,
            dtnObj,
            dtnSearchKeyWord,
        } = this.state;
        return (
            <div style={{ margin: 20 }}>
                <h3> + SingleChange</h3>
                <div className="single-change">
                    <Label
                        isRequired
                        size="lg"
                        label={'出發地'}
                        subComponent={
                            <SearchInput
                                value={dptInputText}
                                onChange={this.dptOnChange}
                                onFocus={this.dptIsFocus}
                                onBlur={this.dptOnBlur}
                                onClearBtn={this.state.dptClearValue}
                                onClearFn={this.handleDptClearValue}
                                setRef={(actRef) => { this._actref = actRef }}
                                ClassName={(!dptShowAct && 'd-no')} // 傳入custom class
                                searchKeyWord={dptSearchKeyWord} // 傳入篩選的字串
                                whenItemSelect={this.dptReceive}
                                InputIsFocus={dptIsFocus}
                                closeActcallback={() => this.setState({ dptShowAct: false })}
                                closeBtnClickHandleCallback={this.closeBtnClickHandleCallback}
                                setSelectValue={dptObj ? dptObj.dataIndex : ''}
                            />
                        }
                    />
                    <div className="changeBtn" onClick={this.switch} ><IcRcln name={'valuechange changeBtn'} /></div>
                    <Label
                        isRequired
                        size="lg"
                        label={'目的地'}
                        subComponent={
                            <SearchInput
                                value={dtnInputText}
                                onChange={this.dtnOnChange}
                                onFocus={this.dtnIsFocus}
                                onBlur={this.dtnOnBlur}
                                onClearBtn={this.state.dtnClearValue}
                                onClearFn={this.handleDtnClearValue}
                                setRef={(actRef) => { this._actref2 = actRef }}
                                ClassName={(!dtnShowAct && 'd-no')} // 傳入custom class
                                searchKeyWord={dtnSearchKeyWord} // 傳入篩選的字串
                                whenItemSelect={this.dtnReceive}
                                InputIsFocus={dtnIsFocus}
                                closeActcallback={() => this.setState({ dtnShowAct: false })}
                                closeBtnClickHandleCallback={this.closeBtnClickHandleCallback2}
                                setSelectValue={dtnObj ? dtnObj.dataIndex : ''}
                            />
                        }
                    />
                </div>
            </div>
        );
    }
}

class DemoLabelWithMultiple1 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: ['北陸名古一', '北陸名古二', '北陸名古三'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: '',                    // 輸入值 = searchKeyWord
            isFocus: false,                    // 是否處於 focus 狀態
            // isMax: false,                      // 是否達到項目最大上限
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            query,
            inputValue
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>Example: Label + Multiple</h3>
                    <Label
                        size="md"
                        subComponent={
                            <Multiple
                                maxLength={3}
                                placeholder={'placeholder'}
                                query={query}
                                inputValue={inputValue}
                                onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onClick={this.handleClick}
                                setValues={this.setValues}

                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
class DemoLabelWithMultiple2 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: ['北陸名古一', '北陸名古二', '北陸名古三'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: '',                    // 輸入值 = searchKeyWord
            isFocus: false,                    // 是否處於 focus 狀態
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            query,
            inputValue
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>Example2: Label + Multiple</h3>

                    <Label
                        label={'目的地'}             // 輸入標籤
                        iconName={'toolmap'}         // 輸入圖樣
                        subComponent={
                            <Multiple
                                maxLength={3}
                                placeholder={'placeholder'}
                                query={query}
                                inputValue={inputValue}
                                onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onClick={this.handleClick}
                                setValues={this.setValues}

                            />
                        }
                    />
                </div>
            </div>
        );
    }
}
class DemoMultipleWithRacp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            query: ['北陸名古一', '北陸名古二'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            inputValue: '',                    // 輸入值 = searchKeyWord
            isFocus: false,                    // 是否處於 focus 狀態
            showAct: false,                    // 傳入 custom class
            value: 0,
            obj: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.clearWord = this.clearWord.bind(this);
        this.isFocus = this.isFocus.bind(this);
        this.closeBtnClickHandleCallback = this.closeBtnClickHandleCallback.bind(this);
    }
    searchHandler (txt) {
        // 輸入大於兩個字才能搜尋
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({ keyword: '' });
            (txt.length >= 2 || txt.length === 0) && self.setState({ keyword: txt, selectVal: txt });
        }, 500);
    }
    receive (i) {
        const { query } = this.state;
        this.setState({ selectVal: i.txt, obj: i });
        console.log('主頁面接收到', i);
        let arr = [...query];
        arr.push(i.txt);
        this.setState({
            query: arr,
            inputValue: '',
            // isMax: arr.length === maxLength
        });
    }
    clearWord (text) {
        this.setState({ selectVal: text });
    }
    isFocus (flag) {
        this.setState({ isFocus: flag });
        if (flag) { this.setState({ showAct: true }) }
    }
    closeBtnClickHandleCallback (e) {
        if (this._actref && !this._actref.contains(e.target) && !this.state.isFocus) {
            console.log('點在act外面');
            this.setState({ showAct: false });
        }
    }
    searchMore () {
        console.log('searchMore CallbackClick');
        window.open('https://uwww.liontravel.com/', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=250,left=500,width=400,height=400');
    }
    showText () {
        this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    handleKeyUp () {
    }

    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    render () {
        const {
            query,
            maxLength,
            inputValue
        } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3> + ActRacp</h3>
                    <Label
                        isRequired                         // 是否為必填欄位
                        size="lg"
                        label={'目的地'}
                        iconName={'toolmap'}
                        subComponent={
                            <Multiple
                                query={query}
                                maxLength={maxLength}
                                inputValue={inputValue}
                                placeholder={'placeholder'}
                                onBlur={this.handleBlur}
                                onChange={this.handleChange}
                                onClick={this.handleClick}
                                onFocus={this.handleFocus}
                                onKeyUp={this.handleKeyUp}
                                setValues={this.setValues}
                            />
                        }
                    />
                    <ActRacp
                        url={'/json/GetArrayTkt6.js'}
                        minimumStringQueryLength={2} // 最少輸入幾個字
                        minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                        setRef={(actRef) => { this._actref = actRef }} // 用來監聽點擊對象
                        ClassName={(!this.state.showAct && 'd-no')} // 傳入custom class
                        searchKeyWord={inputValue} // 傳入篩選的字串
                        showText={''}// 顯示預設文字
                        whenItemSelect={this.receive.bind(this)} // 模組回傳被選取的物件資料
                        InputIsFocus={this.isFocus} // 告訴act 上面的input是否被focus
                        noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                        footer={false}  // 是否顯示footer
                        theme={'future'} // 樣式調整: future(站長平台)
                        closeActcallback={this.handleBlur} // 強勢關閉act callbackFn
                        closeBtnClickHandleCallback={this.closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                        searchMore={this.searchMore} // 搜尋更多"xxx"的產品 callback
                        jsonKey={'destinations'}
                        setSelectValue={this.state.obj ? this.state.obj.dataIndex : ''}
                        changeKey={actRacpChangeKey}
                        catalogue={catalogueCallBack}
                    />
                </div>
            </div>
        );
    }
}
class DemoWithRacp2 extends Component {
    constructor (props) {
        super(props);
        this.state = {
            label: '目的地',                    // 輸入標籤
            iconName: 'toolmap',               // 輸入圖樣名稱
            query: ['北陸名古一', '北陸名古二'], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            placeholder: '請輸入/選擇目的地',   // 輸入提示字
            inputValue: '',                    // 輸入值 = searchKeyWord
            maxLength: 3,                      // 輸入最大項目數
            isMax: false,                      // 是否達到項目最大上限
            isFocus: false,                    // 是否處於 focus 狀態
            showAct: false,                    // 傳入 custom class
            value: 0,
            obj: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.setValues = this.setValues.bind(this);

        this.searchHandler = this.searchHandler.bind(this);
        this.clearWord = this.clearWord.bind(this);
        this.isFocus = this.isFocus.bind(this);
        this.closeBtnClickHandleCallback = this.closeBtnClickHandleCallback.bind(this);
    }
    handleClick () {
        this.setState({
            test: true
        });
    }
    setValues (val) {
        if (typeof val === 'object') {
            this.setState(val);
        }
    }
    searchHandler (txt) {
        // 輸入大於兩個字才能搜尋
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({ keyword: '' });
            (txt.length >= 2 || txt.length === 0) && self.setState({ keyword: txt, selectVal: txt });
        }, 500);
    }
    receive (i) {
        const { query, maxLength } = this.state;
        this.setState({ selectVal: i.txt, obj: i });
        console.log('主頁面接收到', i);
        let arr = [...query];
        arr.push(i.txt);
        this.setState({
            query: arr,
            inputValue: '',
            isMax: arr.length === maxLength
        });
    }
    clearWord (text) {
        this.setState({ selectVal: text });
    }
    isFocus (flag) {
        this.setState({ isFocus: flag });
        if (flag) { this.setState({ showAct: true }) }
    }
    handleFocus () {
        this.setState({ isFocus: true, showAct: true });
    }
    handleBlur () {
        this.setState({ isFocus: false, showAct: false });
    }
    handleKeyUp () {
    }
    closeBtnClickHandleCallback (e) {
        if (this._actref && !this._actref.contains(e.target) && !this.state.isFocus) {
            console.log('點在act外面');
            this.setState({ showAct: false });
        }
    }
    searchMore () {
        console.log('searchMore CallbackClick');
        window.open('https://uwww.liontravel.com/', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=250,left=500,width=400,height=400');
    }
    showText () {
        this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    }
    render () {
        const {
            query,
            maxLength,
            placeholder,
            label,
            iconName,
            inputValue,
            isMax
        }
        = this.state;

        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <div>
                    <h3>清單二 (關鍵字選單 ActRacp)</h3>
                    <IntRctg
                        label={label}               // 輸入標籤
                        iconName={iconName}                 // 輸入圖樣
                        inputValue={inputValue}     // 輸入值
                        placeholder={placeholder}   // 輸入提示字
                        maxLength={maxLength}       // 輸入最大項目數
                        query={query}               // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
                        required={true}             // 是否為必填欄位
                        isMax={isMax}               // 是否達到項目最大上限
                        setValues={this.setValues}  // 讓子元件執行 setState的方法
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        subComponent={
                            <Multiple
                                query={query}
                                maxLength={maxLength}
                                inputValue={inputValue}
                                placeholder={placeholder}
                                onKeyUp={this.handleKeyUp}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                onClick={this.handleClick}
                                toggleList={this.toggleList}
                                setValues={this.setValues}
                            />
                        }
                    />
                    {/* <ActRacp
                        url={'/json/GetArrayTkt6.js'}
                        minimumStringQueryLength={2} // 最少輸入幾個字
                        minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                        setRef={(actRef) => { this._actref = actRef }} // 用來監聽點擊對象
                        ClassName={(!this.state.showAct && 'd-no')} // 傳入custom class
                        searchKeyWord={inputValue} // 傳入篩選的字串
                        showText={''}// 顯示預設文字
                        whenItemSelect={this.receive.bind(this)} // 模組回傳被選取的物件資料
                        InputIsFocus={isFocus} // 告訴act 上面的input是否被focus
                        noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                        footer={false}  // 是否顯示footer
                        theme={'future'} // 樣式調整: future(站長平台)
                        closeActcallback={() => this.setState({ showAct: false })} // 強勢關閉act callbackFn
                        closeBtnClickHandleCallback={this.closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                        searchMore={this.searchMore} // 搜尋更多"xxx"的產品 callback
                        jsonKey={'destinations'}
                        setSelectValue={this.state.obj ? this.state.obj.dataIndex : ''}
                        changeKey={actRacpChangeKey}
                        catalogue={catalogueCallBack}
                    /> */}
                </div>
            </div>
        );
    }
}

storiesOf('輸入元件 (input)', module).add('int_rctg', () => (
    <div>
        {/* <h3>default max可控制最多幾個選項</h3>
                  <IntRctg placeholder='請輸入' defaultValue='example' max={5} />
                  <h3>size: xs</h3>
                  <IntRctg label='目的地' size='xs' />
                  <h3>size: sm</h3>
                  <IntRctg label='目的地' size='sm' />
                  <h3>size: lg</h3>
                  <IntRctg label='目的地' size='lg' />
                  <h3>label require</h3>
                  <IntRctg label='目的地' require placeholder='開始輸入'></IntRctg>
                  <h3>defaultValue:可傳字串或陣列(多個時用陣列)</h3>
                  <IntRctg label='目的地' defaultValue={['海南島', '濟州島']} />
                  <h3>callback whenAdd whenRemove</h3>
                  <IntRctg
                        label='目的地'
                  /> */}
        <h3>輸入</h3>
        {/* <p>label: 輸入標籤</p>
        <p>icon: 輸入圖示</p>
        <p>placeholder: 輸入提示</p>
        <p>isRequired: 是否加上星號</p>
        <p>defaultValue: 預設關鍵字</p>
        <p>max: 預設關鍵字最大數量</p> */}
        {/* Label */}
        <Demo />
        <hr />
        {/* Multiple */}
        <DemoSingle />
        {/* <DemoLabelWithSingle1 />
        <DemoLabelWithSingle2 />

        <DemoSingleWithRacp /> */}
        <DemoSingleWithRacp2 /><br />
        <DemoSingleWithRacp3 />
        <DemoSingleChangeWithRacp />
        <hr />
        <DemoMultiple />
        {/* Label + Multiple */}
        <DemoLabelWithMultiple1 />
        <DemoLabelWithMultiple2 />
        <DemoMultipleWithRacp />
    </div>
));
