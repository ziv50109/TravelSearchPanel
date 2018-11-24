import React, { Component } from 'react';
import IntGpct from '../../../../../magaele/int_gpct';

// 人數增加，減少
class PeopleNumAdd extends Component {
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
                count: 1
            },
            childObj: {
                min: 0,
                max: 8,
                count: 0
            },
            babyObj: {
                min: 0,
                max: 1,
                count: 0
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

        if (
            total > this.maxSum ||
            adultCount > adultMax ||
            adultCount < adultMin ||
            childCount > childMax ||
            childCount < childMin ||
            babyCount > babyMax ||
            babyCount < babyMin
        ) {
            return;
        }

        // 傳回總人數
        if (this.props.setTotalPeople) {
            this.props.setTotalPeople({ totalNum: total });
        }

        // 傳回個各格個值
        if (this.props.setAdt) {
            this.props.setAdt('adt', adultCount);
        }
        if (this.props.setChd) {
            this.props.setChd('chd', childCount);
        }
        if (this.props.setInf) {
            this.props.setInf('inf', adultCount < babyMax ? adultCount : babyCount);
        }

        this.setState({
            adultObj: {
                min: 1,
                max: this.maxSum - childCount - babyCount,
                count: adultCount
            },
            childObj: {
                min: 0,
                max: this.maxSum - adultCount - babyCount,
                count: childCount
            },
            babyObj: {
                min: 0,
                max:
                    childCount + adultCount * 2 <= this.maxSum ||
                    adultCount < babyMax
                        ? adultCount
                        : this.maxSum - adultCount - childCount,
                count: adultCount < babyMax ? adultCount : babyCount
            }
        });
    }

    onClickAdd = target => {
        let {
            adultObj: { count: adultCount },
            childObj: { count: childCount },
            babyObj: { count: babyCount }
        } = this.state;

        switch (target) {
            case 'adultObj':
                adultCount += 1;
                break;
            case 'childObj':
                childCount += 1;
                break;
            case 'babyObj':
                babyCount += 1;
                break;
            default:
                break;
        }

        this.renderState(adultCount, childCount, babyCount);
    };

    onClickMinus = target => {
        let {
            adultObj: { count: adultCount },
            childObj: { count: childCount },
            babyObj: { count: babyCount }
        } = this.state;

        switch (target) {
            case 'adultObj':
                adultCount -= 1;
                break;
            case 'childObj':
                childCount -= 1;
                break;
            case 'babyObj':
                babyCount -= 1;
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

export default PeopleNumAdd;