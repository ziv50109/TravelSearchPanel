import React, { PureComponent } from 'react';
import cx from 'classnames';
import IntRcln from '../../../../magaele/int_rcln';
import DtmRcfr from '../../../../magaele/dtm_rcfr';
import ActRajx from '../../../../magaele/act_rajx';
import { ClickOutSide } from '../../../../utils';
import {
    transformFetchData,
    transformActFetchData,
    CloseButton,
} from '../common';

const dataMap = {};

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
            actAllData: !dataMap['./json/vacationdata.json'] ? null : dataMap['./json/vacationdata.json'], // 補字選單全部的資料
            dtmOrderMaps: {
                Line: ['6', '5', '7', '3', '1', '2', '4'],
            },
            actShowData: [], // 補字選單show的資料
            dataResouce: './json/vacationdata.json', // 快速選單跟補字選單的資料來源
            actRules: [{
                title: 'only',
            }]
        };
    }


    componentDidMount () {
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

    componentDidUpdate () {
        this.props.onChange(this.state);
    }

    filterActData (inputText) {
        const {
            actAllData,
        } = this.state;

        const matchStr = inputText.toUpperCase();
        const filterData = actAllData.filter(v => v.txt.indexOf(matchStr) !== -1);

        return filterData;
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

    // onClickAct = (data) => {
    //     const {
    //         txt: inputText,
    //     } = data;

    //     this.setState(prevState => ({
    //         inputText,
    //         dtmSelected: [],
    //         selectedData: [data],
    //         showAct: false,
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
                showAct: false
            }));
        } else {
            this.setState(prevState => ({
                Txt
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
            showAct: showAct,
            showDtm: !showAct,
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

        const dtm_wrap_classes = cx('wrap_container', {
            'd-no': !showDtm,
        });

        const act_wrap_classes = cx('act_wrap_container', {
            'd-no': !showAct,
        });

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
                        <DtmRcfr
                            levelKey={dtmLevelKey}
                            onClickItem={this.onClickDtm}
                            dataResouce={dataResouce}
                            transformFetchData={transformFetchData}
                            replaceRegular={/\([\w\s\)]+/g}
                            selectedData={dtmSelected}
                            orderMaps={dtmOrderMaps}
                        />
                    </div>
                    <div className={act_wrap_classes}>
                        <CloseButton onClick={this.closMenu} />
                        <ActRajx
                            titleClass={showAct ? '' : 'd-no'}
                            data={actShowData}
                            matchWord={inputText}
                            getItemClickValue={this.onClickDestnAct}
                            noMatchText="很抱歉，找不到符合的項目"
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