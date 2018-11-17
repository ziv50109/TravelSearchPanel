import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import CyRcln from '../../../magaele/cy_rcln';
import IntRcln from '../../../magaele/int_rcln';
import { ClickOutSide } from '../../../utils';
// import './ComposeCalendar.scss';

const DateValueErrorMessage = '請輸入正確的日期格式(YYYYMMDD) EX: 20180101';
class ComposeCalendar extends PureComponent {
    static defaultProps = {
        onChange: () => {},
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
        const { selectedStartDate, selectedEndDate } = this.state;
        (selectedStartDate && selectedEndDate) && this.props.onChange(this.state);
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

        const [year, month, day] = result;
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

        const startDate = this.calcStartDate();

        return (
            <ClickOutSide onClickOutside={this.closeCalendar}>
                <div className="calendar_compose">
                    <div className="input_group">
                        <IntRcln
                            placeholder="YYYY/MM/DD"
                            onFocus={() => { this.inputFocus('start') }}
                            onChange={this.inputChange}
                            onBlur={() => { this.checkDate('start') }}
                            onClearValue={() => { this.clearValue('start') }}
                            value={startInputValue.replace(/\-/g, '/')}
                        />
                        <span className="cal_icon">~</span>
                        <IntRcln
                            placeholder="YYYY/MM/DD"
                            onChange={this.inputChange}
                            onFocus={() => { this.inputFocus('end') }}
                            onBlur={() => { this.checkDate('end') }}
                            onClearValue={() => { this.clearValue('end') }}
                            value={endInputValue.replace(/\-/g, '/')}
                        />
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
                                    activeEnd={dayjs().add(1, 'years').format('YYYY-MM')}
                                    endDate={dayjs().add(1, 'years').format('YYYY-MM-DD')}
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