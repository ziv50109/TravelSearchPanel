import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import dayjs from 'dayjs';
import {
    getYearAndMonth,
    getNowMonth,
} from '../../../utils';
import CalendarBox, { Week } from '../../cy_rcln/components/CalendarBox';
import '../css.scss';

function diffDate (date1, date2) {
    if (!date1.length || !date2.length) return '?';
    const d1 = new Date(date1).getTime();
    const d2 = new Date(date2).getTime();
    const timeDiff = d2 - d1;
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff;
}

function getToday () {
    return new Date().toISOString().slice(0, 10);
}

// 拿到今天月份後第六個月的月份
function todayAfterSixMonth () {
    const CurrentDate = new Date();
    CurrentDate.setMonth(CurrentDate.getMonth() + 6);
    return CurrentDate.toISOString().slice(0, 7);
}

const DateLabel = ({
    isStart = false,
    isActive = false,
    title,
    date,
    onClick = () => {},
}) => {
    const d = date.split('-');
    const MM = d.length > 1 && d[1];
    const DD = d.length > 1 && d[2];

    return (
        <div
            className={cx({
                'start_section': isStart,
                'end_section': !isStart,
                active: isActive,
            })}
            onClick={onClick}
        >
            <h5 className="title">{title}</h5>
            <div className="date">
                {
                    !date.length ?
                        null :
                        `${MM}月${DD}日`
                }
            </div>
        </div>
    );
};

class Module extends PureComponent {
    static defaultProps = {
        doubleChoose: false, // 選一天或選兩天
        activeInput: 0,
        startLabelTitle: '去程',
        endLabelTitle: '回程',
        onDateClickCallBack: () => {}, // 選完日期的 call back. return: activeInput, date
        onClickConfirm: () => {},
        customDiffTxt: txt => txt,
        startDate: getToday(), // 最小可選日
        endDate: '', // 最大可選日
        startMonth: getNowMonth(), // 月曆從幾月份開始畫
        endMonth: todayAfterSixMonth(),
        panelName: '' // 傳入面板名稱
    };

    static propTypes = {
        onDateClick: PropTypes.func,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        doubleChoose: PropTypes.bool,
        activeInput: PropTypes.oneOf([0, 1]),
        startLabelTitle: PropTypes.string,
        endLabelTitle: PropTypes.string,
        onDateClickCallBack: PropTypes.func,
        onClickConfirm: PropTypes.func,
        customDiffTxt: PropTypes.func,
        startMonth: PropTypes.string,
        endMonth: PropTypes.string,
        panelName: PropTypes.string,
    };

