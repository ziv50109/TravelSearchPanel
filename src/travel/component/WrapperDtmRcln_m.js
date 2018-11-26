import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DtmRcfr from '../../../magaele/dtm_rcfr';
import ActRacp from '../../../magaele/act_racp';
import IntRcln from '../../../magaele/int_rcln';
import BtRcnb from '../../../magaele/bt_rcnb';

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
class WrapperDtmRcln extends PureComponent {
    static defaultProps = {
        max: 3,
        minimumStringQueryLength: 2,
        autoShowDtm: false
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
            fetchData: [],
            keyword: '',
            showDtm: true,
            showAct: false,
            selectedData: this.props.selectedData
        };
    }
    componentDidMount () {
        this._getDataCallBack(this.props.dataSource);
    }

    // 處理父層 fetch 回來的 data
    _getDataCallBack = (data) => {
        const { vLine, vLinetravel, vLinewebarea } = data;
        let arr = [];
        const _level3 = (key1, key2) => {
            for (let key3 in vLinewebarea[key2]) {
                if (vLinewebarea[key2].hasOwnProperty(key3)) {
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
        };
        for (let key1 in vLine) {
            if (vLine.hasOwnProperty(key1)) {
                for (let key2 in vLinetravel[key1]) {
                    if (vLinetravel[key1].hasOwnProperty(key2)) {
                        arr.push({
                            vLine: key1,
                            vLinetravel: key2,
                            vLinewebarea: '_',
                            vLineText: vLine[key1],
                            vLinetravelText: key2 === '_' ? '全區' : '全部',
                            text: key2 === '_' ? vLine[key1] : vLinetravel[key1][key2],
                            value: `${key1}-${key2}-_`
                        });
                        _level3(key1, key2);
                    }
                }
            }
        }

        let newArr = arr.filter(item => item.text.indexOf('不限') === -1);
        this.setState({
            fetchData: newArr
        });
    }
    // 通知 parent component data 更新
    emitPushData = (data) => {
        this.props.emitPushData && this.props.emitPushData(data);
    }
    // 選取資料暫存在 selectedData
    handlePushData = (data) => {
        const { selectedData } = this.state;
        if (selectedData.some(item => data.value === item.value)) {
            this.setState({
                selectedData: this.changeDestination.remove(data)
            });
        } else if (selectedData.length < this.props.max) {
            this.setState({
                selectedData: this.changeDestination.add(data)
            });
        } else {
            return;
        }
    }
    changeDestination = (() => {
        return {
            add: (data) => {
                const { selectedData } = this.state;
                const checkLevel = this.changeDestination.checkLevel;
                let arr = [];

                // 點擊更大層數的處理
                if (data.vLinetravel === '_') {
                    // console.log('點第一層');
                    let newArr = [...selectedData].filter(item => item.vLine !== data.vLine);
                    arr = [...newArr, data];

                } else if (data.vLinewebarea === '_') {
                    let newArr = [...selectedData].filter(item => item.vLinetravel !== data.vLinetravel);
                    if (checkLevel(data, 'vLinetravel', 'vLine')) {
                        // console.log('塊陶阿!!!有第一層的選項在!!!');
                        arr = [...newArr, data].filter(item => item.vLinetravel !== '_' || item.vLine !== data.vLine);
                    } else {
                        // console.log('點第二層');
                        arr = [...newArr, data];
                    }
                } else {
                    if (checkLevel(data, 'vLinetravel', 'vLine')) {
                        // console.log('塊陶阿!!!有第一層的選項在!!!');
                        arr = [...selectedData, data].filter(item => item.vLinetravel !== '_' || item.vLine !== data.vLine);
                    } else if (checkLevel(data, 'vLinewebarea', 'vLinetravel')) {
                        // console.log('塊陶阿!!!有第二層的選項在!!!');
                        arr = [...selectedData, data].filter(item => item.vLinewebarea !== '_' || item.vLinetravel !== data.vLinetravel);
                    } else {
                        // console.log('點第三層');
                        arr = [...selectedData, data];
                    }
                }

                return arr;
            },
            remove: (data) => {
                const { selectedData } = this.state;
                return selectedData.filter(item => data.value !== item.value);
            },
            checkLevel: (data, condition1, condition2) => {
                const { selectedData } = this.state;
                return selectedData.some(item => {
                    return item[condition1] === '_' && item[condition2] === data[condition2];
                });
            }
        };
    })();

    handleOpenMenu = () => {
        this.setState({
            showAct: false,
            showDtm: true
        });
    }
    handleCloseMenu = () => {
        this.setState({
            showAct: false,
            showDtm: false,
            keyword: ''
        });
    }
    // 點擊 label wrap 就 focus search input
    handleLabelWrapClick = () => {
        this.searchInput.current.inputDOM.focus();
    }

    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            sublabel,
            fetchPath
        } = this.props;
        const {
            fetchData,
            keyword,
            showAct,
            showDtm,
            selectedData
        } = this.state;

        // render select value
        const showText = selectedData.map((item) => {
            let text = '';
            if (item.vLinewebarea === '_') {
                text = item.txt || item.text;
            } else {
                text = `${item.text}-${item.vLinetravelText}`;
            }
            return <Label
                key={item.value}
                text={text}
                removeData={() => this.handlePushData(item)}
            />;
        });

        // DtmRcfr highlight
        const selected = selectedData.map(item => item.value);

        return (
            <div>
                <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>

                <h3 className="txt-center page_title m-t-sm m-b-sm">目的地</h3>
                <div className="dtm_rcfr-row">
                    <div className="dtm_rcfr-input-wrap">
                        <div className="dtm_rcfr-selected-wrap" onClick={this.handleLabelWrapClick}>
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
                            onClearValue={() => this.setState({
                                keyword: '',
                                showAct: false,
                                showDtm: true
                            })}
                        />
                    </div>
                    <BtRcnb md radius whenClick={() => this.emitPushData(selectedData)}>確定</BtRcnb>
                </div>
                <ActRacp
                    InputIsFocus={showAct}
                    url={fetchData}
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
                            this.handlePushData(data);
                        }
                        this.handleOpenMenu();
                    }}
                    emitSecondData={(d) => { // 按任意處觸發的function，回傳目前搜尋結果
                        if (keyword.length >= minimumStringQueryLength && d.length > 0) {
                            this.handlePushData(d[0]);
                            this.setState({
                                keyword: '',
                                showAct: false,
                                showDtm: true
                            });
                        }
                    }}
                    changeKey={actRacpChangeKey}
                    catalogue={catalogueCallBack}
                />
                <p className="dtm_rcfr-label">{sublabel}</p>
                <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : ''}`}>
                    {
                        Object.keys(this.props.dataSource).length && <DtmRcfr
                            levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                            orderMaps={{
                                vLine: ['_6', '_5', '_7', '_3', '_1', '_4', '_2', '_9']
                            }}
                            onClickItem={this.handlePushData}
                            selectedData={selected}
                            dataResouce={fetchPath}
                            transformFetchData={(d) => {
                                // if (typeof d === 'string') {
                                //     let newVariable = d.replace(/\r?\n|\r/g, '').replace(/(?:var|let|const)\s(\w+)\s=/g, '"$1":').replace(/;/g, ',').replace(/,$/g, '').replace(/'/g, '"');
                                //     return JSON.parse('{' + newVariable + '}');
                                // } else {
                                //     return d;
                                // }
                                return this.props.dataSource;
                            }}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default WrapperDtmRcln;