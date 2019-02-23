import React, { PureComponent } from 'react';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import { vacationPersonal } from '../../../../source.config';
import IntRcln from '../../../../magaele/int_rcln';
import ActRajx from '../../../../magaele/act_rajx';
import { ClickOutSide } from '../../../../utils';
import {
    CloseButton,
} from '../../share/option';

class KeyWordInput extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            inputText: props.Keywords,
            actRules: [{
                title: '',
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

    componentDidMount () {
        const obj = {
            target: {
                value: this.props.Keywords
            }
        };
        // this.onInputChange(obj);
        // this.setState({ showAct: false });
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.Destination !== this.props.Destination) {
            this.onClearPanelVal();
        }
    }

    handleOpenMenuFocus = () => {
        this.setState({ showAct: true });
    };

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
        // const DestinationSearch = splitDest.length > 1 ? [splitDest[0], splitDest[1]].join('_') : '';

        // call API
        fetch(vacationPersonal.keyword, {
            method: 'POST',
            body: `Destination=${Destination}&sKeyWord=${inputText}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
            .then(r => r.json())
            .then(data => {
                const fetchData = data.map(v => {
                    v.level2 = '';
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

    onClearPanelVal = () => {
        this.setState({
            selectedData: {
                fthotel: '',
            },
            fetchData: [],
        }, this.props.setPanelState && this.props.setPanelState({ fthotel: '' }));
    }

    onClearInputValue = () => {
        this.setState(prevState => ({
            inputText: '',
            selectedData: {
                fthotel: '',
            },
            fetchData: [],
        }), this.setPanelState('', ''));
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
        if (!inputText) {
            this.onClearInputValue();
        }
    }

    setPanelState = (txt, fthotel) => {
        if (fthotel === '') {
            this.props.setPanelState && this.props.setPanelState({ Keywords: '', fthotel });
        } else {
            this.props.setPanelState && this.props.setPanelState({ Keywords: txt, fthotel });
        }

    }

    choosedData = (data) => {
        this.setState(prevState => ({
            inputText: data.txt,
            selectedData: data,
            showAct: false,
        }), this.setPanelState(data.txt, data.fthotel));
    }

    onClickAct = (data, str) => {
        const {
            txt: inputText,
        } = data;

        if (str === 'choosed') {
            this.choosedData(data);
            // this.setState(prevState => ({
            //     inputText,
            //     selectedData: data,
            //     showAct: false,
            // }), this.setPanelState(data.txt, data.fthotel));
        } else {
            this.setState({
                inputText,
            });
        }
    }

    closMenu = () => {
        const { fetchData, selectedData } = this.state;
        if (fetchData.length && selectedData.fthotel === '') {
            this.choosedData(fetchData[0]);
        }
        this.setState({
            showAct: false
        });
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
            <ClickOutSide className="labelSingle pc_Keyword" onClickOutside={this.closMenu}>
                <div className="input_compose">
                    <IntRcln
                        placeholder="請輸入產品名稱、飯店名稱或關鍵字"
                        label="關鍵字"
                        breakline
                        className="m-b-sm"
                        value={inputText}
                        onChange={this.onInputChange}
                        onFocus={this.handleOpenMenuFocus}
                        // onClick={this.onClickInput}
                        onClearValue={this.onClearInputValue}
                    />
                    <div className={act_wrap_classes}>
                        {
                            (!fetchData.length && !isSearch) && <CloseButton onClick={this.closMenu} />
                        }

                        {
                            isSearch ?
                                (
                                    <p className="searching">資料搜尋中...</p>
                                ) :
                                this.props.Destination === '' ?
                                    (<p className="searching">請先輸入上方目的地條件</p>)
                                    :
                                    (
                                        <ActRajx
                                            titleClass={showAct ? '' : 'd-no'}
                                            isFocus={showAct}
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