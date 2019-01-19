import React, { PureComponent } from 'react';
import NvbRslb from '../../../magaele/nvb_rslb';
import IcRcln from '../../../magaele/ic_rcln';
import IntRcln from '../../../magaele/int_rcln';
import BtRcnb from '../../../magaele/bt_rcnb';
import StRcln from '../../../magaele/st_rcln';
import IntGpct from '../../../magaele/int_gpct';
import './css.scss';

class ChinaNvb extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            isOpen: false,
            clstypeText: '',
            peopleNum: props.peopleNum
        };
        this.ClsTypeLevel = [
            { text: '不限', value: 0 },
            { text: '經濟艙', value: 1 },
            { text: '豪華經濟艙', value: 2 },
            { text: '商務艙', value: 3 },
            { text: '頭等艙', value: 4 }
        ];
    }

    componentDidMount = () => {
        this.defaultClsType(this.props.clstypeLevel);
    }

    // 一開始的艙等
    defaultClsType (val) {
        const { clstypeLevel } = this.props;
        let clstypeText;
        for (let i = 0; i < this.ClsTypeLevel.length; i++) {
            console.log(i);
            if (this.ClsTypeLevel[i].value === clstypeLevel) {
                clstypeText = this.ClsTypeLevel[i].text;
                break;
            }
        }
        this.setState({ clstypeText });
    }

    // 控制是否滑出、滑出畫面
    handleIsOpen = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    // 當選項改變時
    handleChangeOption = (level) => {
        this.setState({ clstypeText: this.ClsTypeLevel[level].text, clstypeLevel: level });
    }

    close = () => {
        let tempPeople = {
            peopleNum: this.props.peopleNum
        };
        this.setState({ isOpen: false, ...tempPeople });
    }

    // 按下確認時
    handleConfirm = () => {
        const { clstypeText, clstypeLevel, peopleNum } = this.state;
        let tempObj = {
            clstypeText: clstypeText,
            chinaClstypeLevel: clstypeLevel,
            peopleNum: peopleNum
        };

        this.props.confirm(tempObj);
        this.setState({ isOpen: false });
    }

    onClickAdd = () => {
        this.setState((prevState) => {
            if (prevState.peopleNum >= 10) {
                return { peopleNum: prevState.peopleNum };
            } else {
                return { peopleNum: prevState.peopleNum + 1 };
            }
        });
    }

    onClickMinus = () => {
        this.setState((prevState) => {
            if (prevState.peopleNum <= 0) {
                return { peopleNum: prevState.peopleNum };
            } else {
                return { peopleNum: prevState.peopleNum - 1 };
            }
        });
    }

    render () {
        const {
            isOpen, clstypeText
        } = this.state;
        const { title, clstypeLevel, customClass } = this.props;
        return (
            <div className={customClass}>
                <IntRcln
                    request
                    value={`共${this.props.peopleNum}人，${this.ClsTypeLevel[clstypeLevel].text}`}
                    label="人數/艙等"
                    icon={<IcRcln name="toolstaff" />}
                    readOnly
                    onClick={this.handleIsOpen}
                />
                <NvbRslb
                    className="panel-nvb_rslb"
                    visible={isOpen}
                    direction="right"
                >
                    <span className="nvb_rslb_goBack" onClick={this.close}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        isOpen &&
                        <div className={this.props.customClass}>
                            <h3 className="nvbrslbStyle txt-center m-t-sm m-b-sm">{title}</h3>
                            <div className="nvbrslbStyle">
                                <div className="nvbrslbStyle__top">
                                    <input type="text" value={`共${this.state.peopleNum}人，${clstypeText}`} readOnly />
                                    <BtRcnb md radius whenClick={this.handleConfirm}>確定</BtRcnb>
                                </div>
                                <div className="nvbrslbStyle__bottom">
                                    <div className="nvbrslbStyle__bottom__content">
                                        <StRcln
                                            option={this.ClsTypeLevel}
                                            placeholder="請選擇"
                                            label="艙等："
                                            onChangeCallBack={this.handleChangeOption}
                                            defaultValue={clstypeLevel}
                                        />
                                        <div className="num-people">
                                            <p>人數</p>
                                            <IntGpct
                                                max={10}
                                                min={0}
                                                count={this.state.peopleNum}
                                                btnClassMinus="ic_rcln toolcancelb"
                                                btnClassAdd="ic_rcln tooladdb"
                                                onClickAdd={this.onClickAdd} // 按下增加
                                                onClickMinus={this.onClickMinus}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </NvbRslb>
            </div>
        );
    }
}

export default ChinaNvb;