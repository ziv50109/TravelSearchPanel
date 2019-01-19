import React, { PureComponent } from 'react';
import dayjs from 'dayjs';
import CyRcln from '../../magaele/cy_rcln';
import IntRcln from '../../magaele/int_rcln';
import IcRcln from '../../magaele/ic_rcln';
import { getYearAndMonth, ClickOutSide } from '../../utils';
import './ComposeCalendar.scss';
import './input_group.scss';

const DateValueErrorMessage = '請輸入正確的日期格式(YYYYMMDD) EX: 2018/01/01';
const isValidDay = (dateString) => {
    const regex = /^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;
    if (!regex.test(dateString)) return false;

    const result = dateString.match(regex);
    const year = parseInt(result[1], 10);
    const month = parseInt(result[2], 10);
    const day = parseInt(result[3], 10);

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

    return day <= monthLength[month - 1];
};
class ComposeCalendar extends PureComponent {
    static defaultProps = {
        onChange: () => {},
        setEndDate: 12,         // 反灰(disable)
        setActiveEnd: 120,      // 可選月份最大值(maximum show months)
        titleTxt: '出發區間',
        panelName: ''
    };
    constructor (props) {
        super(props);
        this.state = {
            selectedStartDate: '',
            selectedEndDate: '',
            startInputValue: '',
            endInputValue: '',
            activeInput: null,
            endDate: '',
            activeEnd: dayjs().add(this.props.setActiveEnd, 'months').format('YYYY-MM')
        };
    }

    componentDidMount () {
        setTimeout(() => {
            this.setDefaultDate();
        }, 0);
    }

    setDefaultDate = () => {
        this.setState({
            selectedStartDate: this.props.defaultStartDate || '',
            selectedEndDate: this.props.defaultEndDate || '',
            startInputValue: this.props.defaultStartDate || '',
            endInputValue: this.props.defaultEndDate || ''
        });
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
        const { setOtherEnd } = this.props;
        const inputValue = isStart ? startInputValue : endInputValue;
        const noChange = isStart ? inputValue === selectedStartDate : inputValue === selectedEndDate;
        let regex = /^(\d{4})[\-\/]?(\d{2})[\-\/]?(\d{2})$/;

        if (noChange) return;

        // 若input數字長度不符合
        // if ([3, 4, 8, 10].indexOf(inputValue.length) < 0) {
        //     // return alert('請輸入正確的日期格式(YYYYMMDD) EX: 2018/01/01)');
        // }

        // 若日期是3碼或4碼(326 > 當年/03/26, 1105 > 當年/11/05)
        if (inputValue.length === 4) regex = /^()(\d{2})(\d{2})/;
        if (inputValue.length === 3) regex = /^()(\d{1})(\d{2})/;

        const result = inputValue.match(regex);
        const isValidDate = (d) => d instanceof Date && !isNaN(d);
        const setStartDate = () => this.clickDate(dayjs().add(this.props.setStartDate || 0, 'day').format('YYYY-MM-DD'));
        const isAfterOtherEnd = (d) => {
            if (isStart) return false;
            const startDate = dayjs(selectedStartDate).add(setOtherEnd, 'day');
            return dayjs(d).isAfter(startDate);
        };

        // 輸入的字元不合規則
        if (result === null) {
            alert(DateValueErrorMessage);
            setStartDate();
            return;
        }

        // 月份小於10月，前面加'0'
        if (result[2].length === 1) result[2] = '0' + result[2];
        const [all, year, month, day] = result;

        const d = `${year || dayjs().year()}-${month}-${day}`;
        const date = dayjs(d);
        const calcStartDate = this.calcStartDate();

        // 日期格式正確但是不存在的日期
        if (!isValidDate(new Date(d)) || !isValidDay(d)) {
            alert('無效的日期');
            setStartDate();
            return;
        }

        if (date.isBefore(calcStartDate)) {
            alert('日期必須大於今日');
            setStartDate();
            return;
        }

        // 日期超過 checkIn N天範圍
        if (isAfterOtherEnd(d)) {
            alert('無效的日期');
            this.clickDate('');
            return;
        }

        // 都驗證正確 就更換日期
        this.clickDate(d);
    }

    inputChange = (e) => {
        const value = e.target.value;
        const { activeInput } = this.state;
        let target = `${activeInput}InputValue`;
        if (this.props.panelName === 'hotel') {
            target = `${activeInput === 'start' ? 'start' : 'end'}InputValue`;
        }
        this.setState(prevState => ({
            ...prevState,
            [target]: value,
        }), this.onChange);
    }

    inputKeyDown = (e, inputType) => {
        if (e.keyCode === 13) {
            this.checkDate(inputType);
        }
    }

    inputFocus = (target) => {
        const {
            selectedStartDate,
            startInputValue
        } = this.state;
        let activeInput = target;
        if (this.props.panelName === 'hotel' && target === 'end' && selectedStartDate === '' && startInputValue === '') {
            activeInput = null;
        }

        this.setState(prevState => ({
            ...prevState,
            activeInput,
        }));
    }

