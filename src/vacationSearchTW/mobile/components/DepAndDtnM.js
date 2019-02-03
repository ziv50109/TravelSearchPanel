import React, { PureComponent, Component } from 'react';
import { departureData } from '../../share/option';
import StRcln from '../../../../magaele/st_rcln';
import NvbRslb from '../../../../magaele/nvb_rslb';
import IntRcln from '../../../../magaele/int_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import Label from '../../../../magaele/int_rctg/components/Label/Label'; // 外框
import {
    vacationTaiwanSearch,
    vacationPersonal
} from '../../../../source.config';
import SingleInputMenuM from '../../share/SingleInputMenu_m';
import { fetchJsToObj, isJsonString, ClickOutSide } from '../../../../utils';

const inlineStyle = {
    display: 'inline-block',
    marginBottom: 10 + 'px',
    width: 100 + '%',
    verticalAlign: 'top'
};
const widthCollection = {
    desktop: {
        // width: 390 + 'px',
        marginBottom: 10 + 'px'
    }
};
function responsiveStyle () {
    return Object.assign({}, widthCollection.desktop, inlineStyle);
}
class DestinationContentComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedData: [] // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
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
        const { selectedData } = this.state;
        let arr = [];
        if (data.value) {
            arr.push(data);
        }
        this.setState({ selectedData: arr });
    };

    confirm = () => {
        const { selectedData } = this.state;
        console.log(selectedData);
        // city txt
        if (selectedData.length) {
            this.props.getdatavTcity(selectedData[0]['vTcity'], selectedData[0]['text'], selectedData[0]['vArea']);
        } else {
            this.props.getdatavTcity('', '', '');
        }
    }

    closeNvbRslb () {
        this.props.closeNvbRslb();
    }

    getSelect = () => {
        if (this.state.selectedData.length > 0) {
            const datavTcity = this.state.selectedData[0].vTcity.replace(
                '_',
                ''
            );
            const datavTcityTxt = this.state.selectedData[0].text;
            this.props.getdatavTcity(
                datavTcity,
                datavTcityTxt,
                this.state.selectedData
            );
            return;
        }
        const datavTcity = '';
        const datavTcityTxt = '';
        this.props.getdatavTcity(
            datavTcity,
            datavTcityTxt,
            this.state.selectedData
        );
    };

    render () {
        const { selectedData } = this.state;
        return (
            <SingleInputMenuM
                className="SingleInputMenu"
                /* int_rctg/Label */
                /* subComponent */
                fetchPath={this.fetchPath} // dtm_rcfr 快速選單資料
                selectedData={selectedData} // 所選擇的資料集
                closeNvbRslb={this.props.closeNvbRslb}
                // selectedData={[{ value: '_9-_1-_KLU', text: '基隆' }]} // 所選擇的資料集
                // max={this.WrapperDtmRclnMax}
                /* int_rcln */
                placeholder="請選擇/可輸入目的地" // placeholder 輸入提示字
                getSelect={this.getSelect}
                /* act_racp */
                minimumStringQueryLength={2} // 最少輸入幾個字
                minimumStringQuery="請輸入至少兩個文字" // 尚未輸入文字字數到達要求會顯示此字串
                noMatchText="很抱歉，找不到符合的項目" // 當沒有配對資料時顯示那些文字
                /* dtm rcln */
                subLabel="找不到選項？請輸入關鍵字查詢"
                onChange={this.handleChange}
                onConfirm={this.confirm}
            />
        );
    }
}

