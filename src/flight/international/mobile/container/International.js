import React, { Component } from 'react';
import { flightInternational } from '../../../../../source.config';
import IcRcln from '../../../../../magaele/ic_rcln';
import IntRcln from '../../../../../magaele/int_rcln';
import StRnls from '../../../../../magaele/st_rnls';
import StRcln from '../../../../../magaele/st_rcln';
import CrRcln from '../../../../../magaele/cr_rcln';
import ClpRcdp from '../../../../../magaele/clp_rcdp';
import BtRcnb from '../../../../../magaele/bt_rcnb';
import today from 'dayjs';
import PlaceChange from '../components/doublePlaceM';
import SingleCalendar from '../components/singleCalendar';
import DoubleCalendar from '../components/doubleCalendar';
import FlightTransfer from '../components/flightTransfer';
import PeopleNumAdd from '../components/peopleNumAdd';

class International extends Component {
    constructor (props) {
        super(props);
        this.state = {
            // 月曆
            selectedStartDate: '', // 去程
            selectedEndDate: '',   // 回程
            showCalendar: false,
            activeInput: null,

            // 人數、艙等
            clstypeText: '',
            clstype: 0,
            totalNum: 1,

            // 多目的地
            multiItems: [
                {
                    id: 1,
                    startDate: today().format('YYYY-MM-DD'),
                    selectedStartDate: '',
                    showCalendar: false,

                    nvbOpen1: false,
                    nvbOpen2: false,
                    selectDate1: [],
                    selectDate2: [],
                    dptSelectDate: [],
                    dtnSelectDate: [],
                }
            ],

            // 出發地、目的地
            nvbOpen1: false,
            nvbOpen2: false,
            selectDate1: [],
            selectDate2: [],
            dptSelectDate: [],
            dtnSelectDate: [],
        };
        this.ClsTypeLevel = [
            { text: '不限', value: 0 },
            { text: '經濟艙', value: 1 },
            { text: '豪華經濟艙', value: 2 },
            { text: '商務艙', value: 3 },
            { text: '頭等艙', value: 4 }
        ];
        this.cheapFlightOptions = [
            { text: '不限', value: 1 },
            { text: '只要廉價航空', value: 2 },
            { text: '排除廉價航空', value: 3 }
        ];
        this.fetchPath = flightInternational.place;
    }

    componentDidMount () {
        const { multiItems } = this.state;
        this.props.setDepDateItems('multiItems', multiItems);
    }

    // 雙月曆
    dcConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;

        if (this.props.setDepdate1) {
            this.props.setDepdate1('depdate1', selectedStartDate);
        }

        if (this.props.setDepdate2) {
            this.props.setDepdate1('depdate2', selectedEndDate);
        }