    startDateValueRule = (date) => {
        const {
            activeInput,
            selectedStartDate
        } = this.state;
        const { panelName } = this.props;
        const isStart = (activeInput === 'start');

        switch (panelName) {
            case 'vacationPersonal':
                if (isStart) {
                    return date;
                } else if (!selectedStartDate) {
                    return dayjs(date).add(-30, 'day') < dayjs() ? dayjs().format('YYYY-MM-DD') : dayjs(date).add(-30, 'day').format('YYYY-MM-DD');
                }
                return selectedStartDate;
            case '':
            default:
                return isStart ? date : selectedStartDate;
        }
    }
    clickDate = (date) => {
        const {
            activeInput,
            activeEnd
        } = this.state;
        const { setOtherEnd, setActiveEnd } = this.props;
        const isStart = (activeInput === 'start');
        const startDateValue = this.startDateValueRule(date);
        const endDateValue = isStart ? '' : date;

        const startDateMM = Number(dayjs(startDateValue).add(setOtherEnd, 'day').format('YYYYMM'));
        const activeEndMM = Number(activeEnd.split('-').join(''));
        let newActiveEnd = activeEnd;
        if (isStart && startDateMM > activeEndMM) {
            newActiveEnd = dayjs().add(setActiveEnd + 1, 'months').format('YYYY-MM');
        }

        this.setState(prevState => ({
            activeInput: isStart ? 'end' : null,
            selectedStartDate: startDateValue,
            selectedEndDate: endDateValue,
            startInputValue: startDateValue,
            endInputValue: endDateValue,
            activeEnd: newActiveEnd
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
            if (typeof setStartDate === 'number') {
                return !selectedStartDate.length ? today.add(setStartDate, 'day').format('YYYY-MM-DD') : selectedStartDate;
            } else {
                return !selectedStartDate.length ? today.format('YYYY-MM-DD') : selectedStartDate;
            }
        }
        if (typeof setStartDate === 'number') {
            return today.add(setStartDate, 'day').format('YYYY-MM-DD');
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

    setEndDay () {
        const { setEndDate, setOtherEnd } = this.props;
        const { selectedStartDate, activeInput } = this.state;
        const isStart = (activeInput === 'start');

        if (setOtherEnd && selectedStartDate !== '' && !isStart) {
            return dayjs(selectedStartDate).add(setOtherEnd, 'days').format('YYYY-MM-DD');
        }

        return dayjs().add(setEndDate, 'months').format('YYYY-MM-DD');
    }

    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            startInputValue,
            endInputValue,
            activeInput,
            activeEnd
        } = this.state;
        const {
            totleNights,
            titleTxt,
            startTxt,
            endTxt,
            setActiveEnd,
            setOtherEnd,
            ...other
        } = this.props;
        const startDate = this.calcStartDate();
        const endDate = this.setEndDay();

        return (
            <ClickOutSide onClickOutside={this.closeCalendar}>
                <div className="calendar_compose">
                    <div className="input_group">
                        <IntRcln
                            ref={(e) => { this.cIntRcln = e }}
                            request
                            placeholder="YYYY/MM/DD"
                            label={titleTxt}
                            icon={<IcRcln name="tooldate" onClick={() => this.cIntRcln.inputDOM.focus()} />}
                            onFocus={() => { this.inputFocus('start') }}
                            onChange={this.inputChange}
                            onKeyDown={(e) => this.inputKeyDown(e, 'start')}
                            onBlur={() => { this.checkDate('start') }}
                            onClearValue={() => { this.clearValue('start') }}
                            value={startInputValue.replace(/\-/g, '/')}
                        />
                        <span className="cal_icon">~</span>
                        <IntRcln
                            ref={(e) => { this.cIntRcln2 = e }}
                            request
                            placeholder="YYYY/MM/DD"
                            onChange={this.inputChange}
                            onKeyDown={(e) => this.inputKeyDown(e, 'end')}
                            onFocus={() => { this.inputFocus('end') }}
                            onBlur={() => { this.checkDate('end') }}
                            onClearValue={() => { this.clearValue('end') }}
                            value={endInputValue.replace(/\-/g, '/')}
                        />
                        {
                            (this.diffDate() > 0 && totleNights) ? (
                                <span className="nights">{
                                    `，共${this.diffDate()}晚`
                                }</span>
                            ) : null
                        }
                    </div>
                    {
                        activeInput === null ? null : (
                            <div className="content">
                                <button className="close_btn" onClick={this.closeCalendar}></button>
                                <CyRcln
                                    doubleMonth
                                    doubleChoose
                                    startTxt={startTxt}
                                    endTxt={endTxt}
                                    startDate={startDate}
                                    activeStart={dayjs().format('YYYY-MM')}
                                    endDate={endDate}             // 灰灰
                                    activeEnd={activeEnd}         // 極限
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    onDateClick={this.clickDate}
                                    {...other}
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