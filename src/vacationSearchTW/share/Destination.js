import React, { Component } from 'react';
import { vacationTaiwanSearch } from '../../../source.config';
// 複合組件
import SingleInputMenu from './SingleInputMenu';

const inlineStyle = {
    display: 'inline-block',
    width: 100 + '%',
    verticalAlign: 'top'
};
const widthCollection = {
    desktop: {
        // width: 390 + 'px',
    }
};
function responsiveStyle () {
    return Object.assign({}, widthCollection.desktop, inlineStyle);
}
// 顯示的自訂內容-目的地
class DestinationContentComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
        };
        this.fetchPath = vacationTaiwanSearch.destinationS;
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.Destination !== this.props.Destination) {
            this.updateSelected();
        }
    }

    updateSelected () {
        // 格式 _9-_3-_TCH
        this.setState({ selectedData: this.props.Destination });
    }

    handleChange = data => {
        let arr = [];
        if (data.value) {
            arr.push(data);
        }
        this.props.onChange && this.props.onChange(arr);
    };

    render () {
        const { selectedData } = this.state;
        return (
            <div style={Object.assign({}, responsiveStyle())}>
                <SingleInputMenu
                    className="SingleInputMenu"
                    /* int_rctg/Label */
                    isRequired // 是否為必填欄位
                    size="lg" // 框高
                    label={'目的地'} // 標籤
                    /* subComponent */
                    fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                    selectedData={selectedData} // 所選擇的資料集
                    //   selectedData={[{ value: '_9-_1-_KLU', text: '基隆' }]} // 所選擇的資料集
                    // max={this.WrapperDtmRclnMax}
                    /* int_rcln */
                    placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                    /* act_racp */
                    minimumStringQueryLength={2} // 最少輸入幾個字
                    minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                    noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                    /* dtm rcln */
                    subLabel="找不到選項？請輸入關鍵字查詢"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default DestinationContentComponent;
