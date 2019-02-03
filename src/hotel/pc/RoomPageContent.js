import React, { PureComponent } from 'react';
import IntGpct from '../../../magaele/int_gpct';
// import StRcln from '../../../magaele/st_rcln';
import { isArray } from 'util';

// 從間數人數物件轉字串
function calcShowText (Rooms) {
    // 間數
    const roomCount = Rooms.length;
    let str = `共${roomCount}間，`;
    let aultNum = 0;
    let childNum = 0;
    for (let i = 0; i < Rooms.length; i++) {
        aultNum += Rooms[i].AdultQty; // 每間房大人人數
        childNum += Rooms[i].ChildAges.length; // 每間房小孩人數
    }
    str += `${aultNum}位大人、${childNum}位小孩`;
    str = str.replace(/\、$/g, '人');
    return str;
}

// 間數options
const roomCount = [
    {
        text: '共1間',
        value: 1,
    },
    {
        text: '共2間',
        value: 2,
    },
    {
        text: '共3間',
        value: 3,
    },
    {
        text: '共4間',
        value: 4,
    },
    {
        text: '共5間',
        value: 5,
    },
    {
        text: '共6間',
        value: 6,
    },
    {
        text: '共7間',
        value: 7,
    }
];

const ChildrenAgeSelect = ({
    onchange,
    defaultValue
}) => (
    <label className="children_age_select">
        <select onChange={onchange} defaultValue={defaultValue}>
            <option value="0">0歲</option>
            <option value="1">1歲</option>
            <option value="2">2歲</option>
            <option value="3">3歲</option>
            <option value="4">4歲</option>
            <option value="5">5歲</option>
            <option value="6">6歲</option>
            <option value="7">7歲</option>
            <option value="8">8歲</option>
            <option value="9">9歲</option>
            <option value="10">10歲</option>
            <option value="11">11歲</option>
            <option value="12">12歲</option>
        </select>
    </label>
);

const ChildAgeSection = (props) => {
    const {
        ageArray,
        onChange,
        roomCount,
        target,
    } = props;
    return (
        <div className="children_ages_section">
            <span className="row_title">小孩年齡</span>
            <div className="age_select_section">
                {
                    ageArray.map((v, i) => (
                        <ChildrenAgeSelect
                            key={i}
                            onchange={e => {
                                onChange(roomCount, target, i, e.target.value);
                            }}
                            defaultValue={v}
                        />
                    ))
                }
            </div>
        </div>
    );
};

const RoomLitSection = (props) => {
    const {
        roomCount,
        AdultQty,
        ChildAges,
        maxAdult,
        maxChild,
        onClickAdd, // 點選增加人數
        onClickMinus, // 點選減少人數
        onInputChange, // 手動輸入人數
        onInputBlur,
        onChangeChildAge, // 小孩年齡change
    } = props;

    const childCount = ChildAges.length;

    return (
        <section className="room_list_section">
            <h4 className="room_count_title">{`第${roomCount + 1}間`}</h4>
            <div className="room_list_row">
                <span className="row_title">成人</span>
                <IntGpct
                    max={20}
                    min={1}
                    readOnly={false}
                    count={AdultQty}
                    btnClassMinus="ic_rcln toolcancelb"
                    btnClassAdd="ic_rcln tooladdb"
                    onClickAdd={() => {
                        if (AdultQty < maxAdult) {
                            onClickAdd(roomCount, 'AdultQty');
                        }
                    }}
                    onClickMinus={() => { onClickMinus(roomCount, 'AdultQty') }}
                    onInputChange={(e) => { onInputChange(e, roomCount, 'AdultQty') }}
                    onInputBlur={(e) => { onInputBlur(e, roomCount, 'AdultQty') }}
                />
            </div>
            <div className="room_list_row">
                <div className="st_child">
                    <span className="row_title">小孩</span>
                    <IntGpct
                        max={3}
                        min={0}
                        readOnly={false}
                        count={childCount}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            if (childCount < maxChild) {
                                onClickAdd(roomCount, 'ChildAges');
                            }
                        }}
                        onClickMinus={() => { onClickMinus(roomCount, 'ChildAges') }}
                        onInputChange={(e) => { onInputChange(e, roomCount, 'ChildAges') }}
                    />
                </div>
                <div className="st_childAge">
                    {
                        childCount > 0
                            ?
                            (
                                <ChildAgeSection
                                    ageArray={ChildAges}
                                    onChange={onChangeChildAge}
                                    roomCount={roomCount}
                                    target="ChildAges"
                                />
                            )
                            :
                            null
                    }
                </div>
            </div>
        </section>
    );
};

