import React, { PureComponent } from 'react';
import throttle from 'lodash/throttle';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import ActRajx from '../../../../magaele/act_rajx';
import NvbRslb from '../../../../magaele/nvb_rslb';
import IcRcln from '../../../../magaele/ic_rcln';

class KeywordPlaceM extends PureComponent {
    state = {
        inputText: '',
        inputText1: '', // 實際在頁面上的字
        actRules: [
            {
                title: 'only'
            }
        ],
        searchTimeGap: 500, // 在0.5秒內的輸入都不會發fetch
        fetchData: [],
        isSearch: false,
        selectedData: {
            fthotel: ''
        },
        visible: false
    };

    componentDidMount () {
        this.getHighestZIndex();
        this.handlePropsKeyword();
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.Destination !== this.props.Destination) {
            this.onClearInputValue();
            this.props.setPanelState({ fthotel: '' });
        }
    }

    handlePropsKeyword () {
        const obj = {
            target: {
                value: this.props.Keywords
            }
        };
        this.props.Keywords && this.onInputChange(obj);
        this.setState({ showAct: false, inputText1: this.props.Keywords });
    }

    calendar = null;

    // 取得最高 zindex
    getHighestZIndex () {
        let highestZIndex = 0;
        let currentZIndex = 0;
        let nodes = document.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
            currentZIndex = Number(window.getComputedStyle(nodes[i]).zIndex);
            if (currentZIndex > highestZIndex) {
                highestZIndex = currentZIndex;
            }
        }
        this.setState({ zIndex: highestZIndex + 1 });
    }

    // 任務隊列
    taskQueue = null;

    callKeyWordAPI () {
        const { Destination } = this.props;
        const { inputText } = this.state;

        const splitDest = Destination.split('_');
        // const DestinationSearch =
        //     splitDest.length > 1 ? [splitDest[0], splitDest[1]].join('_') : '';

        // call API
        fetch(vacationPersonal.keyword, {
            method: 'POST',
            body: `Destination=${Destination}&sKeyWord=${inputText}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
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
                    isSearch: false
                }));
            })
            .catch(err => {
                console.log('err', err);
            });
    }

    onClearInputValue = () => {
        this.setState({
            inputText: '',
            selectedData: {
                fthotel: ''
            },
            fetchData: []
        });
    };

    onInputChange = e => {
        const inputText = e.target.value;
        const searchTimeGap = this.state.searchTimeGap;
        // 若已經有任務了 就取消
        if (typeof this.taskQueue === 'function') this.taskQueue.cancel();
        const throttled = throttle(this.callKeyWordAPI, searchTimeGap, {
            leading: false
        });
        this.taskQueue = throttled;
        this.setState(
            prevState => ({
                inputText,
                isSearch: true,
                selectedData: {
                    fthotel: ''
                }
            }),
            throttled
        );
    };

    onClickAct = data => {
        const { txt: inputText } = data;
        this.setState(prevState => ({
            inputText,
            selectedData: data
        }));
    };

    showCalendar = () => {
        this.onClearInputValue();
        this.setState({ visible: !this.state.visible });
    };

    onClickConfirm = () => {
        this.setState({ inputText1: this.state.inputText });
        this.props.onClickConfirm && this.props.onClickConfirm(this.state);
        this.showCalendar();
    }

    render () {
        const {
            inputText,
            actRules,
            fetchData,
            isSearch,
            visible
        } = this.state;

        const { customClass } = this.props;

        return (
            <div className={customClass}>
                <IntRcln
                    placeholder="請輸入產品名稱、飯店名稱或關鍵字"
                    label="關鍵字"
                    breakline
                    readOnly
                    className="m-b-sm"
                    value={this.state.inputText1}
                    onClick={this.showCalendar}
                />
                <NvbRslb
                    visible={visible}
                    zIndex={this.state.zIndex}
                    direction="right"
                    className="confirmBtn_span_d-no"
                >
                    {visible && (
                        <div className="vacation_personal_mobile nvb_content">
                            <span
                                className="nvb_rslb_goBack"
                                onClick={this.showCalendar}
                            >
                                <IcRcln name="toolbefore" />
                            </span>
                            <header>
                                <h3 className="txt-center page_title">
                                    關鍵字
                                </h3>
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
                                        whenClick={
                                            this.onClickConfirm
                                        }
                                    >
                                        確定
                                    </BtRcnb>
                                </div>
                            </header>
                            <div className="page_content">
                                {isSearch ? (
                                    <p className="searching">資料搜尋中...</p>
                                ) : (
                                    this.props.Destination === '' ?
                                        (<p className="searching">請先輸入上方目的地條件</p>)
                                        :
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
                                )}
                            </div>
                        </div>
                    )}
                </NvbRslb>
            </div>
        );
    }
}

export default KeywordPlaceM;
