import React, { Component } from 'react';
import Label from '../../magaele/int_rctg/components/Label/Label';
import ActRacp from '../../magaele/act_racp';

// 補字選單分區的callBack
const catalogueCallBack = [
    {
        catalogueName: '城市',
        catafilter: (data) => {
            return data.filter(item => {
                return (item.txt.split('__').length === 2);
            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
        },
    },
    {
        catalogueName: '機場',
        catafilter: (data) => {
            return data.filter(item => {
                return (item.txt.split('__').length > 2);
            }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
        },
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
                url="../json/GetArrayTkt6.js"
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

class Single extends Component {
    state = {
        // 出發地
        inputText: '',    // 綁 input 裡面的值
        showAct: false,
        isFocus: false,
        obj: null,
        searchKeyWord: '',
        onClearValue: false, // 清除資料
    };

    receive = (i) => {
        this.setState({
            obj: i,
            inputText: i.txt,
        });
    }

    onChange = (e) => {
        const val = e.target.value;

        this.setState({
            inputText: val,
            showAct: val.length >= 2 ? true : false, // 當 input 字 2 字以上時打開選單
            searchKeyWord: val,
        });
        // 清除按鈕顯示
        if (val !== '') {
            this.setState({ onClearValue: true });
        } else {
            this.setState({ onClearValue: false });
        }
    }

    isFocus = (e) => {
        if (e.target.value !== '') { // focus 有值時
            this.setState({ isFocus: true, showAct: true, onClearValue: true });
        } else {
            this.setState({ isFocus: true, showAct: true, onClearValue: false });
        }
    }

    onBlur = () => {
        this.setState({
            isFocus: false,
            onClearValue: false
        });
    }



    closeBtnClickHandleCallback = (e) => {
        if (this._actref && !this._actref.contains(e.target) && !this.state.isFocus) {
            const {
                inputText
            } = this.state;
            this.setState({
                showAct: false,
                searchKeyWord: inputText,
            });
        }
    }

    // 清除資料
    handleonClearValue = () => {
        this.setState({ inputText: '', searchKeyWord: '', onClearValue: false });
    }



    render () {
        const {
            inputText,
            showAct,
            isFocus,
            obj,
            searchKeyWord,


        } = this.state;
        return (
            <div className="single-change">
                <Label
                    isRequired
                    size="lg"
                    label={'出發地'}
                    subComponent={
                        <SearchInput
                            value={inputText}
                            onChange={this.onChange}
                            onFocus={this.isFocus}
                            onBlur={this.onBlur}
                            onClearBtn={this.state.onClearValue}
                            onClearFn={this.handleonClearValue}
                            setRef={(actRef) => { this._actref = actRef }}
                            ClassName={(!showAct && 'd-no')} // 傳入custom class
                            searchKeyWord={searchKeyWord} // 傳入篩選的字串
                            whenItemSelect={this.receive}
                            InputIsFocus={isFocus}
                            closeActcallback={() => this.setState({ showAct: false })}
                            closeBtnClickHandleCallback={this.closeBtnClickHandleCallback}
                            setSelectValue={obj ? obj.dataIndex : ''}
                        />
                    }
                />
            </div>
        );
    }
}

export default Single;
