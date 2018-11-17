import React, { Component, PureComponent } from 'react';
import dayjs from 'dayjs';
import CyRcln from '../../magaele/cy_rcln';
import IntRcln from '../../magaele/int_rcln';
import IcRcln from '../../magaele/ic_rcln';
import { ClickOutSide } from '../../utils';
import './ComposeCalendar.scss';
import './input_group.scss';

const DateValueErrorMessage = '請輸入正確的日期格式(YYYYMMDD) EX: 20180101';
class ComposeCalendar extends PureComponent {
    static defaultProps = {
        onChange: () => {},
        setEndDate: 12,
        setActiveEnd: 12,
    };
    constructor (props) {
        super(props);
        this.state = {
            selectedStartDate: '',
            selectedEndDate: '',
            startInputValue: '',
            endInputValue: '',
            activeInput: null,
        };
    }

    onChange () {
        this.props.onChange(this.state);
    }

    clearValue = (inputType) => {
        const isStart = inputType === 'start';

        if (isStart) {
            return this.setState(prevState => ({
                ...prevState,
                startInputValue: '',
                selectedStartDate: ''
            }), this.onChange);
        }

        return this.setState(prevState => ({
            ...prevState,
            selectedEndDate: '',
            endInputValue: '',
        }), this.onChange);
    }

    closeCalendar = () => {
        this.setState(prevState => ({
            ...prevState,
            activeInput: null,
        }));
    }

    checkDate = (inputType) => {
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
        const { activeInput } = this.state;
        const target = `${activeInput}InputValue`;
        this.setState(prevState => ({
            ...prevState,
            [target]: value,
        }), this.onChange);
    }

    inputFocus = (target) => {
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
        }), this.onChange);
    }
    calcStartDate () {
        const {
            selectedStartDate,
            activeInput,
        } = this.state;
        const {
            setStartDate
        } = this.props;
        const today = dayjs();
        if (activeInput === 'end') {
            return !selectedStartDate.length ? today.format('YYYY-MM-DD') : selectedStartDate;
        }
        if (typeof setStartDate === 'number') {
            if (setStartDate > 0) {
                return today.add(setStartDate, 'day').format('YYYY-MM-DD');
            } else {
                return today.subtract(setStartDate, 'day').format('YYYY-MM-DD');
            }
        } else {
            return today.format('YYYY-MM-DD');
        }
    }
    diffDate () {
        const {
            startInputValue,
            endInputValue,
        } = this.state;
        if (!startInputValue.length || !endInputValue.length || startInputValue.length !== endInputValue.length) return '';
        const d1 = new Date(startInputValue.replace(/\-/g, '/')).getTime();
        const d2 = new Date(endInputValue.replace(/\-/g, '/')).getTime();
        const timeDiff = d2 - d1;
        const dayDiff = timeDiff / (1000 * 3600 * 24);
        return dayDiff;
    }

    setActiveEndDay () {
        const { setActiveEnd, setOtherEnd } = this.props;
        const { selectedStartDate } = this.state;
        if (typeof setOtherEnd === 'number') {
            if (selectedStartDate) {
                return dayjs().add(setOtherEnd, 'days').format('YYYY-MM-DD');
            } else {
                return dayjs().add(setActiveEnd, 'months').format('YYYY-MM');
            }
        } else {
            return dayjs().add(setActiveEnd, 'months').format('YYYY-MM');
        }
    }

    setEndDay () {
        const { setEndDate, setOtherEnd } = this.props;
        const { selectedStartDate } = this.state;
        if (typeof setOtherEnd === 'number') {
            if (selectedStartDate) {
                return dayjs(selectedStartDate).add(setOtherEnd, 'days').format('YYYY-MM-DD');
            } else {
                return dayjs().add(setEndDate, 'months').format('YYYY-MM');
            }
        } else {
            return dayjs().add(setEndDate, 'months').format('YYYY-MM-DD');
        }
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
            totleNights
        } = this.props;
        const startDate = this.calcStartDate();
        const activeEnd = this.setActiveEndDay();
        const endDate = this.setEndDay();
        return (
            <ClickOutSide onClickOutside={this.closeCalendar}>
                <div className="calendar_compose">
                    <div className="input_group">
                        <IntRcln
                            request
                            placeholder="YYYY/MM/DD"
                            label={this.props.titleTxt ? this.props.titleTxt : '出發區間'}
                            icon={<IcRcln name="tooldate" />}
                            onFocus={() => { this.inputFocus('start') }}
                            onChange={this.inputChange}
                            onBlur={() => { this.checkDate('start') }}
                            onClearValue={() => { this.clearValue('start') }}
                            value={startInputValue.replace(/\-/g, '/')}
                        />
                        <span className="cal_icon">~</span>
                        <IntRcln
                            request
                            placeholder="YYYY/MM/DD"
                            onChange={this.inputChange}
                            onFocus={() => { this.inputFocus('end') }}
                            onBlur={() => { this.checkDate('end') }}
                            onClearValue={() => { this.clearValue('end') }}
                            value={endInputValue.replace(/\-/g, '/')}
                        />
                        {
                            (this.diffDate() > 0 && totleNights) ? (
                                <span className="nights">{
                                    `共${this.diffDate()}晚`
                                }</span>
                            ) : null
                        }
                    </div>
                    {
                        activeInput === null ? null : (
                            <div className="content">
                                <button className="close_btn" onClick={this.closeCalendar}>X</button>
                                <CyRcln
                                    doubleMonth
                                    doubleChoose
                                    startDate={startDate}
                                    activeStart={dayjs().format('YYYY-MM')}
                                    activeEnd={activeEnd}
                                    endDate={endDate}
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    onDateClick={this.clickDate}
                                />
                            </div>
                        )
                    }
                </div>
            </ClickOutSide>
        );
    }
}

export default ComposeCalendar;