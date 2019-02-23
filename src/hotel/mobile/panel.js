import React, { Component } from 'react';
import classNames from 'classnames';
import { isJsonString } from '../../../utils';
import { hotel } from '../../../source.config';
import styles from './css.scss';
import IntRcln from '../../../magaele/int_rcln';
import IcRcln from '../../../magaele/ic_rcln';
import DtmRcfr from '../../../magaele/dtm_rcfr';
import CrRcln from '../../../magaele/cr_rcln';
import BtRcnb from '../../../magaele/bt_rcnb';
import RoomPageContent from './RoomPageContent';
import ActRajx from '../../../magaele/act_rajx';
import onSubmit from '../onSubmit';
import useLocalStorage from '../../../utils/useLocalStorage';
import Label from '../../../magaele/int_rctg/components/Label/Label.js';
import CyRcmn from '../../../magaele/cy_rcmn';
import NvbRslb from '../../../magaele/nvb_rslb';
import dayjs from 'dayjs';
// import '../../vacation/personal/css.scss';

const NvbGoBack = ({
    onClick,
}) => (
    <span className="nvb_rslb_goBack" onClick={onClick}>
        <IcRcln name="toolbefore" />
    </span>
);

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = {
            Destination: {},
            Code: '',
            Kind: '',
            Txt: '',
            Rooms: [
                {
                    AdultQty: 2,
                    ChildAges: [],
                    ChildQty: 0
                }
            ],
            CheckIn: '',
            CheckOut: '',
            endMonth: dayjs().add(12, 'months').format('YYYY-MM'),
            Filter: {
                Allotment: '0'
            },
            activeInput: null,
            selectedData: [],
            roomListInput: '共1間，2位大人、0位小孩',
            totleNights: 0,
            inputText: '',
            showDtm: true,
            showAct: false,
            hasValue: false,
            actAllData: null,
            actShowData: [], // 補字選單show的資料
            rajxDataUrl: '',
            rajxHead: hotel.destinationAutoComplete,
            dtmDataSrc: hotel.destination,
            dtmData: {},
            actRules: [
                {
                    title: '城市',
                    icon: <IcRcln name="toolmapf" key={1} />
                },
                {
                    title: '區域',
                    icon: <IcRcln name="traffictrafficcruiseshipf" key={2} />
                },
                {
                    title: '行政區',
                    icon: <IcRcln name="hotelbusinesscen" key={3} />
                },
                {
                    title: '商圈',
                    icon: <IcRcln name="productpricef" key={4} />
                },
                {
                    title: '地標',
                    icon: <IcRcln name="hotelwify" key={5} />
                },
                {
                    title: '飯店',
                    icon: <IcRcln name="hotelforeignBookingf" key={6} />
                }
            ]
        };
    }
    componentDidMount () {
        const { dtmDataSrc } = this.state;
        const sessionData = sessionStorage.getItem(dtmDataSrc);

        if (!sessionData || !isJsonString(sessionData)) {
            fetch(dtmDataSrc)
                .then(r => r.json())
                .then(d => {
                    let stringifyData = JSON.stringify(d);
                    this.setState({
                        dtmData: d,
                    });
                    sessionStorage.setItem(dtmDataSrc, stringifyData);
                });
        } else {
            const jsonData = JSON.parse(sessionData);
            this.setState({
                dtmData: jsonData,
            });
        }
        useLocalStorage({
            panel: 'hotel',
            methods: 'get',
        }, (data) => {
            const state = this.validataLocalstorageData(data);
            this.setState({ ...state });
        });
    }

    // 開M版panel
    showNvbPage (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    closeNvbPage = () => {
        this.setState({
            activeInput: null,
            endMonth: dayjs().add(12, 'months').format('YYYY-MM')
        });
    }

    // 目的地
    transformActFetchData = (data) => {
        // 補字選單調整fetch到的資料格式
        const {
            Destinations
        } = data;
        const dataArray = [];

        for (let i = 0; i < Destinations.length; i++) {
            const hotelDataObj = {
                txt: Destinations[i].Name,
                level2: Destinations[i].KindName,
                level3: Destinations[i].Code,
                Kind: Destinations[i].Kind
            };
            dataArray.push(hotelDataObj);
        }
        return dataArray;
    }
    transformDtmData = (data) => {
        let kind = 10;
        let country = data.vCountry.split('_')[1];
        let city = data.vCity.split('_');
        switch (country) {
            case 'PCT': kind = 10; break;
            case 'PCTZ': kind = 18; break;
            case 'PCTP': kind = 80; break;
        }
        if (country === 'PCT' && city[0] === 'TW' && city.length === 3) {
            kind = 85;
        }
        if (country === 'PCTZ' && typeof city[0] === 'string' && city[0] === 'TW') {
            kind = 84;
        }
        this.setState(prevState => ({
            Kind: kind
        }));
    }
    onClickDestnDtmItem = (data) => {
        this.transformDtmData(data);
        const Code = data.vCity;
        this.setState(prevState => ({
            selectedData: [data],
            inputText: data.text,
            Txt: data.text,
            hasValue: false,
            Code
        }));
    }
    openDestnMenu = () => {
        const { hasValue, actShowData } = this.state;
        if (this.state.inputText) {
            if (hasValue) {
                this.setState({
                    showAct: true,
                    showDtm: false
                });
            } else {
                this.setState({
                    showAct: false,
                    showDtm: true
                });
            }
            if (actShowData.length > 0) {
                this.setState({
                    showAct: true,
                    showDtm: false
                });
            }
        } else {
            this.setState({
                showAct: false,
                showDtm: true
            });
        }
    }
    closeDestnMenu = () => {
        const {
            actShowData,
            inputText,
            showAct
        } = this.state;

        if (actShowData.length > 0) {
            const filterData = actShowData.filter((item) => {
                return item.txt === inputText;
            });

            if (filterData.length === 0) {
                let data = actShowData[0];
                this.setState({
                    inputText: data.txt,
                    Kind: data.Kind,
                    Code: data.level3,
                    Txt: data.txt
                });
            }
        } else {
            if (showAct) {
                this.setState({
                    inputText: '',
                    showAct: false,
                    showDtm: true,
                    hasValue: false
                });
            }
        }

        this.setState({
            hasValue: false,
            activeInput: null
        });
    }
    handleDestnKeyDown = (e) => {
        if (e.keyCode === 8) {
            this.setState(prevState => ({
                hasValue: true
            }));
        }
    }
    onClickDestnAct = (data, str) => {
        const {
            txt: Txt,
        } = data;
        if (str === 'choosed') {
            this.setState(prevState => ({
                Txt,
                inputText: Txt,
                dtmSelected: [],
                selectedData: [data],
                hasValue: false,
            }));
        } else {
            this.setState(prevState => ({
                Txt
            }));
        }
    }
    clearDestnValue = () => {
        this.setState({
            selectedData: [],
            inputText: '',
            showAct: false,
            showDtm: true,
            actShowData: [],
            Code: '',
            Kind: '',
            Txt: '',
        });
    }
    onDestnInputChange = (e) => {
        const inputText = e.target.value;
        const Txt = e.target.value;
        const { rajxHead } = this.state;
        const showAct = inputText.length > 0;
        this.setState(prevState => ({
            inputText,
            Txt,
            selectedData: [],
            dtmSelected: [],
            showAct: showAct,
            showDtm: !showAct,
        }));
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const rajxDataUrl = rajxHead + '?keyWord=' + encodeURI(inputText);
            this.fetchDestnActData(rajxDataUrl, inputText);
        }, 500);
    }
    fetchDestnActData = (url) => {
        fetch(url)
            .then(r => r.json())
            .then(data => {
                const dataArr = this.transformActFetchData(data);
                this.setState(prevState => ({
                    actShowData: dataArr
                }));
            });
    }

    // 月曆
    showCalendar (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target
        }));
    }
    handleConfirmRoom = () => {
        this.setState({
            activeInput: null,
        });
    }
    handleConfirmBookingDate = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;
        this.diffDate(selectedStartDate, selectedEndDate);

        this.setState(prevState => ({
            ...prevState,
            CheckIn: selectedStartDate,
            CheckOut: selectedEndDate,
            activeInput: null,
        }));
    }
    diffDate (selectedStartDate, selectedEndDate) {
        if (!selectedStartDate.length || !selectedEndDate.length) return '';
        const d1 = new Date(selectedStartDate).getTime();
        const d2 = new Date(selectedEndDate).getTime();
        const dayDiff = (d2 - d1) / (1000 * 3600 * 24);
        this.setState({
            totleNights: dayDiff
        });
    }


    // 間數人數
    roomPeopleSum = (pageState) => {
        const {
            inputText: roomListInput,
            Rooms
        } = pageState;
        this.setState({
            roomListInput,
            Rooms
        });
    }

    // 立即確認訂房
    handleAllotment = (boolean) => {
        const Filter = JSON.parse(JSON.stringify(this.state.Filter));
        Filter.Allotment = boolean ? '1' : '0';
        this.setState({
            Filter
        });
    }

    // 存入localstorage
    handlePost = () => {
        const { CheckIn, CheckOut, Rooms } = this.state;
        const PostTime = new Date().setHours(0, 0, 0, 0);
        useLocalStorage({
            panel: 'hotel',
            methods: 'post',
            data: {
                CheckIn,
                CheckOut,
                Rooms,
                PostTime
            }
        });
    };

    validataLocalstorageData = (data) => {
        console.log('v-data', data);
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!data) {
            this.setState({
                CheckIn: data.CheckIn,
                CheckOut: data.CheckOut
            });
            this.diffDate(data.CheckIn, data.CheckOut);
            const localStorageRecordTime = data.PostTime + 604800000;
            if (localStorageRecordTime < new Date(dayjs().format('YYYY-MM-DD')).getTime()) {
                console.log('超過7天予以刪除LocalStorage紀錄。');
                useLocalStorage({
                    panel: 'hotel',
                    methods: 'delete',
                });
                let CheckIn = '';
                let CheckOut = '';
                return {
                    CheckIn,
                    CheckOut
                };
            } else {
                let CheckIn = new Date(data.CheckIn).getTime() > new Date(dayjs().format('YYYY-MM-DD')).getTime() ?
                    data.CheckIn : '';
                let CheckOut = new Date(data.CheckOut).getTime() > new Date(dayjs().format('YYYY-MM-DD')).getTime() ?
                    data.CheckOut : '';

                const d1 = new Date(data.CheckIn).getTime();
                const d2 = new Date(data.CheckOut).getTime();
                let totleNights = (d2 - d1) / (1000 * 3600 * 24);

                if (!CheckIn) {
                    CheckOut = '';
                    totleNights = 0;
                }
                const Rooms = data.Rooms;
                const AdultQty = Rooms.map(e => e.AdultQty || 0).reduce((a, b) => a + b);
                const ChildQty = Rooms.map(e => e.ChildQty || 0).reduce((a, b) => a + b);
                const roomListInput = `共${Rooms.length}間，${AdultQty}位大人、${ChildQty}位小孩`;

                return {
                    CheckIn,
                    CheckOut,
                    totleNights,
                    Rooms,
                    roomListInput
                };
            }

        }
    };

    render () {
        const {
            CheckIn,
            CheckOut,
            endMonth,
            Rooms,
            activeInput,
            roomListInput,
            totleNights,
            selectedData,
            inputText,
            showAct,
            showDtm,
            dtmData,
            actRules,
            actShowData
        } = this.state;
        const classes = classNames.bind(styles)('hotelsRectM');
        const showCalendarPage = activeInput === 0 || activeInput === 1;
        const shwoDestinationsPage = activeInput === 'destinationlist';
        const showRoomPage = activeInput === 'roomlist';
        const selected = selectedData.map(v => v.value);
        const dtm_wrap_classes = classNames('wrap_container', {
            'd-no': !showDtm,
        });

        const act_wrap_classes = classNames('act_wrap_container', {
            'd-no': !showAct,
        });

        const activeEndDate = (activeInput, d) => {
            const afterStartDateNum = dayjs(d).add(14, 'days').month();
            const endMonthNum = dayjs(endMonth).month();

            let newEndMonth = dayjs(d).add(14, 'days').format('YYYY-MM');
            if (afterStartDateNum < endMonthNum) {
                newEndMonth = dayjs().add(12, 'months').format('YYYY-MM');
            }

            this.setState({
                endMonth: newEndMonth
            });
        };

        return (
            <div className={classes}>
                <div className={`${classes}_hotelCont`}>
                    <div className="destination">
                        <IntRcln
                            placeholder="目的地、地標、區域、飯店名稱"
                            label="目的地"
                            readOnly
                            request
                            breakline
                            icon={<IcRcln name="toolmap" />}
                            value={inputText}
                            onClick={() => { this.showNvbPage('destinationlist') }}
                        />
                    </div>
                    <div className="booking">
                        <Label
                            isRequired
                            label="住房期間"
                            iconName="tooldate"
                            onClick={() => this.showCalendar(0)}
                            subComponent={
                                <div className="input_group">
                                    <IntRcln
                                        readOnly
                                        placeholder="YYYY/MM/DD"
                                        value={CheckIn.replace(/\-/g, '/')}
                                    />
                                    <span className="cal_icon">~</span>
                                    <IntRcln
                                        readOnly
                                        placeholder="YYYY/MM/DD"
                                        value={CheckOut.replace(/\-/g, '/')}
                                    />
                                    {
                                        totleNights > 0 ? (
                                            <span className="nights">{
                                                `，共${totleNights}晚`
                                            }</span>
                                        ) : null
                                    }
                                </div>
                            }
                        />
                    </div>
                    <div className="roomSetting">
                        <IntRcln
                            placeholder="共1間，2位大人、0位小孩"
                            value={roomListInput}
                            label="間數/人數"
                            breakline
                            readOnly
                            request
                            icon={<IcRcln name="toolmember" />}
                            className="m-b-sm"
                            onClick={() => { this.showNvbPage('roomlist') }}
                        />
                    </div>
                    <div className="chkbox-group"><CrRcln type="checkbox" whenChange={this.handleAllotment} textContent="顯示可立即確認訂房"></CrRcln></div>
                    <div className="searchBtn">
                        <a className="bookingToday" href="http://globalhotel.liontravel.com/?_ga=2.18510781.561999660.1540257880-885419176.1540257880" target="_blank">
                            <IcRcln name="toolchoosen" />
                            我要訂購今日住宿
                        </a>
                        <BtRcnb
                            className="search_button"
                            radius
                            lg
                            whenClick={() => {
                                onSubmit(Object.assign(this.state, { hrefTarget: this.props.hrefTarget }));
                                this.handlePost();
                            }}
                        >
                            搜尋
                        </BtRcnb>
                    </div>

                    <NvbRslb
                        className="hotelsRectM-destination"
                        visible={shwoDestinationsPage}
                        direction="right"
                    >
                        {shwoDestinationsPage && <>
                            <NvbGoBack onClick={this.closeDestnMenu} />
                            <div className="nvb_content">
                                <header>
                                    <h3 className="txt-center m-b-sm fz-lg">目的地</h3>
                                    <div className="search_input">
                                        <IntRcln
                                            placeholder="目的地、地標、區域、飯店名稱"
                                            value={this.state.Txt}
                                            onChange={this.onDestnInputChange}
                                            onClearValue={this.clearDestnValue}
                                            onKeyDown={this.handleDestnKeyDown}
                                            onClick={this.openDestnMenu}
                                        />
                                        <BtRcnb radius whenClick={this.closeDestnMenu} >確定</BtRcnb>
                                    </div>
                                    <p className="dtm_rcfr-label">{'找不到選項？請輸入關鍵字查詢'}</p>
                                </header>
                                <div className="destinationOpation m-t-n-sm">
                                    <div className={dtm_wrap_classes}>
                                        {Object.keys(dtmData).length &&
                                            <DtmRcfr
                                                levelKey={['inTaiwan', 'vLine', 'vCountry', 'vCity']}
                                                onClickItem={this.onClickDestnDtmItem}
                                                dataResouce={dtmData}
                                                replaceRegular={/[a-zA-Z\(\)\s]/g}
                                                selectedData={selected}
                                            />
                                        }
                                    </div>
                                    <div className={act_wrap_classes}>
                                        <ActRajx
                                            titleClass={showAct ? '' : 'd-no'}
                                            isFocus={showAct}
                                            data={actShowData}
                                            matchWord={inputText}
                                            getItemClickValue={this.onClickDestnAct}
                                            minimumStringQuery={'請至少輸入兩個字'}
                                            noMatchText="很抱歉，找不到符合的項目"
                                            minimumStringQueryLength={2}
                                            footer={false}
                                            rules={actRules}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>}
                    </NvbRslb>

                    <NvbRslb
                        visible={showCalendarPage}
                        direction="right"
                        className="hotelsRectM-calendar"
                    >
                        <NvbGoBack onClick={this.closeNvbPage} />
                        {showCalendarPage &&
                            <CyRcmn
                                doubleChoose
                                selectedStartDate={CheckIn}
                                selectedEndDate={CheckOut}
                                activeInput={activeInput}
                                endDate={dayjs().add(12, 'months').format('YYYY-MM-DD')}     // 灰灰
                                endMonth={endMonth}                                         // 極限
                                startDate={dayjs().add(1, 'days').format('YYYY-MM-DD')}
                                startLabelTitle="入住日期"
                                endLabelTitle="退房日期"
                                startTxt="入住"
                                endTxt="退房"
                                panelName="hotel"
                                ref={e => { this.calendar = e }}
                                // switchLabelCallBack={(activeInput, d) => activeEndDate(activeInput, d)}     // 月曆的頁籤切換
                                onDateClickCallBack={(activeInput, d) => activeEndDate(activeInput, d)}     // 月曆的日期點選
                                onClickConfirm={this.handleConfirmBookingDate}
                                customDiffTxt={diffDate => {
                                    const showTxt = diffDate;
                                    return '共' + showTxt + '晚';
                                }}
                            />
                        }
                    </NvbRslb>

                    <NvbRslb className="hotelsRectM-roomPage" visible={showRoomPage} direction="right">
                        <NvbGoBack onClick={this.closeNvbPage} />
                        {showRoomPage &&
                            <div className="nvb_content">
                                <header className="hotelsRectM-header">
                                    <h3 className="txt-center m-b-md">間數/人數</h3>
                                    <div className="search_input">
                                        <IntRcln
                                            placeholder="共1間，2位大人、0位小孩"
                                            value={roomListInput}
                                            readOnly
                                        />
                                        <BtRcnb radius whenClick={this.handleConfirmRoom} >確定</BtRcnb>
                                    </div>
                                </header>
                                <div className="hotelsRectM-roomList">
                                    <RoomPageContent Rooms={Rooms} changeSum={this.roomPeopleSum} />
                                    <p className="psTxt">※單次訂購提供相同房型，相同房型不同入住人數依選購的專案售價。</p>
                                </div>
                            </div>
                        }
                    </NvbRslb>
                </div>
            </div>
        );
    }
}

export default Panel;