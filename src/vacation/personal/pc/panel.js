import React, { Component } from 'react';
import cx from 'classnames';
import { isJsonString, useLocalStorage } from '../../../../utils';
import { vacationPersonal } from '../../../../source.config';
import VacationDaparture from '../VacationDaparture'; // 出發地下拉
import CrRcln from '../../../../magaele/cr_rcln';
import StRcln from '../../../../magaele/st_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import ComposeCalendar from '../../../component/ComposeCalendar';
import RoomListInput from './RoomListInput';
import DestinationInput from './DestinationInput';
import KeyWordInput from './KeywordInput';
import {
    airLineOptions,
    clskdOptions,
    daysOptions,
} from '../common';
import {
    parseRoomListArray,
} from '../RoomListCommon';
import onSubmit from '../onSubmit';
// 動態自由行M版PC版共用css
import '../css.scss';
import dayjs from 'dayjs';

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            Departure: '',
            Destination: '',
            radio: '',
            roomlist: '2-0-0', // 預設一間, 兩大人
            roomage: '-',
            Days: '',
            Airline: '',
            clskd: 0,
            noTrans: 1,
            Keywords: '',
            FromDate: dayjs().add(3, 'days').format('YYYY-MM-DD'),
            ToDate: dayjs().add(30, 'days').format('YYYY-MM-DD'),
            destinationInput: '',
            departureData: {},
            fthotel: '',
            openMoreSearch: false, // 是否打開更多搜尋選項
            defaultStartDate: ''
        };
    }

    componentDidMount () {
        const sessionData = sessionStorage.getItem(vacationPersonal.departure);

        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            const departureData = this.formatDepartureData(jsonData);
            this.setState({
                departureData
            });
        } else {
            fetch(vacationPersonal.departure)
                .then(r => r.json())
                .then(data => {
                    let stringifyData = JSON.stringify(data);
                    const departureData = this.formatDepartureData(data);
                    this.setState(() => ({
                        departureData
                    }));
                    sessionStorage.setItem(vacationPersonal.departure, stringifyData);
                });
        }

        useLocalStorage({
            panel: 'personalVacation',
            methods: 'get'
        }, (data) => this.validataLocalstorageData(data));
    }
    validataLocalstorageData = (data) => {
        const localStorageRecordTime = data.PostTime + 604800000;
        if (localStorageRecordTime < new Date().getTime()) {
            console.log('超過7天予以刪除LocalStorage紀錄。');
            useLocalStorage({
                panel: 'personalVacation',
                methods: 'delete',
            });
            return;
        }
        let FromDate = data.FromDate;
        let ToDate = data.ToDate;
        if (dayjs(data.FromDate).isBefore(dayjs()) || dayjs(data.ToDate).isBefore(dayjs())) {
            FromDate = dayjs().add(3, 'days').format('YYYY-MM-DD');
            ToDate = dayjs().add(30, 'days').format('YYYY-MM-DD');
        }
        if (!FromDate) {
            ToDate = '';
        }
        this.setState({
            ...data,
            FromDate,
            ToDate
        });
    };

    formatDepartureData = (d) => {
        const data = JSON.parse(d);
        const keys = Object.keys(data);
        if (keys) {
            return keys.map(e => (
                {
                    text: data[e],
                    value: e
                }
            ));
        }
    }

    onSelectChange = (target, val) => {
        // 下拉選單change
        this.setState(prevState => ({
            [target]: val,
        }));
    }

    onDateChange = (dateState) => {
        const {
            selectedStartDate,
            selectedEndDate
        } = dateState;

        this.setState(prevState => ({
            FromDate: selectedStartDate,
            ToDate: selectedEndDate,
        }));
    }

    onRoomListChange = (roomListState) => {
        const {
            roomList,
        } = roomListState;
        const [roomlist, roomage] = parseRoomListArray(roomList);
        this.setState(prevState => ({
            roomlist: roomlist.join(','),
            roomage: roomage.join(','),
        }));
    }

    onDestinationChange = (destState) => {
        const {
            selectedData,
            radio
        } = destState;

        if (!selectedData.length) {
            return this.setState(prevState => ({
                Destination: '',
            }));
        }

        let Destination = '';
        destState.selectedData.forEach(e => {
            const {
                City,
                Country,
                Line,
            } = e;
            Destination += `${Country}_${City}_${Line},`;
        });

        this.setState({ Destination, radio });
    }

    onKeyWordChange = (keyWordState) => {
        const {
            inputText: Keywords,
            selectedData: {
                fthotel,
            },
        } = keyWordState;
        this.setState(prevState => ({
            fthotel,
            Keywords,
        }));
    }

    render () {
        const {
            Destination,
            departureData,
            radio,
            destinationInput,
            noTrans,
            clskd,
            Airline,
            Days,
            openMoreSearch,
            FromDate,
            ToDate,
            Departure,
            roomlist,
            roomage,
            Keywords
        } = this.state;

        const moreSearch_classes = cx('moreSearch', {
            active: openMoreSearch,
        });

        const search_button_classes = cx('search_button', {
            'moreSearchIsActive': openMoreSearch
        });

        return (
            <div className="vacation_personal_pc">
                <div className="input_group">
                    <VacationDaparture
                        data={departureData}
                        defaultValue={Departure}
                        onChange={(val) => {
                            this.setState(prevState => ({
                                Departure: val,
                            }));
                        }}
                    />
                    <DestinationInput
                        Destination={Destination}
                        radio={radio}
                        inputText={destinationInput}
                        onChange={this.onDestinationChange}
                    />
                </div>
                <ComposeCalendar
                    panelName="vacationPersonal"
                    defaultStartDate={FromDate}
                    defaultEndDate={ToDate}
                    setOtherEnd={30}  // 月曆另外設定可選日期最大上限(單位/日),訂房最大上限14晚;
                    onChange={(e) => { this.onDateChange(e) }}
                />
                <RoomListInput
                    roomlist={roomlist}
                    roomage={roomage}
                    onChange={this.onRoomListChange}
                />
                <KeyWordInput
                    Keywords={Keywords}
                    Destination={Destination}
                    onChange={this.onKeyWordChange}
                />
                <CrRcln
                    type="checkbox"
                    textContent="直飛(含中停)"
                    defaultChecked={noTrans === 1}
                    whenChange={(val) => {
                        this.setState(prevState => ({
                            noTrans: val ? 1 : 0,
                        }));
                    }}
                />
                <div className={moreSearch_classes}>
                    <p
                        className="show_text"
                        onClick={() => { this.setState(prevState => ({
                            openMoreSearch: !prevState.openMoreSearch
                        })); }}
                    >
                        更多搜尋選項<span className="control_arrow">&#94;</span>
                    </p>
                    <div className="moreSeach_content">
                        <StRcln
                            option={airLineOptions}
                            label="航空公司"
                            breakline
                            onChangeCallBack={(val) => { this.onSelectChange('Airline', val) }}
                            ClassName=""
                            defaultValue={Airline || ''}
                        />
                        <StRcln
                            option={clskdOptions}
                            label="艙等"
                            breakline
                            onChangeCallBack={(val) => { this.onSelectChange('clskd', val) }}
                            defaultValue={clskd}
                            ClassName=""
                        />
                        <StRcln
                            option={daysOptions}
                            label="旅遊天數"
                            breakline
                            onChangeCallBack={(val) => { this.onSelectChange('Days', val) }}
                            ClassName=""
                            defaultValue={Days || ''}
                        />
                    </div>
                </div>
                <BtRcnb
                    className={search_button_classes}
                    radius
                    lg
                    whenClick={() => {
                        onSubmit(Object.assign(this.state, { hrefTarget: this.props.hrefTarget }));
                    }}
                >
                    搜尋
                </BtRcnb>
            </div>
        );
    }
}

export default Panel;