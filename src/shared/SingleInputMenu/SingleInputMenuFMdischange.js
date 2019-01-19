import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 單純組件
import ActRacp from '../../../magaele/act_racp';
import IntRcln from '../../../magaele/int_rcln';
// Utils

import BtRcnb from '../../../magaele/bt_rcnb';

import './SingleInputMenu.scss';
// 補字選單分區的callBack
const catalogueCallBack = [
    {
        catalogueName: '國家',
        catafilter: (data) => data,
    }
];
// 補字選單changeKey
const actRacpChangeKey = (data) => {
    data.forEach((item) => {
        let newFullName = item.fullName.split('__').join('-');
        item.txt = newFullName;
        item.country = item.fullName.split('__')[0].match(/\((.*)\)/)[1];
    });
    return data;
};

class SingleInputMenu extends PureComponent {
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
            selectedData: this.props.selectedData
        };
    }
    componentDidMount () {
        const { selectedData } = this.props;
        if (selectedData[0]) {
            // console.log(selectedData[0]);
            setTimeout(() => {
                this.setState({ keyword: selectedData[0].txt });
            }, 0);
        }
    }

    // 通知 parent component data 更新
    emitPushData = (data) => {
        this.props.onChange && this.props.onChange(data);
    }
    handelPushData = (data) => {
        const { selectedData } = this.props;
        if (selectedData.length && selectedData[0].hasOwnProperty('value') && selectedData[0].value === data.value) {
            // console.log('qq');
            this.setState({ selectedData: [], keyword: '' });
        } else if (data) {
            // console.log('emit~~');
            this.setState({ selectedData: [data], keyword: data.fullName });
        } else {
            // console.log('elseeee');
            this.setState({ selectedData: [], keyword: '' });
        }
    }

    // 通知 parent component 移除 data
    handleEmitRemoveData = () => {
        // console.log('handleEmitRemoveData~~handleEmitRemoveData~~handleEmitRemoveData');
        if (this.props.onClearValue) {
            this.props.onClearValue();
        }
        this.setState({ selectedData: [], keyword: '' });
    }
    handleChange = (e) => {
        // console.log('cccccccccc');
        if (!e.target.value.length) {
            this.setState({
                keyword: ''
            });
        } else {
            this.setState({
                keyword: e.target.value
            });
        }
    }
    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            label,
            fetchPath
        } = this.props;
        const {
            keyword,
            selectedData
        } = this.state;

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
                            value={keyword}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            onClearValue={this.handleEmitRemoveData}
                        />
                    </div>
                    <BtRcnb md radius whenClick={() => this.emitPushData(selectedData)}>確定</BtRcnb>
                </div>

                <ActRacp
                    InputIsFocus={true}
                    url={fetchPath}
                    minimumStringQueryLength={minimumStringQueryLength} // 最少輸入幾個字
                    minimumStringQuery={minimumStringQuery} // 尚未輸入文字字數到達要求會顯示此字串
                    searchKeyWord={keyword} // 傳入篩選的字串
                    noMatchText={noMatchText} // 當沒有配對資料時顯示那些文字
                    footer={false} // 是否顯示footer
                    theme={'future'} // 樣式調整: future(站長平台)
                    closeActcallback={(data) => {
                        console.log(data);
                        if (typeof data !== 'undefined') {
                            // console.log('act~~~~~ showAct: false~~~');
                            this.handelPushData(data);
                        }
                    }} // 鍵盤上下鍵改變選取項目
                    changeKey={actRacpChangeKey}
                    catalogue={catalogueCallBack}
                />
            </div>
        );
    }
}

export default SingleInputMenu;