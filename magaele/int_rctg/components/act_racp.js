import React, { Component } from 'react';
import ActRacp from '../../act_racp';
// import SearchInput from '../../act_racp/components/SearchInput';

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
const SearchInput = ({ placeholderText, onItemSearch, clearWord, clearKeyword, keyWord, isFocus, readOnly, ifTurnOnClear }) => {
    let isOnComposition = false;
    let searchKeyWord = null;
    const isChrome = !!window.chrome && !!window.chrome.webstore;

    const handleComposition = (e) => {
        if (e.type === 'compositionend') {
            // composition結束，代表中文輸入完成
            isOnComposition = false;
            if (e.target instanceof HTMLInputElement && !isOnComposition && isChrome) {
                // 進行搜尋
                onItemSearch(searchKeyWord.value);
            }
        } else {
            // composition進行中，代表正在輸入中文
            isOnComposition = true;
        }
    };
    return (
        <div className="int_rcln int-tags-single noBorder">
            <input
                readOnly={readOnly}
                type="text"
                ref={el => { searchKeyWord = el }}
                placeholder={placeholderText}
                onCompositionStart={handleComposition}
                onCompositionUpdate={handleComposition}
                onCompositionEnd={handleComposition}
                onChange={(e) => {
                    // 只有onComposition===false，才作onChange
                    if (e.target instanceof HTMLInputElement && !isOnComposition) {
                        // 進行搜尋
                        onItemSearch(searchKeyWord.value);
                    }
                    clearWord(searchKeyWord.value);
                }
                }
                value={keyWord || ''}
                onFocus={() => isFocus && isFocus(true)}
                onBlur={() => isFocus && isFocus(false)}
            />
            {/* ifTurnOnClear 如果是 Turn 就會顯示出來 */}
            {ifTurnOnClear ? (
                <span
                    className="clearBtn"
                    onMouseDown={(e) => {
                        clearWord(null);
                        clearKeyword();
                    }}
                />
            ) : null}
        </div>
    );
};

class SingleActRacp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            keyword: '',
            selectVal: null,
            isFocus: false,
            showAct: false,
            value: 0,
            obj: null,
            ifTurnOnClear: false
        };
        this.searchHandler = this.searchHandler.bind(this);
        this.clearWord = this.clearWord.bind(this);
        this.clearKeyword = this.clearKeyword.bind(this);
        this.isFocus = this.isFocus.bind(this);
        this.closeBtnClickHandleCallback = this.closeBtnClickHandleCallback.bind(this);
    }
    shouldComponentUpdate (nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true;
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

        // 輸入時顯示 x 按鈕
        if (this.state.isFocus && txt.length >= this.props.minimumStringQueryLength) {
            this.setState({ ifTurnOnClear: true });
        } else {
            this.setState({ ifTurnOnClear: false });
        }
    }
    receive (i) {
        this.setState({ selectVal: i.txt, obj: i });
    }
    clearWord (text) {
        this.setState({ selectVal: text });
    }
    clearKeyword () {
        this.setState({ keyword: '' });
    }
    isFocus (flag) {
        this.setState({ isFocus: flag });
        if (flag) { this.setState({ showAct: true }) }
        if (flag && this.state.keyword.length >= this.props.minimumStringQueryLength) {
            this.setState({ ifTurnOnClear: true });
        }
    }
    closeBtnClickHandleCallback (e) {
        if (this._actref && !this._actref.contains(e.target) && !this.state.isFocus) {
            this.setState({
                showAct: false,
                ifTurnOnClear: false
            });
        }
    }
    searchMore () {
        window.open('https://uwww.liontravel.com/', '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=250,left=500,width=400,height=400');
    }
    showText () {
        this.state.showText ? this.setState({ showText: '' }) : this.setState({ showText: '請先輸入上方目的地條件' });
    }
    render () {
        const {
            placeholderText,
            url,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText
        } = this.props;
        const {
            selectVal,
            showAct,
            keyword,
            showText,
            isFocus,
            obj,
            ifTurnOnClear
        } = this.state;
        return (
            <div>
                <SearchInput
                    placeholderText={placeholderText}
                    onItemSearch={this.searchHandler}
                    keyWord={selectVal} // 傳出input輸入的字串
                    clearWord={this.clearWord} // 清除所有文字的callbackFn
                    clearKeyword={this.clearKeyword} // 清除keywoed
                    isFocus={this.isFocus} // 當input被focus時告訴preview
                    ifTurnOnClear={ifTurnOnClear} // 判斷是否顯示刪除按鈕
                >
                </SearchInput>
                <ActRacp
                    url={url}
                    minimumStringQueryLength={minimumStringQueryLength} // 最少輸入幾個字
                    minimumStringQuery={minimumStringQuery} // 尚未輸入文字字數到達要求會顯示此字串
                    setRef={(actRef) => { this._actref = actRef }} // 用來監聽點擊對象
                    ClassName={(!showAct && 'd-no')} // 傳入custom class
                    searchKeyWord={keyword} // 傳入篩選的字串
                    showText={showText} // 顯示預設文字
                    whenItemSelect={this.receive.bind(this)} // 模組回傳被選取的物件資料
                    InputIsFocus={isFocus} // 告訴act 上面的input是否被focus
                    noMatchText={noMatchText} // 當沒有配對資料時顯示那些文字
                    footer={false}  // 是否顯示footer
                    theme={'future'} // 樣式調整: future(站長平台)
                    closeActcallback={() => this.setState({ showAct: false, ifTurnOnClear: false })} // 強勢關閉act callbackFn
                    closeBtnClickHandleCallback={this.closeBtnClickHandleCallback} // 點擊關閉視窗icon callbackFn
                    searchMore={this.searchMore} // 搜尋更多"xxx"的產品 callback
                    jsonKey={'destinations'}
                    setSelectValue={obj ? obj.dataIndex : ''}
                    changeKey={actRacpChangeKey}
                    catalogue={catalogueCallBack}
                >
                </ActRacp>
            </div>
        );
    }
}

export default SingleActRacp;