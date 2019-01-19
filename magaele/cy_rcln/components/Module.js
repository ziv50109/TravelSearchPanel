import React, { PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import {
    getYearAndMonth,
    getNowMonth,
} from '../../../utils';
import CalendarBox from './CalendarBox';
import '../css.scss';

class Module extends PureComponent {
    static defaultProps = {
        doubleMonth: false, // 單月曆或雙月曆
        doubleChoose: false, // 選一天或選兩天
    };

    static propTypes = {
        onDateClick: Proptypes.func,
        startDate: Proptypes.string,
        doubleMonth: Proptypes.bool,
        doubleChoose: Proptypes.bool,
    };

    state = {
        calendarStart: this.props.selectedStartDate || getNowMonth(),
        isMinMonth: this.isMinMonth(),
        isMaxMonth: this.isMaxMonth(),
    };
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.activeEnd !== this.props.activeEnd) {
            this.isActiveEndUpdate();
        }
    }

    isActiveEndUpdate = () => {
        const { activeEnd, selectedStartDate } = this.props;
        const activeEndMonth = getYearAndMonth(activeEnd)[1];
        const selectedStartDateMonth = getYearAndMonth(selectedStartDate)[1];

        const isMaxMonth = selectedStartDateMonth >= activeEndMonth;
        this.setState({ isMaxMonth });
    }

    isMinMonth () {
        let {
            activeStart,
            selectedStartDate,
        } = this.props;

        // 若沒傳選擇日, 以系統當月計算
        if (!selectedStartDate.length) selectedStartDate = getNowMonth();

        const [year, month] = getYearAndMonth(selectedStartDate);
        const prevMonth = new Date(year, month - 1, 1, 8);
        const actStart = new Date(activeStart);
        const alreadyMin = prevMonth.getTime() <= actStart.getTime();

        if (!activeStart) return false;

        if (alreadyMin) return true;

        return false;
    }
    isMaxMonth () {
        let {
            activeEnd,
            selectedStartDate,
            doubleMonth,
        } = this.props;

        // 若沒傳選擇日, 以系統當月計算
        if (!selectedStartDate.length) selectedStartDate = getNowMonth();

        const [year, month] = getYearAndMonth(selectedStartDate);
        const nextMonth = new Date(year, month, 1, 8);
        const nextTwo = new Date(year, month + 1, 1, 8);
        const actEnd = new Date(activeEnd);
        const alreadyMax = doubleMonth ?
            nextTwo.getTime() >= actEnd.getTime()
            : nextMonth.getTime() >= actEnd.getTime();

        if (!activeEnd) return false;

        if (alreadyMax) return true;

        return false;
    }
    goNextMonth = () => {
        const {
            activeEnd,
            doubleMonth,
        } = this.props;
        const {
            calendarStart,
            isMaxMonth,
        } = this.state;

        if (isMaxMonth) return;

        const [year, month] = getYearAndMonth(calendarStart);
        const nextMonth = new Date(year, month, 1, 8);
        const nextTwo = new Date(year, month + 1, 1, 8);
        const actEnd = new Date(activeEnd);
        const alreadyMax = doubleMonth ?
            nextTwo.getTime() === actEnd.getTime()
            : nextMonth.getTime() === actEnd.getTime();

        this.setState(prevState => {
            return {
                calendarStart: nextMonth.toISOString().slice(0, 7),
                isMinMonth: false,
                isMaxMonth: alreadyMax,
            };
        });
    }
    goPrevMonth = () => {
        const {
            activeStart,
        } = this.props;
        const {
            calendarStart,
            isMinMonth,
        } = this.state;

        if (isMinMonth) return;

        const [year, month] = getYearAndMonth(calendarStart);
        const prevMonth = new Date(year, month - 2, 1, 8);
        const actStart = new Date(activeStart);
        const alreadyMin = prevMonth.getTime() === actStart.getTime();

        this.setState(prevState => {
            return {
                calendarStart: prevMonth.toISOString().slice(0, 7),
                isMinMonth: alreadyMin,
                isMaxMonth: false,
            };
        });
    }
    render () {
        const {
            startTxt,
            endTxt,
            doubleMonth,
            ...other
        } = this.props;

        const {
            calendarStart,
            isMinMonth,
            isMaxMonth,
        } = this.state;

        const [year, month] = getYearAndMonth(calendarStart);
        const startMonth = new Date(year, month - 1, 1, 8);
        const nextMonth = new Date(year, month, 1, 8);

        return (
            <div className="cy_rcln">
                <button
                    className={cx('prev', {
                        disabled: isMinMonth,
                    })}
                    onClick={this.goPrevMonth}
                />
                <button
                    className={cx('next', {
                        disabled: isMaxMonth,
                    })}
                    onClick={this.goNextMonth}
                />
                <CalendarBox
                    startTxt={startTxt}
                    endTxt={endTxt}
                    startMonth={startMonth}
                    {...other}
                />
                {
                    doubleMonth ?
                        <CalendarBox
                            startTxt={startTxt}
                            endTxt={endTxt}
                            startMonth={nextMonth}
                            {...other}
                        /> :
                        null
                }
            </div>
        );
    }
}

export default Module;