import React from 'react';
import IntGpct from '../../../magaele/int_gpct';

// 這支檔案放間數人數M版跟PC版共用的東西

// 從間數人數物件轉字串
function calcShowText (roomList) {
    // 間數
    const roomCount = roomList.length;
    let str = `共${roomCount}間，`;
    for (let i = 0; i < roomList.length; i++) {
        const a = roomList[i].adult; // 每間房大人人數
        const b = roomList[i].childrenWithBed.length; // 每間房小孩佔床人數
        const c = roomList[i].childrenNoBed.length; // 每間房小孩不佔床人數
        const total = a + b + c;
        str += `${total}、`;
    }
    str = str.replace(/\、$/g, '人');
    return str;
}

// 把roomList State轉換成自由行結果頁要接收的那種格式
function parseRoomListArray (roomList) {
    // 把roomList(間數人數總陣列)轉換成roomlist跟roomage兩個小陣列
    const roomlist = [];
    const roomage = [];

    roomList.forEach((item, index) => {
        // 成人-小孩佔床-小孩不佔床
        const {
            adult,
            childrenNoBed, // array
            childrenWithBed, // array
        } = item;
        const childBedNum = childrenWithBed.length; // 小孩佔床人數
        const childNoNum = childrenNoBed.length; // 小孩不佔床人數
        const str = `${adult}-${childBedNum}-${childNoNum}`;
        const ageList = [];

        if (childBedNum > 0) {
            ageList.push(childrenWithBed.join(';'));
        } else {
            ageList.push('');
        }

        if (childNoNum > 0) {
            ageList.push(childrenNoBed.join(';'));
        } else {
            ageList.push('');
        }

        roomage.push(ageList.join('-'));
        roomlist.push(str);
    });

    return [roomlist, roomage];
}

// 注意事項
const NoticeText = () => (
    <React.Fragment>
        <p className="txt_green m-b-none">一筆訂單總人數若超過8位，請分兩張單位訂購。</p>
        <p className="txt_green m-b-none">一位大人最多只能帶2名小孩或1名小孩+1名嬰兒</p>
        <p className="txt_green m-b-none">（小孩定義：年滿2歲(含)以上未滿12歲。嬰兒定義：未滿2歲。)</p>
    </React.Fragment>
);

const ChildrenAgeSelect = ({
    onchange,
    defaultValue
}) => (
    <label className="children_age_select">
        <select onChange={onchange} value={defaultValue}>
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
        onChange: onAgeChange,
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
                                onAgeChange(roomCount, target, i, e.target.value);
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
        adult,
        childrenWithBed,
        childrenNoBed,
        onClickAdd, // 點選增加人數
        onClickMinus, // 點選減少人數
        onChangeChildAge, // 小孩年齡change
    } = props;

    const childBedCount = childrenWithBed.length;
    const childNoBedCount = childrenNoBed.length;

    return (
        <section className="room_list_section">
            <h4 className="room_count_title">{`第${roomCount + 1}間`}</h4>
            <div className="room_list_row">
                <span className="row_title">成人</span>
                <IntGpct
                    max={8}
                    min={1}
                    count={adult}
                    btnClassMinus="ic_rcln toolcancelb"
                    btnClassAdd="ic_rcln tooladdb"
                    onClickAdd={() => { onClickAdd(roomCount, 'adult') }}
                    onClickMinus={() => { onClickMinus(roomCount, 'adult') }}
                />
            </div>
            <div className="child_row">
                <div className="room_list_row">
                    <div className="child_count_control">
                        <span className="row_title">小孩佔床</span>
                        <IntGpct
                            max={3}
                            min={0}
                            count={childBedCount}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            onClickAdd={() => { onClickAdd(roomCount, 'childrenWithBed') }}
                            onClickMinus={() => { onClickMinus(roomCount, 'childrenWithBed') }}
                        />
                    </div>
                    {
                        childBedCount > 0
                            ?
                            (
                                <ChildAgeSection
                                    ageArray={childrenWithBed}
                                    onChange={onChangeChildAge}
                                    roomCount={roomCount}
                                    target="childrenWithBed"
                                />
                            )
                            :
                            null
                    }
                </div>
                <div className="room_list_row">
                    <div className="child_count_control">
                        <span className="row_title">小孩不佔床</span>
                        <IntGpct
                            max={3}
                            min={0}
                            count={childNoBedCount}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            onClickAdd={() => { onClickAdd(roomCount, 'childrenNoBed') }}
                            onClickMinus={() => { onClickMinus(roomCount, 'childrenNoBed') }}
                        />
                    </div>
                    {
                        childNoBedCount > 0
                            ?
                            (
                                <ChildAgeSection
                                    ageArray={childrenNoBed}
                                    onChange={onChangeChildAge}
                                    roomCount={roomCount}
                                    target="childrenNoBed"
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

export {
    NoticeText,
    ChildrenAgeSelect,
    ChildAgeSection,
    RoomLitSection,
    calcShowText,
    parseRoomListArray,
};