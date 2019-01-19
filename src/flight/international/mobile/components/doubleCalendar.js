import React from 'react';
import IntRcln from '../../../../../magaele/int_rcln';
import IcRcln from '../../../../../magaele/ic_rcln';
import NvbRslb from '../../../../../magaele/nvb_rslb';
import CyRcmn from '../../../../../magaele/cy_rcmn';
import today from 'dayjs';

const DoubleCalendar = (props) => {
    const visible = props.activeInput === 0 || props.activeInput === 1;
    return (
        <React.Fragment>
            <div className={props.customClass}>
                <IntRcln
                    request
                    label="去程日期"
                    placeholder="YYYY/MM/DD"
                    icon={<IcRcln name="tooldate" />}
                    onClick={props.nvbOpen1}
                    value={props.startDate.replace(/\-/g, '/')}
                    readOnly
                />
                <IntRcln
                    request
                    label="回程日期"
                    placeholder="YYYY/MM/DD"
                    breakline
                    onClick={props.nvbOpen2}
                    value={props.endDate.replace(/\-/g, '/')}
                    readOnly
                />
            </div>
            <NvbRslb
                className="flight_m_calendar"
                visible={visible}
                direction="right"
            >
                <span className="nvb_rslb_goBack" onClick={props.nvbClose}>
                    <IcRcln name="toolbefore" />
                </span>
                {
                    visible && (
                        <CyRcmn
                            doubleChoose
                            selectedStartDate={props.startDate}
                            selectedEndDate={props.endDate}
                            activeInput={props.activeInput}
                            startMonth={today().format('YYYY-MM')}
                            endMonth={today().add(12, 'months').format('YYYY-MM')}
                            startDate={today().format('YYYY-MM-DD')}
                            endDate={today().add(361, 'days').format('YYYY-MM-DD')}
                            startLabelTitle="去程日期"
                            endLabelTitle="回程日期"
                            ref={props.calendarRef}
                            onClickConfirm={props.confirmDate}
                            customDiffTxt={diffDate => {
                                const showTxt = diffDate + 1;
                                return '共' + showTxt + '天';
                            }}
                        />
                    )
                }
            </NvbRslb>
        </React.Fragment>
    );
};

export default DoubleCalendar;