class RoomPageContent extends PureComponent {
    state = {
        Rooms: [
            {
                AdultQty: 2,
                ChildAges: [],
                ChildQty: 0
            }
        ],
        maxAdult: 20, // 大人 最多20人
        maxChild: 3, // 小孩 最多3人
        minAdult: 1, // 每間房最少1位大人
        inputText: '共1間，2位大人、0位小孩',
    };
    componentDidMount () {
        this.props.changeSum(this.state);
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.Rooms !== this.props.Rooms) {
            this.updatePanelRooms();
        }
        if (prevState !== this.state) {
            this.props.changeSum(this.state);
        }
    }

    updatePanelRooms = () => {
        const { Rooms } = this.props;

        const RoomsLength = Rooms.length;
        const AdultQty = Rooms.map(e => e.AdultQty || 0).reduce((a, b) => a + b);
        const ChildQty = Rooms.map(e => e.ChildQty || 0).reduce((a, b) => a + b);
        const inputText = `共${RoomsLength}間，${AdultQty}位大人、${ChildQty}位小孩`;

        this.setState({
            Rooms,
            inputText
        });
    }

    changeRoomCount = (e) => {
        const {
            Rooms,
        } = this.state;
        const value = e.target.value;
        const count = Number(value);
        const oldRooms = JSON.parse(JSON.stringify(Rooms));
        const dataTemplate = {
            AdultQty: 2,
            ChildAges: [],
            ChildQty: 0
        };

        if (count === Rooms.length) return;

        let dataArray = JSON.parse(JSON.stringify(oldRooms));
        if (oldRooms.length < count) {
            for (let i = 0; i < count - oldRooms.length; i++) {
                dataArray.push(dataTemplate);
            }
        } else {
            for (let i = 0; i < oldRooms.length - count; i++) {
                dataArray.pop();
            }
        }

        const inputText = calcShowText(dataArray);
        this.setState(prevState => ({
            ...prevState,
            inputText,
            Rooms: dataArray,
        }));
    }

    onClickAdd = (roomCount, target) => {
        this.setState(prevState => {
            const Rooms = JSON.parse(JSON.stringify(prevState.Rooms));
            let t = Rooms[roomCount][target];
            if (isArray(t)) {
                // 是陣列表示增加的是小孩人數
                t.push(12);
                Rooms[roomCount].ChildQty = t.length;
            } else {
                t = t + 1;
            }

            Rooms[roomCount][target] = t;
            const inputText = calcShowText(Rooms);
            return {
                ...prevState,
                Rooms,
                inputText,
            };
        });
    }

    onClickMinus = (roomCount, target) => {
        const {
            minAdult,
        } = this.state;
        let Rooms = JSON.parse(JSON.stringify(this.state.Rooms));
        let t = Rooms[roomCount][target];
        if (target === 'AdultQty') {
            // 已經是最少大人數
            if (t === minAdult) return;
            // 減一位大人
            Rooms[roomCount][target] = t - 1;
        } else {
            // 如果小孩人數已經為0
            if (t.length === 0) return;
            // 減掉最後一個小孩
            t.pop();
            Rooms[roomCount].ChildQty = t.length;
        }
        const inputText = calcShowText(Rooms);
        this.setState(prevState => ({
            ...prevState,
            Rooms,
            inputText,
        }));
    }

    handleChange = (e, roomCount, target) => {
        const val = e.target.value;
        let Rooms = JSON.parse(JSON.stringify(this.state.Rooms));
        const newCount = Number(val);
        if (isNaN(newCount)) return;
        const {
            maxAdult,
            maxChild,
            minAdult
        } = this.state;
        let childLength = 0;
        if (target === 'AdultQty') {
            if (newCount > maxAdult) {
                Rooms[roomCount][target] = maxAdult;
                alert('最大人數為20人');
            } else {
                Rooms[roomCount][target] = newCount < minAdult ? 0 : newCount;
            }
        } else {
            Rooms[roomCount][target] = [];
            let t = Rooms[roomCount][target];
            childLength = newCount > maxChild ? maxChild : newCount;
            for (let i = 0; i < childLength; i++) {
                t.push(12);
            }
            Rooms[roomCount][target] = t;
            Rooms[roomCount].ChildQty = t.length;
        }
        const inputText = calcShowText(Rooms);
        this.setState(prevState => ({
            Rooms,
            inputText
        }));
    }
    handleBlur = (e, roomCount, target) => {
        const {
            minAdult
        } = this.state;
        let Rooms = JSON.parse(JSON.stringify(this.state.Rooms));

        if ((e.target.value / 1) === 0) {
            Rooms[roomCount][target] = minAdult;
            const inputText = calcShowText(Rooms);
            this.setState({
                Rooms,
                inputText
            });
        }
    }

    onChangeChildAge = (roomCount, target, targetIndex, value) => {
        const Rooms = JSON.parse(JSON.stringify(this.state.Rooms));
        const val = Number(value);
        Rooms[roomCount][target][targetIndex] = val;
        this.setState(prevState => ({
            ...prevState,
            Rooms,
        }));
    }


    render () {
        const {
            Rooms,
            maxAdult,
            maxChild
        } = this.state;

        return (
            <React.Fragment>
                <label className="hotel_roomList">
                    <select onChange={this.changeRoomCount} value={Rooms.length}>
                        {roomCount.map(e =>
                            <option
                                key={e.value}
                                value={e.value}
                            >
                                {e.text}
                            </option>
                        )}
                    </select>
                </label>
                {
                    Rooms.map((v, i) => (
                        <RoomLitSection
                            key={i}
                            roomCount={i}
                            AdultQty={v.AdultQty}
                            ChildAges={v.ChildAges}
                            maxAdult={maxAdult}
                            maxChild={maxChild}
                            onClickAdd={this.onClickAdd} // 點選增加人數
                            onClickMinus={this.onClickMinus} // 點選減少人數
                            onInputChange={this.handleChange} // 手動輸入人數
                            onInputBlur={this.handleBlur}
                            onChangeChildAge={this.onChangeChildAge} // 小孩年齡change
                        />
                    ))
                }
                <p style={{ color: '#24a07d' }}>※單次訂購提供相同房型，相同房型不同入住人數依選購的專案售價。</p>
            </React.Fragment>
        );
    }
}

export default RoomPageContent;