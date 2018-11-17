import React, { Component } from 'react';
import ActRacp from '../../../act_racp';
import DtmRcfr from '../../../dtm_rcfr';
import cx from 'classnames';
import { getDomPosition, findHighestZIndex, fetchJsToObj } from '../../../dtm_rcln/utils';
// import SearchInput from '../../act_racp/components/SearchInput';

// // 補字選單分區的callBack
// const catalogueCallBack = [
//     {
//         catalogueName: '城市',
//         catafilter: (data) => {
//             return data.filter(item => {
//                 return (item.txt.split('__').length === 2);
//             }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
//         },
//         // icon: (<IcRcln name="toolmapf" />)
//     },
//     {
//         catalogueName: '機場',
//         catafilter: (data) => {
//             return data.filter(item => {
//                 return (item.txt.split('__').length > 2);
//             }).sort((a, b) => a.txt.length - b.txt.length || a.dataIndex - b.dataIndex);
//         },
//         // icon: (<IcRcln name="toolmapf" />)
//     }
// ];

// // 補字選單changeKey
// const actRacpChangeKey = (data) => {
//     data.forEach((item) => {
//         item.txt = item.fullName;
//         delete item.fullName;
//     });
//     return data;
// };
// 補字選單分區的callBack
// e.g. "祕魯(PE)__利馬-(LIM)".split('__') = ['祕魯(PE)', '利馬-(LIM)']
//      "泰國(TH)__烏汶-(UBP)__烏汶機場(UBP)".split('__') = ['泰國(TH)', '烏汶-(UBP)', '烏汶機場(UBP)']
const catalogueCallBack = [
    {
        catalogueName: '城市',
        catafilter: (data) => data
    }
];
// 補字選單changeKey
const actRacpChangeKey = (data) => {
    data.forEach((item) => {
        if (item.vLinewebarea === '_') {
            item.txt = `${item.text}${item.vLinetravelText}`;
        } else {
            item.txt = `${item.text}-${item.vLinetravelText}`;
        }
    });
    return data;
};

