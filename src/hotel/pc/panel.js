import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './css.scss';
import IntRcln from '../../../magaele/int_rcln';
import IcRcln from '../../../magaele/ic_rcln';
import DtmRcfr from '../../../magaele/dtm_rcfr';
import CrRcln from '../../../magaele/cr_rcln';
import BtRcnb from '../../../magaele/bt_rcnb';
import RoomPageContent from './RoomPageContent';
import ActRajx from '../../../magaele/act_rajx';
import onSubmit from '../onSubmit';

import Calendar from '../../component/ComposeCalendar';
import { ClickOutSide } from '../../../utils';


const CloseButton = ({ onClick }) => (
    <span className="close_btn" onClick={onClick}></span>
);
class Panel extends Component {
    constructor (props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            Destination: {},
            Code: '',
            Kind: '',
            Txt: '',
            Rooms: [],
            CheckIn: '',
            CheckOut: '',
            Filter: {
                Allotment: '0'
            },
            selectedData: [],
            roomOptionState: false,
            roomListInput: '',
            inputText: '',
            showDtm: false,
            showAct: false,
            hasValue: false,
            actAllData: null,
            actShowData: [], // 補字選單show的資料
            rajxDataUrl: '',
            rajxHead: 'https://hotel.liontravel.com/search/keyword?keyWord=',
            dtmDataSrc: './json/hotelMenu.json',
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
        this.timer = null;
    }

    // 目的地
    transformActFetchData = (data) => {
        // 補字選單調整fetch到的資料格式
        const {
            Destinations
        } = data;
        const dataArray = [];

        for (let i = 0; i < Destinations.length; i++) {
            const dataObj = {
                txt: Destinations[i].Name,
                level2: Destinations[i].KindName,
                level3: Destinations[i].Code,
                Kind: Destinations[i].Kind
            };
            dataArray.push(dataObj);
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
            showDtm: false,
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
                    inputText: ''
                });
            }
        }
        this.setState({
            showAct: false,
            showDtm: false,
            hasValue: false
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
            Kind,
            level3: Code,
            txt: Txt
        } = data;
        if (str === 'choosed') {
            this.setState(prevState => ({
                Code,
                Kind,
                Txt,
                inputText: Txt,
                dtmSelected: [],
                selectedData: [data],
                showAct: false,
                hasValue: false,
            }));
        } else {
            this.setState(prevState => ({
                Txt,
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
            const rajxDataUrl = rajxHead + encodeURI(inputText);
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

    // 住房期間
    handleBooking = (pageState) => {
        const {
            selectedStartDate: CheckIn,
            selectedEndDate: CheckOut,
        } = pageState;
        this.setState({
            CheckIn,
            CheckOut,
        });
    }

    // 間數人數
    openRoomOption = () => {
        this.setState(prevState => ({
            roomOptionState: true
        }));
    }
    closehRoomOption = () => {
        this.setState(prevState => ({
            roomOptionState: false
        }));
    }
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



    render () {
        const classes = classNames.bind(styles)('hotelsRectPC');
        const {
            selectedData,
            roomListInput,
            roomOptionState,
            inputText,
            showAct,
            showDtm,
            dtmDataSrc,
            actRules,
            actShowData
        } = this.state;
        const selected = selectedData.map(v => v.value);
        const dtm_wrap_classes = classNames('wrap_container', {
            'd-no': !showDtm,
        });

        const act_wrap_classes = classNames('act_wrap_container', {
            'd-no': !showAct,
        });
        return (
            <div className={classes}>
                <div className={`${classes}_hotelCont`}>
                    <ClickOutSide onClickOutside={this.closeDestnMenu}>
                        <div className="destination">
                            <div className="input_group">
                                <IntRcln
                                    placeholder="目的地、地標、區域、飯店名稱"
                                    label="目的地"
                                    request
                                    icon={<IcRcln name="toolmap" />}
                                    value={this.state.Txt}
                                    onChange={this.onDestnInputChange}
                                    onClearValue={this.clearDestnValue}
                                    onKeyDown={this.handleDestnKeyDown}
                                    onClick={this.openDestnMenu}
                                />
                            </div>
                            <div className={dtm_wrap_classes}>
                                <p style={{ color: '#24a07d' }} className="dtm_rcfr-label">{'找不到選項？請輸入關鍵字查詢'}</p>
                                <CloseButton onClick={this.closeDestnMenu} />
                                <DtmRcfr
                                    levelKey={['inTaiwan', 'vLine', 'vCountry', 'vCity']}
                                    onClickItem={this.onClickDestnDtmItem}
                                    dataResouce={dtmDataSrc}
                                    replaceRegular={/[a-zA-Z\(\)\s]/g}
                                    selectedData={selected}
                                />
                            </div>
                            <div className={act_wrap_classes}>
                                <CloseButton onClick={this.closeDestnMenu} />
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
                    </ClickOutSide>
                    <div className="booking">
                        <Calendar titleTxt={'住房期間'}
                            totleNights={true}
                            onChange={this.handleBooking}
                            // setEndDate={12}  // 月曆可選日期最大上限(單位/月),不設定則預設是12個月;
                            // setActiveEnd={12}  // 月曆最大上限(單位/月),不設定則預設是12個月;
                            setStartDate={1} // 起始可以選的日期(單位/日);
                            setOtherEnd={14}  // 月曆另外設定可選日期最大上限(單位/日),訂房最大上限14晚;
                        />
                    </div>
                    <ClickOutSide onClickOutside={this.closehRoomOption}>
                        <div className="roomSetting">
                            <div className="input_group">
                                <IntRcln
                                    placeholder="共1間，2位大人、0位小孩"
                                    label="間數/人數"
                                    icon={<IcRcln name="toolmember" />}
                                    request
                                    value={roomListInput}
                                    onClick={this.openRoomOption}
                                />
                                <div className={`stCont ${roomOptionState ? 'show' : ''}`}>
                                    <CloseButton onClick={this.closehRoomOption} />
                                    <div>
                                        <RoomPageContent changeSum={this.roomPeopleSum} />
                                        <p style={{ color: '#24a07d' }}>※單次訂購提供相同房型，相同房型不同入住人數依選購的專案售價。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ClickOutSide>
                    <div><CrRcln type="checkbox" whenChange={this.handleAllotment} textContent="顯示可立即確認訂房"></CrRcln></div>
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
                            }}
                        >
                            搜尋
                        </BtRcnb>
                    </div>
                </div>
            </div>
        );
    }
}

export default Panel;