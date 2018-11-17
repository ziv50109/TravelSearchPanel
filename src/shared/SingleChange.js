import React, { Component } from 'react';
import Label from '../../magaele/int_rctg/components/Label/Label';
import ActRacp from '../../magaele/act_racp';

// 補字選單分區的callBack
const catalogueCallBack = [
    {
        catalogueName: '城市',
        catafilter: data => {
            return data
                .filter(item => {
                    return item.txt.split('__').length === 2;
                })
                .sort(
                    (a, b) =>
                        a.txt.length - b.txt.length || a.dataIndex - b.dataIndex
                );
        }
    },
    {
        catalogueName: '機場',
        catafilter: data => {
            return data
                .filter(item => {
                    return item.txt.split('__').length > 2;
                })
                .sort(
                    (a, b) =>
                        a.txt.length - b.txt.length || a.dataIndex - b.dataIndex
                );
        }
    }
];

// 補字選單changeKey
const actRacpChangeKey = data => {
    data.forEach(item => {
        item.txt = item.fullName;
        delete item.fullName;
    });
    return data;
};

class SingleChange extends Component {
    state = {
        // 出發地
        dptInputText: '',
        dptShowAct: false,
        dptIsFocus: false,
        dptObj: null,
        dptSearchKeyWord: '',
        dptClearValue: false, // 清除資料

        // 目的地
        dtnInputText: '',
        dtnShowAct: false,
        dtnIsFocus: false,
        dtnObj: null,
        dtnSearchKeyWord: '',
        dtnClearValue: false // 清除資料
    };

    dptReceive = i => {
        this.setState({
            dptObj: i,
            dptInputText: i.txt
        });
    };

    dptOnChange = e => {
        const val = e.target.value;

        this.setState({
            dptInputText: val,
            dptShowAct: val.length >= 2 ? true : false, // 當 input 字 2 字以上時打開選單
            dptSearchKeyWord: val
        });
        // 清除按鈕顯示
        if (val !== '') {
            this.setState({ dptClearValue: true });
        } else {
            this.setState({ dptClearValue: false });
        }
    };

    dptIsFocus = e => {
        if (e.target.value !== '') {
            // focus 有值時
            this.setState({
                dptIsFocus: true,
                dptShowAct: true,
                dptClearValue: true
            });
        } else {
            this.setState({
                dptIsFocus: true,
                dptShowAct: true,
                dptClearValue: false
            });
        }
    };

    dptOnBlur = () => {
        this.setState({
            dptIsFocus: false,
            dptClearValue: false
        });
    };

    closeBtnClickHandleCallback = e => {
        if (
            this._actref &&
            !this._actref.contains(e.target) &&
            !this.state.dptIsFocus
        ) {
            const { dptInputText } = this.state;
            this.setState({
                dptShowAct: false,
                dptSearchKeyWord: dptInputText
            });
        }
    };

    // 清除資料
    handleDptClearValue = () => {
        this.setState({
            dptInputText: '',
            dptSearchKeyWord: '',
            dptClearValue: false
        });
    };

    // 交換
    switch = () => {
        const {
            dptInputText: txt1,
            dptSearchKeyWord: search1,
            dtnInputText: txt2,
            dtnSearchKeyWord: search2
        } = this.state;

        const obj1 = JSON.parse(JSON.stringify(this.state.dptObj)); // dptObj
        const obj2 = JSON.parse(JSON.stringify(this.state.dtnObj)); // dtnObj

        this.setState({
            dptInputText: txt2,
            dptObj: obj2,
            dptSearchKeyWord: search2,
            dtnInputText: txt1,
            dtnObj: obj1,
            dtnSearchKeyWord: search1
        });
    };

    dtnReceive = i => {
        this.setState({
            dtnObj: i,
            dtnInputText: i.txt
        });
    };
    dtnOnChange = e => {
        const val = e.target.value;
        this.setState({
            dtnInputText: val,
            dtnShowAct: val.length >= 2 ? true : false,
            dtnSearchKeyWord: val
        });
        // 清除按鈕顯示
        if (val !== '') {
            this.setState({ dtnClearValue: true });
        } else {
            this.setState({ dtnClearValue: false });
        }
    };
    dtnIsFocus = e => {
        if (e.target.value !== '') {
            this.setState({
                dtnIsFocus: true,
                dtnShowAct: true,
                dtnClearValue: true
            });
        } else {
            this.setState({
                dtnIsFocus: true,
                dtnShowAct: true,
                dtnClearValue: false
            });
        }
    };
    dtnOnBlur = () => {
        this.setState({
            dtnIsFocus: false,
            dtnClearValue: false
        });
    };
    closeBtnClickHandleCallback2 = e => {
        if (
            this._actref2 &&
            !this._actref2.contains(e.target) &&
            !this.state.dtnIsFocus
        ) {
            const { dtnInputText } = this.state;
            this.setState({
                dtnShowAct: false,
                dtnSearchKeyWord: dtnInputText
            });
        }
    };