const SearchInput = ({ placeholderText, onItemSearch, clearWord, clearKeyword, keyWord, isFocus, readOnly, ifTurnOnClear, onChange }) => {
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
                    if (typeof onChange === 'function') { onChange(e) }
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

class SingleActRacpWithDtmRcfr extends Component {
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
        this.fetchData = [];
        this.searchHandler = this.searchHandler.bind(this);
        this.clearWord = this.clearWord.bind(this);
        this.clearKeyword = this.clearKeyword.bind(this);
        this.isFocus = this.isFocus.bind(this);
        this.closeBtnClickHandleCallback = this.closeBtnClickHandleCallback.bind(this);
    }
    componentDidMount () {
        this.handleFetchData('./json/TRS1NEW.json');
    }
    shouldComponentUpdate (nextProps, nextState) {
        if (this.state === nextState) {
            return false;
        }
        return true;
    }

    searchHandler (txt) {
        // 輸入大於兩個字才能搜尋
        const { setValues } = this.props;
        let self = this;
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            self.setState({ keyword: '' });
            (txt.length >= 2 || txt.length === 0) && self.setState({ keyword: txt, selectVal: txt })
            && setValues({ keyword: txt });
        }, 500);

        // 輸入時顯示 x 按鈕
        if (this.state.isFocus && txt.length >= this.props.minimumStringQueryLength) {
            this.setState({ ifTurnOnClear: true });
        } else {
            this.setState({ ifTurnOnClear: false });
        }
    }
    receive = i => {
        const { setValues } = this.props;
        let arr = []; arr.push(i);
        this.setState({ selectVal: i.text, obj: i, open: false });
        setValues({ keyword: i.text, obj: i, selectedData: arr });
    }
    clearWord (text) {
        this.setState({ selectVal: text });
        this.props.setValues({ selectedData: [], obj: {}, keyword: text });
    }
    clearKeyword () {
        this.setState({ keyword: '' });
        this.props.setValues(prevState => ({ keyword: '', selectedData: [], obj: {}}));
    }
    isFocus (flag) {
        const { keyword } = this.state;
        this.setState({ isFocus: flag, open: keyword.length === 0 });
        // if (flag) { this.setState({ showAct: true }) }
        if (flag && this.state.keyword.length >= this.props.minimumStringQueryLength) {
            this.setState({ ifTurnOnClear: true });
        }
    }
    toggleMenu = e => {
        this.setState({
            open: e.target.value.length === 0,
            showAct: e.target.value.length > 0
        });
        console.log(e.keycode);
    }
    closeMenu =() => {
        if (this.isMouseDown) return;
        this.setState({ open: false });
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
    renderLabel (lbl) {
        return <p className="dtm_label">{lbl}</p>;
    }
    handleFetchData = (source) => {
        if (source.indexOf('.json') !== -1) { // 若檔案格式為json
            fetch(source, {
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(data => {
                // fetchObject[source] = data; // 把data存起來,若下次再fetch相同網址直接取用就好,不用再發送http request
                this._fetchDataCallBack(data);
            });
        } else {
            fetchJsToObj(this.props.fetchPath, (data) => {
                this._fetchDataCallBack(data);
            });
        }
    }
    _fetchDataCallBack = (data) => {
        const { vLine, vLinetravel, vLinewebarea } = data;
        let arr = [];
        for (let key1 in vLine) {
            for (let key2 in vLinetravel[key1]) {
                arr.push({
                    vLine: key1,
                    vLinetravel: key2,
                    vLinewebarea: '_',
                    vLineText: vLine[key1],
                    vLinetravelText: key2 === '_' ? '全區' : '全部',
                    text: key2 === '_' ? vLine[key1] : vLinetravel[key1][key2],
                    value: `${key1}-${key2}-_`
                });
                for (let key3 in vLinewebarea[key2]) {
                    arr.push({
                        vLine: key1,
                        vLinetravel: key2,
                        vLinewebarea: key3,
                        vLineText: vLine[key1],
                        vLinetravelText: vLinetravel[key1][key2],
                        text: `${vLinewebarea[key2][key3]}`,
                        value: `${key1}-${key2}-${key3}`
                    });
                }
            }
        }
        this.fetchData = arr.filter(item => item.text.indexOf('不限') === -1);
        this.forceUpdate();
    }
    render () {
        const {
            placeholderText,
            url,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            selectedData,
            keyword,
        } = this.props;
        const {
            showAct,
            showText,
            isFocus,
            obj,
            ifTurnOnClear
        } = this.state;
        const classes = cx('dtm_rcln', {
            open: this.state.open,
            isMobile: this.props.isMobile
        });
        console.log('POSITIONDOM:');
        console.log(this.props.positionDOM);
        const styles = {
            'zIndex': this.zIndex,
            // 'left': (this.props.positionDOM) ? getDomPosition(this.props.positionDOM, 'left') : null,
            // 'top': (this.props.positionDOM) ? getDomPosition(this.props.positionDOM, 'top') + getDomPosition(this.props.positionDOM, 'height') : null
        };
        // const selectedData = this.state.selectedData;
        const txt = (selectedData.length > 0) ? selectedData[0].text : '';
        const selected = selectedData.map(v => v.value);
        return (
            <div>
                <SearchInput
                    placeholderText={placeholderText}
                    onItemSearch={this.searchHandler}
                    keyWord={keyword} // 傳出input輸入的字串
                    clearWord={this.clearWord} // 清除所有文字的callbackFn
                    isFocus={this.isFocus} // 當input被focus時告訴preview
                    ifTurnOnClear={ifTurnOnClear} // 判斷是否顯示刪除按鈕
                    onChange={this.toggleMenu}
                >
                </SearchInput>
                <ActRacp
                    // url={url}
                    url={this.fetchData}
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
                <div className={classes}
                    style={styles}
                    tabIndex={-1}
                    // onFocus={this.isFocus}
                    // onBlur={this.props.onBlur}
                    // onMouseDown={this.props.onMouseDown}
                    // onMouseUp={this.props.onMouseUp}
                >

                    {this.renderLabel('找不到選項？請輸入關鍵字查詢')}

                    <span
                        className="close_btn"
                        onClick={this.closeMenu}
                    >
                    ×
                    </span>

                    <DtmRcfr
                        levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                        dataResouce="./json/TRS1NEW.json"
                        replaceRegular={/[a-zA-Z\(\)\s]/g}
                        onClickItem={this.receive}
                        selectedData={selected}

                    />
                </div>
            </div>
        );
    }
}

export default SingleActRacpWithDtmRcfr;