// 模組名稱: 出發地、目的地
import React, { PureComponent } from 'react';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import { vacationTaiwan } from '../../../../source.config';
import { departureData } from '../../share/option';
import SingleInputMenu from '../../share/SingleInputMenu';

class Depdtn extends PureComponent {
    static defaultProps = {
        departure: '_'
    };

    constructor (props) {
        super(props);
        this.state = {
            // 出發地
            departure: props.Departure,
            // 目的地
            selectedData: [] // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
        };
        this.fetchPath = vacationTaiwan.destination;
    }

    // 修改父層 state
    setPanelState (val) {
        this.props.setPanelState && this.props.setPanelState(val);
    }

    // 出發地
    onDepChange = val => {
        this.setPanelState({ Departure: `TW${val}_9` });
    };

    // 目的地
    onDtnChange = data => {
        let arr = [];
        if (data.value) {
            arr.push(data);
        }
        const dtnString = data.value ? `TW${data.vTcity}${data.vLine}` : '';
        this.setState(
            { selectedData: arr },
            this.setPanelState({ Destination: dtnString, vTcity: data.vTcity })
        );
    };

    test (before) {
        let after = before.split('_'); // ["JP", "TYO", "6"]
        after.splice(0, 0, after[after.length - 1]); // ["6", "JP", "TYO", "6"]
        after.splice(after.length - 1, 1); // ["6", "JP", "TYO"]
        const result = after.join('-'); // "6-JP-TYO"
        return result;
    }

    render () {
        const { customClass } = this.props;
        const depVal = this.props.Departure === '' ? '_' : `_${this.props.Departure.split('_')[1]}`;
        const dtnVal = this.test(this.props.Destination);
        console.log(dtnVal);
        return (
            <div className={`labelDouble ${customClass}`}>
                <StRcln
                    option={departureData}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    req
                    breakline
                    onChangeCallBack={this.onDepChange}
                    defaultValue={depVal}
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
                    selectedData={[{ value: '9-TW-MZG' }]} // 所選擇的資料集
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
        );
    }
}

export default Depdtn;
