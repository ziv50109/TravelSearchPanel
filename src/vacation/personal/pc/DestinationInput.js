import React, { PureComponent } from 'react';
import cx from 'classnames';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import IcRcln from '../../../../magaele/ic_rcln';
import ActRajx from '../../../../magaele/act_rajx';
import { ClickOutSide, isJsonString } from '../../../../utils';
import {
    transformFetchData,
    transformActFetchData,
    CloseButton, transformRawProductData
} from '../common';

class DestinationInput extends PureComponent {
    constructor (props) {
        super();
        this.state = {
            inputText: props.inputText || '',
            selectedData: [],
            dtmLevelKey: ['Line', 'Country', 'City'],
            dtmSelected: [],
            showAct: false, // 顯示補字選單
            showDtm: false, // 顯示快速選單
            dtmData: {}, // 快速選單 fetch 回來的資料
            actAllData: [], // 補字選單全部的資料
            dtmOrderMaps: {
                Line: ['6', '5', '7', '3', '1', '2', '4'],
            },
            actShowData: [], // 補字選單show的資料
            airportData: [], // 補字選單機場資料區
            anotherData: [], // 補字選單第二資料區
            // airportSource: './json/UNRELEASED_AIRPORT_DATA.json', // 補字選單機場資料來源 (2018/11/21 新增需求，分類增加城市/機場)
            dataResouce: vacationPersonal.destination, // 快速選單跟補字選單的資料來源
            anotherAPI: vacationPersonal.destinationAutoComplete, // 第二資料源 (2018/11/21 新增需求，城市/機場皆無資料則使用此 API)
            noMatchText: '很抱歉，找不到符合的項目，馬上為您搜尋其他資訊',
            noMatchTextCollection: '很抱歉，找不到符合的項目。.很抱歉，找不到符合的項目，馬上為您搜尋其他資訊',

            actRules: [
                {
                    title: '城市',
                    icon: <IcRcln name="toolmapf" key={1} />
                },
                {
                    title: '機場',
                    icon: <IcRcln name="toolmapf" key={1} />

                }
            ]
        };
        this.timer = null;
    }

