import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flightInternational } from '../../../source.config';

// 單純組件
import DtmRcfr from '../../../magaele/dtm_rcfr';
import ActRacp from '../../../magaele/act_racp';
import IntRcln from '../../../magaele/int_rcln';
// Utils
import { fetchJsToObj } from '../../../utils';

import BtRcnb from '../../../magaele/bt_rcnb';

import './SingleInputMenu.scss';
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
        item.airport = item.fullName.split('__')[2] ? item.fullName.split('__')[2].match(/\((.*)\)/)[1] : item.fullName.split('__')[1].match(/\((.*)\)/)[1];
    });
    return data;
};

function renameKey (obj, fn) {
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
}

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
        onChange: PropTypes.func,
    }

    constructor (props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            keyword: '',
            showDtm: true,
            showAct: false,
            newCity: {},
            selectedData: this.props.selectedData
        };
    }
    componentDidMount () {
        let keywordValue = this.searchInput.current.props.value;
        if (this.props.selectedData[0] && !this.props.selectedData[0].hasOwnProperty('value')) {
            this.setState({
                showDtm: false,
                showAct: true,
            });
            setTimeout(() => this.setState({ keyword: keywordValue }), 0);
        } else {
            this.setState({
                showDtm: true,
                showAct: false
            });
        }
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.selectedData !== this.props.selectedData) {
            this.formatKeyword(nextProps.selectedData);
        }
    }
    shouldComponentUpdate (nextProps, nextState) {
        return nextState !== this.state || nextProps !== this.props;
    }

    // 通知 parent component data 更新
    emitPushData = (data) => {
        let keyword = this.searchInput.current.props.value;
        this.props.onChange && this.props.onChange(data, keyword);
    }
    handelPushData = (data) => {
        const { selectedData } = this.props;
        if (selectedData.length && selectedData[0].hasOwnProperty('value') && selectedData[0].value === data.value) {
            // console.log('qq');
            // this.props.onChange && this.props.onChange();
            this.setState({ selectedData: [] });
        } else if (data) {
            // console.log('emit~~');
            let newData = data;
            if (data.value) {
                newData = Object.assign({
                    country: this.state.newCity[data.city].split('__')[0].match(/\((.*)\)/)[1],
                    airport: this.state.newCity[data.city].split('__')[1].match(/\((.*)\)/)[1]
                }, data);
            }
            // this.props.onChange && this.props.onChange(newData);
            this.setState({ selectedData: [newData] });
        } else {
            // console.log('elseeee');
            // this.props.onChange && this.props.onChange();
            this.setState({ selectedData: [] });
        }
    }

    handleOpenMenu = () => {
        const { showDtm, showAct } = this.state;
        if (showDtm !== showAct) { return }

        if (this.props.selectedData.length && this.props.selectedData[0].hasOwnProperty('fromAct')) {
            let value = this.searchInput.current.props.value;
            // console.log('act opennnnnnnn', value);
            // open act 加入 keyword
            this.setState({ keyword: value, showDtm: false, showAct: true });
        } else {
            // console.log('dtm opennnnnnnn dtm');
            this.setState({ showDtm: true, showAct: false });
        }
    }
    handleCloseMenu = (from) => {
        const { showDtm, showAct } = this.state;
        if (showDtm === showAct) { return }
        // console.log('closeeee~~~');
        // close 一併清除 keyword
        this.setState({
            keyword: '', showDtm: false, showAct: true
        });
    }
    // 通知 parent component 移除 data
    handleEmitRemoveData = () => {
        // console.log('handleEmitRemoveData~~handleEmitRemoveData~~handleEmitRemoveData');
        if (this.props.onClearValue) {
            this.props.onClearValue();
        }
        // this.props.onChange && this.props.onChange();
        this.setState({ selectedData: [], keyword: '', showAct: false, showDtm: true });
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
            // this.props.onChange && this.props.onChange();
            this.setState({
                selectedData: [],
                keyword: e.target.value,
                showAct: true,
                showDtm: false
            });
        }
    }
    // input value
    formatKeyword = (data) => {
        // console.log(data);
        if (!data.length) {
            return this.state.keyword;
        } else if (!data[0].value) {
            // act
            // console.log('act');
            const newArr = data[0].fullName.split('__');
            switch (newArr.length) {
                case 2:
                    return newArr[1];
                case 3:
                    return newArr[2];
            }
        } else {
            // dtm
            // console.log('dtm');
            if (Object.keys(this.state.newCity).length) {
                return this.state.newCity[data[0].city].match(/_(\W+.*)/)[1].replace(/<\((.*)\)>/g, '');
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
            fetchPath, isRequired, size, iconName,

        } = this.props;
        const {
            keyword,
            showAct,
            showDtm,
            newCity,
            selectedData
        } = this.state;

        // DtmRcfr highlight
        const selected = selectedData.map(item => {
            if (item.value) {
                // console.log('has value~~ !! @@');
                return item.value;
            } else {
                // console.log('no value @@@@@@@@');
                return '';
            }
        });

        return (
            <div className="SingleInputMenu flights flights-m dischange">
                <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>

                <h3 className="txt-center page_title m-t-sm m-b-sm">{label}</h3>
                <div className="dtm_rcfr-row">
                    <div className="dtm_rcfr-input-wrap">
                        <IntRcln
                            className="int_rcln int-tags-single"
                            ref={this.searchInput}
                            placeholder={placeholder}
                            // onFocus={this.handleOpenMenu}
                            value={this.formatKeyword(selectedData)}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            onClearValue={this.handleEmitRemoveData}
                        />
                    </div>
                    <BtRcnb md radius whenClick={() => this.emitPushData(selectedData[0])}>確定</BtRcnb>
                </div>

                <ActRacp
                    InputIsFocus={true}
                    url={flightInternational.filter}
                    minimumStringQueryLength={minimumStringQueryLength} // 最少輸入幾個字
                    minimumStringQuery={minimumStringQuery} // 尚未輸入文字字數到達要求會顯示此字串
                    searchKeyWord={keyword} // 傳入篩選的字串
                    noMatchText={noMatchText} // 當沒有配對資料時顯示那些文字
                    // ClassName={(!showAct && 'd-no')} // 傳入custom class
                    footer={false} // 是否顯示footer
                    theme={'future'} // 樣式調整: future(站長平台)
                    closeActcallback={(data) => {
                        if (typeof data !== 'undefined') {
                            // console.log('act~~~~~ showAct: false~~~');
                            this.handelPushData(data);
                        }
                        // setTimeout(this.handleCloseMenu, 10);
                    }} // 鍵盤上下鍵改變選取項目
                    changeKey={actRacpChangeKey}
                    catalogue={catalogueCallBack}
                />
            </div>
        );
    }
}

export default SingleInputMenu;