import React, { Component } from 'react';
import dayjs from 'dayjs';
import CyRcln from './index.js';
import { ClickOutSide } from '../../utils';
import { storiesOf } from '@storybook/react';

const DateValueErrorMessage = '請輸入正確的日期格式(YYYYMMDD) EX: 20180101';
class Demo extends Component {
    static defaultProps = {
        doubleMonth: false,
    };

    state = {
        selectedStartDate: '',
        selectedEndDate: '',
        startInputValue: '',
        endInputValue: '',
        activeInput: null,
    };

    checkDate (inputType) {
        const isStart = inputType === 'start';
        const {
            selectedStartDate,
            selectedEndDate,
            startInputValue,
            endInputValue,
        } = this.state;
        const inputValue = isStart ? startInputValue : endInputValue;
        const noChange = isStart ? inputValue === selectedStartDate : inputValue === selectedEndDate;

        // 若input沒有值
        if (!inputValue.length || noChange) return;

        const regex = /^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;
        const result = inputValue.match(regex);

        // 輸入的字元不合規則
        if (result === null) {
            return alert(DateValueErrorMessage);
        }

        const [all, year, month, day] = result;
        const d = `${year}-${month}-${day}`;
        const date = dayjs(d);
        const calcStartDate = this.calcStartDate();

        // 日期格式正確但是不存在的日期
        if (!date.isValid()) {
            return alert('無效的日期');
        }

        if (date.isBefore(calcStartDate)) {
            return alert('日期小於最小可選日期');
        }

        // 都驗證正確 就更換日期
        this.clickDate(d);
    }

    inputChange = (e) => {
        const value = e.target.value;
        // if (isNaN(value)) return;
        const { activeInput } = this.state;
        const target = `${activeInput}InputValue`;
        this.setState(prevState => ({
            ...prevState,
            [target]: value,
        }));
    }
    inputFocus (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    clickDate = (date) => {
        const {
            activeInput,
            selectedStartDate,
        } = this.state;
        const isStart = (activeInput === 'start');
        const startDateValue = isStart ? date : selectedStartDate;
        const endDateValue = isStart ? '' : date;

        this.setState(prevState => ({
            activeInput: isStart ? 'end' : null,
            selectedStartDate: startDateValue,
            selectedEndDate: endDateValue,
            startInputValue: startDateValue,
            endInputValue: endDateValue,
        }));
    }
    calcStartDate () {
        const {
            selectedStartDate,
            activeInput,
        } = this.state;

        const today = dayjs();
        if (activeInput === 'end') {
            return !selectedStartDate.length ? today.format('YYYY-MM-DD') : selectedStartDate;
        }
        return today.format('YYYY-MM-DD');
    }
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            startInputValue,
            endInputValue,
            activeInput,
        } = this.state;

        const {
            doubleMonth,
            startTxt,
            endTxt,
        } = this.props;

        const isStart = activeInput === 'start';
        const isEnd = activeInput === 'end';
        const style = {
            'borderColor': 'red',
        };

        const startDate = this.calcStartDate();

        return (
            <ClickOutSide onClickOutside={() => {
                this.setState(prevState => ({
                    ...prevState,
                    activeInput: null,
                }));
            }}>
                <input
                    type="text"
                    placeholder="開始日期"
                    value={startInputValue}
                    onChange={this.inputChange}
                    onFocus={() => { this.inputFocus('start') }}
                    style={isStart ? style : null}
                    onBlur={() => { this.checkDate('start') }}
                />
                {'~'}
                <input
                    type="text"
                    placeholder="結束日期"
                    value={endInputValue}
                    onChange={this.inputChange}
                    onFocus={() => { this.inputFocus('end') }}
                    style={isEnd ? style : null}
                    onBlur={() => { this.checkDate('end') }}
                />
                {
                    !activeInput ?
                        null :
                        <CyRcln
                            doubleMonth={doubleMonth}
                            doubleChoose
                            startTxt={startTxt}
                            endTxt={endTxt}
                            activeStart={dayjs().format('YYYY-MM')}
                            activeEnd={dayjs().add(1, 'years').format('YYYY-MM')}
                            startDate={startDate}
                            endDate={dayjs().add(1, 'years').format('YYYY-MM-DD')}
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            onDateClick={this.clickDate}
                        />
                }
            </ClickOutSide>
        );
    }
}

class OneChoose extends Component {
    static defaultProps = {
        doubleMonth: false,
    };

    state = {
        selectedStartDate: '',
        startInputValue: '',
        onFocus: false,
    };

    clickDate = (date) => {
        this.setState(prevState => ({
            onFocus: false,
            selectedStartDate: date,
            startInputValue: date,
        }));
    }

    inputChange = (e) => {
        const value = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            startInputValue: value,
        }));
    }

    render () {
        const {
            selectedStartDate,
            startInputValue,
            onFocus,
        } = this.state;

        const {
            doubleMonth,
        } = this.props;

        const style = {
            'borderColor': 'red',
        };

        return (
            <ClickOutSide
                onClickOutside={() => {
                    this.setState(prevState => ({
                        ...prevState,
                        onFocus: false,
                    }));
                }}
            >
                <input
                    type="text"
                    placeholder="選擇日期"
                    value={startInputValue}
                    onFocus={() => { this.setState(prevState => ({
                        ...prevState,
                        onFocus: true,
                    })); }}
                    onChange={this.inputChange}
                    readOnly
                    style={onFocus ? style : null}
                />
                {
                    !onFocus ?
                        null :
                        <CyRcln
                            doubleMonth={doubleMonth}
                            activeStart="2017-12"
                            activeEnd="2019-02"
                            startDate="2018-09-03"
                            endDate="2019-01-20"
                            selectedStartDate={selectedStartDate}
                            onDateClick={this.clickDate}
                        />
                }
            </ClickOutSide>
        );
    }
}

storiesOf('月曆 (calendar)', module).add('cy_rcln', () => (
    <div className="container">
        <h2>雙月曆複選</h2>
        <Demo doubleMonth />
        <h2>單月曆複選</h2>
        <Demo startTxt="最早" endTxt="最晚" />
        <h2>雙月曆單選</h2>
        <OneChoose doubleMonth />
        <h2>單月曆單選</h2>
        <OneChoose />
    </div>
));
