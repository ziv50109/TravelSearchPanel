import React from 'react';
import IntRcln from '../../../../../magaele/int_rcln';
import IcRcln from '../../../../../magaele/ic_rcln';
import NvbRslb from '../../../../../magaele/nvb_rslb';
import CyRcmn from '../../../../../magaele/cy_rcmn';
import today from 'dayjs';

const SingleCalendar = (props) => {
    return (
        <React.Fragment>
            <div className={props.customClass}>
                <IntRcln
                    request
                    value={props.dateVal.replace(/\-/g, '/')}
                    label="去程日期"
                    placeholder="YYYY/MM/DD"
                    icon={<IcRcln name="tooldate" />}
                    onClick={props.nvbOpen}
                    readOnly
                />
            </div>
            <NvbRslb
                className="flight_m_calendar"
                visible={props.visible}
                direction="right"
            >
                <span className="nvb_rslb_goBack" onClick={props.nvbClose}>
                    <IcRcln name="toolbefore" />
                </span>
                {
                    props.visible && (
                        <CyRcmn
                            selectedStartDate={props.dateVal}
                            startLabelTitle="去程日期"
                            startDate={props.startDate}
                            endMonth={today().add(12, 'months').format('YYYY-MM')}
                            endDate={today().add(361, 'days').format('YYYY-MM-DD')}
                            ref={props.calendarRef}
                            onClickConfirm={props.confirmDate}
                        />
                    )
                }
            </NvbRslb>
        </React.Fragment>
    );
};

export default SingleCalendar;