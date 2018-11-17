import React, { Component } from 'react';
import dayjs from 'dayjs';
import IntRcln from '../../../../magaele/int_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import StRcln from '../../../../magaele/st_rcln';
import CrRcln from '../../../../magaele/cr_rcln';
import NvbRslb from '../../../../magaele/nvb_rslb';
import BtRcnb from '../../../../magaele/bt_rcnb';
import CyRcmn from '../../../../magaele/cy_rcmn'; // 月曆分頁
import RoomPageContent from './RoomPageContent'; // 間數人數分頁
import DestinationPage from './DestinationPage'; // 目的地分頁
import KeyWordPage from './KeywordPage'; // 關鍵字分頁
import VacationDaparture from '../VacationDaparture'; // 出發地下拉
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
import '../../../component/input_group.scss';

// 分頁component回上一頁箭頭
const NvbGoBack = ({
    onClick,
}) => (
    <span
        className="nvb_rslb_goBack"
        onClick={onClick}
    >
        <IcRcln name="toolbefore" />
    </span>
);

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
            activeInput: null,
            roomListInput: '共1間，2人',
            destinationInput: '',
            departureData: {},
            fthotel: '',
        };
        this.calendar = null;
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

    showNvbPage (target) {
        // 控制打開哪個分頁
        this.setState(prevState => ({
            activeInput: target,
        }));
    }

    handleClose = () => {
        this.setState(prevState => ({
            activeInput: null,
        }));
    }

    calendarConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;

        this.setState(prevState => ({
            FromDate: selectedStartDate,
            ToDate: selectedEndDate,
            activeInput: null,
        }));
    }

    roomPageConfirm = (pageState) => {
        // 間數人數分頁按確定
        const {
            inputText: roomListInput,
            roomList,
        } = pageState;

        const [roomlist, roomage] = parseRoomListArray(roomList);

        this.setState(prevState => ({
            roomListInput,
            roomlist: roomlist.join(','),
            roomage: roomage.join(','),
            activeInput: null,
        }));
    }

    destinationPageConfirm = (pageState) => {
        // 目的地分頁按確定
        const {
            inputText: destinationInput,
            selectedData,
        } = pageState;

        if (!selectedData.length) return alert('請點選一筆目的地');

        const {
            City,
            Country,
            Line,
        } = selectedData[0];

        this.setState(prevState => ({
            activeInput: null,
            destinationInput,
            Destination: `${Country}_${City}_${Line}`,
        }));
    }

    keyWordPageConfirm = (pageState) => {
        const {
            inputText: Keywords,
            selectedData: {
                fthotel,
            }
        } = pageState;
        this.setState(prevState => ({
            fthotel,
            Keywords,
            activeInput: null,
        }));
    }

    onSelectChange = (target, val) => {
        // 下拉選單change
        this.setState(prevState => ({
            [target]: val,
        }));
    }
    render () {
        const {
            FromDate,
            ToDate,
            activeInput,
            roomListInput,
            destinationInput,
            clskd,
            Airline,
            Days,
            noTrans,
            departureData,
            Destination,
            Keywords,
        } = this.state;
        const showCalendarPage = activeInput === 0 || activeInput === 1;
        const showRoomPage = activeInput === 'roomlist';
        const showDestinationPage = activeInput === 'destination';
        const showKeyWordPage = activeInput === 'keyword';
        const pageVisible = showCalendarPage || showRoomPage || showDestinationPage || showKeyWordPage;
        console.log(showDestinationPage);
        return (
            <div className="vacation_personal_mobile">
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
                    <IntRcln
                        placeholder="目的地"
                        label="目的地"
                        breakline
                        request
                        readOnly
                        onClick={() => { this.showNvbPage('destination') }}
                        value={destinationInput}
                    />
                </div>
                <div className="input_group">
                    <IntRcln
                        placeholder="YYYY/MM/DD"
                        label="出發區間"
                        icon={<IcRcln name="tooldate" />}
                        breakline
                        readOnly
                        request
                        onClick={() => { this.showNvbPage(0) }}
                        value={FromDate.replace(/\-/g, '/')}
                    />
                    <span className="cal_icon">~</span>
                    <IntRcln
                        placeholder="YYYY/MM/DD"
                        breakline
                        readOnly
                        onClick={() => { this.showNvbPage(1) }}
                        value={ToDate.replace(/\-/g, '/')}
                    />
                </div>
                <IntRcln
                    placeholder="共N間，N人"
                    label="間數/人數"
                    breakline
                    readOnly
                    icon={<IcRcln name="toolmember" />}
                    className="m-b-sm"
                    onClick={() => { this.showNvbPage('roomlist') }}
                    value={roomListInput}
                />
                <IntRcln
                    placeholder="請輸入產品名稱、飯店名稱或關鍵字"
                    label="關鍵字"
                    breakline
                    readOnly
                    className="m-b-sm"
                    value={Keywords}
                    onClick={() => { this.showNvbPage('keyword') }}
                />
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
                <BtRcnb
                    className="search_button"
                    radius
                    md
                    whenClick={() => {
                        onSubmit(this.state);
                    }}
                >
                    搜尋
                </BtRcnb>

                <NvbRslb
                    visible={pageVisible}
                    direction="right"
                >
                    <NvbGoBack onClick={this.handleClose} />
                    {
                        showCalendarPage && (
                            <CyRcmn
                                doubleChoose
                                selectedStartDate={FromDate}
                                selectedEndDate={ToDate}
                                activeInput={activeInput}
                                endMonth={dayjs().add(12, 'months').format('YYYY-MM')}
                                startLabelTitle="入住日期"
                                endLabelTitle="退房日期"
                                ref={e => { this.calendar = e }}
                                onClickConfirm={this.calendarConfirm}
                                customDiffTxt={diffDate => {
                                    const showTxt = diffDate + 1;
                                    return '共' + showTxt + '天';
                                }}
                            />
                        )
                    }
                    {
                        showRoomPage && <RoomPageContent onClickConfirm={this.roomPageConfirm} />
                    }
                    <DestinationPage
                        className={showDestinationPage ? '' : 'd-no'}
                        inputText={destinationInput}
                        onClickConfirm={this.destinationPageConfirm}
                    />
                    {
                        showKeyWordPage && (
                            <KeyWordPage
                                Destination={Destination}
                                onClickConfirm={this.keyWordPageConfirm}
                            />
                        )
                    }
                </NvbRslb>
            </div>
        );
    }
}

export default Panel;