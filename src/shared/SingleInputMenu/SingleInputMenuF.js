import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flightInternational } from '../../../source.config';

// 單純組件
import Label from '../../../magaele/int_rctg/components/Label/Label';    // 外框
import DtmRcfr from '../../../magaele/dtm_rcfr';
import ActRacp from '../../../magaele/act_racp';
import IntRcln from '../../../magaele/int_rcln';
// Utils
import { fetchJsToObj, ClickOutSide } from '../../../utils';

import './SingleInputMenu.scss';
import { Object } from 'es6-shim';
// 補字選單分區的callBack
const catalogueCallBack = [
    {
        catalogueName: '城市',
        catafilter: (data) => {
            return data.filter(item => {
                return (item.fullName.split('__').length === 2);
            }).sort((a, b) => a.fullName.length - b.fullName.length || a.dataIndex - b.dataIndex);
        },
    },
    {
        catalogueName: '機場',
        catafilter: (data) => {
            return data.filter(item => {
                return (item.fullName.split('__').length > 2);
            }).sort((a, b) => a.fullName.length - b.fullName.length || a.dataIndex - b.dataIndex);
        },
    }
];
// 補字選單changeKey
const actRacpChangeKey = (data) => {
    data.forEach((item) => {
        let newFullName = item.fullName.split('__').join('-');
        item.txt = newFullName;
        item.fromAct = true;
        item.country = item.fullName.split('__')[0].match(/\((.*)\)/)[1];
        item.city = item.fullName.split('__')[1].match(/\((.*)\)/)[1];
        // item.airport = item.fullName.split('__')[2] ? item.fullName.split('__')[2].match(/\((.*)\)/)[1] : item.fullName.split('__')[1].match(/\((.*)\)/)[1];
        // // item.fullName.split('__')[2] ? item.airport = item.fullName.split('__')[2] : '';
        if (item.fullName.split('__')[2]) {
            item.airport = item.fullName.split('__')[2].match(/\((.*)\)/)[1];
        }
    });
    return data;
};

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
            showDtm: false,
            showAct: false,
            newCity: {}
        };
    }
    componentDidMount () {
        // this.getData(flightInternational.place);
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.selectedData !== this.props.selectedData) {
            this.formatKeyword(nextProps.selectedData);
        }
    }
    shouldComponentUpdate (nextProps, nextState) {
        return nextState !== this.state || nextProps !== this.props;
    }

    // fetch data
    getData = (source) => {
        if (source.indexOf('.json') !== -1) { // 若檔案格式為json
            fetch(source, {
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(data => {
                this._getDataCallBack(data);
            });
        } else {
            fetchJsToObj(source, (data) => {
                this._getDataCallBack(data);
            });
        }
    }
    // 處理 fetch 回來的 data 成為 newCity
    _getDataCallBack = (data) => {
        // 重構 city 資料
        let arr = [];
        for (let key in data.city) {
            if (Object.prototype.hasOwnProperty.call(data.city, key)) {
                arr.push(data.city[key]);
            }
        }
        this.setState({ newCity: Object.assign({}, ...arr) });
    }
    // 通知 parent component data 更新
    emitPushData = (data) => {
        const { selectedData, newCity } = this.props;
        if (selectedData.length && selectedData[0].hasOwnProperty('value') && selectedData[0].value === data.value) {
            // console.log('qq');
            this.props.onChange && this.props.onChange();
        } else if (data) {
            // console.log('emit~~');
            let newData = data;
            if (data.value) {
                let lng = newCity[data.city].split('-').length;
                newData = Object.assign({
                    country: newCity[data.city].split('__')[0].match(/\((.*)\)/)[1],
                //     airport: lng > 2 ? newCity[data.city].split('-')[2].match(/\((.*)\)/)[1] : newCity[data.city].split('-')[1].match(/\((.*)\)/)[1]
                }, data);
            }
            this.props.onChange && this.props.onChange(newData);
        } else {
            // console.log('elseeee');
            this.props.onChange && this.props.onChange();
        }
    }

    handleOpenMenu = () => {
        const { showDtm, showAct } = this.state;
        if (showDtm !== showAct) { return }

        if (this.props.selectedData.length && this.props.selectedData[0].hasOwnProperty('fromAct')) {
            let value = this.searchInput.current.props.value;
            // console.log('act opennnnnnnn');
            // open act 加入 keyword
            this.setState({ keyword: value, showDtm: false, showAct: true });
        } else {
            // console.log('dtm opennnnnnnn dtm');
            this.setState({ showDtm: true, showAct: false });
        }
    }
    handleCloseMenu = () => {
        const { showDtm, showAct } = this.state;
        if (showDtm === showAct) { return }
        // console.log('closeeee~~~');
        // close 一併清除 keyword
        this.setState({
            keyword: '', showDtm: false, showAct: false
        });
    }
    // 通知 parent component 移除 data
    handleEmitRemoveData = () => {
        // console.log('handleEmitRemoveData~~handleEmitRemoveData~~handleEmitRemoveData');
        if (this.props.onClearValue) {
            this.props.onClearValue();
        }
        this.props.onChange && this.props.onChange();
        this.setState({ keyword: '', showAct: false, showDtm: true });
    }
    // 點擊 label wrap 就 focus search input
    handleLabelWrapClick = () => {
        this.searchInput.current.inputDOM.focus();
    }
    handleChange = (e) => {
        // console.log('cccccccccc');

        if (!e.target.value.length) {
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
    }
    handleKeyDown = (e, value) => {
        if (!this.props.selectedData.length || e.keyCode === 13) { return }

        // console.log('keyDown~~ keydown', value);
        if (e.keyCode) {
            this.props.onChange && this.props.onChange();
            this.setState({
                keyword: e.target.value,
                showAct: true,
                showDtm: false
            });
        }
    }
    // input value
    formatKeyword = (data) => {
        const { newCity } = this.props;
        // console.log(label, data);
        if (!data.length) {
            return this.state.keyword;
        } else if (!data[0].value) {
            // act
            // console.log(label, 'act');
            // const newArr = data[0].fullName.split('__');
            const newArr = data[0].fullName.split('__');
            switch (newArr.length) {
                case 2:
                    return newArr[1];
                case 3:
                    return newArr[2];
            }
        } else {
            // dtm
            // console.log(label, 'dtm');
            if (Object.keys(newCity).length) {
                return newCity[data[0].city].match(/_(\W+.*)/)[1].replace(/<\((.*)\)>/g, '');
            }
        }
    };
    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            label, subLabel,
            isRequired, size,
            selectedData,
            rcfrDataResouce,
            racpDataResouce
        } = this.props;
        const {
            keyword,
            showAct,
            showDtm
        } = this.state;

        // DtmRcfr highlight
        const selected = (selectedData.length && selectedData[0].value) ? selectedData.map(item => item.value) : [];

        return (
            <div
                className="SingleInputMenu flights">
                <Label
                    isRequired={isRequired} // 是否為必填欄位
                    size={size}             // 高度
                    label={label}           // 標籤
                    // iconName={iconName}     // icon
                    onClick={this.handleLabelWrapClick}
                    subComponent={
                        <ClickOutSide onClickOutside={this.handleCloseMenu}>
                            <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>

                            <div className="dtm_rcfr-row">
                                <IntRcln
                                    className="int_rcln int-tags-single"
                                    ref={this.searchInput}
                                    placeholder={placeholder}
                                    onFocus={this.handleOpenMenu}
                                    value={this.formatKeyword(selectedData)}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                    onClearValue={this.handleEmitRemoveData}
                                />
                            </div>
                            <ActRacp
                                InputIsFocus={showAct}
                                url={racpDataResouce}
                                minimumStringQueryLength={minimumStringQueryLength} // 最少輸入幾個字
                                minimumStringQuery={minimumStringQuery} // 尚未輸入文字字數到達要求會顯示此字串
                                searchKeyWord={keyword} // 傳入篩選的字串
                                noMatchText={noMatchText} // 當沒有配對資料時顯示那些文字
                                ClassName={(!showAct && 'd-no')} // 傳入custom class
                                footer={false} // 是否顯示footer
                                theme={'future'} // 樣式調整: future(站長平台)
                                closeActcallback={(data) => {
                                    if (typeof data !== 'undefined') {
                                        // console.log('act~~~~~ showAct: false~~~');
                                        this.emitPushData(data);
                                    }
                                    setTimeout(this.handleCloseMenu, 10);
                                }} // 鍵盤上下鍵改變選取項目
                                emitSecondData={(d) => {
                                    // console.log('secon~~~~~~~~~D A T A~~~');
                                    if (keyword.length >= minimumStringQueryLength && d.length) {
                                        this.emitPushData(d[0]);
                                    }
                                }}
                                changeKey={actRacpChangeKey}
                                catalogue={catalogueCallBack}
                            />
                            <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : null}`}>
                                <p className="dtm_rcfr-label">{subLabel}</p>
                                <span
                                    className="dtm_rcfr-close_btn"
                                    onClick={this.handleCloseMenu}
                                >
                                    <svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg>
                                </span>
                                {!this.props.isSwitch && Object.keys(rcfrDataResouce).length &&
                                    <DtmRcfr
                                        levelKey={['line', '_line', 'city']}
                                        orderMaps={
                                            label === '出發地'
                                                ? { line: ['_9A', '_5A', '_6A', '_7A', '_3A', '_1A', '_2A'] }
                                                : { line: ['_5A', '_6A', '_7A', '_3A', '_1A', '_2A', '_4A', '_9A'] }
                                        }
                                        onClickItem={(data) => {
                                            this.emitPushData(data);
                                            this.handleCloseMenu();
                                        }}
                                        dataResouce={rcfrDataResouce}
                                        selectedData={selected}
                                    />
                                }

                            </div>
                        </ClickOutSide>
                    }
                />
            </div>
        );
    }
}

export default SingleInputMenu;