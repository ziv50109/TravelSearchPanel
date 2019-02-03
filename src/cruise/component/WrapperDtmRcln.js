import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ClickOutSide } from '../../../utils';
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
            <i><svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg></i>
        </p>
    );
};
class WrapperDtmRcln extends PureComponent {
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
        this.state = {
            fetchData: [],
            keyword: '',
            showDtm: false,
            showAct: false
        };
    }

    componentDidUpdate (prevProps, prevState) {
        prevProps.travelDataSource !== this.props.travelDataSource && this._getDataCallBack(this.props.travelDataSource);
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
        this.props.onChange && this.props.onChange(data);
    }

    handleOpenMenu = () => {
        !this.state.showDtm && this.setState({
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

    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            sublabel,
            selectedData,
            travelDataSource
        } = this.props;
        const {
            fetchData,
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
            return <Label
                key={item.value}
                text={text}
                removeData={() => this.emitPushData(item)}
            />;
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
                            this.emitPushData(data);
                        } else {
                            this.handleCloseMenu();
                        }
                    }}
                    emitSecondData={(d) => { // 按任意處觸發的function，回傳目前搜尋結果
                        if (keyword.length >= minimumStringQueryLength && d.length > 0) {
                            this.emitPushData(d[0]);
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
                <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : ''}`}>
                    <p className="dtm_rcfr-label">{sublabel}</p>
                    <span
                        className="dtm_rcfr-close_btn"
                        onClick={this.handleCloseMenu}
                    >
                        <svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg>
                    </span>
                    {
                        Object.keys(travelDataSource).length && <DtmRcfr
                            levelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                            orderMaps={{
                                vLine: ['_6', '_5', '_7', '_3', '_1', '_4', '_2', '_9']
                            }}
                            onClickItem={this.emitPushData}
                            selectedData={selected}
                            dataResouce={travelDataSource}
                        />
                    }
                </div>
            </ClickOutSide>
        );
    }
}

export default WrapperDtmRcln;