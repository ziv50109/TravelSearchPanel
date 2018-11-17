import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchJsToObj, ClickOutSide } from '../../../utils';
import DtmRcfr from '../../../magaele/dtm_rcfr';
import ActRacp from '../../../magaele/act_racp';
import IntRcln from '../../../magaele/int_rcln';

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


const Label = ({ text, removeData }) => {
    return (
        <p className="dtm_rcfr-selected" onClick={removeData}>
            <span title={text}>{text}</span>
            <i><svg viewBox="0 0 10 10"><use href="#dtm_rcfr-x" /></svg></i>
        </p>
    );
};
class WrapperDtmRcln extends Component {
    static defaultProps = {
        max: 3,
        minimumStringQueryLength: 2,
    };
    static propTypes = {
        /**
         * fetchPath: fetch 的資料，js or json
         * selectedData: 存放選取的資料
         * max: 選取的資料的上限筆數，非必要
         */
        fetchPath: PropTypes.string.isRequired,
        selectedData: PropTypes.array.isRequired,
        max: PropTypes.number,
        /**
         * placeholder: int rcln 的 placeholder
         * minimumStringQueryLength: act racp 最少輸入文字
         * minimumStringQuery: act racp 輸入文字不夠的提示訊息內容
         * noMatchText: act racp 沒有配資料時的提示訊息內容
         */
        placeholder: PropTypes.string,
        minimumStringQueryLength: PropTypes.number.isRequired,
        minimumStringQuery: PropTypes.string,
        noMatchText: PropTypes.string,
        /**
         * autoShowDtm: 預設是否顯示 dtm rcln
         * label: dtm rcln 的提示文字
         * onChange: dtm rcln 的 callback function，回傳選取的物件
         * removeData: dtm rcln 的 callback function，通知移除物件
         */
        autoShowDtm: PropTypes.bool,
        label: PropTypes.string,
        onChange: PropTypes.func,
    }

