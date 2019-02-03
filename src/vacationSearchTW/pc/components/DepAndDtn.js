// 模組名稱: 出發地、目的地
import React, { PureComponent } from 'react';
import StRcln from '../../../../magaele/st_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import { vacationTaiwanSearch, vacationPersonal } from '../../../../source.config';
// import { departureData } from '../../share/option';
import { fetchJsToObj, isJsonString } from '../../../../utils';
import DestinationContentComponent from '../../share/Destination';

class Depdtn extends PureComponent {
    static defaultProps = {
        departure: '_'
    };

    constructor (props) {
        super(props);
        this.state = {
            // 出發地
            departure: props.Departure,
            departureData: [],
            // 目的地
            selectedData: [], // 需要提交的所有關鍵字：含預設關鍵字以及自行輸入
            destinationData: {},

            isLoadDep: false,
        };
        this.fetchDep = vacationTaiwanSearch.departure;
        this.fetchDtnS = vacationTaiwanSearch.destinationS;
    }

    componentDidMount () {
        // 出發地
        const sessionDepData = sessionStorage.getItem(this.fetchDep);
        if (sessionDepData && isJsonString(sessionDepData)) {
            const jsonData = JSON.parse(sessionDepData);
            const departureData = this.formatDepartureData(jsonData);
            this.setState({
                departureData, isLoadDep: true
            });
        } else {
            fetch(this.fetchDep)
                .then(r => r.json())
                .then(data => {
                    let stringifyData = JSON.stringify(data);
                    const departureData = this.formatDepartureData(data);
                    this.setState({
                        departureData, isLoadDep: true
                    });
                    sessionStorage.setItem(
                        this.fetchDep,
                        stringifyData
                    );
                });
        }

        // 目的地
        this.fetchDtnDate();
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.Destination !== this.props.Destination) {
            this.updateDtn(this.state.destinationData);
        }
    }

    fetchDtnDate () {
        // const sessionDtnData = sessionStorage.getItem(this.fetchDtnS);
        // if (sessionDtnData && isJsonString(sessionDtnData)) {
        //     const jsonData = JSON.parse(sessionDtnData);
        //     this.setState({ destinationData: jsonData }, this.updateDtn(jsonData));
        // } else {
        //     fetch(this.fetchDtnS)
        //         .then(r => r.json())
        //         .then(data => {
        //             // const jsonData = JSON.parse(data);
        //             this.setState({ destinationData: data }, this.updateDtn(data));
        //             sessionStorage.setItem(
        //                 this.fetchDtnS,
        //                 JSON.stringify(data)
        //             );
        //         });
        // }

        fetch(this.fetchDtnS)
            .then(r => r.json())
            .then(data => {
                // const jsonData = JSON.parse(data);
                this.setState({ destinationData: data }, this.updateDtn(data));
                sessionStorage.setItem(
                    this.fetchDtnS,
                    JSON.stringify(data)
                );
            });
    }

    // props 傳過來的 Destination 修改成 dtm 可以讀格式
    updateDtn (sourceData) {
        const dtnData = JSON.parse(sourceData);
        if (!this.props.Destination) {
            this.setState({ selectedData: [] });
            return;
        }
        const propsDtn = `${this.props.Destination.split('_')[1]}`;
        dtnData['City'].forEach(everyZone => {
            everyZone['CityList'].forEach((v) => {
                if (v['City'] === propsDtn) {
                    // example { value: '_9-01-TPE', text: '台北' }
                    this.setState({ selectedData: [{ value: `_9-${everyZone['Zone']}-${propsDtn}`, text: v['CityName'] }] });
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

    getData = source => {
        const sessionData = sessionStorage.getItem(source);
        let jsonData;
        if (sessionData && isJsonString(sessionData)) {
            jsonData = JSON.parse(sessionData);
        } else {
            // fetchJsToObj(source, d => {
            //     jsonData = JSON.stringify(d);
            // });
            fetch(source)
                .then(res => res.json())
                .then((v) => { jsonData = JSON.stringify(v.City) });
        }

        return jsonData;
    };

    // 修改父層 state
    setPanelState (val) {
        this.props.setPanelState && this.props.setPanelState(val);
    }

    // 出發地
    onDepChange = val => {
        this.setPanelState({ Departure: val });
    };

    // 目的地
    onDtnChange (v) {
        const dtnString = v.length ? `${v[0].vArea}_${v[0].vTcity}_` : '';
        this.setPanelState({ Destination: dtnString, vTcity: v.length ? `TW_${v[0].vTcity}` : '' });
    }

    render () {
        const { customClass } = this.props;
        const { selectedData } = this.state;
        return (
            <div className={`labelDouble ${customClass}`}>
                {this.state.isLoadDep &&
                <StRcln
                    option={this.state.departureData}
                    placeholder="請選擇"
                    label="出發地"
                    icon={<IcRcln name="toolmap" />}
                    req
                    breakline
                    onChangeCallBack={this.onDepChange}
                    defaultValue={this.props.Departure}
                />}
                <span className="labelStyle__middleIcon">→</span>
                <DestinationContentComponent
                    onChange={e => this.onDtnChange(e)}
                    Destination={selectedData}
                />
            </div>
        );
    }
}

export default Depdtn;
