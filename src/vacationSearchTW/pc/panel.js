import React, { Component } from 'react';
// tools
import './css.scss';
// import { vacationTaiwan } from '../../source.config';
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
        const url = 'https://www.liontravel.com/webft/webftse01.aspx?Departure=TW_PAN_9&Destination=TW_MZG_9&roomlist=2-1-0&roomage=2-,-&Days=2&Keywords=&FromDate=20190210&ToDate=20190220&Traffic=TRA,THSR&noHotel=0';
        this.test1(url);
    }

    test1 (url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.transformUrl(url);
                resolve();
            }, 100);
        });
    }

    // componentDidUpdate (prevProps, prevState) {
    //     if (prevState.noHotel !== this.state.noHotel) {
    //         this.testUpdate();
    //     }
    // }

    // testUpdate = () => {
    //     this.setState({ noHotel: this.state.noHotel, isLoad: true });
    // };

    // 解析網址
    transformUrl (url) {
        const hasQuery = url.indexOf('?');
        const query =
            hasQuery >= 0 ? url.substring(hasQuery + 1).split('&') : null;
        const result = query.map(e => e.split('='));
        const finalResult = result.map(e => [{ [e[0]]: e[1] }]);
        const state = {};
        result.forEach(e => {
            state[e[0]] = e[1];
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
        } = this.state;

        this.ValidData((isValid, warnText) => {
            if (isValid) {
                const apiUrl = this.apiUrl();
                const keyUrl = `Departure=${Departure}&Destination=${Destination}&roomlist=${roomlist}&roomage=${roomage}&Days=${Days}&Keywords=${Keywords}&FromDate=${FromDate}&ToDate=${ToDate}&Traffic=${Traffic}&noHotel=${noHotel}`;
                window.location.replace('https://vacation.liontravel.com/search?' + keyUrl);
            } else {
                alert(warnText.join('、'));
            }
        });
    };

    ValidData (callback) {
        // API 網址
        // https://www.liontravel.com/webft/webftse01.aspx
        // ?Departure=TW_TPE_TPE
        // &Destination=TW_MZG_9
        // &roomlist=2-1-0
        // &roomage=2-,-
        // &Days=2
        // &Keywords=
        // &FromDate=20190210
        // &ToDate=20190220
        // &Traffic=TRA,THSR
        // &noHotel=0
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
        this.setState(val);
    };

    // 關鍵字
    getkeywordData (e) {
        this.setState({
            searchKeyWord: e
        });
    }
    getkeywordtxt (txt) {
        this.setState({
            selectText: txt
        });
    }

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
                                this.setState({ Days: Number(val) })
                            }
                            // defaultValue={Number(this.state.Days) || ''}
                            defaultValue={Number(this.state.Days)}
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
                            getkeywordData={e => this.getkeywordData(e)}
                            getkeywordtxt={txt => this.getkeywordtxt(txt)}
                            Keywords={this.state.Keywords}
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
