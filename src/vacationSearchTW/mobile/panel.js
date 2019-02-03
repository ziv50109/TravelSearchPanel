import React, { Component } from 'react';
import './css.scss';
import today from 'dayjs';
import { daysOptions } from '../share/option';
// magaele
import StRcln from '../../../magaele/st_rcln';
import CrRcln from '../../../magaele/cr_rcln';
// components
import DepAndDtnM from './components/DepAndDtnM';
import DepDateRangeM from './components/DepDateRangeM';
import RoomPeopleM from './components/RoomPeopleM';
import TransportM from './components/TransportM';
import KeywordPlaceM from './components/KeywordPlaceM';

class Panel extends Component {
    static defaultProps = {
        // Departure: '_',
        // Destination: '',
        // FromDate: today().format('YYYYMMDD'),
        // ToDate: today()
        //     .add(1, 'days')
        //     .format('YYYYMMDD'),
        // Days: 2,
        // noHotel: 0,
        // Keywords: '',
        // Traffic: 'NONE,THSR,TRA,AIR,BUS,RENT',
        // roomlist: '2-0-',
        // roomage: '-',
    };

    constructor (props) {
        super(props);
        this.state = {
            Departure: '',
            Destination: '',
            FromDate: '',
            ToDate: '',
            Days: '',
            noHotel: '',
            Keywords: '',
            Traffic: '',
            roomlist: '',
            roomage: '',

            // Departure: props.Departure,
            // Destination: props.Destination,
            // FromDate: props.FromDate,
            // ToDate: props.ToDate,
            // Days: props.Days,
            // noHotel: props.noHotel,
            // Keywords: props.Keywords,
            // Traffic: props.Traffic,
            // roomlist: props.roomlist,
            // roomage: props.roomage,

            // 關鍵字要用的
            sTcity: '',
            isLoad: false
        };
    }

    componentDidMount () {
        const url = 'https://www.liontravel.com/webft/webftse01.aspx?Departure=TW_TPE_&Destination=03_KHH_&roomlist=2-2-0&roomage=2;3-&Days=8&Keywords=&FromDate=20190130&ToDate=20190220&Traffic=ALL&noHotel=0&fthotel=';
        this.analysisUrl(url);
    }

    // 解析網址
    analysisUrl (url) {
        const hasQuery = url.indexOf('?');
        const query =
            hasQuery >= 0 ? url.substring(hasQuery + 1).split('&') : null;
        const result = query.map(e => e.split('='));
        const state = {};
        result.forEach(e => {
            state[e[0]] = e[1];
            if (e[0] === 'Destination') {
                this.setState({ sTcity: `TW_${e[1].split('_')[1]}` });
            }
        });

        this.setState({ ...state }, () => {
            this.setState({ isLoad: true });
        });
    }

    // 子層修改 state
    setPanelState = val => {
        this.setState(val);
    };

    // 送出
    onSubmit = () => {
        const {
            Departure,
            Destination,
            roomlist,
            roomage,
            Days,
            Keywords,
            FromDate,
            ToDate,
            noHotel,
            Traffic,
            fthotel
        } = this.state;

        this.ValidData((isValid, warnText) => {
            if (isValid) {
                const keyUrl = `Departure=${Departure}&Destination=${Destination}&roomlist=${roomlist}&roomage=${roomage}&Days=${Days}&Keywords=${Keywords}&FromDate=${FromDate}&ToDate=${ToDate}&Traffic=${Traffic}&noHotel=${noHotel}&fthotel=${fthotel}`;
                window.location.replace('https://vacation.liontravel.com/search?' + keyUrl);
            } else {
                alert(warnText.join('、'));
            }
        });
    };

    ValidData (callback) {
        let warnText = [];
        const { Destination, FromDate, ToDate, Traffic } = this.state;
        // 目的地
        if (Destination === '') {
            warnText.push('請輸入/選擇目的地');
        }

        // 日期驗證
        const isValidDate = (d) => d instanceof Date && !isNaN(d);
        if (!isValidDate(new Date(today(FromDate).format('YYYY-MM-DD'))) || FromDate === '' || !isValidDate(new Date(today(ToDate).format('YYYY-MM-DD'))) || ToDate === '') {
            warnText.push('請輸入出發區間');
        }

        // 交通工具驗證
        if (Traffic === '') {
            warnText.push('交通工具至少需要一項');
        }

        callback(warnText.length === 0, warnText);
    }

    getdatavTcity = (e) => {
        this.setState({ vTcity: '_' + e });
    }

    keyWordPageConfirm = (e) => {
        console.log(e.selectedData['fthotel']);
        this.setState({ Keywords: e.inputText, fthotel: e.selectedData['fthotel'] });
    }

    render () {
        return (
            <div className="tw_vacation_search_mb">
                {this.state.isLoad &&
                <React.Fragment>
                    {/* 出發地、目的地 */}
                    <DepAndDtnM
                        customClass={'mb_DepAndDtn'}
                        Departure={this.state.Departure}
                        Destination={this.state.Destination}
                        setPanelState={this.setPanelState}
                    />

                    {/* 出發區間 */}
                    <DepDateRangeM
                        customClass={'mb_DepDateRange'}
                        FromDate={this.state.FromDate}
                        ToDate={this.state.ToDate}
                        setPanelState={this.setPanelState}
                    />

                    <div className="row-center">
                        {/* 旅遊天數 */}
                        <StRcln
                            ClassName={'mb_travelDay'}
                            option={daysOptions}
                            placeholder="請選擇"
                            label="旅遊天數"
                            breakline
                            onChangeCallBack={val =>
                                this.setState({ Days: Number(val) })
                            }
                            defaultValue={Number(this.state.Days) || ''}
                            setPanelState={this.setPanelState}
                        />

                        {/* 只找不含住宿 */}
                        <CrRcln
                            className={'mb_noHotel'}
                            type="checkbox"
                            textContent="只找不含住宿"
                            whenChange={val =>
                                this.setState({ noHotel: val ? 1 : 0 })
                            }
                            defaultChecked={Number(this.state.noHotel) === 1 ? true : false}
                            setPanelState={this.setPanelState}
                        />
                    </div>

                    {/* 間數/人數 */}
                    <RoomPeopleM
                        customClass={'mb_RoomPeople'}
                        noHotel={Number(this.state.noHotel)}
                        roomlist={this.state.roomlist}
                        roomage={this.state.roomage}
                        setPanelState={this.setPanelState}
                    />

                    {/* 交通工具 */}
                    <TransportM customClass={'mb_Transport'} Traffic={this.state.Traffic} setPanelState={this.setPanelState} />

                    {/* 關鍵字 */}
                    <KeywordPlaceM
                        customClass={'mb_KeywordPlace'}
                        Keywords={this.state.Keywords}
                        Destination={this.state.sTcity}
                        onClickConfirm={this.keyWordPageConfirm}
                        setPanelState={this.setPanelState}
                    />
                    {/* <div onClick={this.onSubmit}>搜尋</div> */}
                </React.Fragment>
                }
            </div>
        );
    }
}

export default Panel;
