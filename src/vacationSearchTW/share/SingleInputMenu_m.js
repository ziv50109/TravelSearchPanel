import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SingleInputMenu.scss';

// 單純組件
import DtmRcfr from '../../../magaele/dtm_rcfr';
import IntRcln from '../../../magaele/int_rcln';
import ActRajx from '../../../magaele/act_rajx';
import IcRcln from '../../../magaele/ic_rcln';
import Label from '../../../magaele/int_rctg/components/Label/Label'; // 外框
import BtRcnb from '../../../magaele/bt_rcnb';

// Utils
import { ClickOutSide, isJsonString } from '../../../utils';

// JSON 連結
import { vacationTaiwanSearch } from '../../../source.config';

class SingleInputMenuM extends Component {
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
            showDtm: true,
            showAct: false,
            destinationDtm: {},
            destinationAct: [],
            actRules: [
                {
                    title: '城市'
                    // icon: <IcRcln name="toolmapf" key={1} />
                },
                {
                    title: '景觀'
                    // icon: <IcRcln name="toolmapf" key={2} />
                }
            ]
        };

        this.fetchDtn = vacationTaiwanSearch.destination; // 補字 JSON
    }
    componentDidMount () {
        // this.getData(this.props.fetchPath);
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
        //             const jsonData = JSON.parse(data);
        //             this.setState({
        //                 destinationDtm: this.handleFetchData(jsonData)
        //             });
        //         });
        // }
        fetch(this.props.fetchPath)
            .then(r => r.json())
            .then(data => {
                const jsonData = JSON.parse(data);
                this.setState({
                    destinationDtm: this.handleFetchData(jsonData)
                });
            });

        this.fetchActData();
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        let text = nextProps.selectedData.length
            ? nextProps.selectedData[0].text
            : '';
        this.setState({
            keyword: text
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
                newObj['zone'] = v['Zone'];
                destinationAct.push(newObj);
                actArea.push(cityV);
            });
        });

        // 景點
        // data['Spot'].forEach(v => {
        //     v['SpotList'].forEach(spotV => {
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
        sessionStorage.setItem(this.fetchDtn, JSON.stringify(destinationAct));
    }

    // 根據 keyword 篩選要灌入的資料
    findAboutKeyword (keyword) {
        const { actArea } = this.state;
        const sessionDepData = sessionStorage.getItem(this.fetchDtn);
        const jsonData = JSON.parse(sessionDepData);
        const areaMatch = actArea.filter(area => area['CityName'] === keyword); // 傳進來的 keyword 去找對應的城市
        const destinationAct = jsonData.filter(v => {
            if (areaMatch.length) {
                return areaMatch[0]['City'] === v['city'] && v;
            } else if (v['txt'].indexOf(keyword) !== -1) {
                return v;
            } else {
                return false;
            }
        });

        this.setState({ destinationAct });
    }

    handleFetchData (data) {
        const newObj = {};
        const zoneObj = {};
        const cityObj = {};
        for (let i = 0; i < data['Zone'].length; i++) {
            zoneObj[data['Zone'][i]['Zone']] = data['Zone'][i]['ZoneName'];
            cityObj[data['Zone'][i]['Zone']] = {};
        }

        data['City'].forEach(v => {
            const temp = {};
            v.CityList.forEach(vcity => {
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

    // // fetch data
    // getData = source => {
    //     const sessionData = sessionStorage.getItem(source);
    //     if (sessionData && isJsonString(sessionData)) {
    //         const jsonData = JSON.parse(sessionData);
    //         this.setState({
    //             destinationDtm: Object.assign(jsonData, vLine)
    //         });
    //         this._getDataCallBack(jsonData);
    //     } else {
    //         fetchJsToObj(source, d => {
    //             let stringifyData = JSON.stringify(d);
    //             this.setState({
    //                 destinationDtm: Object.assign(d, vLine)
    //             });
    //             this._getDataCallBack(d);
    //             sessionStorage.setItem(source, stringifyData);
    //         });
    //     }
    // };
    // // 處理 fetch 回來的 data
    // _getDataCallBack = data => {
    //     // const { vLine, vLinetravel, vLinewebarea } = data;
    //     let arr = [];
    //     let listA = Object.keys(data.vArea['_9']);
    //     listA.map((kind, i) => {
    //         let listB = Object.keys(data.vTcity[listA[i]]);
    //         listB.map((item, idx) => {
    //             let listC = listB[idx];
    //             let listD = data.vTcity[listA[i]][listB[idx]];
    //             const obj = {
    //                 vArea: listA[i],
    //                 vLineText: data.vArea['_9'][`${listA[i]}`],
    //                 vLinewebarea: '_',
    //                 vLinetravel: listC,
    //                 vLinetravelText: listD,
    //                 text: `${listD}-${data.vArea['_9'][`${listA[i]}`]}`,
    //                 vTcity: `${listC}`,
    //                 value: `_9-${listA[i]}-${listC}`
    //             };
    //             arr.push(obj);
    //         });
    //     });
    //     this.setState({
    //         destinationAct: arr
    //     });
    // };
    // 通知 parent component data 更新
    emitPushData = data => {
        const { selectedData } = this.props;
        let propsText =
            selectedData.length > 0
                ? selectedData[0].text + '-' + selectedData[0].vLinetravelText
                : '';
        let dataText = data ? data.text + '-' + data.vLinetravelText : '';
        let text = propsText === dataText ? '' : dataText;
        if (data) {
            this.props.onChange && this.props.onChange(data);
            this.setState({ keyword: text, showDtm: true });

            // console.log(propsText, dataText, data.text, dataText === propsText, data.text === propsText);
        } else {
            this.setState({ keyword: '', showDtm: true });
            this.props.onChange && this.props.onChange('');
        }
    };
    handleCloseMenu = () => {
        const { selectedData } = this.props;
        const { keyword } = this.state;
        if (this.isMouseDown) return;
        if (selectedData.length > 0) {
            let text = selectedData ? selectedData[0].text : '';
            if (keyword.length !== text.length) {
                this.setState({
                    keyword: text,
                    showDtm: true,
                    showAct: false
                });
            }
        }
        this.setState({
            showDtm: true,
            showAct: false
        });
    };
    handleMouseDown = () => {
        this.isMouseDown = true;
    };
    handleMouseUp = () => {
        this.isMouseDown = false;
    };
    // 通知 parent component 移除 data
    handleEmitRemoveData = (e, data) => {
        this.emitPushData([]);
    };
    // 點擊 label wrap 就 focus search input
    handleLabelWrapClick = () => {
        this.searchInput.current.inputDOM.focus();
    };
    handleChange = e => {
        if (!e.target.value) {
            this.setState({
                keyword: '',
                showAct: false,
                showDtm: true
            });
            this.props.onChange && this.props.onChange('');
        } else {
            this.setState({
                keyword: e.target.value,
                showAct: true,
                showDtm: false
            });
        }

        this.findAboutKeyword(e.target.value); // 補字
    };

    onClickItem = (v, source) => {
        this.props.onChange && this.props.onChange(v);
    };

    // 補字點擊時
    onClickAct = v => {
        const newObj = {
            vTcity: v['city'],
            value: `_9-${v['zone']}-${v['city']}`,
            text: v['txt'],
            vArea: v['zone']
        };
        this.onClickItem(newObj);
    };

    confirm = () => {
        this.props.onConfirm();
        this.props.closeNvbRslb();
    };

    render () {
        const {
            placeholder,
            minimumStringQueryLength,
            minimumStringQuery,
            noMatchText,
            label,
            subLabel,
            fetchPath,
            isRequired,
            size,
            iconName,
            selectedData
        } = this.props;
        const {
            keyword,
            showAct,
            destinationAct,
            showDtm,
            destinationDtm,
            actRules
        } = this.state;

        // DtmRcfr highlight
        const selected = selectedData.map(item => item.value);

        const act_wrap_classes = classNames('act_wrap_container', {
            'd-no': !showAct
        });
        return (
            <React.Fragment>
                <div className="nvbRslb_destination mb_DepAndDtn">
                    {/* // style={Object.assign({}, responsiveStyle())} */}
                    <div className="nvb_rslb_title">
                        <span
                            className="nvb_rslb_goBack"
                            onClick={() => {
                                this.props.closeNvbRslb();
                            }}
                        >
                            <IcRcln name="toolbefore" />
                        </span>
                        <h3 className="txt-center nvbRslb_title">目的地</h3>
                    </div>
                    <Label
                        subComponent={
                            <React.Fragment>
                                <ClickOutSide
                                    onClickOutside={this.handleCloseMenu}
                                >
                                    <div className="dtm_rcfr-row">
                                        {/* <div className="dtm_rcfr-selected-wrap" onClick={this.handleLabelWrapClick}>
                                    {showText}
                                </div> */}
                                        <IntRcln
                                            className="int_rcln int-tags-single"
                                            ref={this.searchInput}
                                            placeholder={placeholder}
                                            value={keyword}
                                            onChange={e => this.handleChange(e)}
                                            onClearValue={e =>
                                                this.handleEmitRemoveData(
                                                    e,
                                                    selectedData
                                                )
                                            }
                                        />

                                        <div className={act_wrap_classes}>
                                            <span className="closeBtn" />
                                            <ActRajx
                                                titleClass={
                                                    showAct ? '' : 'd-no'
                                                }
                                                isFocus={showAct}
                                                data={destinationAct}
                                                matchWord={keyword}
                                                getItemClickValue={
                                                    this.onClickAct
                                                }
                                                minimumStringQuery={
                                                    '請至少輸入兩個字'
                                                }
                                                noMatchText="很抱歉，找不到符合的項目"
                                                minimumStringQueryLength={1}
                                                footer={false}
                                                rules={actRules}
                                            />
                                        </div>
                                    </div>
                                </ClickOutSide>

                                <BtRcnb
                                    prop="string"
                                    className="m-l-xs w-15p"
                                    md
                                    radius
                                    whenClick={this.confirm}
                                >
                                    確定
                                </BtRcnb>
                            </React.Fragment>
                        }
                    />
                    <p className="dtm_rcfr-label">{subLabel}</p>
                </div>
                {/* <div className="SingleInputMenu vacation_taiwan_m m-b-sm w-80p"> */}
                {/* 補字 */}
                <div className="page_content">
                    <div className={`dtm_rcfr-wrap ${showDtm ? 'open' : null}`}>
                        <span
                            className="dtm_rcfr-close_btn"
                            onClick={this.handleCloseMenu}
                        />
                        {Object.keys(destinationDtm).length && (
                            <DtmRcfr
                                levelKey={['vLine', 'vArea', 'vTcity']}
                                onClickItem={v => this.onClickItem(v)}
                                dataResouce={destinationDtm}
                                selectedData={selected}
                            />
                        )}
                    </div>
                </div>
                {/* </div> */}
            </React.Fragment>
        );
    }
}

export default SingleInputMenuM;
