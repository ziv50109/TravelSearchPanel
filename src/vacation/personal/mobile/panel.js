import React, { Component } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';
import { isJsonString, useLocalStorage } from '../../../../utils';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import StRcln from '../../../../magaele/st_rcln';
import CrRcln from '../../../../magaele/cr_rcln';
import NvbRslb from '../../../../magaele/nvb_rslb';
import BtRcnb from '../../../../magaele/bt_rcnb';
import CrRcio from '../../../../magaele/cr_rcio';
import CyRcmn from '../../../../magaele/cy_rcmn'; // 月曆分頁
import RoomPageContent from './RoomPageContent'; // 間數人數分頁
import DestinationPage from './DestinationPage'; // 目的地分頁
import KeyWordPage from './KeywordPage'; // 關鍵字分頁
import VacationDaparture from '../VacationDaparture'; // 出發地下拉
import {
    airLineOptions,
    clskdOptions,
    daysOptions,
    transformFetchData
} from '../common';
import {
    parseRoomListArray,
    calcShowText
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

const changeToDtmRcfrValue = (before) => {
    const [
        City,
        Country,
        Line,
    ] = before.split('_');
    return `${Line}-${City}-${Country}`;
};

const Label = ({ text, removeData }) => {
    return (
        <p className="dtm_rcfr-selected" onClick={removeData}>
            <span title={text}>{text}</span>
            <i><svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg></i>
        </p>
    );
};

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            Departure: '',
            Destination: '',
            radio: '',
            dtmDataResouce: {}, // 目的地 快速選單的資料
            DestinationSelected: [], // 目的地選的一包
            roomlist: '2-0-0', // 預設一間, 兩大人
            roomage: '-',
            Days: '',
            Airline: '',
            clskd: 0,
            noTrans: 1,
            Keywords: '',
            FromDate: dayjs().add(3, 'days').format('YYYY-MM-DD'),
            ToDate: dayjs().add(30, 'days').format('YYYY-MM-DD'),
            activeInput: null,
            roomListInput: '共1間，2人',
            destinationInput: '',
            departureData: {},
            fthotel: '',
            openMoreSearch: false
        };
        this.calendar = null;
    }

    componentDidMount () {
        this.fetchDeparture();
        this.fetchDestinationData();

        useLocalStorage({
            panel: 'personalVacation',
            methods: 'get'
        }, (data) => {
            this.validataLocalstorageData(data);
        });
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
            ToDate,
            roomListInput: this.updateRoomListInput(data)
        });
    };
    // 取得出發地資料
    fetchDeparture = () => {
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
    }

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
    // 取得目的地資料
    fetchDestinationData = () => {
        const sessionData = sessionStorage.getItem(vacationPersonal.destination);
        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            this.setState({
                dtmDataResouce: transformFetchData(JSON.parse(jsonData))
            }, () => this.updateDestinationText(this.state.Destination));
        } else {
            fetch(vacationPersonal.destination).then(r => r.json()).then(d => {
                let stringifyData = JSON.stringify(d);
                this.setState({
                    dtmDataResouce: transformFetchData(JSON.parse(d))
                }, () => this.updateDestinationText(this.state.Destination));
                sessionStorage.setItem(vacationPersonal.destination, stringifyData);
            });
        }
    }
    // 取得目的選擇的那一包 & 目的地文字
    updateDestinationText = (Destination) => {
        if (!Destination) return;

        let DestinationSelected = [];
        Destination.split(',').filter(e => e !== '').forEach(e => {
            const { dtmDataResouce } = this.state;
            const value = changeToDtmRcfrValue(e);
            const [
                Line,
                Country,
                City,
            ] = value.split('-');

            DestinationSelected.push({
                City,
                Country,
                Line,
                CountryText: dtmDataResouce.Country[Line][Country],
                LineText: dtmDataResouce.Line[Line],
                text: dtmDataResouce.City[Country][City],
                value
            });
        });

        this.setState({
            DestinationSelected
        });
    }
    // 取得間數/人數
    updateRoomListInput = (data) => {
        const {
            roomlist,
            roomage
        } = data;

        // props還原成陣列包陣列
        const listArr = roomlist.split(',').map(e => e.split('-').filter(e => e.length).map(e => Number(e)));
        const ageArr = roomage.split(',').map(e => e.split('-').map(e => e.split(';').filter(e => e.length).map(e => Number(e))));
        // props還原成陣列包物件
        const newRoomList = listArr.map((e, i) =>
            ({
                adult: listArr[i][0],
                childrenWithBed: ageArr[i][0],
                childrenNoBed: ageArr[i][1]
            })
        );
        // 算人數
        return calcShowText(newRoomList);
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
            // inputText: destinationInput,
            selectedData
        } = pageState;
        let radio = '';

        if (!selectedData.length) return alert('請點選一筆目的地');
        if (selectedData.length > 1) {
            radio = 0;
        }
        let Destination = '';
        selectedData.forEach(e => {
            const {
                City,
                Country,
                Line,
            } = e;
            Destination += `${Country}_${City}_${Line},`;
        });

        this.setState(prevState => ({
            activeInput: null,
            // destinationInput,
            Destination,
            DestinationSelected: selectedData,
            radio
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

    onClickRadio = (value) => {
        this.setState(prevState => ({
            radio: value
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
            DestinationSelected,
            radio,
            Departure,
            roomlist,
            roomage,
            Keywords,
            openMoreSearch
        } = this.state;
        const showCalendarPage = activeInput === 0 || activeInput === 1;
        const showRoomPage = activeInput === 'roomlist';
        const showDestinationPage = activeInput === 'destination';
        const showKeyWordPage = activeInput === 'keyword';
        const pageVisible = showCalendarPage || showRoomPage || showDestinationPage || showKeyWordPage;
        // console.log(showDestinationPage);
        const moreSearch_classes = cx('moreSearch', {
            active: openMoreSearch,
        });

        return (
            <div className="vacation_personal_mobile">
                <svg viewBox="0 0 10 10" display="none"><path id="dtm_rcfr-x" d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z" /></svg>
                <div className="input_group flexDirectionColumn">
                    <VacationDaparture
                        data={departureData}
                        defaultValue={Departure}
                        onChange={(val) => {
                            this.setState(prevState => ({
                                Departure: val,
                            }));
                        }}
                    />
                    <div className="vacation_destination_group">
                        {/* <IntRcln
                            icon={<IcRcln name="toolmap" />}
                            placeholder="更多目的地，請輸入關鍵字"
                            label="目的地"
                            breakline
                            request
                            readOnly
                            onClick={() => { this.showNvbPage('destination') }}
                            value={destinationInput}
                        /> */}
                        <div className="destinationInput_wrap" onClick={() => { this.showNvbPage('destination') }}>
                            <IcRcln name="toolmap" />
                            <div>
                                <p className="title">目的地<span>*</span></p>
                                <div className="input_wrap">
                                    <div className="label_wrap">
                                        {DestinationSelected.map((e, i) =>
                                            <Label
                                                key={e.value || i}
                                                text={e.text}
                                            />
                                        )}
                                    </div>
                                    {DestinationSelected.length < 3 && (
                                        <IntRcln
                                            readOnly
                                            placeholder={DestinationSelected.length ? null : '目的地'}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {DestinationSelected.length > 1 && (
                    <div className="radio_wrap">
                        <CrRcio
                            defaultChecked={radio === 0}
                            type="radio"
                            name="vacationPersonalLocation"
                            textContent="任一地點"
                            whenClick={() => this.onClickRadio(0)}
                        />
                        <CrRcio
                            defaultChecked={radio === 1}
                            type="radio"
                            name="vacationPersonalLocation"
                            textContent="全都要去"
                            whenClick={() => this.onClickRadio(1)}
                        />
                    </div>
                )}

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
                        onClick={() => {
                            this.setState(prevState => ({
                                openMoreSearch: !prevState.openMoreSearch
                            }));
                        }}
                    >
                        更多搜尋選項<span className="control_arrow">&#94;</span>
                    </p>
                    <div className="moreSeach_content mobile">
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
                    className="search_button"
                    radius
                    lg
                    whenClick={() => {
                        onSubmit(Object.assign(this.state, { hrefTarget: this.props.hrefTarget }));
                    }}
                >
                    搜尋
                </BtRcnb>

                <NvbRslb
                    visible={pageVisible}
                    direction="right"
                    className="confirmBtn_span_d-no"
                >
                    <NvbGoBack onClick={this.handleClose} />
                    {
                        showCalendarPage && (
                            <CyRcmn
                                panelName="vacationPersonal"
                                doubleChoose
                                selectedStartDate={FromDate}
                                selectedEndDate={ToDate}
                                activeInput={activeInput}
                                endMonth={dayjs().add(12, 'months').format('YYYY-MM')}
                                startLabelTitle="最早出發日"
                                endLabelTitle="最晚出發日"
                                startTxt="最早"
                                endTxt="最晚"
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
                        showRoomPage && (
                            <RoomPageContent
                                roomlist={roomlist}
                                roomage={roomage}
                                onClickConfirm={this.roomPageConfirm}
                            />
                        )
                    }
                    {
                        showDestinationPage && (
                            <DestinationPage
                                className={`vacation_personal_mobile ${showDestinationPage ? '' : 'd-no'}`}
                                inputText={destinationInput}
                                DestinationSelected={DestinationSelected}
                                placeholder={'更多目的地，請輸入關鍵字'}
                                onClickConfirm={this.destinationPageConfirm}
                            />
                        )
                    }
                    {
                        showKeyWordPage && (
                            <KeyWordPage
                                Destination={Destination}
                                Keywords={Keywords}
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