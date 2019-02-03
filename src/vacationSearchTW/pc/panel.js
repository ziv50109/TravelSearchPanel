import React, { Component } from 'react';
// tools
import './css.scss';
import { daysOptions } from '../share/option';
import today from 'dayjs';
import IcRcln from '../../../magaele/ic_rcln';
import StRcln from '../../../magaele/st_rcln';
import CrRcln from '../../../magaele/cr_rcln';
// component
import DepAndDtn from './components/DepAndDtn';
import DepDateRange from '../../component/ComposeCalendar';
import KeywordPlace from './components/KeywordPlace';
import RoomPeople from './components/RoomPeople';
import Transport from './components/Transport';

class Panel extends Component {
    static defaultProps = {
        Departure: '_',
        Destination: '',
        FromDate: today().format('YYYYMMDD'),
        ToDate: today()
            .add(1, 'days')
            .format('YYYYMMDD'),
        Days: 2,
        noHotel: 0,
        Keywords: '',
        Traffic: 'NONE,THSR,TRA,AIR,BUS,RENT',
        roomlist: '2-0-',
        roomage: '-',
    };

    constructor (props) {
        super(props);
        this.state = {
            Departure: props.Departure,
            Destination: props.Destination,
            FromDate: props.FromDate,
            ToDate: props.ToDate,
            Days: props.Days,
            noHotel: props.noHotel,
            Keywords: props.Keywords,
            Traffic: props.Traffic,
            roomlist: props.roomlist,
            roomage: props.roomage,

            // 關鍵字要用的
            vTcity: '',
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
        const query = hasQuery >= 0 ? url.substring(hasQuery + 1).split('&') : null;
        const result = query.map(e => e.split('='));
        const state = {};
        // this.setState({ vTcity: `TW_${}`  });
        result.forEach(e => {
            state[e[0]] = e[1];
            if (e[0] === 'Destination') {
                this.setState({ vTcity: `TW_${e[1].split('_')[1]}` });
            }
        });

        this.setState({ ...state }, () => {
            this.setState({ isLoad: true });
        });
    }

    apiUrl () {
        const url = window.location.href;
        const hasQuery = url.indexOf('?');
        const query = url.substring(0, hasQuery);
        return query;
    }

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
                const apiUrl = this.apiUrl();
                const keyUrl = `Departure=${Departure}&Destination=${Destination}&roomlist=${roomlist}&roomage=${roomage}&Days=${Days}&Keywords=${Keywords}&FromDate=${FromDate}&ToDate=${ToDate}&Traffic=${Traffic}&noHotel=${noHotel}&fthotel=${fthotel}`;
                window.location.replace(`${apiUrl}${keyUrl}`);
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

    // 子層修改 state
    setPanelState = val => {
        // console.log(val);
        this.setState(val);
    };

    render () {
        const { FromDate, ToDate } = this.state;
        return (
            <div className="tw_vacation_search w-component">
                {this.state.isLoad &&
                    <div>
                        <div className="search_top_container">
                            {/* 出發地、目的地 */}
                            <DepAndDtn
                                customClass={'pc_DepAndDtn'}
                                Departure={this.state.Departure}
                                Destination={this.state.Destination}
                                setPanelState={this.setPanelState}
                            />

                            {/* 出發區間 */}
                            <div className={'pc_DepDateRange'}>
                                <DepDateRange
                                    defaultStartDate={today(FromDate).format(
                                        'YYYY-MM-DD'
                                    )}
                                    defaultEndDate={today(ToDate).format('YYYY-MM-DD')}
                                    onChange={e =>
                                        this.setState({
                                            FromDate: today(e.startInputValue).format(
                                                'YYYYMMDD'
                                            ),
                                            ToDate: today(e.endInputValue).format(
                                                'YYYYMMDD'
                                            )
                                        })
                                    }
                                />
                            </div>

                            {/* 旅遊天數 */}
                            <StRcln
                                ClassName={'StrclnStyle pc_travelDay w-travelday'}
                                option={daysOptions}
                                placeholder="請選擇"
                                label="旅遊天數"
                                breakline
                                onChangeCallBack={val =>
                                    this.setState({ Days: val === '' ? '' : Number(val) })
                                }
                                // defaultValue={Number(this.state.Days)}
                                defaultValue={this.state.Days === '' ? '' : Number(this.state.Days)}
                            />

                            {/* 只找不含住宿 */}
                            <CrRcln
                                className={'pc_noHotel'}
                                type="checkbox"
                                textContent="只找不含住宿"
                                whenChange={val =>
                                    this.setState({ noHotel: val ? 1 : 0 })
                                }
                                defaultChecked={
                                    Number(this.state.noHotel) === 1 ? true : false
                                }
                            />
                            {/* 搜尋按鈕 */}
                            <button className="pc_searchBtn" onClick={this.onSubmit}>
                                <IcRcln name="toolsearch" />
                            </button>
                        </div>

                        <div className="search_bottom_container">
                            {/* 間數/人數 */}
                            <RoomPeople
                                customClass={'pc_Roompeople'}
                                noHotel={Number(this.state.noHotel)}
                                roomlist={this.state.roomlist}
                                roomage={this.state.roomage}
                                setPanelState={this.setPanelState}
                            />

                            {/* 交通工具 */}
                            <Transport
                                customClass={'pc_Transport'}
                                Traffic={this.state.Traffic}
                                setPanelState={this.setPanelState}
                            />

                            {/* 關鍵字 */}
                            <KeywordPlace
                                customClass={'pc_Keyword'}
                                Keywords={this.state.Keywords}
                                setPanelState={this.setPanelState}
                                Destination={this.state.vTcity}
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Panel;