    componentDidMount () {
        const {
            dataResouce
        } = this.state;

        const sessionData = sessionStorage.getItem(dataResouce);
        if (sessionData && isJsonString(sessionData)) {
            const jsonData = JSON.parse(sessionData);
            console.log('has data: ', JSON.parse(jsonData));
            this.setState({
                dtmData: transformFetchData(JSON.parse(jsonData))
            });
            this.fetchDataToAct(jsonData);
        } else {
            fetch(dataResouce).then(r => r.json()).then(d => {
                let stringifyData = JSON.stringify(d);
                console.log('no data: ', d);
                this.setState({
                    dtmData: transformFetchData(JSON.parse(d))
                });

                this.fetchDataToAct(d);
                sessionStorage.setItem(dataResouce, stringifyData);
            });
        }
    }
    componentDidUpdate () {
        this.props.onChange(this.state);
    }
    fetchDataToAct = (data) => {
        const {
            actRules
        } = this.state;
        const dataArr = transformActFetchData(data);
        if (actRules.length) {
            dataArr.map((item, index) => {
                item.level2 = (item.level2 === 'only') ? actRules[0].title : item.level2;
            });
        }
        this.setState(prevState => ({
            actAllData: dataArr,
        }));
    }
    setData = (obj) => {
        this.setState(prevState => ({ ...prevState, obj }));
    }
    filterData (arrData, inputText) {
        let arr = [];
        if (arrData.length) {
            const matchStr = inputText.toUpperCase();
            arr = arrData.filter(v => v.txt.indexOf(matchStr) !== -1);
        }
        return arr;
    }
    fetchData (url, callback) {
        console.log('---FETCHDATA');
        let arr = [];
        if (url.length) {
            fetch(url)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) { return res.json() }
                    else {
                        const error = new Error(res.statusText);
                        error.response = res;
                        throw error;
                    }
                })
                .then(data => {
                    console.log(data);
                    arr = data;
                    callback && callback(arr);
                });
        }
        return arr;
    }
    getAirportData (inputText) {
        console.log('---getAirportData');
        const { airportSource, actShowData, noMatchTextCollection } = this.state;
        let arr = [];
        let arrMixData = [];
        const url = airportSource.indexOf('.json' !== -1) ?
            airportSource : (airportSource + '?keyWord=' + encodeURI(inputText));
        if (inputText) {
            fetch(url)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) { return res.json() }
                    else {
                        const error = new Error(res.statusText);
                        error.response = res;
                        throw error;
                    }
                })
                .then(data => {
                    // arr = data && this.filterData(transformArpData(data), inputText);
                    arr = this.filterData(this.transformData(data), inputText); // rel

                    if (arr.length) {
                        arrMixData = [...actShowData, ...arr];
                    }
                    if (!arrMixData.length) {
                        this.setState({
                            noMatchText: noMatchTextCollection.split('.')[1]
                        });
                        this.getRawProductData();
                    }
                    else {
                        this.setState(prevState => ({
                            ...prevState,
                            airportData: arr,       // 機場資料
                            actShowData: arrMixData // arrMixData:原城市+機場資料
                        }));
                    }
                });

        }
    }

    /**
     * 取得非套裝行程資料
     * 若目前第一回搜尋皆無資料 => call 非套裝行程 API
     */
    getRawProductData () {
        console.log('**CALL ANOTHER:getRowProductData');
        const { anotherAPI, inputText, noMatchTextCollection } = this.state;
        const url = `${anotherAPI}?keyWord=${inputText}`;
        let arr = [];
        fetch(url)
            .then(res => {
                if (res.status >= 200 && res.status < 300) { return res.json() }
                else {
                    const error = new Error(res.statusText);
                    error.response = res;
                    throw error;
                }
            })
            .then(data => {
                arr = data && transformRawProductData(data);
                setTimeout(() => {
                    console.log(arr);

                    if (arr.length) {
                        this.setState(prevState => ({
                            ...prevState,
                            anotherData: arr,       // 機場資料
                            actShowData: arr // arrMixData:原城市+機場資料
                        }));
                    }
                    else {

                        this.setState(prevState => ({
                            ...prevState,
                            noMatchText: noMatchTextCollection.split('.')[0],
                        }));
                    }
                }, 100);


            });
    }
    closMenu = () => {
        const {
            showAct,
            showDtm,
            selectedData,
        } = this.state;

        if (!showAct && !showDtm) return;

        // 如果沒點選就關選單
        if (!selectedData.length) {
            return this.setState(prevState => ({
                inputText: '',
                selectedData: [],
                showAct: false,
                showDtm: false,
            }));
        }

        this.setState(prevState => ({
            showAct: false,
            showDtm: false,
        }));
    }

    onClickInput = () => {
        const { dtmSelected, inputText } = this.state;
        inputText ? (
            dtmSelected.length ? (
                this.setState(prevState => ({
                    showAct: false, // 顯示補字選單
                    showDtm: true, // 顯示快速選單
                }))
            ) : (
                this.setState(prevState => ({
                    showAct: true, // 顯示補字選單
                    showDtm: false, // 顯示快速選單
                })))
        ) : (
            this.setState(prevState => ({
                showAct: false, // 顯示補字選單
                showDtm: true, // 顯示快速選單
            })));
    }

    onClickDtm = (data) => {
        const inputText = data.text;
        this.setState(prevState => ({
            inputText,
            selectedData: [data],
            dtmSelected: [data.value],
            showDtm: false,
        }));
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
                showAct: false
            }));
        } else {
            this.setState(prevState => ({
                Txt
            }));
        }
    }
    onInputChange = (e) => {
        const { actAllData } = this.state;

        const inputText = e.target.value;
        const showAct = inputText.length > 0;
        const actShowData = showAct ? this.filterData(actAllData, inputText) : [];

        /**
         * setTimeout 先讓城市資料 (actShowData) setState，再去拿機場資料並進行組裝
           若沒有 setTimeout，則到 getAirportData 時 state 不存在 actShowData，也無法產出組裝後的資料
           onInputChange -> setTimeout (故先往下執行 setState(actShowData) -> Render)
                         -> getAirportData + transformData (setState(actShowdData + airportData))
                         -> Render (城市 + 機場總資料)
         */
        // clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        //     this.getAirportData(inputText);
        // }, 500);
        this.setState(prevState => ({
            ...prevState,
            inputText,
            selectedData: [],
            dtmSelected: [],
            actShowData,
            showAct: showAct,
            showDtm: !showAct
        }));

    }

    onClearInputValue = () => {
        this.setState(prevState => ({
            inputText: '',
            selectedData: [],
            dtmSelected: [],
            showAct: false,
            showDtm: true,
        }));
    }
    render () {
        const {
            inputText,
            dtmLevelKey,
            dtmSelected,
            showAct,
            showDtm,
            dtmData,
            actShowData,
            noMatchText,
            actRules,
            dtmOrderMaps
        } = this.state;
        const dtm_wrap_classes = cx('wrap_container', {
            'd-no': !showDtm,
        });

        const act_wrap_classes = cx('act_wrap_container', {
            'd-no': !showAct,
        });
        console.log('---RENDER: ' + actShowData.length);
        // console.log(allData.length);
        return (
            <ClickOutSide onClickOutside={this.closMenu}>
                <div className="input_compose">
                    <IntRcln
                        placeholder="目的地"
                        label="目的地"
                        breakline
                        request
                        onClick={this.onClickInput}
                        onChange={this.onInputChange}
                        onClearValue={this.onClearInputValue}
                        value={inputText}
                    />
                    <div className={dtm_wrap_classes}>
                        <CloseButton onClick={this.closMenu} />
                        <p className="txt_green">找不到選項？請輸入關鍵字查詢</p>
                        {Object.keys(dtmData).length &&
                            <DtmRcfr
                                levelKey={dtmLevelKey}
                                onClickItem={this.onClickDtm}
                                dataResouce={dtmData}
                                transformFetchData={transformFetchData}
                                replaceRegular={/\([\w\s\)]+/g}
                                selectedData={dtmSelected}
                                orderMaps={dtmOrderMaps}
                            />
                        }
                    </div>
                    <div className={act_wrap_classes}>
                        <CloseButton onClick={this.closMenu} />
                        <ActRajx
                            titleClass={showAct ? '' : 'd-no'}
                            data={actShowData}
                            matchWord={inputText}
                            getItemClickValue={this.onClickDestnAct}
                            noMatchText={noMatchText}
                            minimumStringQueryLength={1}
                            footer={false}
                            isFocus={showAct}
                            rules={actRules}
                        />

                    </div>
                </div>
            </ClickOutSide>
        );
    }
}

export default DestinationInput;