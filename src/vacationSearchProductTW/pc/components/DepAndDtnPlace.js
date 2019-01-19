import React, { Component } from 'react';
// magaele
import IcRcln from '../../../../magaele/ic_rcln';
import Label from '../../../../magaele/int_rctg/components/Label/Label';
import { departureData  } from '../../share/option';
import SingleInputMenu from '../../share/SingleInputMenu';
import { vacationTaiwan } from '../../../../source.config';

class DepAndDtnPlace extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
        };
        this.fetchPath = vacationTaiwan.destination;
    }

    // 目的地
    onDtnChange = (data) => {
        let arr = [];
        if (data.value) {
            arr.push(data);
        }
        this.setState({ selectedData: arr });
    }

    render () {
        const { customClass } = this.props;
        return (
            <div className={customClass}>
                <div className="labelStyle">
                    <IcRcln name="planeairplane" size="x15" />
                    <Label
                        isRequired                    // 是否為必填欄位
                        maxLength={3}               // 輸入最大項目數
                        label={'出發地'}             // 輸入標籤
                        subComponent={
                            <select
                                onChange={this.onDepChange}
                                value={this.state.departure}
                            >
                                {departureData.map(({ text, value }) => (
                                    <option key={value} value={value}>
                                        {text}
                                    </option>
                                ))}
                            </select>
                        }
                    />
                    <span className="labelStyle__middleIcon">→</span>
                    <SingleInputMenu
                        key="2"
                        className="SingleInputMenu m-b-sm"
                        /* int_rctg/Label */
                        isRequired // 是否為必填欄位
                        size="lg" // 框高
                        label={'目的地'} // 標籤
                        // iconName={'toolmap'} // icon
                        /* subComponent */
                        fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                        selectedData={this.state.selectedData} // 所選擇的資料集
                        // max={this.WrapperDtmRclnMax}
                        /* int_rcln */
                        placeholder="請輸入/選擇目的地" // placeholder 輸入提示字
                        /* act_racp */
                        minimumStringQueryLength={2} // 最少輸入幾個字
                        minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                        noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                        /* dtm rcln */
                        subLabel="找不到選項？請輸入關鍵字查詢"
                        onChange={this.onDtnChange}
                    />
                </div>
            </div>
        );
    }
}

export default DepAndDtnPlace;