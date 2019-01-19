import React, { PureComponent } from 'react';
import cx from 'classnames';
import Label from '../../share/Label';
import { ClickOutSide } from '../../../../utils';

import {
    NoticeText,
    RoomLitSection,
    calcShowText,
    calcShowText1
} from '../../share/RoomListCommon';
import { CloseButton } from '../../share/option';

class RoomPeople extends PureComponent {
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
        showDropDown: false
    };

    componentDidMount () {
        this.props.setPanelState({ roomlist: this.transforRoomList(), roomage: this.transforRoomage() });
    }

    componentDidUpdate () {
        this.props.setPanelState({ roomlist: this.transforRoomList(), roomage: this.transforRoomage() });
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

    changeRoomCount = e => {
        const { roomList } = this.state;
        const value = e.target.value;
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
                inputText1,
                roomList: dataArray
            };
        });
    };

    closMenu = () => {
        this.setState(prevState => ({
            showDropDown: false
        }));
    };

    onClickInput = () => {
        this.setState(prevState => ({
            showDropDown: true
        }));
    };

    onClickAdd = (roomCount, target) => {
        const { maxPeople, maxChild, childForSingleAdult } = this.state;

        const [
            total,
            adultNum,
            childBedNum,
            childNoBedNum
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
    };

    onClickMinus = (roomCount, target) => {
        const { minAdult } = this.state;

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
                childrenNoBed: []
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
    };

    onChangeChildAge = (roomCount, target, targetIndex, value) => {
        const roomList = [...this.state.roomList];
        const val = Number(value);
        roomList[roomCount][target][targetIndex] = val;
        this.setState(prevState => ({
            roomList
        }));
    };

    render () {
        const { roomList, inputText, inputText1, showDropDown } = this.state;

        const { noHotel, customClass } = this.props;

        const dropDownClasses = cx('room_list_wrap_container roompeople_content_pc', {
            'd-no': !showDropDown
        });

        return (
            <ClickOutSide
                className={customClass}
                onClickOutside={this.closMenu}
            >
                <div className="input_compose roomListInput">
                    <Label
                        isDouble={false} // 雙欄位
                        customClass={'w-people'} // 自訂 class
                        title1={noHotel === 0 ? '間數/人數' : '人數'} // 欄位1 title
                        icon={'toolmember'} // 欄位標題
                    >
                        {[
                            <input
                                key="1"
                                type="text"
                                value={noHotel === 0 ? inputText : inputText1}
                                placeholder={
                                    noHotel === 0 ? '共N間，N人' : '共N間'
                                }
                                onChange={e => this.onChange('text1', e)}
                                onClick={this.onClickInput}
                            />
                        ]}
                    </Label>
                    <div className={dropDownClasses}>
                        <CloseButton onClick={this.closMenu} />
                        {noHotel === 0 && (
                            <label className="room_count_select">
                                <select onChange={this.changeRoomCount}>
                                    <option value="1">共1間</option>
                                    <option value="2">共2間</option>
                                    <option value="3">共3間</option>
                                    <option value="4">共4間</option>
                                    <option value="5">共5間</option>
                                    <option value="6">共6間</option>
                                    <option value="7">共7間</option>
                                </select>
                            </label>
                        )}
                        {roomList.map((v, i) => (
                            <RoomLitSection
                                key={i}
                                roomCount={i}
                                adult={v.adult}
                                childrenWithBed={v.childrenWithBed}
                                childrenNoBed={v.childrenNoBed}
                                onClickAdd={this.onClickAdd} // 點選增加人數
                                onClickMinus={this.onClickMinus} // 點選減少人數
                                onChangeChildAge={this.onChangeChildAge} // 小孩年齡change
                                noHotel={noHotel}
                            />
                        ))}
                        <NoticeText />
                    </div>
                </div>
            </ClickOutSide>
        );
    }
}

export default RoomPeople;