    handleDtnClearValue = () => {
        this.setState({
            dtnInputText: '',
            dtnSearchKeyWord: '',
            dtnClearValue: false
        });
    };

    render () {
        const {
            dptInputText,
            dptShowAct,
            dptIsFocus,
            dptObj,
            dptSearchKeyWord,
            dptClearValue,

            dtnInputText,
            dtnShowAct,
            dtnIsFocus,
            dtnObj,
            dtnSearchKeyWord,
            dtnClearValue
        } = this.state;
        return (
            <div className="single-change">
                <Label
                    isRequired
                    size="lg"
                    label={'出發地'}
                    subComponent={
                        <React.Fragment>
                            <div className="int_rcln int-tags-single noBorder">
                                <input
                                    type="text"
                                    value={dptInputText}
                                    placeholder="我是placeholder"
                                    onChange={this.dptOnChange}
                                    onFocus={this.dptIsFocus}
                                    onBlur={this.dptOnBlur}
                                />
                                {dptClearValue ? (
                                    <span className="clearBtn" onMouseDown={this.handleDtnClearValue} />
                                ) : null}
                            </div>
                            <ActRacp
                                url="../json/GetArrayTkt6.js"
                                minimumStringQueryLength={2} // 最少輸入幾個字
                                minimumStringQuery="最少輸入兩個字" // 尚未輸入文字字數到達要求會顯示此字串
                                setRef={actRef => {
                                    this._actref = actRef;
                                }} // 用來監聽點擊對象
                                ClassName={!dptShowAct && 'd-no'} // 傳入custom class
                                searchKeyWord={dptSearchKeyWord} // 傳入篩選的字串
                                whenItemSelect={this.dptReceive} // 模組回傳被選取的物件資料
                                InputIsFocus={dptIsFocus} // 告訴act 上面的input是否被focus
                                noMatchText="找不到資料" // 當沒有配對資料時顯示那些文字
                                footer={false} // 是否顯示footer
                                theme={'future'} // 樣式調整: future(站長平台)
                                closeActcallback={() => this.setState({ dptShowAct: false })} // 強勢關閉act callbackFn
                                closeBtnClickHandleCallback={this.closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                                jsonKey={'destinations'}
                                setSelectValue={dptObj ? dptObj.dataIndex : ''}
                                changeKey={actRacpChangeKey}
                                catalogue={catalogueCallBack}
                            />
                        </React.Fragment>
                    }
                />
                <div className="changeBtn" onClick={this.switch} />
                <Label
                    isRequired
                    size="lg"
                    label={'目的地'}
                    subComponent={
                        <React.Fragment>
                            <div className="int_rcln int-tags-single noBorder">
                                <input
                                    type="text"
                                    value={dtnInputText}
                                    placeholder="我是placeholder"
                                    onChange={this.dtnOnChange}
                                    onFocus={this.dtnIsFocus}
                                    onBlur={this.dtnOnBlur}
                                />
                                {dtnClearValue ? (
                                    <span className="clearBtn" onMouseDown={this.handleDtnClearValue} />
                                ) : null}
                            </div>
                            <ActRacp
                                url="../json/GetArrayTkt6.js"
                                minimumStringQueryLength={2} // 最少輸入幾個字
                                minimumStringQuery="最少輸入兩個字" // 尚未輸入文字字數到達要求會顯示此字串
                                setRef={actRef => {
                                    this._actref2 = actRef;
                                }} // 用來監聽點擊對象
                                ClassName={!dtnShowAct && 'd-no'} // 傳入custom class
                                searchKeyWord={dtnSearchKeyWord} // 傳入篩選的字串
                                whenItemSelect={this.dtnReceive} // 模組回傳被選取的物件資料
                                InputIsFocus={dtnIsFocus} // 告訴act 上面的input是否被focus
                                noMatchText="找不到資料" // 當沒有配對資料時顯示那些文字
                                footer={false} // 是否顯示footer
                                theme={'future'} // 樣式調整: future(站長平台)
                                closeActcallback={() => this.setState({ dtnShowAct: false })} // 強勢關閉act callbackFn
                                closeBtnClickHandleCallback={this.closeBtnClickHandleCallback2} // 點擊關閉視窗icon callbackFn
                                jsonKey={'destinations'}
                                setSelectValue={dtnObj ? dtnObj.dataIndex : ''}
                                changeKey={actRacpChangeKey}
                                catalogue={catalogueCallBack}
                            />
                        </React.Fragment>
                    }
                />
            </div>
        );
    }
}

export default SingleChange;
