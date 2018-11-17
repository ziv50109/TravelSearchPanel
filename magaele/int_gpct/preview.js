import React, { Component } from 'react';
import IntGpct from './index.js';

import { storiesOf } from '@storybook/react';

class Demo1 extends Component {
    state = {
        count: 0
    }

    handleChange = (e) => {
        const val = e.target.value;
        const newCount = Number(val);

        if (
            isNaN(newCount) ||
            (newCount > 10) ||
            (newCount < 0)
        ) return;

        return this.setState({
            count: newCount,
        });
    }

    render () {
        const {
            count,
        } = this.state;

        return (
            <div>
                <h3>prop: label-unit(單位), readOnly(可手動輸入)</h3>
                <IntGpct
                    className="hihi"
                    label-unit
                    max={10}
                    min={0}
                    count={count}
                    readOnly={false}
                    label="位"
                    btnClassMinus="ic_rcln toolcancelb"
                    btnClassAdd="ic_rcln tooladdb"
                    onClickAdd={() => {
                        const addCount = count + 1;
                        if (addCount > 10) return;
                        return this.setState({
                            count: addCount,
                        });
                    }} // 按下增加
                    onClickMinus={() => {
                        const minusCount = count - 1;
                        if (minusCount < 0) return;
                        return this.setState({
                            count: minusCount,
                        });
                    }} // 按下減少
                    onInputChange={this.handleChange}
                />
            </div>
        );
    }
}
class Preview extends Component {
    constructor (props) {
        super(props);
        this.maxSum = 7;
        this.state = {
            adultObj: {
                min: 1,
                max: 7,
                count: 1
            },
            childObj: {
                min: 0,
                max: 7,
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
            adultObj: {
                min: adultMin,
                max: adultMax,
            },
            childObj: {
                min: childMin,
                max: childMax,
            },
            babyObj: {
                min: babyMin,
                max: babyMax,
            }
        } = this.state;

        if (
            total > this.maxSum ||
            adultCount > adultMax ||
            adultCount < adultMin ||
            childCount > childMax ||
            childCount < childMin ||
            babyCount > babyMax ||
            babyCount < babyMin
        ) return;

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
                max: (childCount + adultCount * 2 <= this.maxSum) || (adultCount < babyMax) ? adultCount : this.maxSum - adultCount - childCount,
                count: adultCount < babyMax ? adultCount : babyCount
            }
        });
    }
    onClickAdd = (target) => {
        let {
            adultObj: {
                count: adultCount,
            },
            childObj: {
                count: childCount,
            },
            babyObj: {
                count: babyCount,
            },
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

    }
    onClickMinus = (target) => {
        let {
            adultObj: {
                count: adultCount,
            },
            childObj: {
                count: childCount,
            },
            babyObj: {
                count: babyCount,
            },
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

    }
    render () {
        return (
            <div>
                <h3>Style: xin</h3>
                <div>
                    <div>
                        <h4>成人</h4>
                        <IntGpct
                            id="test1"
                            xin
                            max={this.state.adultObj.max}
                            min={this.state.adultObj.min}
                            count={this.state.adultObj.count}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            onClickAdd={() => { this.onClickAdd('adultObj') }} // 按下增加
                            onClickMinus={() => { this.onClickMinus('adultObj') }} // 按下減少
                        />
                    </div>
                    <div>
                        <h4>兒童</h4>
                        <IntGpct
                            xin
                            max={this.state.childObj.max}
                            min={this.state.childObj.min}
                            count={this.state.childObj.count}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            onClickAdd={() => { this.onClickAdd('childObj') }} // 按下增加
                            onClickMinus={() => { this.onClickMinus('childObj') }} // 按下減少
                        />
                    </div>
                    <div>
                        <h4>嬰兒</h4>
                        <IntGpct
                            xin
                            max={this.state.babyObj.max}
                            min={this.state.babyObj.min}
                            count={this.state.babyObj.count}
                            btnClassMinus="ic_rcln toolcancelb"
                            btnClassAdd="ic_rcln tooladdb"
                            onClickAdd={() => { this.onClickAdd('babyObj') }} // 按下增加
                            onClickMinus={() => { this.onClickMinus('babyObj') }} // 按下減少
                        />
                    </div>
                </div>
            </div>
        );
    }
}


storiesOf('輸入元件 (input)', module)
    .add('int_gpct', () => (
        <div>
            <h3>Style: default</h3>
            <IntGpct
                max={10}
                min={1}
                count={1}
                btnClassMinus="ic_rcln toolcancelb"
                btnClassAdd="ic_rcln tooladdb"
                onClickAdd={() => { console.log('clickAdd') }} // 按下增加
                onClickMinus={() => { console.log('clickMinus') }} // 按下減少
            />
            <Demo1 />
            <Preview />
            <h3>Style: xin-circle</h3>
            <IntGpct
                count={5}
                xin-circle
                btnClassMinus="ic_rcln toolcancelbf"
                btnClassAdd="ic_rcln tooladdbf"
            />
        </div>
    ));