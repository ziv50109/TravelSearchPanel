import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 單純組件
import Label from '../../../magaele/int_rctg/components/Label/Label'; // 外框
import DtmRcfr from '../../../magaele/dtm_rcfr';
import ActRacp from '../../../magaele/act_racp';
import IntRcln from '../../../magaele/int_rcln';
// Utils
import { fetchJsToObj, ClickOutSide } from '../../../utils';

// import './SingleInputMenu.scss';
// 補字選單分區的callBack
// e.g. "祕魯(PE)__利馬-(LIM)".split('__') = ['祕魯(PE)', '利馬-(LIM)']
//      "泰國(TH)__烏汶-(UBP)__烏汶機場(UBP)".split('__') = ['泰國(TH)', '烏汶-(UBP)', '烏汶機場(UBP)']
const catalogueCallBack = [
    {
        catalogueName: '城市',
        catafilter: data => data
    }
];
// 補字選單changeKey
const actRacpChangeKey = data => {
    data.forEach(item => {
        item.txt = item.fullName;
    });
    return data;
};

// const renderLabel = (props) => {
//     const { text, removeData } = props;
//     return (
//         <p className="dtm_rcfr-selected" onClick={removeData}>
//             <span>{text}</span>
//             <i><svg viewBox="0 0 10 10"><use href="#dtm_rcfr-x" /></svg></i>
//         </p>
//     );
// };
class SingleInputMenu extends Component {
    static defaultProps = {
        max: 3,
        minimumStringQueryLength: 2
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
         * label: dtm rcln 的提示文字
         * onChange: dtm rcln 的 callback function，回傳選取的物件
         * removeData: dtm rcln 的 callback function，通知移除物件
         */
        label: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor (props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            keyword: '',
            showDtm: false,
            showAct: false
        };
        this.fetchData = [];
        this.fetchPath = './json/GetArrayTkt6.js';
    }
    componentDidMount () {
        this.getData(this.fetchPath);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        let text = nextProps.selectedData.length
            ? nextProps.selectedData[0].text
            : // .match(/_(\W+.*)/)[1].replace(/<\((.*)\)>|<.*>/g, '')
            '';
        // console.log('xxxx', text);

        this.setState({
            keyword: text
        });
    }
    // fetch data
    getData = source => {
        if (source.indexOf('.json') !== -1) {
            // 若檔案格式為json
            fetch(source, {
                method: 'GET'
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // fetchObject[source] = data; // 把data存起來,若下次再fetch相同網址直接取用就好,不用再發送http request
                    this._getDataCallBack(data);
                });
        } else {
            fetchJsToObj(this.props.fetchPath, data => {
                this._getDataCallBack(data);
            });
        }
    };
    // 處理 fetch 回來的 data
    _getDataCallBack = data => {
        const { vLine, vLinetravel, vLinewebarea } = data;
        let arr = [];
        for (let key1 in vLine) {
            if (Object.prototype.hasOwnProperty.call(vLine, key1)) {
                for (let key2 in vLinetravel[key1]) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            vLinetravel[key1],
                            key2
                        )
                    ) {
                        arr.push({
                            vLine: key1,
                            vLinetravel: key2,
                            vLinewebarea: '_',
                            vLineText: vLine[key1],
                            vLinetravelText: key2 === '_' ? '全區' : '全部',
                            text:
                                key2 === '_'
                                    ? vLine[key1]
                                    : vLinetravel[key1][key2],
                            value: `${key1}-${key2}-_`
                        });
                        (() => {
                            for (let key3 in vLinewebarea[key2]) {
                                if (
                                    Object.prototype.hasOwnProperty.call(
                                        vLinewebarea[key2],
                                        key3
                                    )
                                ) {
                                    arr.push({
                                        vLine: key1,
                                        vLinetravel: key2,
                                        vLinewebarea: key3,
                                        vLineText: vLine[key1],
                                        vLinetravelText:
                                            vLinetravel[key1][key2],
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
    };
    // 通知 parent component data 更新
    emitPushData = data => {
        const { selectedData } = this.props;
        let propsText =
            selectedData.length > 0
                ? selectedData[0].text + '-' + selectedData[0].vLinetravelText
                : '';
        let dataText = data ? data.text + '-' + data.vLinetravelText : '';
        let text = propsText === dataText ? '' : dataText;
        if (data) {
            this.props.onChange && this.props.onChange(data);
            this.setState({ keyword: text, showDtm: false });

            // console.log(propsText, dataText, data.text, dataText === propsText, data.text === propsText);
        } else {
            this.setState({ keyword: '', showDtm: false });
            this.props.onChange && this.props.onChange('');
        }
    };

    handleOpenMenu = () => {
        this.state.keyword
            ? this.setState({ showDtm: false, showAct: true })
            : this.setState({ showDtm: true, showAct: false });
    };
    handleCloseMenu = () => {
        const { selectedData } = this.props;
        const { keyword } = this.state;

        if (this.isMouseDown) return;
        if (selectedData.length > 0) {
            let text = selectedData
                ? selectedData[0].text
                : // .match(/_(\W+.*)/)[1].replace(/<\((.*)\)>|<.*>/g, '')
                '';
            if (keyword.length !== text.length) {
                this.setState({
                    keyword: text,
                    showDtm: false,
                    showAct: false
                });
            }
        }
        this.setState({
            showDtm: false,
            showAct: false
        });
    };
    handleMouseDown = () => {
        this.isMouseDown = true;
    };
    handleMouseUp = () => {
        this.isMouseDown = false;
    };
    // 通知 parent component 移除 data
    handleEmitRemoveData = (e, data) => {
        this.emitPushData(data[0]);
    };
    // 點擊 label wrap 就 focus search input
    handleLabelWrapClick = () => {
        this.searchInput.current.inputDOM.focus();
    };
    handleChange = e => {
        console.log('onCHANGE', e.target.value);
        if (!e.target.value) {
            this.setState({
                keyword: '',
                showAct: false,
                showDtm: true
            });
            this.props.onChange && this.props.onChange('');
        } else {
            this.setState({
                keyword: e.target.value,
                showAct: true,
                showDtm: false
            });
        }
    };

    renameKey = (obj, fn) => {
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let newKey = keys[i];
            let val = obj[key];
            let str = fn(newKey, val);
            if (typeof str === 'string' && str !== '') {
                newKey = str;
                delete obj[key];
            }
            obj[newKey] = val;
        }
        return;
    };

    replaceDataArrow = data => {
        Object.keys(data).map(objkey => {
            for (let i in data[objkey]) {
                if (data[objkey][i]) {
                    data[objkey][i] = data[objkey][i]
                        .replace(/.+__|-\w.+\(.+\)|-\(.+\)/g, '')
                        .replace(/[\<\>]/g, '')
                        .replace(/\-.+/g, '')
                        .replace(/\-.+|市/g, '');
                }
            }
        });
        return;
    };

    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            label,
            subLabel,
            fetchPath,
            isRequired,
            size,
            iconName,
            selectedData
        } = this.props;
        const { keyword, showAct, showDtm } = this.state;

        // DtmRcfr highlight
        // const selected = selectedData.map(item => item.value);
        const selected = selectedData.value;
        return (
            <div className="SingleInputMenu">
                <Label
                    isRequired={isRequired} // 是否為必填欄位
                    size={size} // 高度
                    label={label} // 標籤
                    iconName={iconName} // icon
                    subComponent={
                        <ClickOutSide onClickOutside={this.handleCloseMenu}>
                            <svg viewBox="0 0 10 10" display="none">
                                <path
                                    id="dtm_rcfr-x"
                                    d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z"
                                />
                            </svg>

                            <div className="dtm_rcfr-row">
                                {/* <div className="dtm_rcfr-selected-wrap" onClick={this.handleLabelWrapClick}>
                                    {showText}
                                </div> */}
                                <IntRcln
                                    className="int_rcln int-tags-single"
                                    ref={this.searchInput}
                                    placeholder={placeholder}
                                    onFocus={this.handleOpenMenu}
                                    value={keyword}
                                    onChange={e => this.handleChange(e)}
                                    onClearValue={e =>
                                        this.handleEmitRemoveData(
                                            e,
                                            selectedData
                                        )
                                    }
                                />
                            </div>
                            <ActRacp
                                InputIsFocus={showAct}
                                url={this.fetchPath}
                                minimumStringQueryLength={
                                    minimumStringQueryLength
                                } // 最少輸入幾個字
                                minimumStringQuery={minimumStringQuery} // 尚未輸入文字字數到達要求會顯示此字串
                                searchKeyWord={keyword} // 傳入篩選的字串
                                noMatchText={noMatchText} // 當沒有配對資料時顯示那些文字
                                ClassName={!showAct && 'd-no'} // 傳入custom class
                                footer={false} // 是否顯示footer
                                theme={'future'} // 樣式調整: future(站長平台)
                                closeActcallback={data => {
                                    if (typeof data !== 'undefined') {
                                        this.setState({
                                            showAct: false,
                                            keyword: ''
                                        });
                                        this.emitPushData(data);
                                    } else {
                                        this.handleCloseMenu();
                                    }
                                }} // 鍵盤上下鍵改變選取項目
                                changeKey={actRacpChangeKey}
                                catalogue={catalogueCallBack}
                            />
                            <div
                                className={`dtm_rcfr-wrap ${
                                    showDtm ? 'open' : null
                                }`}
                            >
                                <p className="dtm_rcfr-label">{subLabel}</p>
                                <span
                                    className="dtm_rcfr-close_btn"
                                    onClick={this.handleCloseMenu}
                                >
                                    <svg viewBox="0 0 10 10">
                                        <use href="#dtm_rcfr-x" />
                                    </svg>
                                </span>
                                <DtmRcfr
                                    levelKey={this.props.levelKey}
                                    orderMaps={this.props.orderMaps}
                                    onClickItem={this.emitPushData}
                                    dataResouce={fetchPath}
                                    selectedData={selected}
                                    transformFetchData={d => {
                                        if (typeof d === 'string') {
                                            d += `
                                            let _line = {
                                                '_1A': {
                                                    '_1': '美洲'
                                                },
                                                '_2A': {
                                                    '_2': '大洋洲'
                                                },
                                                '_3A': {
                                                    '_3': '歐洲'
                                                },
                                                '_4A': {
                                                    '_4': '其他'
                                                },
                                                '_5A': {
                                                    '_5': '大陸港澳'
                                                },
                                                '_6A': {
                                                    '_6': '東北亞'
                                                },
                                                '_7A': {
                                                    '_7': '東南亞'
                                                },
                                                '_9A': {
                                                    '_9': '台灣'
                                                }
                                            };`;

                                            let newVariable = d
                                                .replace(/\r?\n|\r/g, '')
                                                .replace(
                                                    /(?:var|let|const)\s(\w+)\s=/g,
                                                    '"$1":'
                                                )
                                                .replace(/;/g, ',')
                                                .replace(/,$/g, '')
                                                .replace(/'/g, '"');

                                            let data = JSON.parse(
                                                '{' + newVariable + '}'
                                            );

                                            this.renameKey(data.line, key => {
                                                return key + 'A';
                                            });

                                            this.replaceDataArrow(
                                                data.city,
                                                () => {
                                                    return data.city;
                                                }
                                            );

                                            // console.log('data_02', data);

                                            return data;
                                        } else {
                                            return d;
                                        }
                                    }}
                                />
                            </div>
                        </ClickOutSide>
                    }
                />
            </div>
        );
    }
}

export default SingleInputMenu;
