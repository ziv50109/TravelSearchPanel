import React, { PureComponent, Component } from 'react';
import { departureData } from '../../share/option';
import Label from '../../../../magaele/int_rctg/components/Label/Label';
import StRcln from '../../../../magaele/st_rcln';
import NvbRslb from '../../../../magaele/nvb_rslb';
import IntRcln from '../../../../magaele/int_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import { vacationTaiwan } from '../../../../source.config';
import SingleInputMenuM from '../../share/SingleInputMenu_m';

class DestinationContentComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            dptSelectedData: [],
            dtnSelectedData: []
        };
        this.inlineStyle = {
            display: 'inline-block',
            marginBottom: 10 + 'px',
            width: 100 + '%',
            verticalAlign: 'top',
            // zIndex: this.getHighestZIndex()
        };
        this.widthCollection = {
            desktop: {
                marginBottom: 10 + 'px'
            }
        };
        this.fetchPath = vacationTaiwan.destination;

    }

    // 交換
    switch = () => {
        const obj1 = JSON.parse(JSON.stringify(this.state.dptSelectedData)); // dptObj
        const obj2 = JSON.parse(JSON.stringify(this.state.dtnSelectedData)); // dtnObj

        this.setState({
            dptSelectedData: obj2,
            dtnSelectedData: obj1
        });
    };

    dptHandleChange = data => {
        const { dptSelectedData } = this.state;
        let arr = [];
        if (dptSelectedData.some(item => data.value === item.value)) {
            arr = dptSelectedData.filter(item => data.value !== item.value);
        } else if (data.value) {
            arr.push(data);
        }
        this.setState({ dptSelectedData: arr });
    };

    dtnHandleChange = data => {
        const { dtnSelectedData } = this.state;
        let arr = [];
        if (dtnSelectedData.some(item => data.value === item.value)) {
            arr = dtnSelectedData.filter(item => data.value !== item.value);
        } else if (data.value) {
            arr.push(data);
        }
        this.setState({ dtnSelectedData: arr });
    };

    handleChange = data => {
        const { selectedData } = this.state;
        let arr = [];
        if (data.value) {
            arr.push(data);
        }
        this.setState({ selectedData: arr });
    };
    closeNvbRslb () {
        this.props.closeNvbRslb();
    }
    setValue = obj => {
        this.setState({ obj: obj });
    };
    getSelect () {
        if (this.state.selectedData.length > 0) {
            const datavTcity = this.state.selectedData[0].vTcity.replace(
                '_',
                ''
            );
            const datavTcityTxt = this.state.selectedData[0].text;
            this.props.getdatavTcity(datavTcity, datavTcityTxt);
        } else if (this.state.selectedData.length === 0) {
            const datavTcity = '';
            const datavTcityTxt = '';
            this.props.getdatavTcity(datavTcity, datavTcityTxt);
        }
    }
    responsiveStyle () {
        return Object.assign(
            {},
            this.widthCollection.desktop,
            this.inlineStyle
        );
    }
    render () {
        const { selectedData, dptSelectedData, dtnSelectedData } = this.state;
        return (
            <div
                style={Object.assign({}, this.responsiveStyle())}
                className="nvbRslb_destination mb_DepAndDtn"
            >
                <div className="nvb_rslb_title">
                    <span
                        className="nvb_rslb_goBack"
                        onClick={() => {
                            this.closeNvbRslb();
                        }}
                    >
                        <IcRcln name="toolbefore" />
                    </span>
                    <h3 className="txt-center nvbRslb_title">目的地</h3>
                </div>
                <div className="header-wrap">
                    <SingleInputMenuM
                        className="SingleInputMenu"
                        /* int_rctg/Label */
                        size="" // 框高
                        /* subComponent */
                        fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                        selectedData={selectedData} // 所選擇的資料集
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
                    <BtRcnb
                        prop="string"
                        className="m-l-xs w-15p"
                        md
                        radius
                        whenClick={() => {
                            this.getSelect();
                        }}
                    >
                        確定
                    </BtRcnb>
                </div>
            </div>
        );
    }
}

class DepAndDtnM extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            // 出發地
            Departure: props.Departure,

            // 目的地
            sTcity: '',
            sTcitytxt: '',

            // 開關
            visible: false,
        };
    }

    componentDidMount () {
        this.setState({ zIndex: this.getHighestZIndex() });
    }

    // componentDidUpdate (prevProps, prevState) {
    //     if (prevProps.Departure !== this.props.Departure) {
    //     }
    // }

    // 修改父層 state
    setPanelState (val) {
        this.props.setPanelState(val);
    }

    // 取得最高 zindex
    getHighestZIndex () {
        let highestZIndex = 0;
        let currentZIndex = 0;
        let nodes = document.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
            currentZIndex = Number(window.getComputedStyle(nodes[i]).zIndex);
            if (currentZIndex > highestZIndex) {
                highestZIndex = currentZIndex;
            }
        }
        return highestZIndex + 1;
    }

    openPage = (e, value, input) => {
        input.blur();
        this.setState({
            visible: true
        });
    };

    getdatavTcity (e, data) {
        console.log('e:', e);
        console.log('data:', data);
        this.setState({
            sTcity: e,
            sTcitytxt: data,
            visible: false
        });
        const dtnString = e ? `TW_${e}_9` : '';
        this.setPanelState({ Destination: dtnString, sTcity: e });
    }

    // 出發地
    onDepChange = val => {
        this.setState(
            { departure: val },
            this.setPanelState({ Departure: val === '_' ? '' : `TW${val}_9` })
        );
    };

    render () {
        const { customClass } = this.props;
        return (
            <div className={customClass}>
                <StRcln
                    option={departureData}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    defaultValue={this.state.Departure}
                    ClassName="strcln_custom"
                    req
                    breakline
                    onChangeCallBack={this.onDepChange}
                />
                <span className="cal_icon">→</span>
                <div>
                    <IntRcln
                        request
                        label="目的地"
                        placeholder="請輸入/選擇目的地"
                        breakline
                        value={this.state.sTcitytxt}
                        onClick={this.openPage}
                    />
                    <NvbRslb
                        visible={this.state.visible}
                        ContentComponent={
                            <DestinationContentComponent
                                getdatavTcity={(e, data) =>
                                    this.getdatavTcity(e, data)
                                }
                                closeNvbRslb={value => {
                                    this.setState({ visible: false });
                                }}
                            />
                        }
                        direction="right"
                        width="100%"
                        zIndex={this.state.zIndex}
                    />
                </div>
            </div>
        );
    }
}

export default DepAndDtnM;
