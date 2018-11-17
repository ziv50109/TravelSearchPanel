import React, { Component } from 'react';
import cx from 'classnames';
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

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            Departure: '',
            Destination: '',
            roomlist: '2-0-0', // 預設一間, 兩大人
            roomage: '-',
            Days: '',
            Airline: '',
            clskd: 0,
            noTrans: 0,
            Keywords: '',
            FromDate: '',
            ToDate: '',
            destinationInput: '',
            departureData: {},
            fthotel: '',
            openMoreSearch: false, // 是否打開更多搜尋選項
        };
    }

    componentDidMount () {
        fetch('/json/vacationDeparture.json')
            .then(r => r.json())
            .then(data => {
                this.setState(() => ({
                    departureData: data,
                }));
            });
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
        } = destState;

        if (!selectedData.length) {
            return this.setState(prevState => ({
                Destination: '',
            }));
        }

        const {
            City,
            Country,
            Line,
        } = selectedData[0];

        this.setState(prevState => ({
            Destination: `${Country}_${City}_${Line}`,
        }));
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
            destinationInput,
            noTrans,
            clskd,
            Airline,
            Days,
            openMoreSearch,
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
                        onChange={(e) => {
                            const val = e.target.value;
                            this.setState(prevState => ({
                                'Departure': val,
                            }));
                        }}
                    />
                    <span className="cal_icon">→</span>
                    <DestinationInput
                        inputText={destinationInput}
                        onChange={this.onDestinationChange}
                    />
                </div>
                <ComposeCalendar
                    onChange={this.onDateChange}
                />
                <RoomListInput
                    onChange={this.onRoomListChange}
                />
                <KeyWordInput
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
                            placeholder="請選擇"
                            label="航空公司"
                            breakline
                            onChangeCallBack={(val) => { this.onSelectChange('Airline', val) }}
                            ClassName="m-b-sm"
                            defaultValue={Airline}
                        />
                        <StRcln
                            option={clskdOptions}
                            placeholder="請選擇"
                            label="艙等"
                            breakline
                            onChangeCallBack={(val) => { this.onSelectChange('clskd', val) }}
                            defaultValue={clskd}
                            ClassName="m-b-sm"
                        />
                        <StRcln
                            option={daysOptions}
                            placeholder="請選擇"
                            label="旅遊天數"
                            breakline
                            onChangeCallBack={(val) => { this.onSelectChange('Days', val) }}
                            ClassName="m-b-sm"
                            defaultValue={Days}
                        />
                    </div>
                </div>
                <BtRcnb
                    className={search_button_classes}
                    radius
                    lg
                    whenClick={() => {
                        onSubmit(this.state);
                    }}
                >
                    搜尋
                </BtRcnb>
            </div>
        );
    }
}

export default Panel;