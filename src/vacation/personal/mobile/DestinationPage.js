import React, { PureComponent } from 'react';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import ActRajx from '../../../../magaele/act_rajx';
import { isJsonString } from '../../../../utils';
import {
    transformFetchData,
    transformActFetchData, transformRawProductData
} from '../common';

const Label = ({ text, removeData }) => {
    return (
        <p className="dtm_rcfr-selected" onClick={removeData}>
            <span title={text}>{text}</span>
            <i><svg viewBox="0 0 10 10"><use xlinkHref="#dtm_rcfr-x" /></svg></i>
        </p>
    );
};
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
            dtmData: {}, // 快速選單 fetch 回來的資料
            actAllData: [], // 補字選單全部的資料
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
        };
        this.maxLabel = 3;
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
        this.updateDtmData();
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.DestinationSelected !== this.props.DestinationSelected) {
            this.updateDtmData();
        }
    }
    updateDtmData = () => {
        const { DestinationSelected } = this.props;
        if (!DestinationSelected.length) return;
        this.setState({
            // inputText: DestinationSelected[0].text,
            selectedData: DestinationSelected,
            dtmSelected: DestinationSelected.map(e => e.value)
        });
    }
    // componentDidMount () {
    //     console.log('ididmount');
    //     const {
    //         dataResouce,
    //         actAllData, actRules
    //     } = this.state;

    //     if (actAllData !== null) return;

    //     fetch(dataResouce)
    //         .then(r => r.json())
    //         .then(data => {
    //             const dataArr = transformActFetchData(data);
    //             if (actRules.length) {
    //                 dataArr.map((item, index) => {
    //                     item.level2 = 'only';
    //                 });
    //             }
    //             // 把資料cache起來
    //             dataMap[dataResouce] = dataArr;
    //             this.setState(prevState => ({
    //                 actAllData: dataArr,
    //             }));
    //         });
    // }
    fetchDataToAct = (data) => {
        const {
            actRules
        } = this.state;
        const dataArr = transformActFetchData(data);
        if (actRules.length) {
            dataArr.map((item, index) => {
                item.level2 = 'only';
            });
        }
        this.setState(prevState => ({
            actAllData: dataArr,
        }));
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
        // console.log('**CALL ANOTHER:getRowProductData');
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
                    data.Destinations.map((item, index) => {
                        item.level2 = actRules[0].title;
                    });
                }
                arr = data && transformRawProductData(data);
                setTimeout(() => {
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
    // filterActData (inputText) {
    //     const {
    //         actAllData,
    //     } = this.state;

    //     const matchStr = inputText.toUpperCase();
    //     const filterData = actAllData.filter(v => v.txt.indexOf(matchStr) !== -1);

    //     return filterData;
    // }
    filterData (arrData, inputText) {
        let arr = [];
        if (arrData.length) {
            const matchStr = inputText.toUpperCase();
            arr = arrData.filter(v => v.txt.indexOf(matchStr) !== -1);
        }
        return arr;
    }
    onClickDtm = (data) => {
        const { selectedData } = this.state;
        const prevDtmSelected = selectedData.map(e => e.value);
        // 資料已存在就刪除
        if (selectedData.filter(e => e.value === data.value).length) {
            this.onClearInputValue(data);
            return;
        }
        // 最多選 3 個
        if (prevDtmSelected.length + 1 > this.maxLabel) return;

        this.setState(prevState => ({
            inputText: '',
            selectedData: [...prevState.selectedData, data],
            dtmSelected: [...prevDtmSelected, data.value],
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
        const { selectedData } = this.state;
        const {
            txt: Txt,
        } = data;
        const prevDtmSelected = selectedData.map(e => e.value);
        // 資料已存在就刪除
        if (selectedData.filter(e => e.value === data.value).length) {
            this.onClearInputValue(data);
            return;
        }
        // 最多選 3 個
        if (prevDtmSelected.length + 1 > this.maxLabel) return;
        if (str === 'choosed') {
            this.setState(prevState => ({
                Txt,
                inputText: '',
                selectedData: [...prevState.selectedData, data],
                dtmSelected: [...prevDtmSelected, data.value]
            }), () => {
                this.setState({ showAct: false, showDtm: true });
            });
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
        // clearTimeout(this.timer);
        // this.timer = setTimeout(() => {
        //     this.getAirportData(inputText);
        // }, 500);
        this.setState(prevState => ({
            ...prevState,
            inputText,
            actShowData,
            showAct: true,
            showDtm: false,
        }));
    }

    onClearInputValue = (data) => {
        const { selectedData, radio } = this.state;
        const newSelectedData = selectedData.filter(e => e.value !== data.value);
        const newDtmSelected = newSelectedData.map(e => e.value);
        let newRadio = radio;
        if (newSelectedData.length < 2) {
            newRadio = '';
        }
        this.setState(prevState => ({
            inputText: '',
            selectedData: newSelectedData,
            dtmSelected: newDtmSelected,
            radio: newRadio,
            showAct: false,
            showDtm: true,
        }));
    }

    render () {
        const {
            inputText,
            dtmLevelKey,
            dtmSelected,
            selectedData,
            showAct,
            showDtm,
            dtmData,
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
            <div className={`nvb_content dtmPage ${className} dtm_secTitle_ndec`}>
                <header>
                    <h3 className="txt-center page_title">目的地</h3>
                    <div className="search_input">
                        <div className="input_wrap">
                            <div className="label_wrap">
                                {selectedData.map((e, i) =>
                                    <Label
                                        key={e.value || i}
                                        text={e.text}
                                        removeData={() => this.onClearInputValue(e)}
                                    />
                                )}
                            </div>
                            {selectedData.length < this.maxLabel && (
                                <IntRcln
                                    ref={e => { this.destinationInput = e }}
                                    color="blue"
                                    placeholder={selectedData.length ? null : '請輸入國家/城市/機場'}
                                    onClick={this.onClickInput}
                                    onChange={this.onInputChange}
                                    value={inputText}
                                />
                            )}
                        </div>
                        <BtRcnb
                            radius
                            whenClick={() => { onClickConfirm(this.state) }}
                        >
                            確定
                        </BtRcnb>
                    </div>
                    <p className="txt_green m-t-xs m-b-n">找不到選項？請輸入關鍵字查詢/最多可選擇3則目的地</p>
                </header>
                <div className="page_content">
                    {
                        showDtm && Object.keys(dtmData).length && (
                            <DtmRcfr
                                levelKey={dtmLevelKey}
                                onClickItem={this.onClickDtm}
                                dataResouce={dtmData}
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