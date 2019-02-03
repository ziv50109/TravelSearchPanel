import React, { PureComponent } from 'react';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import ActRajx from '../../../../magaele/act_rajx';
import { ClickOutSide } from '../../../../utils';
import {
    CloseButton,
} from '../common';

class KeyWordInput extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            inputText: '',
            actRules: [{
                title: 'only',
            }],
            searchTimeGap: 500, // 在0.5秒內的輸入都不會發fetch
            fetchData: [],
            isSearch: false,
            showAct: false,
            selectedData: {
                fthotel: '',
            },
        };
        // 任務隊列
        this.taskQueue = null;
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState !== this.state) {
            this.props.onChange(this.state);
        }
        if (prevProps.Keywords !== this.props.Keywords) {
            this.updateKeywords(this.props.Keywords);
        }
    }

    updateKeywords = (inputText) => {
        this.setState({ inputText });
        const searchTimeGap = this.state.searchTimeGap;
        // 若已經有任務了 就取消
        if (typeof this.taskQueue === 'function') this.taskQueue.cancel();
        const throttled = throttle(this.callKeyWordAPI, searchTimeGap, { 'leading': false });
        this.taskQueue = throttled;
        this.setState(prevState => ({
            inputText,
        }), throttled);
    }

    callKeyWordAPI () {
        const {
            Destination,
        } = this.props;
        const {
            inputText,
        } = this.state;

        // 輸入兩個字以上才搜尋
        if (inputText.length < 2) return;

        const splitDest = Destination.split('_');
        const DestinationSearch = splitDest.length > 1 ? [splitDest[0], splitDest[1]].join('_') : '';

        // call API
        fetch(vacationPersonal.keyword, {
            method: 'POST',
            body: `Destination=${DestinationSearch}&sKeyWord=${inputText}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
            .then(r => r.json())
            .then(data => {
                const fetchData = data.map(v => {
                    v.level2 = 'only';
                    v.txt = v.label;
                    v.level3 = v.value;
                    delete v.label;
                    delete v.value;
                    return v;
                });
                this.setState(prevState => ({
                    fetchData,
                    isSearch: false,
                }));
            })
            .catch(err => {
                console.log('err', err);
            });
    }

    onClearInputValue = () => {
        this.setState(prevState => ({
            inputText: '',
            selectedData: {
                fthotel: '',
            },
            fetchData: [],
        }));
    }

    onClickInput = () => {
        this.setState(prevState => ({
            showAct: true,
        }));
    }

    onInputChange = (e) => {
        const inputText = e.target.value;
        const searchTimeGap = this.state.searchTimeGap;
        // 若已經有任務了 就取消
        if (typeof this.taskQueue === 'function') this.taskQueue.cancel();
        const throttled = throttle(this.callKeyWordAPI, searchTimeGap, { 'leading': false });
        this.taskQueue = throttled;
        this.setState(prevState => ({
            inputText,
            isSearch: inputText.length >= 2,
            showAct: true,
            selectedData: {
                fthotel: '',
            },
        }), throttled);
    }

    onClickAct = (data) => {
        const {
            txt: inputText,
        } = data;

        this.setState(prevState => ({
            inputText,
            selectedData: data,
            showAct: false,
        }));
    }

    closMenu = () => {
        this.setState(prevState => ({
            showAct: false,
        }));
    }

    render () {
        const {
            inputText,
            actRules,
            fetchData,
            isSearch,
            showAct,
        } = this.state;

        const act_wrap_classes = cx('act_wrap_container', {
            'd-no': !showAct,
        });

        return (
            <ClickOutSide onClickOutside={this.closMenu}>
                <div className="input_compose keywords">
                    <IntRcln
                        placeholder="請輸入產品名稱、飯店名稱或關鍵字"
                        label="關鍵字"
                        breakline
                        className="m-b-sm"
                        value={inputText}
                        onChange={this.onInputChange}
                        onClick={this.onClickInput}
                        onClearValue={this.onClearInputValue}
                    />
                    <div className={act_wrap_classes}>
                        <CloseButton onClick={this.closMenu} />
                        {
                            isSearch ?
                                (
                                    <p className="searching">資料搜尋中...</p>
                                ) :
                                (
                                    <ActRajx
                                        titleClass="d-no"
                                        data={fetchData}
                                        matchWord={inputText}
                                        getItemClickValue={this.onClickAct}
                                        noMatchText="很抱歉，找不到符合的項目"
                                        minimumStringQuery="請至少輸入兩個字"
                                        minimumStringQueryLength={2}
                                        footer={false}
                                        rules={actRules}
                                    />
                                )
                        }
                    </div>
                </div>
            </ClickOutSide>
        );
    }
}

export default KeyWordInput;