        this.setState({
            selectedStartDate,
            selectedEndDate,
            activeInput: null,
        });
    }

    // 艙等
    setCabin = (val) => {
        let numVal = Number(val);
        if (this.props.setClstype) {
            this.props.setClstype('clstype', val);
        }
        this.setState({ clstype: numVal, clstypeText: this.ClsTypeLevel[val].text });
    }

    // 比較日期大小
    compare = (compareVal) => {
        const { multiItems } = this.state;
        let arr = [...multiItems];
        let maxDate = ''; // 設一個最大變數
        const compareReplace = compareVal.replace(/\-/g, '/');
        const compared = Date.parse(compareReplace).valueOf();
        for (let i = 0; i < arr.length; i++) {
            const itemsReplace = arr[i].selectedStartDate.replace(/\-/g, '/');
            const itemsDate = Date.parse(itemsReplace).valueOf();
            if (itemsDate >= compared) {
                maxDate = arr[i].selectedStartDate;
            } else {
                maxDate = compareVal;
            }
        }
        return maxDate; // 跟陣列比大小
    }

    // 增加
    addItem = () => {
        const { multiItems } = this.state;
        let arr = [...multiItems];
        let newId = Math.floor(Math.random() * 500);
        const maxDate = this.compare(arr[0].selectedStartDate); // 比較日期大小
        // 超過 4 個時不能再新增了
        if (arr.length >= 5) {
            return false;
        } else {
            arr.push({
                id: newId,
                startDate: maxDate,
                selectedStartDate: maxDate,
                showCalendar: false,

                nvbOpen1: false,
                nvbOpen2: false,
                selectDate1: [],
                selectDate2: [],
                dptSelectDate: [],
                dtnSelectDate: [],
            });
        }
        if (this.props.setDepDateItems) {
            this.props.setDepDateItems('multiItems', arr);
        }
        this.setState({ multiItems: arr });
    }

    // 刪除
    minusItem = (nowId) => {
        const { multiItems } = this.state;
        const newArr = multiItems.filter((item) => {
            if (nowId === item.id) {
                return false;
            } else {
                return true;
            }
        });

        if (this.props.setDepDateItems) {
            this.props.setDepDateItems('multiItems', newArr);
        }
        this.setState({ multiItems: newArr });
    }

    // 轉換格式
    transform (val) {
        const replaceVal = val.replace(/\-/g, '/');
        const transform = Date.parse(replaceVal).valueOf();
        return transform;
    }

    // 單月曆 checkDate
    handleConfirm = () => {
        const {
            selectedStartDate,
        } = this.calendar.state;

        const { multiItems } = this.state;
        const arr = multiItems;

        arr.forEach(ele => {
            ele.startDate = selectedStartDate;
            ele.selectedStartDate = this.compare(selectedStartDate);
        });

        this.setState({
            selectedStartDate,
            showCalendar: false,
            multiItems: arr
        });

        if (this.props.setDepdate1) {
            this.props.setDepdate1('depdate1', selectedStartDate);
        }
    }

    nowDateCompareOther (nowIndex, date) { // 目前點到的 Date 去比較全部
        const {
            selectedStartDate,
        } = this.calendar.state;
        const { multiItems } = this.state;
        const nowDate = this.transform(date); // 現在點擊去程日期跟裡面所有跟陣列比較

        let changeDate = '';
        for (let i = nowIndex + 1; i < multiItems.length; i++) {
            const itemsDate = this.transform(multiItems[i].selectedStartDate);
            if (nowDate >= itemsDate) {
                changeDate = multiItems[i].selectedStartDate;
                this.updateState('selectedStartDate', selectedStartDate, multiItems[i].id);
            } else {
                changeDate = multiItems[nowIndex].selectedStartDate;
                this.updateState('startDate', changeDate, multiItems[i].id);
            }
        }
    }

    // item 確定日期
    itemConfirmDate = (nowId, nowIndex) => {
        const {
            selectedStartDate,
        } = this.calendar.state;
        const { multiItems } = this.state;

        this.updateState('selectedStartDate', selectedStartDate, nowId);
        this.updateState('showCalendar', false, nowId);

        if (typeof multiItems[nowIndex + 1] === 'undefined') { // 點擊最後一個時
            return;
        } else {
            this.updateState('startDate', multiItems[nowIndex].selectedStartDate, multiItems[nowIndex + 1].id);
        }

        this.nowDateCompareOther(nowIndex, multiItems[nowIndex].selectedStartDate);
    }

    updateState = (key, val, nowId) => {
        const { multiItems } = this.state;
        if (typeof nowId === 'undefined') { // 假如有傳 id 就更新 陣列
            this.setState({ [key]: val });
        } else {
            for (let i in multiItems) {
                if (multiItems[i].id === nowId) {
                    multiItems[i][key] = val;
                    break;
                }
            }
            if (this.props.setDepDateItems) {
                this.props.setDepDateItems('multiItems', multiItems);
            }
            this.setState({ multiItems });
        }
    }

    placeChange = (data, keyword, datakey, selectKey, openKey, nowId) => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        if (typeof nowId === 'undefined') {
            if (selectKey === 'selectDate1') {
                this.props.setPlace('departure', arr);
            } else if (selectKey === 'selectDate2') {
                this.props.setPlace('destination', arr);
            }
            this.setState({
                [datakey]: arr.length ? keyword : '',
                [selectKey]: arr,
                [openKey]: false
            });
        } else {
            this.updateState(datakey, arr.length ? keyword : '', nowId);
            this.updateState(selectKey, arr, nowId);
            this.updateState(openKey, false, nowId);
        }
    }

    switch = () => {
        const { selectDate1, selectDate2, dptSelectDate, dtnSelectDate } = this.state;

        const obj1 = JSON.parse(JSON.stringify(selectDate2));
        const obj2 = JSON.parse(JSON.stringify(selectDate1));

        const text1 = dtnSelectDate;
        const text2 = dptSelectDate;

        this.props.setPlace('departure', obj1);
        this.props.setPlace('destination', obj2);

        this.setState({
            selectDate1: obj1,
            selectDate2: obj2,

            dptSelectDate: text1,
            dtnSelectDate: text2
        });
    }

    multiSwitch = (nowId) => {
        const { multiItems } = this.state;
        for (let i in multiItems) {
            if (multiItems[i].id === nowId) {
                const obj1 = JSON.parse(JSON.stringify(multiItems[i].selectDate2));
                const obj2 = JSON.parse(JSON.stringify(multiItems[i].selectDate1));

                const text1 = multiItems[i].dtnSelectDate;
                const text2 = multiItems[i].dptSelectDate;

                multiItems[i].selectDate1 = obj1;
                multiItems[i].selectDate2 = obj2;
                multiItems[i].dptSelectDate = text1;
                multiItems[i].dtnSelectDate = text2;
                break;
            }
        }
        if (this.props.setDepDateItems) {
            this.props.setDepDateItems('multiItems', multiItems);
        }
        this.setState({ multiItems });
    }

    render () {
        const {
            selectedStartDate, // 去程日期
            selectedEndDate,
            showCalendar,
            clstype,
            clstypeText,
            totalNum,
            activeInput,
            multiItems,
            dptSelectDate,
            dtnSelectDate,
            selectDate1,
            selectDate2,
            nvbOpen1,
            nvbOpen2
        } = this.state;

        const { rtow } = this.props;
        const changeStyle = rtow === 3 ? 'threeStyle show' : null;
        const isShow = rtow === 3 ? ' show' : ' hide';
        const doubleisShow = rtow === 1 ? 'show' : 'hide';
        const singleisShow = rtow === 0 || rtow === 3 ? 'show' : 'hide';

        return (
            <React.Fragment>
                {/* 出發地、目的地 */}
                <div className={changeStyle}>
                    <PlaceChange
                        customClass={'doubleChangeStyle'}
                        value1={dptSelectDate || ''}
                        value2={dtnSelectDate || ''}
                        nvbOpen1={() => this.updateState('nvbOpen1', true)}
                        nvbOpen2={() => this.updateState('nvbOpen2', true)}
                        nvbClose1={() => this.updateState('nvbOpen1', false)}
                        nvbClose2={() => this.updateState('nvbOpen2', false)}
                        switch={this.switch}
                        visible1={nvbOpen1}
                        visible2={nvbOpen2}
                        selectDate1={selectDate1}
                        selectDate2={selectDate2}
                        onChange1={
                            (data, keyword) => this.placeChange(data, keyword, 'dptSelectDate', 'selectDate1', 'nvbOpen1')
                        }
                        onChange2={
                            (data, keyword) => this.placeChange(data, keyword, 'dtnSelectDate', 'selectDate2', 'nvbOpen2')
                        }
                    />

                    {/* 去程日期 */}
                    <div className={singleisShow}>
                        <SingleCalendar
                            customClass={'singleCalendar'}
                            dateVal={selectedStartDate}
                            visible={showCalendar}
                            calendarRef={e => { this.calendar = e }}
                            nvbOpen={() => this.updateState('showCalendar', true)}
                            nvbClose={() => this.updateState('showCalendar', false)}
                            confirmDate={this.handleConfirm}
                        />
                    </div>
                </div>

                {/* 去程回程 */}
                <div className={doubleisShow}>
                    <DoubleCalendar
                        customClass={'doubleCalendar'}
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        activeInput={activeInput}
                        calendarRef={e => { this.calendar = e }}
                        nvbOpen1={() => this.updateState('activeInput', 0)}
                        nvbOpen2={() => this.updateState('activeInput', 1)}
                        nvbClose={() => this.updateState('activeInput', null)}
                        confirmDate={this.dcConfirm}
                    />
                </div>

                {/* 多目的地 Append 出來的 Item */}
                {multiItems.map((item, i) =>
                    <div key={i} className={changeStyle + isShow}>
                        <PlaceChange
                            customClass={'doubleChangeStyle'}
                            value1={item.dptSelectDate || ''}
                            value2={item.dtnSelectDate || ''}
                            nvbOpen1={() => this.updateState('nvbOpen1', true, item.id)}
                            nvbOpen2={() => this.updateState('nvbOpen2', true, item.id)}
                            nvbClose1={() => this.updateState('nvbOpen1', false, item.id)}
                            nvbClose2={() => this.updateState('nvbOpen2', false, item.id)}
                            switch={() => this.multiSwitch(item.id)}
                            visible1={item.nvbOpen1}
                            visible2={item.nvbOpen2}
                            selectDate1={item.selectDate1}
                            selectDate2={item.selectDate2}
                            onChange1={
                                (data, keyword) => this.placeChange(data, keyword, 'dptSelectDate', 'selectDate1', 'nvbOpen1', item.id)
                            }
                            onChange2={
                                (data, keyword) => this.placeChange(data, keyword, 'dtnSelectDate', 'selectDate2', 'nvbOpen2', item.id)
                            }
                        />

                        {/* 去程日期 */}
                        <div className="haveMinus">
                            <SingleCalendar
                                customClass={'singleCalendar'}
                                dateVal={item.selectedStartDate}
                                startDate={item.startDate}
                                visible={item.showCalendar}
                                calendarRef={e => { this.calendar = e }}
                                nvbOpen={() => this.updateState('showCalendar', true, item.id)}
                                nvbClose={() => this.updateState('showCalendar', false, item.id)}
                                confirmDate={() => this.itemConfirmDate(item.id, i)}
                            />

                            {/* 減少 */}
                            {i !== 0 && (
                                <BtRcnb
                                    prop="string"
                                    className="minus-items mulitMinus"
                                    whenClick={() =>
                                        this.minusItem(item.id)
                                    }
                                >
                                    <IcRcln name="toolcancelb" size="x15" />
                                </BtRcnb>
                            )}
                        </div>
                    </div>
                )}

                {/* 增加 */}
                {multiItems.length !== 5 && (
                    <div className={isShow}>
                        <BtRcnb
                            prop="string"
                            className="add-items mulitAdd"
                            whenClick={this.addItem}
                        >
                            <IcRcln name="tooladdb" size="x15" /> 增加航段
                        </BtRcnb>
                    </div>
                )}

                {/* 人數 / 艙等 */}
                <StRnls
                    CustomComponent={
                        <IntRcln
                            request
                            value={`共${totalNum}人，${clstypeText}`}
                            label="人數/艙等"
                            icon={<IcRcln name="toolmember" />}
                            readOnly
                        />
                    }
                    ContentComponent={
                        <div className="flight_international_mobile peopleCabinStyle">
                            <StRcln
                                option={this.ClsTypeLevel}
                                placeholder="請選擇"
                                label="艙等："
                                onChangeCallBack={val =>
                                    this.setCabin(Number(val))
                                }
                                defaultValue={clstype}
                            />
                            <PeopleNumAdd
                                setTotalPeople={(val) => this.setState(val)}
                                setAdt={this.props.setAdt}
                                setChd={this.props.setChd}
                                setInf={this.props.setInf}
                            />
                            <div className="con-tooltip">
                                大人：以出發日為準，年滿12歲(含)以上。
                                <br />
                                孩童：全程搭乘日為準，年滿2歲(含)以上，未滿12歲。
                                <br />
                                嬰兒：全程搭乘日為準，未滿2歲(不列入幾人成行的人數計算)。
                                <br />
                            </div>
                        </div>
                    }
                    moduleClassName="StRnls1 peopleCabin"
                    appendToBody
                    width="100%"
                    innerComponentClass={['outClass']}
                />

                {/* 直飛、只有找機位 */}
                <div className="checkBoxContainer">
                    <CrRcln
                        type="checkbox"
                        textContent="直飛(含中停)"
                        whenChange={e => this.props.setNoTrans('notrans', e ? 'T' : 'F')}
                    />
                    <CrRcln
                        className="checkBoxMagin"
                        type="checkbox"
                        textContent="只找有機位"
                        whenChange={e => this.props.setHaveSeat('haveseat', e ? 1 : 2)}
                    />
                </div>

                {/* 更多搜尋 */}
                <ClpRcdp
                    titleText="更多搜尋選項"
                    ContentComponent={
                        <React.Fragment>
                            <div className="searchMoreTop">
                                {/* 排除轉機國家 */}
                                <FlightTransfer
                                    customClass={'flightTransfer'}
                                    fetchPath={this.fetchPath}
                                    setNonprefertrans={this.props.setNonprefertrans}
                                />
                                <StRcln
                                    ClassName="aviation"
                                    option={this.cheapFlightOptions}
                                    placeholder="請選擇"
                                    label="廉價航空"
                                    breakline
                                    onChangeCallBack={e =>
                                        this.props.setSourceSystem('sourcesystem', e)
                                    }
                                    defaultValue={1}
                                />
                            </div>
                            <CrRcln
                                className="checkBoxMagin"
                                type="checkbox"
                                textContent="排除過夜轉機航班"
                                whenChange={e =>
                                    this.props.setNonprefertransnight(
                                        'nonprefertransnight', e ? 'T' : 'F'
                                    )
                                }
                            />
                        </React.Fragment>
                    }
                    moduleClassName="openMoreOptions"
                    isRightLeft={{
                        destination: 'right',
                        name: 'toolnext'
                    }}
                />

                {/* 搜尋 */}
                <BtRcnb
                    prop="string"
                    className="lg submitBtn"
                    whenClick={this.props.submit}
                >
                搜尋
                </BtRcnb>

            </React.Fragment>
        );
    }
}

export default International;