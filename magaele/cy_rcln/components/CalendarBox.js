import React, { PureComponent } from 'react';
import cx from 'classnames';
import Proptypes from 'prop-types';
import { getYearAndMonth } from '../../../utils';
import '../css.scss';

const Week = () => (
    <div className="week">
        <span className="sun holiday">日</span>
        <span className="mon">一</span>
        <span className="tue">二</span>
        <span className="wed">三</span>
        <span className="thu">四</span>
        <span className="fri">五</span>
        <span className="sat holiday">六</span>
    </div>
);

const WeekRow = ({
    dayArray,
    onDateClick,
}) => {
    return (
        <div className="week_row">
            {
                dayArray.map((v, i) => {
                    if (typeof v === 'undefined') return <EmptyDay key={`empty${i}`} />;
                    return (
                        <Day
                            key={v.date}
                            date={v.date}
                            onClick={onDateClick}
                            active={v.active}
                            txt={v.txt}
                            isBetween={v.isBetween}
                            isStart={v.isStart}
                            isEnd={v.isEnd}
                            isDisabled={v.isDisabled}
                            isHover={v.isHover}
                            setHoverDate={v.setHoverDate}
                        />
                    );
                })
            }
        </div>
    );
};

const YearMonth = ({
    year,
    month,
    isMobile,
}) => (
    <div className="year_month">
        <p className="title">{`${year}年${month}月`}</p>
        {
            isMobile ? null : <Week />
        }
    </div>
);

const EmptyDay = () => (
    <div className="date empty"></div>
);

const Day = ({
    isBetween,
    date,
    txt = '',
    active = false,
    isStart = false,
    isEnd = false,
    isDisabled = false,
    isHover = false,
    onClick = (date) => { console.log(date) },
    onMouseEnter = () => {},
}) => {
    const dateStr = date.toISOString();
    // 去除0
    const dateVal = dateStr.slice(0, 10);
    const showday = dateStr.slice(8, 10).replace(/0+(\d)/gi, '$1');
    return (
        <div
            className={cx('date', {
                active: active,
                isBetween: isBetween,
                startDay: isStart,
                endDay: isEnd,
                disabled: isDisabled,
                isHover: isHover,
            })}
            onClick={() => {
                if (isDisabled) return;
                onClick(dateVal);
            }}
            onMouseEnter={() => {
                if (isDisabled) return;
                onMouseEnter(dateVal);
            }}
        >
            <div className="date_box">
                <span className="date_num">{showday}</span>
                <span className="txt">{txt}</span>
            </div>
        </div>
    );
};

class CalendarBox extends PureComponent {
    static defaultProps = {
        selectedStartDate: '',
        selectedEndDate: '',
        startTxt: '去程',
        endTxt: '回程',
        startDate: null,
        endDate: null,
        isMobile: false,
        setHoverDate: () => {},
        onDateClick: () => {},
    };

    static propTypes = {
        isMobile: Proptypes.bool,
        onDateClick: Proptypes.func,
    };

    calcDayArray () {
        const {
            selectedStartDate,
            selectedEndDate,
            startTxt,
            endTxt,
            startDate,
            endDate,
            doubleChoose,
            startMonth,
        } = this.props;

        // 該月第一天是禮拜幾
        const firstDay = startMonth.getDay();
        const [year, month] = getYearAndMonth(startMonth.toISOString().slice(0, 7));
        const date = new Date(year, month, 0);
        const daysLength = date.getDate();
        const minDate = new Date(startDate).getTime(); // 最小可選日
        const maxDate = new Date(endDate).getTime(); // 最大可選日
        const selectStart = new Date(selectedStartDate).getTime(); // 已選出發日
        const selectedEnd = new Date(selectedEndDate).getTime(); // 已選結束日
        const hasStartAndEnd = selectedStartDate.length > 0 && selectedEndDate.length > 0;
        const result = [...new Array(daysLength)].map((v, i) => {
            const thisDay = new Date(year, month - 1, i + 1, 8);
            const thisTime = thisDay.getTime();
            const isStart = thisTime === selectStart;
            const isEnd = thisTime === selectedEnd;
            const isBetween = doubleChoose && thisTime > selectStart && thisTime < selectedEnd;
            const dateObj =  {
                date: thisDay,
                active: isStart || isEnd,
                txt: isStart ?
                    startTxt :
                    isEnd ? endTxt : '',
                isBetween,
                isStart: hasStartAndEnd && isStart, // 兩天都選取才加
                isEnd: hasStartAndEnd && isEnd,
                isDisabled: (startDate && thisTime < minDate) ||
                    (endDate && thisTime > maxDate),
            };

            return dateObj;
        });

        // firDay前面補空日期, 補滿成7天
        result.unshift(...[...new Array(firstDay)]);
        // 計算陣列離42還差幾天
        const lastDay = 42 - result.length;
        result.push(...[...new Array(lastDay)]);

        return result;
    }

    calcWeekRow () {
        const dayArray = this.calcDayArray();
        const weekRowArray = [];

        for (let i = 0; i < 6; i++) {
            weekRowArray.push(dayArray.splice(0, 7));
        }

        return weekRowArray;
    }
    render () {
        const {
            onDateClick,
            setHoverDate,
            isMobile,
            startMonth,
        } = this.props;

        const weekRow = this.calcWeekRow();

        return (
            <div className="calendar_box">
                <YearMonth
                    year={startMonth.getFullYear()}
                    month={startMonth.getMonth() + 1}
                    isMobile={isMobile}
                />
                <div
                    className="month_box"
                    onMouseLeave={() => { setHoverDate(null) }}
                >
                    {
                        weekRow.map((v, i) => (
                            <WeekRow
                                key={`week${i}`}
                                dayArray={v}
                                onDateClick={onDateClick}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export { Week };
export default CalendarBox;