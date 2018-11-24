import React, { PureComponent } from 'react';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import ActRajx from '../../../../magaele/act_rajx';
import {
    transformFetchData,
    transformActFetchData, transformArpData, transformRawProductData
} from '../common';

const dataMap = {};
class Page extends PureComponent {
    constructor (props) {
        super();
        this.state = {
            inputText: '',
            selectedData: [],
            dtmLevelKey: ['Line', 'Country', 'City'],
            dtmSelected: [],
            showAct: false, // 顯示補字選單
            showDtm: true, // 顯示快速選單
            actAllData: !dataMap[vacationPersonal.destination] ? null : dataMap[vacationPersonal.destination], // 補字選單全部的資料
            actShowData: [], // 補字選單show的資料
            dataResouce: vacationPersonal.destination, // 快速選單跟補字選單的資料來源
            airportData: [], // 補字選單機場資料區
            anotherData: [], // 補字選單第二資料區
            noMatchText: '很抱歉，找不到符合的項目，馬上為您搜尋其他資訊',
            noMatchTextCollection: '很抱歉，找不到符合的項目。.很抱歉，找不到符合的項目，馬上為您搜尋其他資訊',
            actRules: [{
                title: 'only',
            }],
            dtmOrderMaps: {
                Line: ['6', '5', '7', '3', '1', '2', '4'],
            },
            anotherAPI: vacationPersonal.destinationAutoComplete, // 第二資料源 (2018/11/21 新增需求，城市/機場皆無資料則使用此 API)
            airportSource: './json/UNRELEASED_AIRPORT_DATA.json', // 補字選單機場資料來源 (2018/11/21 新增需求，分類增加城市/機場)


        };
    }


    componentDidMount () {
        console.log('ididmount');
        const {
            dataResouce,
            actAllData,
        } = this.state;

        if (actAllData !== null) return;

        fetch(dataResouce)
            .then(r => r.json())
            .then(data => {
                const dataArr = transformActFetchData(data);
                // 把資料cache起來
                dataMap[dataResouce] = dataArr;
                this.setState(prevState => ({
                    actAllData: dataArr,
                }));
            });
    }
    getAirportData (inputText) {
        console.log('---getAirportData');
        const { airportSource, actShowData, noMatchTextCollection, actRules } = this.state;
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
                    if (actRules.length && data) {
                        data.Airport.map((item, index) => {
                            item.level2 = actRules[0].title;
                            console.log(item.level2);
                        });
                    }
                    arr = data && this.filterData(transformArpData(data), inputText);

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
        const { anotherAPI, inputText, noMatchTextCollection, actRules } = this.state;
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
                if (actRules.length && data) {
                    console.log(data);
                    data.Destinations.map((item, index) => {
                        item.level2 = actRules[0].title;
                        console.log(item.level2);
                    });
                }
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
    filterActData (inputText) {
        const {
            actAllData,
        } = this.state;

        const matchStr = inputText.toUpperCase();
        const filterData = actAllData.filter(v => v.txt.indexOf(matchStr) !== -1);

        return filterData;
    }
    filterData (arrData, inputText) {
        let arr = [];
        if (arrData.length) {
            const matchStr = inputText.toUpperCase();
            arr = arrData.filter(v => v.txt.indexOf(matchStr) !== -1);
        }
        return arr;
    }
    onClickDtm = (data) => {
        const inputText = data.text;
        this.setState(prevState => ({
            inputText,
            selectedData: [data],
            dtmSelected: [data.value],
        }));
    }

    // onClickAct = (data) => {
    //     const {
    //         txt: inputText,
    //     } = data;

    //     this.setState(prevState => ({
    //         inputText,
    //         dtmSelected: [],
    //         selectedData: [data],
    //     }));
    // }

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
                Txt,
                dtmSelected: [data.value]
            }));
        }
    }
    onInputChange = (e) => {
        const { actAllData } = this.state;
        const inputText = e.target.value;
        const showAct = inputText.length > 0;
        const actShowData = showAct ? this.filterData(actAllData, inputText) : [];
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.getAirportData(inputText);
        }, 500);
        this.setState(prevState => ({
            ...prevState,
            inputText,
            selectedData: [],
            dtmSelected: [],
            actShowData,
            showAct: true,
            showDtm: false,
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
            dataResouce,
            actShowData,
            actRules,
            dtmOrderMaps, noMatchText
        } = this.state;

        const {
            onClickConfirm, className, placeholder
        } = this.props;
        console.log('---RENDER: ' + actShowData.length);
        console.log(actShowData);
        return (
            <div className={`nvb_content dtmPage ${className}`}>
                <header>
                    <h3 className="txt-center page_title">目的地</h3>
                    <div className="search_input">
                        <IntRcln
                            placeholder={placeholder}
                            value={inputText}
                            color="blue"
                            onChange={this.onInputChange}
                            onClearValue={this.onClearInputValue}
                        />
                        <BtRcnb
                            radius
                            whenClick={() => { onClickConfirm(this.state) }}
                        >
                            確定
                        </BtRcnb>
                    </div>
                    <p className="txt_green m-t-xs m-b-n">找不到選項？請輸入關鍵字查詢</p>
                </header>
                <div className="page_content">
                    {
                        showDtm && (
                            <DtmRcfr
                                levelKey={dtmLevelKey}
                                onClickItem={this.onClickDtm}
                                dataResouce={dataResouce}
                                transformFetchData={transformFetchData}
                                replaceRegular={/\([\w\s\)]+/g}
                                selectedData={dtmSelected}
                                orderMaps={dtmOrderMaps}
                            />
                        )
                    }
                    {
                        <ActRajx
                            containerClass={(showAct ? '' : 'd-no')}
                            isFocus={showAct}
                            titleClass={'d-no'}
                            data={actShowData}
                            matchWord={inputText}
                            getItemClickValue={this.onClickDestnAct}
                            noMatchText={noMatchText}
                            minimumStringQueryLength={1}
                            footer={false}
                            rules={actRules}

                            // catalogue={catalogueCallBack}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Page;