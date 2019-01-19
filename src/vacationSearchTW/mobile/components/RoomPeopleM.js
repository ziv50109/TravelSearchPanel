import React, { PureComponent } from 'react';
import StRcln from '../../../../magaele/st_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import NvbRslb from '../../../../magaele/nvb_rslb';
import IcRcln from '../../../../magaele/ic_rcln';
import {
    roomCount,
} from '../../share/option';
import {
    NoticeText,
    RoomLitSection,
    calcShowText,
    calcShowText1
} from '../../share/RoomListCommon';

class RoomPeopleM extends PureComponent {
    state = {
        roomList: [
            {
                adult: 2,
                childrenWithBed: [],
                childrenNoBed: []
            }
        ],
        maxPeople: 8, // 最大人數8人
        maxChild: 3, // 小孩佔床+不佔床 最多3人
        childForSingleAdult: 2, // 一位大人最多2位小孩
        minAdult: 1, // 每間房最少1位大人
        inputText: '共1間，2人',
        inputText1: '2人',

        // 真正顯示在頁面上的
        pageText: '共1間，2人',
        pageText1: '2人',

        visible: false,
    };

    componentDidMount () {
        this.setState({ zIndex: this.getHighestZIndex() });
    }

    // 取得最高 zindex
    getHighestZIndex () {
        let highestZIndex = 0;
        let currentZIndex = 0;
        let nodes = document.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
            currentZIndex = Number(window.getComputedStyle(nodes[i]).zIndex);
            if (currentZIndex > highestZIndex) {
                highestZIndex = currentZIndex;
            }
        }
        return highestZIndex + 1;
    }

    transforRoomList () {
        const roomList = this.state.roomList.map((e) => {
            return `${e.adult}-${e.childrenWithBed.length}-${e.childrenNoBed}`;
        });
        return roomList.join(',');
    }

    transforRoomage () {
        const roomage = this.state.roomList.map((e) => {
            return `${e.childrenWithBed.join(';')}-${e.childrenNoBed.join(';')}`;
        });
        return roomage.join(',');
    }

    calcPeopleInfo () {
        // 計算人數資訊 return value [總人數, 總成人數, 總小孩佔床人數, 總小孩不佔床人數]
        const { roomList } = this.state;
        let total = 0;
        let adult = 0;
        let childrenWithBed = 0;
        let childrenNoBed = 0;
        for (let i = 0; i < roomList.length; i++) {
            const a = roomList[i].adult; // 每間房大人人數
            const b = roomList[i].childrenWithBed.length; // 每間房小孩佔床人數
            const c = roomList[i].childrenNoBed.length; // 每間房小孩不佔床人數
            adult += a;
            childrenWithBed += b;
            childrenNoBed += c;
            total = total + a + b + c;
        }
        return [total, adult, childrenWithBed, childrenNoBed];
    }

    changeRoomCount = (value) => {
        const {
            roomList,
        } = this.state;
        const count = Number(value);

        const dataTemplate = {
            adult: 1,
            childrenWithBed: [],
            childrenNoBed: []
        };

        if (count === roomList.length) return;

        const dataArray = [];

        for (let i = 0; i < count; i++) {
            dataArray.push(dataTemplate);
        }

        const inputText = calcShowText(dataArray);
        const inputText1 = calcShowText1(dataArray);

        this.setState(prevState => {
            return {
                inputText,
                roomList: dataArray,
                inputText1
            };
        });
    }

    onClickAdd = (roomCount, target) => {
        const {
            maxPeople,
            maxChild,
            childForSingleAdult,
        } = this.state;

        const [
            total,
            adultNum,
            childBedNum,
            childNoBedNum,
        ] = this.calcPeopleInfo();

        // 超過最大人數
        if (total + 1 > maxPeople) return;

        // 如果增加的是小孩人數
        if (target === 'childrenWithBed' || target === 'childrenNoBed') {
            const newCount = childBedNum + childNoBedNum + 1;
            // 一個大人最多帶兩位小孩
            if (adultNum === 1 && newCount > childForSingleAdult) return;
            // 小孩總人數不能超過3
            if (newCount > maxChild) return;
        }

        this.setState(prevState => {
            const roomList = JSON.parse(JSON.stringify(prevState.roomList));
            let t = roomList[roomCount][target];

            if (target !== 'adult') {
                // 增加的是小孩人數
                t.push(0);
            } else {
                roomList[roomCount][target] = t + 1;
            }

            const inputText = calcShowText(roomList);
            const inputText1 = calcShowText1(roomList);

            return {
                roomList,
                inputText,
                inputText1
            };
        });
    }

    onClickMinus = (roomCount, target) => {
        const {
            minAdult,
        } = this.state;

        let roomList = JSON.parse(JSON.stringify(this.state.roomList));
        let t = roomList[roomCount][target];

        if (target === 'adult') {
            // 已經是最少大人數
            if (t === minAdult) return;

            // 減一位大人
            roomList[roomCount][target] = t - 1;

            // 大人減少了就把小孩人數全部歸0
            roomList = roomList.map(v => ({
                adult: v.adult,
                childrenWithBed: [],
                childrenNoBed: [],
            }));

        } else {
            // 如果小孩人數已經為0
            if (t.length === 0) return;

            // 減掉最後一個小孩
            t.pop();
        }

        const inputText = calcShowText(roomList);
        const inputText1 = calcShowText1(roomList);

        this.setState(prevState => ({
            roomList,
            inputText,
            inputText1
        }));
    }

    onChangeChildAge = (roomCount, target, targetIndex, value) => {
        const roomList = this.state.roomList;
        const val = Number(value);

        roomList[roomCount][target][targetIndex] = val;

        this.setState(prevState => ({
            roomList,
        }));
    }

    showCalendar = () => {
        this.setState({
            visible: !this.state.visible,
            inputText: '共1間，2人',
            inputText1: '2人',
            roomList: [
                {
                    adult: 2,
                    childrenWithBed: [],
                    childrenNoBed: []
                }
            ]
        });
    }

    onClickConfirm = () => {
        const { inputText, inputText1 } = this.state;
        this.setState({ visible: !this.state.visible, pageText: inputText, pageText1: inputText1 },
            this.props.setPanelState({ roomlist: this.transforRoomList(), roomage: this.transforRoomage() })
        );
    }

    render () {
        const {
            roomList,
            inputText,
            inputText1,
            visible
        } = this.state;

        const {
            customClass,
            noHotel
        } = this.props;


        return (
            <div className={customClass}>
                <IntRcln
                    request
                    readOnly
                    placeholder="間數/人數"
                    label={noHotel === 0 ? '間數/人數' : '人數'}
                    value={noHotel === 0 ? this.state.pageText : this.state.pageText1}
                    icon={<IcRcln name="toolmember" />}
                    onClick={this.showCalendar}
                />
                <NvbRslb
                    visible={visible}
                    direction="right"
                    zIndex={'10000'}
                    className="confirmBtn_span_d-no"
                >
                    {
                        visible &&
                            <div className="nvb_content">
                                <header>
                                    <span className="nvb_rslb_goBack" onClick={this.showCalendar}>
                                        <IcRcln name="toolbefore" />
                                    </span>
                                    <h3 className="txt-center page_title">{noHotel === 0 ? '間數/人數' : '人數'}</h3>
                                    <div className="search_input">
                                        <IntRcln
                                            placeholder="共N間，N人"
                                            readOnly
                                            value={noHotel === 0 ? inputText : inputText1}
                                            color="blue"
                                        />
                                        <BtRcnb radius whenClick={this.onClickConfirm}>
                            確定
                                        </BtRcnb>
                                    </div>
                                </header>
                                <div className="page_content wrapper-sm roompeople_content">
                                    {noHotel === 0 &&
                                        <StRcln
                                            option={roomCount}
                                            placeholder="請選擇"
                                            label="間數:"
                                            defaultValue={roomList.length}
                                            onChangeCallBack={this.changeRoomCount}
                                            ClassName="m-b-sm"
                                        />
                                    }
                                    {
                                        roomList.map((v, i) => (
                                            <RoomLitSection
                                                key={i}
                                                roomCount={i}
                                                adult={v.adult}
                                                childrenWithBed={v.childrenWithBed}
                                                childrenNoBed={v.childrenNoBed}
                                                onClickAdd={this.onClickAdd} // 點選增加人數
                                                onClickMinus={this.onClickMinus} // 點選減少人數
                                                onChangeChildAge={this.onChangeChildAge} // 小孩年齡change
                                            />
                                        ))
                                    }
                                    <NoticeText />
                                </div>
                            </div>
                    }
                </NvbRslb>
            </div>
        );
    }
}

export default RoomPeopleM;