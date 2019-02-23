import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// magaele
import Label from '../../../magaele/int_rctg/components/Label/Label'; // 外框
import DtmRcfr from '../../../magaele/dtm_rcfr';
import IntRcln from '../../../magaele/int_rcln';
import ActRajx from '../../../magaele/act_rajx';

// Utils
import { ClickOutSide, isJsonString } from '../../../utils';

// JSON 連結
import { vacationTaiwanSearch } from '../../../source.config';

// 樣式
import './SingleInputMenu.scss';

class SingleInputMenu extends Component {
    static defaultProps = {
        max: 3,
        minimumStringQueryLength: 2
    };
    static propTypes = {
        /**
         * fetchPath: fetch 的資料，js or json
         * selectedData: 存放選取的資料
         * max: 選取的資料的上限筆數，非必要
         */
        fetchPath: PropTypes.string.isRequired,
        selectedData: PropTypes.array.isRequired,
        max: PropTypes.number,
        /**
         * placeholder: int rcln 的 placeholder
         * minimumStringQueryLength: act racp 最少輸入文字
         * minimumStringQuery: act racp 輸入文字不夠的提示訊息內容
         * noMatchText: act racp 沒有配資料時的提示訊息內容
         */
        placeholder: PropTypes.string,
        minimumStringQueryLength: PropTypes.number.isRequired,
        minimumStringQuery: PropTypes.string,
        noMatchText: PropTypes.string,
        /**
         * label: dtm rcln 的提示文字
         * onChange: dtm rcln 的 callback function，回傳選取的物件
         * removeData: dtm rcln 的 callback function，通知移除物件
         */
        label: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor (props) {
        super(props);
        this.searchInput = React.createRef();
        this.state = {
            keyword: '',
            Txt: '',
            showDtm: false,
            showAct: false,

            destinationDtm: [],
            destinationAct: [],
            actRules: [
                {
                    title: '城市',
                    // icon: <IcRcln name="toolmapf" key={1} />
                },
                {
                    title: '景觀',
                    // icon: <IcRcln name="toolmapf" key={2} />
                }
            ]
        };

        this.fetchDtn = vacationTaiwanSearch.destination; // 補字 JSON
        // this.fetchDtn = 'https://uvacation.liontravel.com/gendata/jsondata/destinationlocaltw'; // 補字 JSON
    }

    componentDidMount () {
        // const sessionDtnData = sessionStorage.getItem(this.props.fetchPath);
        // if (sessionDtnData && isJsonString(sessionDtnData)) {
        //     const jsonData = JSON.parse(JSON.parse(sessionDtnData));
        //     this.setState({
        //         destinationDtm: this.handleFetchData(jsonData)
        //     });
        // } else {
        //     fetch(this.props.fetchPath)
        //         .then(r => r.json())
        //         .then(data => {
        //             this.setState({
        //                 destinationDtm: this.handleFetchData(JSON.parse(data))
        //             });
        //         });
        // }

        fetch(this.props.fetchPath)
            .then(r => r.json())
            .then(data => {
                this.setState({
                    destinationDtm: this.handleFetchData(JSON.parse(data))
                });
            });

        this.fetchActData();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        let text = nextProps.selectedData.length
            ? nextProps.selectedData[0].text
            : '';
        this.setState({
            keyword: text,
            Txt: text
        });
    }

    // 補字的全部資料
    fetchActData () {
        fetch(this.fetchDtn)
            .then(r => r.json())
            .then(data => {
                this.handleActData(JSON.parse(data));
            });
    }

    // 補字資料 fetch 下來存進 localStorage
    handleActData (data) {
        // example
        // {
        //     Kind: '30',
        //     level2: '城市',
        //     level3: 'JP_UEN',
        //     txt: '上野原市-山梨縣(UENOHARA SHI) UEN-日本'
        // },
        const destinationAct = []; // 要存進 localstorage 的陣列
        const actArea = [];

        // 城市
        data['City'].forEach(v => {
            v['CityList'].forEach(cityV => {
                const newObj = {};
                newObj['Kind'] = 30;
                newObj['level2'] = '城市';
                newObj['level3'] = `${cityV['City']}_${cityV['CityEName']}`;
                newObj['txt'] = cityV.CityName;
                newObj['city'] = cityV['City'];
                newObj['area'] = v['Zone'];
                destinationAct.push(newObj);
                actArea.push(cityV);
            });
        });

        // 景點
        // data['Spot'].forEach(v => {
        //     v['SpotList'].forEach(spotV => {
        //         console.log(spotV);
        //         const newObj = {};
        //         newObj['Kind'] = 40;
        //         newObj['level2'] = '景觀';
        //         newObj['level3'] = `${spotV['Spot']}`;
        //         newObj['txt'] = spotV.SpotName;
        //         newObj['city'] = v['City'];
        //         destinationAct.push(newObj);
        //     });
        // });

        this.setState({ actArea });
        // 存進 localstorage 的方法
        sessionStorage.setItem(
            this.fetchDtn,
            JSON.stringify(destinationAct)
        );
    }

    // 根據 keyword 篩選要灌入的資料
    findAboutKeyword (keyword) {
        const { actArea } = this.state;
        const sessionDepData = sessionStorage.getItem(this.fetchDtn);
        const jsonData = JSON.parse(sessionDepData);
        const areaMatch = actArea.filter(area => area['CityName'] === keyword); // 傳進來的 keyword 去找對應的城市
        const destinationAct = jsonData.filter((v) => {
            if (areaMatch.length) {
                return areaMatch[0]['City'] === v['city'] && v;
            } else if (v['txt'].indexOf(keyword) !== -1) {
                return v;
            } else {
                return false;
            }
        });

        this.setState({ destinationAct, showAct: true, showDtm: false });
    }

    // 快速選單 json 資料格式
    handleFetchData (data) {
        const newObj = {};
        const zoneObj = {};
        const cityObj = {};
        for (let i = 0; i < data['Zone'].length; i++) {
            zoneObj[data['Zone'][i]['Zone']] = data['Zone'][i]['ZoneName'];
            cityObj[data['Zone'][i]['Zone']] = {};
        }

        data['City'].forEach((v) => {
            const temp = {};
            v.CityList.forEach((vcity) => {
                temp[vcity['City']] = vcity['CityName'];
            });
            cityObj[v.Zone] = temp;
        });

        // First
        newObj.vLine = { _9: '台灣' };
        // Zone
        newObj.vArea = {
            _9: zoneObj
        };
        newObj.vTcity = cityObj;
        return newObj;
    }

    // 修改父層 state
    onClickItem = (v) => {
        this.props.onChange && this.props.onChange(v);
        this.setState({ showAct: false, showDtm: false });
    }

    // 通知 parent component data 更新
    // emitPushData = data => {
    //     const { selectedData } = this.props;
    //     let propsText =
    //         selectedData.length > 0
    //             ? selectedData[0].text + '-' + selectedData[0].vLinetravelText
    //             : '';
    //     let dataText = data ? data.text + '-' + data.vLinetravelText : '';
    //     let text = propsText === dataText ? '' : dataText;
    //     if (data) {
    //         this.props.onChange && this.props.onChange(data);
    //         this.setState({ keyword: text, showDtm: false });
    //     } else {
    //         this.setState({ keyword: '', showDtm: true });
    //         this.props.onChange && this.props.onChange('');
    //     }
    // };

    // 補字點擊時
    onClickDestnAct = (data, str) => {
        const {
            txt: Txt
        } = data;
        if (str === 'choosed') {
            // this.setState({
            //     Code,
            //     Kind,
            //     Txt,
            //     dtmSelected: [],
            //     selectedData: [data],
            //     showAct: false,
            // }, () => {
            //     const newObj = {
            //         vTcity: data['city'],
            //         vArea: data['area'],
            //         value: `_9_${data['city']}`
            //     };
            //     this.onClickItem(newObj);
            // });
            const newObj = {
                vTcity: data['city'],
                vArea: data['area'],
                value: `_9_${data['city']}`
            };
            this.onClickItem(newObj);
        } else {
            this.setState({
                Txt,
            });
        }
    }

    handleOpenMenuFocus = () => {
        this.setState({ showDtm: true, showAct: false });
    };

    handleOpenMenuDown = () => {
        // this.state.keyword
        //     ? this.setState({ showDtm: false, showAct: true })
        //     : this.setState({ showDtm: true, showAct: false });
    };

    // 關閉　dtm act 時
    handleCloseMenu = () => {
        const { destinationAct } = this.state;
        if (destinationAct.length) {
            const newObj = {
                vTcity: destinationAct[0]['city'],
                vArea: destinationAct[0]['area'],
                value: `_9_${destinationAct[0]['city']}`
            };
            this.onClickItem(newObj);
        }
        // const { selectedData } = this.props;
        // const { keyword } = this.state;
        // if (selectedData.length > 0) {
        //     let text = selectedData ? selectedData[0].text : '';
        //     if (keyword.length !== text.length) {
        //         this.setState({
        //             keyword: text,
        //             showDtm: false,
        //             showAct: false
        //         });
        //     }
        // }
        this.setState({
            showDtm: false,
            showAct: false
        });
    };
    // 通知 parent component 移除 data
    handleEmitRemoveData = () => {
        this.props.onChange && this.props.onChange('');
        // this.emitPushData('');
    };
    // 點擊 label wrap 就 focus search input
    handleLabelWrapClick = () => {
        this.searchInput.current.inputDOM.focus();
    };
    handleChange = e => {
        if (!e.target.value) {
            this.setState({
                keyword: '',
                Txt: '',
                // showAct: false,
                // showDtm: true
            });
            this.props.onChange && this.props.onChange('');
        } else {
            this.setState({
                keyword: e.target.value,
                Txt: e.target.value,
                // showAct: true,
                // showDtm: false
            });
        }
        this.findAboutKeyword(e.target.value);  // 補字
    };
    handleFocus = () => {
        this.searchInput.current.inputDOM.focus();
    };

    render () {
        const {
            placeholder,
            label,
            subLabel,
            isRequired,
            size,
            iconName,
            selectedData,
            className
        } = this.props;
        const {
            keyword,
            showAct,
            showDtm,
            destinationDtm,
            destinationAct,
            actRules,
            Txt
        } = this.state;

        // DtmRcfr highlight
        const selected = selectedData.map(item => item.value);

        const act_wrap_classes = classNames('act_wrap_container', {
            'd-no': !showAct,
        });

        return (
            <div className={className}>
                <Label
                    isRequired={isRequired} // 是否為必填欄位
                    size={size} // 高度
                    label={label} // 標籤
                    iconName={iconName} // icon
                    onClick={this.handleOpenMenuFocus}
                    subComponent={
                        <ClickOutSide onClickOutside={this.handleCloseMenu}>
                            <svg viewBox="0 0 10 10" display="none">
                                <path
                                    id="dtm_rcfr-x"
                                    d="M10 8.59L8.59 10 5 6.41 1.41 10 0 8.59 3.59 5 0 1.41 1.41 0 5 3.59 8.59 0 10 1.41 6.41 5z"
                                />
                            </svg>

                            <div className="dtm_rcfr-row">
                                {/* <div className="dtm_rcfr-selected-wrap" onClick={this.handleLabelWrapClick}>
                                    {showText}
                                </div> */}
                                <IntRcln
                                    isRequired
                                    className="int_rcln int-tags-single"
                                    ref={this.searchInput}
                                    placeholder={placeholder}
                                    onKeyDown={this.handleOpenMenuDown}
                                    onFocus={this.handleOpenMenuFocus}
                                    value={Txt}
                                    onChange={e => this.handleChange(e)}
                                    // onClearValue={e =>
                                    //     this.handleEmitRemoveData(
                                    //         e,
                                    //         selectedData
                                    //     )
                                    // }
                                    onClearValue={this.handleEmitRemoveData}
                                />
                            </div>

                            {/* 補字 */}
                            <div className={act_wrap_classes}>
                                <span className="closeBtn"></span>
                                <ActRajx
                                    titleClass={showAct ? '' : 'd-no'}
                                    isFocus={showAct}
                                    data={destinationAct}
                                    matchWord={keyword}
                                    getItemClickValue={this.onClickDestnAct}
                                    minimumStringQuery={'請至少輸入兩個字'}
                                    noMatchText="很抱歉，找不到符合的項目"
                                    minimumStringQueryLength={1}
                                    footer={false}
                                    rules={actRules}
                                />
                            </div>

                            <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : null}`}>
                                <p className="dtm_rcfr-label">{subLabel}</p>
                                <span
                                    className="dtm_rcfr-close_btn"
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.handleCloseMenu();
                                    }}
                                >
                                    <svg viewBox="0 0 10 10">
                                        <use xlinkHref="#dtm_rcfr-x" />
                                    </svg>
                                </span>
                                {/* {Object.keys(destinationDtm).length && (
                                    <DtmRcfr
                                        levelKey={[
                                            'vLine',
                                            'vArea',
                                            'vTcity'
                                        ]}
                                        onClickItem={this.onClickItem}
                                        dataResouce={this.state.destinationDtm}
                                        selectedData={selected}
                                    />
                                )} */}
                                {showDtm && (
                                    <DtmRcfr
                                        levelKey={[
                                            'vLine',
                                            'vArea',
                                            'vTcity'
                                        ]}
                                        onClickItem={this.onClickItem}
                                        dataResouce={this.state.destinationDtm}
                                        selectedData={selected}
                                    />
                                )}
                            </div>
                        </ClickOutSide>
                    }
                />
            </div>
        );
    }
}

export default SingleInputMenu;
