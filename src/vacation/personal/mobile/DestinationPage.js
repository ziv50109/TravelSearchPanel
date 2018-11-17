import React, { PureComponent } from 'react';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import ActRajx from '../../../../magaele/act_rajx';
import {
    transformFetchData,
    transformActFetchData,
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
            actAllData: !dataMap['./json/vacationdata.json'] ? null : dataMap['./json/vacationdata.json'], // 補字選單全部的資料
            actShowData: [], // 補字選單show的資料
            dataResouce: './json/vacationdata.json', // 快速選單跟補字選單的資料來源
            actRules: [{
                title: 'only',
            }],
            dtmOrderMaps: {
                Line: ['6', '5', '7', '3', '1', '2', '4'],
            },
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

    filterActData (inputText) {
        const {
            actAllData,
        } = this.state;

        const matchStr = inputText.toUpperCase();
        const filterData = actAllData.filter(v => v.txt.indexOf(matchStr) !== -1);

        return filterData;
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
        const inputText = e.target.value;
        const showAct = inputText.length > 0;
        const actShowData = showAct ? this.filterActData(inputText) : [];

        this.setState(prevState => ({
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
            dtmOrderMaps,
        } = this.state;

        const {
            onClickConfirm, className
        } = this.props;
        return (
            <div className={`nvb_content dtmPage ${className}`}>
                <header>
                    <h3 className="txt-center page_title">目的地</h3>
                    <div className="search_input">
                        <IntRcln
                            placeholder="請選擇"
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
                            noMatchText="很抱歉，找不到符合的項目"
                            minimumStringQueryLength={1}
                            footer={false}
                            rules={actRules}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Page;