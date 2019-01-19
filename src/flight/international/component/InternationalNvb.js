import React, { Component, PureComponent } from 'react';
import NvbRslb from '../../../../magaele/nvb_rslb';
import IcRcln from '../../../../magaele/ic_rcln';
import IntRcln from '../../../../magaele/int_rcln';
import BtRcnb from '../../../../magaele/bt_rcnb';
import StRcln from '../../../../magaele/st_rcln';
import IntGpct from '../../../../magaele/int_gpct';
import './css.scss';

class InternationalNvb extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isOpen: false,
            clstypeText: '',
            adult: props.adult,
            child: props.child,
            baby: props.baby,
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
    componentDidUpdate (prevProps, prevState) {
        if (prevProps !== this.props) {
            this.updatePeopleNum();
        }
    }

    updatePeopleNum = () => {
        const { adult, child, baby } = this.props;
        this.setState({ adult, child, baby });
    }

    // 一開始的艙等
    defaultClsType (val) {
        const { clstypeLevel } = this.props;
        let clstypeText;
        for (let i = 0; i < this.ClsTypeLevel.length; i++) {
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
            adult: this.props.adult,
            child: this.props.child,
            baby: this.props.baby,
        };
        this.setState({ isOpen: false, ...tempPeople });
    }

    // 按下確認時
    handleConfirm = () => {
        const { clstypeText, clstypeLevel, adult, child, baby } = this.state;
        let tempObj = {
            clstypeText: clstypeText,
            internationalClstypeLevel: clstypeLevel,
            adult: adult,
            child: child,
            baby: baby,
        };

        this.props.confirm(tempObj);
        this.setState({ isOpen: false });
    }


    setPeople = (obj) => {
        this.setState({
            adult: obj.adt,
            child: obj.chd,
            baby: obj.inf,
        });
    }

    render () {
        const {
            isOpen, clstypeText, adult,
            child,
            baby,
        } = this.state;
        const { title, clstypeLevel, customClass } = this.props;
        return (
            <div className={customClass}>
                <IntRcln
                    request
                    value={`共${this.props.adult + this.props.child + this.props.baby}人，${this.ClsTypeLevel[clstypeLevel].text}`}
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
                                    <input type="text" value={`共${this.state.adult + this.state.child + this.state.baby}人，${clstypeText}`} readOnly />
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
                                        <PeopleNumAdd adult={adult} child={child} baby={baby} setPeople={this.setPeople} />
                                        <div className="con-tooltip">
                                            大人：以出發日為準，年滿12歲(含)以上。
                                            <br />
                                            孩童：全程搭乘日為準，年滿2歲(含)以上，未滿12歲。
                                            <br />
                                            嬰兒：全程搭乘日為準，未滿2歲(不列入幾人成行的人數計算)。
                                            <br />
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

// 人數增加，減少
class PeopleNumAdd extends PureComponent {
    constructor (props) {
        super(props);
        this.maxSum = 8;
        this.state = {
            title: {
                adult: '大人(12+)',
                child: '孩童(2-11)',
                baby: '嬰兒(<2)'
            },
            adultObj: {
                min: 1,
                max: 8,
                count: props.adult
            },
            childObj: {
                min: 0,
                max: 8,
                count: props.child
            },
            babyObj: {
                min: 0,
                max: 1,
                count: props.baby
            }
        };
    }

    renderState (adultCount, childCount, babyCount) {
        const total = adultCount + childCount + babyCount;
        const {
            adultObj: { min: adultMin, max: adultMax },
            childObj: { min: childMin, max: childMax },
            babyObj: { min: babyMin, max: babyMax }
        } = this.state;



        // 傳回各別人數
        if (this.props.setPeople) {
            this.props.setPeople({
                adt: adultCount,
                chd: childCount,
                inf: babyCount
            });
        }

        this.setState({
            adultObj: {
                min: 1,
                max: 8,
                count: adultCount
            },
            childObj: {
                min: 0,
                max: 5,
                count: childCount
            },
            babyObj: {
                min: 0,
                max: 3,
                count: babyCount
            }
        });
    }

    onClickAdd = target => {
        let {
            adultObj: { count: adultCount, max: adultMax },
            childObj: { count: childCount, max: childMax },
            babyObj: { count: babyCount, max: babyMax }
        } = this.state;

        switch (target) {
            case 'adultObj':
                adultCount = adultCount >= adultMax ? adultMax : adultCount += 1;
                break;
            case 'childObj':
                childCount = childCount >= childMax ? childMax : childCount += 1;
                break;
            case 'babyObj':
                babyCount = babyCount >= babyMax ? babyMax : babyCount += 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };

    onClickMinus = target => {
        let {
            adultObj: { count: adultCount, min: adultMin },
            childObj: { count: childCount, min: childMin },
            babyObj: { count: babyCount, min: babyMin }
        } = this.state;

        switch (target) {
            case 'adultObj':
                adultCount = adultCount <= adultMin ? adultMin : adultCount -= 1;
                if (this.props.setAdt) {
                    this.props.setAdt(adultCount);
                }
                break;
            case 'childObj':
                childCount = childCount <= childMin ? childMin : childCount -= 1;
                if (this.props.setChd) {
                    this.props.setChd(childCount);
                }
                break;
            case 'babyObj':
                babyCount = babyCount <= babyMin ? babyMin : babyCount -= 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };

    render () {
        return (
            <div className="con-people">
                <div className="num-people">
                    <span>{this.state.title.adult}</span>
                    <IntGpct
                        id="peopleAdult"
                        xin
                        max={this.state.adultObj.max}
                        min={this.state.adultObj.min}
                        count={this.state.adultObj.count}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            this.onClickAdd('adultObj');
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus('adultObj');
                        }} // 按下減少
                    />
                </div>
                <div className="num-people">
                    <span>{this.state.title.child}</span>
                    <IntGpct
                        id="peopleChild"
                        xin
                        max={this.state.childObj.max}
                        min={this.state.childObj.min}
                        count={this.state.childObj.count}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            this.onClickAdd('childObj');
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus('childObj');
                        }} // 按下減少
                    />
                </div>
                <div className="num-people">
                    <span>{this.state.title.baby}</span>
                    <IntGpct
                        id="peopleBaby"
                        xin
                        max={this.state.babyObj.max}
                        min={this.state.babyObj.min}
                        count={this.state.babyObj.count}
                        btnClassMinus="ic_rcln toolcancelb"
                        btnClassAdd="ic_rcln tooladdb"
                        onClickAdd={() => {
                            this.onClickAdd('babyObj');
                        }} // 按下增加
                        onClickMinus={() => {
                            this.onClickMinus('babyObj');
                        }} // 按下減少
                    />
                </div>
            </div>
        );
    }
}

export default InternationalNvb;