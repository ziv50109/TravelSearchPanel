import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { vacationTaiwan } from '../../../../source.config';

// 單純組件
import Label from '../../../../magaele/int_rctg/components/Label/Label';    // 外框
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import ActRacp from '../../../../magaele/act_racp';
import IntRcln from '../../../../magaele/int_rcln';
// Utils
import { fetchJsToObj, ClickOutSide } from '../../../../utils';

import './SingleInputMenu.scss';
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
        item.txt = `${item.text}`;
    });
    return data;
};

class SingleInputMenuM extends Component {
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
        onChange: PropTypes.func,
    }

    constructor (props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            keyword: '',
            showDtm: true,
            showAct: false
        };
        this.fetchData = [];
        this.fetchPath = vacationTaiwan.destination;
    }
    componentDidMount () {
        this.getData(this.props.fetchPath);
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        let text = nextProps.selectedData.length ?
            (nextProps.selectedData[0].text)
            : '';
        this.setState({
            keyword: text
        });
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
        // const { vLine, vLinetravel, vLinewebarea } = data;
        let arr = [];
        let listA = Object.keys(data.vArea['_9']);
        listA.map((kind, i) => {
            let listB = Object.keys(data.vTcity[listA[i]]);
            listB.map((item, idx) => {
                let listC = listB[idx];
                let listD = data.vTcity[listA[i]][listB[idx]];
                const obj = {
                    vArea: listA[i],
                    vLineText: data.vArea['_9'][`${listA[i]}`],
                    vLinewebarea: '_',
                    vLinetravel: listC,
                    vLinetravelText: listD,
                    text: `${listD}-${data.vArea['_9'][`${listA[i]}`]}`,
                    vTcity: `${listC}`,
                    value: `_9-${listA[i]}-${listC}`,
                };
                arr.push(obj);
            });
        });
        this.fetchData = arr;
        this.forceUpdate();
    }
    // 通知 parent component data 更新
    emitPushData = (data) => {
        const { selectedData } = this.props;
        let propsText = selectedData.length > 0 ?
            selectedData[0].text + '-' + selectedData[0].vLinetravelText : '';
        let dataText = data ? data.text + '-' + data.vLinetravelText : '';
        let text = propsText === dataText ? '' : dataText;
        if (data) {
            this.props.onChange && this.props.onChange(data);
            this.setState({ keyword: text, showDtm: true });

            // console.log(propsText, dataText, data.text, dataText === propsText, data.text === propsText);
        }
        else {
            this.setState({ keyword: '', showDtm: true });
            this.props.onChange && this.props.onChange('');
        }
    }
    handleCloseMenu = () => {
        const { selectedData } = this.props;
        const { keyword } = this.state;
        if (this.isMouseDown) return;
        if (selectedData.length > 0) {
            let text = selectedData ?
                selectedData[0].text
                : '';
            if (keyword.length !== text.length) {
                this.setState({
                    keyword: text,
                    showDtm: true, showAct: false
                });
            }
        }
        this.setState({
            showDtm: true, showAct: false
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
        this.emitPushData([]);
    }
    // 點擊 label wrap 就 focus search input
    handleLabelWrapClick = () => {
        this.searchInput.current.inputDOM.focus();
    }
    handleChange=(e) => {
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
    }
    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            label, subLabel,
            fetchPath, isRequired, size, iconName,
            selectedData
        } = this.props;
        const {
            keyword,
            showAct,
            showDtm
        } = this.state;

        // DtmRcfr highlight
        const selected = selectedData.map(item => item.value);
        return (
            <div
                className="SingleInputMenu m-b-sm w-80p">
                <Label
                    size={size}             // 高度
                    iconName={iconName}     // icon
                    subComponent={
                        <ClickOutSide onClickOutside={this.handleCloseMenu}>
                            <div className="dtm_rcfr-row">
                                {/* <div className="dtm_rcfr-selected-wrap" onClick={this.handleLabelWrapClick}>
                                    {showText}
                                </div> */}
                                <IntRcln
                                    className="int_rcln int-tags-single"
                                    ref={this.searchInput}
                                    placeholder={placeholder}
                                    value={keyword}
                                    onChange={(e) => this.handleChange(e)}
                                    onClearValue={(e) => this.handleEmitRemoveData(e, selectedData)}
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
                                changeKey={actRacpChangeKey}
                                catalogue={catalogueCallBack}
                            />
                            <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : null}`}>
                                <p className="dtm_rcfr-label">{subLabel}</p>
                                <span
                                    className="dtm_rcfr-close_btn"
                                    onClick={this.handleCloseMenu}
                                >
                                </span>
                                <DtmRcfr
                                    levelKey={['vLine', 'vArea', 'vTcity']}
                                    onClickItem={this.emitPushData}
                                    dataResouce={fetchPath}
                                    selectedData={selected}
                                    transformFetchData={(d) => {
                                        if (typeof d === 'string') {
                                            d = '"vLine":{"_9":"台灣"},' + d;
                                            let newVariable = d.replace(/\r?\n|\r/g, '').replace(/(?:var|let|const)\s(\w+)\s=/g, '"$1":').replace(/;/g, ',').replace(/,$/g, '').replace(/'/g, '"');
                                            return JSON.parse('{' + newVariable + '}');
                                        }
                                        else { return d }
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

export default SingleInputMenuM;