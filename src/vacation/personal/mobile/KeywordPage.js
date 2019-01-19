import React, { PureComponent } from 'react';
import throttle from 'lodash/throttle';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import ActRajx from '../../../../magaele/act_rajx';

class Page extends PureComponent {
    state = {
        inputText: '',
        actRules: [{
            title: 'only',
        }],
        searchTimeGap: 500, // 在0.5秒內的輸入都不會發fetch
        fetchData: [],
        isSearch: false,
        selectedData: {
            fthotel: '',
        },
    };
    // 任務隊列
    taskQueue = null;

    callKeyWordAPI () {
        const {
            Destination,
        } = this.props;
        const {
            inputText
        } = this.state;

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

    onInputChange = (e) => {
        const inputText = e.target.value;
        const searchTimeGap = this.state.searchTimeGap;
        // 若已經有任務了 就取消
        if (typeof this.taskQueue === 'function') this.taskQueue.cancel();
        const throttled = throttle(this.callKeyWordAPI, searchTimeGap, { 'leading': false });
        this.taskQueue = throttled;
        this.setState(prevState => ({
            inputText,
            isSearch: true,
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
        }));
    }

    render () {
        const {
            inputText,
            actRules,
            fetchData,
            isSearch,
        } = this.state;

        const {
            onClickConfirm,
        } = this.props;

        return (
            <div className="vacation_personal_mobile nvb_content">
                <header>
                    <h3 className="txt-center page_title">關鍵字</h3>
                    <div className="search_input">
                        <IntRcln
                            placeholder="請輸入產品名稱、飯店名稱或關鍵字"
                            value={inputText}
                            color="blue"
                            onChange={this.onInputChange}
                            onClearValue={this.onClearInputValue}
                        />
                        <BtRcnb radius whenClick={() => {
                            onClickConfirm(this.state);
                        }}>
                            確定
                        </BtRcnb>
                    </div>
                </header>
                <div className="page_content">
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
        );
    }
}

export default Page;