    constructor (props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            keyword: '',
            showDtm: false,
            showAct: false
        };
        this.fetchData = [];
    }
    componentDidMount () {
        this.getData(this.props.fetchPath);
    }
    // fetch data
    getData = (source) => {
        if (source.indexOf('.json') !== -1) { // 若檔案格式為json
            fetch(source, {
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(data => {
                // fetchObject[source] = data; // 把data存起來,若下次再fetch相同網址直接取用就好,不用再發送http request
                this._getDataCallBack(data);
            });
        } else {
            fetchJsToObj(this.props.fetchPath, (data) => {
                this._getDataCallBack(data);
            });
        }
    }
    // 處理 fetch 回來的 data
    _getDataCallBack = (data) => {
        const { vLine, vLinetravel, vLinewebarea } = data;
        let arr = [];
        for (let key1 in vLine) {
            if (Object.prototype.hasOwnProperty.call(vLine, key1)) {
                for (let key2 in vLinetravel[key1]) {
                    if (Object.prototype.hasOwnProperty.call(vLinetravel[key1], key2)) {
                        arr.push({
                            vLine: key1,
                            vLinetravel: key2,
                            vLinewebarea: '_',
                            vLineText: vLine[key1],
                            vLinetravelText: key2 === '_' ? '全區' : '全部',
                            text: key2 === '_' ? vLine[key1] : vLinetravel[key1][key2],
                            value: `${key1}-${key2}-_`
                        });
                        (() => {
                            for (let key3 in vLinewebarea[key2]) {
                                if (Object.prototype.hasOwnProperty.call(vLinewebarea[key2], key3)) {
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
                        })();
                    }
                }
            }
        }
        this.fetchData = arr.filter(item => item.text.indexOf('不限') === -1);
        this.forceUpdate();
    }
    // 通知 parent component data 更新
    emitPushData = (data) => {
        this.props.onChange && this.props.onChange(data);
    }

    handleOpenMenu = () => {
        this.setState({
            showAct: false,
            showDtm: true
        });
    }
    handleCloseMenu = () => {
        if (this.isMouseDown) return;
        this.setState({
            showAct: false,
            showDtm: false,
            keyword: ''
        });
    }
    handleMouseDown = () => {
        this.isMouseDown = true;
    }
    handleMouseUp = () => {
        this.isMouseDown = false;
    }
    // 通知 parent component 移除 data
    handleEmitRemoveData = (e, data) => {
        e.stopPropagation();
        this.emitPushData(data);
    }

    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            sublabel,
            fetchPath,
            selectedData
        } = this.props;
        const {
            keyword,
            showAct,
            showDtm
        } = this.state;

        // render select value
        const showText = selectedData.map((item) => {
            let text = '';
            if (item.vLinewebarea === '_') {
                text = item.txt || item.text;
            } else {
                text = `${item.text}-${item.vLinetravelText}`;
            }
            return <Label key={item.value} text={text} removeData={(e) => this.handleEmitRemoveData(e, item)} />;
        });

        // DtmRcfr highlight
        const selected = selectedData.map(item => item.value);

        return (
            <ClickOutSide onClickOutside={this.handleCloseMenu}>
                <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>

                <div className="dtm_rcfr-row">
                    <div className="dtm_rcfr-selected-wrap">
                        {showText}
                    </div>
                    <IntRcln
                        ref={this.searchInput}
                        placeholder={placeholder}
                        onFocus={this.handleOpenMenu}
                        value={keyword}
                        onChange={(e) => {
                            if (!e.target.value) {
                                this.setState({
                                    keyword: '',
                                    showAct: false,
                                    showDtm: true
                                });
                            } else {
                                this.setState({
                                    keyword: e.target.value,
                                    showAct: true,
                                    showDtm: false
                                });
                            }
                        }}
                        onClearValue={this.handleCloseMenu}
                    />
                </div>
                <ActRacp
                    InputIsFocus={showAct}
                    url={this.fetchData}
                    minimumStringQueryLength={minimumStringQueryLength} // 最少輸入幾個字
                    minimumStringQuery={minimumStringQuery} // 尚未輸入文字字數到達要求會顯示此字串
                    searchKeyWord={keyword} // 傳入篩選的字串
                    noMatchText={noMatchText} // 當沒有配對資料時顯示那些文字
                    ClassName={(!showAct && 'd-no')} // 傳入custom class
                    footer={false} // 是否顯示footer
                    theme={'future'} // 樣式調整: future(站長平台)
                    closeActcallback={(data) => {
                        if (typeof data !== 'undefined') {
                            this.setState({ showAct: false, keyword: '' });
                            this.emitPushData(data);
                        } else {
                            this.handleCloseMenu();
                        }
                    }} // 鍵盤上下鍵改變選取項目
                    emitSecondData={(d) => {
                        if (keyword.length >= minimumStringQueryLength && d.length > 0) {
                            this.emitPushData(d[0]);
                            this.setState({
                                keyword: '',
                                showAct: false,
                                showDtm: true
                            });
                        }
                    }}//若補字未選擇即離開選單,直接選擇補字選單第一項
                    changeKey={actRacpChangeKey}
                    catalogue={catalogueCallBack}
                />
                <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : ''}`}>
                    <p className="dtm_rcfr-label">{sublabel}</p>
                    <span
                        className="dtm_rcfr-close_btn"
                        onClick={this.handleCloseMenu}
                    >
                        <svg viewBox="0 0 10 10"><use href="#dtm_rcfr-x" /></svg>
                    </span>
                    <DtmRcfr
                        levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                        orderMaps={{
                            vLine: ['_6', '_5', '_7', '_3', '_1', '_4', '_2', '_9']
                        }}
                        onClickItem={this.emitPushData}
                        dataResouce={fetchPath}
                        selectedData={selected}
                        transformFetchData={(d) => {
                            if (typeof d === 'string') {
                                let newVariable = d.replace(/\r?\n|\r/g, '').replace(/(?:var|let|const)\s(\w+)\s=/g, '"$1":').replace(/;/g, ',').replace(/,$/g, '').replace(/'/g, '"');
                                let jsonVariable = JSON.parse('{' + newVariable + '}');
                                delete jsonVariable.vLine._;
                                delete jsonVariable.vLinetravel._;
                                return jsonVariable;
                            } else {
                                return d;
                            }
                        }}
                    />
                </div>
            </ClickOutSide>
        );
    }
}

export default WrapperDtmRcln;