    state = {
        selectedStartDate: this.props.selectedStartDate || '',
        selectedEndDate: this.props.selectedEndDate || '',
        activeInput: this.props.activeInput,
        startDate: this.calcStartDate(),
        monthRange: this.calcMonthArray(),
    };

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.endMonth !== this.props.endMonth) {
            this.updateMonthRange();
        }
    }
    updateMonthRange = () => {
        this.setState({
            monthRange: this.calcMonthArray()
        });
    }

    calcStartDate () {
        const {
            startDate,
            activeInput,
            selectedStartDate,
        } = this.props;

        const isStart = (activeInput === 0);
        if (isStart) {
            return startDate;
        } else {
            return selectedStartDate ? selectedStartDate : startDate;
        }
    }

    calcMonthArray () {
        const {
            startMonth,
            endMonth,
        } = this.props;

        const [year, month] = getYearAndMonth(startMonth);
        const [y2, m2] =  getYearAndMonth(endMonth);

        // 計算startMonth 跟 endMonth差幾個月
        let diffmonth = (y2 - year) * 12;
        diffmonth -= (month - 1);
        diffmonth += m2;

        return [...new Array(diffmonth)].map((v, i) => {
            return new Date(year, month - 1 + i, 1, 8);
        });
    }

    startDateValueRule = (date) => {
        const {
            activeInput,
            selectedStartDate
        } = this.state;
        const { panelName } = this.props;
        const isStart = (activeInput === 0);

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
    onDateClick = (date) => {
        const { activeInput } = this.state;

        const {
            doubleChoose,
            startDate,
        } = this.props;

        const isStart = (activeInput === 0);
        const startDateValue = this.startDateValueRule(date);
        const endDateValue = isStart ? '' : date;
        const start = doubleChoose ?
            (isStart ? startDateValue : startDate) :
            startDate;
        this.setState(prevState => ({
            ...prevState,
            startDate: start,
            selectedStartDate: startDateValue,
            selectedEndDate: endDateValue,
            activeInput: doubleChoose ?
                (isStart ? 1 : 0)
                : 0,
        }));
        this.props.onDateClickCallBack && this.props.onDateClickCallBack(activeInput, date);
    }

    setStartDay = (start, activeInput) => {
        const {
            selectedStartDate
        } = this.state;
        const {
            panelName
        } = this.props;
        switch (panelName) {
            case 'hotel':
                if (activeInput === 1 && selectedStartDate !== '') {
                    return dayjs(selectedStartDate).format('YYYY-MM-DD');
                }
                return dayjs().add(1, 'days').format('YYYY-MM-DD');
            case '':
            default:
                return start;
        }
    }

    setEndDay = () => {
        const {
            panelName,
            endDate
        } = this.props;

        const {
            activeInput,
            selectedStartDate,
        } = this.state;

        switch (panelName) {
            case 'hotel':
                if (activeInput === 1 && selectedStartDate !== '') {
                    return dayjs(selectedStartDate).add(14, 'days').format('YYYY-MM-DD');
                }
                return endDate;
            case 'vacationPersonal':
                return dayjs(selectedStartDate).add(30, 'days').format('YYYY-MM-DD');
            case '':
            default:
                return endDate;
        }
    }

    switchLabel = (target) => {
        const {
            selectedStartDate,
        } = this.state;
        const {
            startDate,
        } = this.props;

        // const isStart = (target === 0);
        const start = selectedStartDate || startDate;

        this.setState(prevState => ({
            ...prevState,
            startDate: this.setStartDay(start, target),
            activeInput: target,
        }));

        this.props.switchLabelCallBack && this.props.switchLabelCallBack(target, selectedStartDate);
    }

    render () {
        const {
            startTxt,
            endTxt,
            doubleChoose,
            startLabelTitle,
            endLabelTitle,
            onClickConfirm,
            customDiffTxt,
        } = this.props;

        const {
            activeInput,
            selectedStartDate,
            selectedEndDate,
            startDate,
            monthRange,
        } = this.state;

        const props = {
            startDate,
            endDate: this.setEndDay(),
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            doubleChoose,
            isMobile: true,
            onDateClick: this.onDateClick,
        };

        const dayDiff = diffDate(selectedStartDate, selectedEndDate);
        const showTxt = customDiffTxt(dayDiff);

        return (
            <div className="cy_rcln">
                <div className="label_box">
                    <div className="selected_info">
                        <DateLabel
                            isStart
                            isActive={activeInput === 0}
                            title={startLabelTitle}
                            date={selectedStartDate}
                            onClick={() => { this.switchLabel(0) }}
                        />
                        {
                            doubleChoose ?
                                <DateLabel
                                    isActive={activeInput !== 0}
                                    title={endLabelTitle}
                                    date={selectedEndDate}
                                    onClick={() => { this.switchLabel(1) }}
                                /> :
                                null
                        }
                    </div>
                    <Week />
                </div>
                <div className="calendar_content">
                    {
                        monthRange.map(v => (
                            <CalendarBox key={v} startMonth={v} {...props} />
                        ))
                    }
                </div>
                <button className="confirm_btn" onClick={onClickConfirm}>
                    確定
                    {
                        dayDiff === '?' ? null : <span>{`(${showTxt})`}</span>
                    }
                </button>
            </div>
        );
    }
}


export default Module;