class DepAndDtnM extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            // 出發地
            Departure: '_',
            departureData: [],
            isLoadDep: false,

            // 目的地
            destinationData: {},
            sTcity: '',
            sTcitytxt: '',

            // 開關
            visible: false
        };
        this.fetchDep = vacationTaiwanSearch.departure;
        this.fetchDtnS = vacationTaiwanSearch.destinationS;
    }

    componentDidMount () {
        // const sessionData = sessionStorage.getItem(this.fetchDep);
        // if (sessionData && isJsonString(sessionData)) {
        //     const jsonData = JSON.parse(sessionData);
        //     const departureData = this.formatDepartureData(jsonData);
        //     this.setState({
        //         departureData
        //     });
        // } else {
        //     fetch(this.fetchDep)
        //         .then(r => r.json())
        //         .then(data => {
        //             let stringifyData = JSON.stringify(data);
        //             const departureData = this.formatDepartureData(data);
        //             this.setState(() => ({
        //                 departureData
        //             }));
        //             sessionStorage.setItem(this.fetchDep, stringifyData);
        //         });
        // }

        // 出發地
        const sessionDepData = sessionStorage.getItem(this.fetchDep);
        if (sessionDepData && isJsonString(sessionDepData)) {
            const jsonData = JSON.parse(sessionDepData);
            const departureData = this.formatDepartureData(jsonData);
            this.setState({
                departureData,
                isLoadDep: true
            });
        } else {
            fetch(this.fetchDep)
                .then(r => r.json())
                .then(data => {

                    let stringifyData = JSON.stringify(data);
                    const departureData = this.formatDepartureData(data);
                    this.setState({
                        departureData,
                        isLoadDep: true
                    });
                    sessionStorage.setItem(this.fetchDep, stringifyData);
                });
        }

        this.getHighestZIndex();
        this.fetchDtnDate();
    }

    fetchDtnDate () {
        // const sessionDtnData = sessionStorage.getItem(this.fetchDtnS);
        // if (sessionDtnData && isJsonString(sessionDtnData)) {
        //     const jsonData = JSON.parse(JSON.parse(sessionDtnData));

        //     this.setState(
        //         { destinationData: jsonData },
        //         this.updateDtn(jsonData)
        //     );
        // } else {
        //     fetch(this.fetchDtnS)
        //         .then(r => r.json())
        //         .then(data => {
        //             const jsonData = JSON.parse(data);
        //             this.setState(
        //                 { destinationData: jsonData },
        //                 this.updateDtn(jsonData)
        //             );
        //             sessionStorage.setItem(
        //                 this.fetchDtnS,
        //                 JSON.stringify(jsonData)
        //             );
        //         });
        // }
        fetch(this.fetchDtnS)
            .then(r => r.json())
            .then(data => {
                const jsonData = JSON.parse(data);
                this.setState(
                    { destinationData: jsonData },
                    this.updateDtn(jsonData)
                );
                sessionStorage.setItem(
                    this.fetchDtnS,
                    JSON.stringify(jsonData)
                );
            });
    }

    // props 傳過來的 Destination 修改成 dtm 可以讀格式
    updateDtn (sourceData) {
        const dtnData = sourceData;
        if (!this.props.Destination) {
            this.setState({ selectedData: [] });
            return;
        }
        const propsDtn = `${this.props.Destination.split('_')[1]}`;
        dtnData['City'].forEach(everyZone => {
            everyZone['CityList'].forEach(v => {
                if (v['City'] === propsDtn) {
                    // example { value: '_9-01-TPE', text: '台北' }
                    this.setState({
                        selectedData: [
                            {
                                value: `_9-${everyZone['Zone']}-${propsDtn}`,
                                text: v['CityName']
                            }
                        ],
                        sTcitytxt: v['CityName']
                    });
                }
            });
        });
    }

    formatDepartureData = d => {
        const data = JSON.parse(d);
        const keys = Object.keys(data);
        if (keys) {
            return keys.map(e => ({
                text: data[e],
                value: e
            }));
        }
    };

    handlePropsDep () {
        const Departure = `_${this.props.Departure.split('_')[1]}`;
        this.setState({ Departure });
    }

    // props 傳過來的 Destination 修改成 dtm 可以讀格式
    handlePropsDtn () {
        const fetchCity = this.getData(this.fetchPath).vTcity;
        const getPlace = `_${this.props.Destination.split('_')[1]}`;

        for (let key in fetchCity) {
            if (fetchCity[key].hasOwnProperty(getPlace)) {
                return [
                    {
                        text: fetchCity[key][getPlace],
                        value: `_9-${key}-${getPlace}`
                    }
                ];
            }
        }
    }

    getData = source => {
        const sessionData = sessionStorage.getItem(source);
        let jsonData;
        if (sessionData && isJsonString(sessionData)) {
            jsonData = JSON.parse(sessionData);
        } else {
            fetchJsToObj(source, d => {
                jsonData = JSON.stringify(d);
            });
        }
        return jsonData;
    };

    // 修改父層 state
    setPanelState (val) {
        this.props.setPanelState && this.props.setPanelState(val);
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
        this.setState({ zIndex: highestZIndex + 1 });
    }

    openPage = (e, value, input) => {
        input.blur();
        this.setState({
            visible: true
        });
    };

    getdatavTcity = (city, txt, zone) => {
        this.setState({
            sTcity: city,
            sTcitytxt: txt,
            visible: false
        });
        const dtnString = city ? `${zone}_${city}_` : '';
        this.setPanelState({ Destination: dtnString, sTcity: city === '' ? '' : `TW_${city}` });
    }

    // 出發地
    onDepChange = val => {
        this.setPanelState({ Departure: val });
    };

    render () {
        const { customClass } = this.props;
        return (
            <div className={customClass}>
                {this.state.isLoadDep && (
                    <StRcln
                        option={this.state.departureData}
                        placeholder="請選擇"
                        label="出發地"
                        icon={<IcRcln name="toolmap" />}
                        defaultValue={this.props.Departure}
                        ClassName="strcln_custom"
                        req
                        breakline
                        onChangeCallBack={this.onDepChange}
                    />
                )}
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
                        className={'mb_DepAndDtn_nv'}
                        visible={this.state.visible}
                        ContentComponent={
                            <DestinationContentComponent
                                getdatavTcity={this.getdatavTcity}
                                closeNvbRslb={value => {
                                    this.setState({ visible: false });
                                }}
                                Destination={this.state.selectedData}
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
