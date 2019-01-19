import React, { Component } from 'react';
import IntRcln from '../../../../magaele/int_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import NvbRslb from '../../../../magaele/nvb_rslb';
import CyRcmn from '../../../../magaele/cy_rcmn';
import dayjs from 'dayjs';

class DepDateRangeM extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedStartDate: dayjs().format('YYYY-MM-DD'),
            selectedEndDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
        };
    }

    componentDidMount () {
        this.setState({ zIndex: this.getHighestZIndex() });
    }

    calendar = null;
    // 取得最高 zindex
    getHighestZIndex () {
        let highestZIndex = 0;
        let currentZIndex = 0;
        let nodes = document.getElementsByTagName('*');
        for (let i = 0; i < nodes.length; i++) {
            currentZIndex = Number(window.getComputedStyle(nodes[i]).zIndex);
            if (currentZIndex > highestZIndex) {
                highestZIndex = currentZIndex;
            }
        }
        return highestZIndex + 1;
    }
    showCalendar (target) {
        this.setState(prevState => ({
            ...prevState,
            activeInput: target,
        }));
    }
    handleClose = () => {
        this.setState({
            activeInput: null,
        });
    }
    handleConfirm = () => {
        const {
            selectedStartDate,
            selectedEndDate,
        } = this.calendar.state;
        console.log(selectedStartDate);

        this.setState(prevState => ({
            selectedStartDate,
            selectedEndDate,
            activeInput: null,
        }), this.props.setPanelState({ FromDate: dayjs(selectedStartDate).format('YYYYMMDD'), ToDate: dayjs(selectedEndDate).format('YYYYMMDD') }));
    }
    render () {
        const { customClass } = this.props;
        const {
            selectedStartDate,
            selectedEndDate,
            activeInput,
        } = this.state;
        const visible = activeInput === 0 || activeInput === 1;
        return (
            <React.Fragment>
                <div className={customClass}>
                    <IntRcln
                        request
                        readOnly
                        placeholder="YYYY/MM/DD"
                        label="出發區間"
                        icon={<IcRcln name="tooldate" />}
                        onClick={() => { this.showCalendar(0) }}
                        value={dayjs(selectedStartDate).format('YYYY/MM/DD')}
                    />
                    <span className="cal_icon">~</span>
                    <IntRcln
                        readOnly
                        placeholder="YYYY/MM/DD"
                        onClick={() => { this.showCalendar(1) }}
                        value={dayjs(selectedEndDate).format('YYYY/MM/DD')}
                    />
                </div>
                <NvbRslb
                    visible={visible}
                    direction="right"
                    zIndex={this.state.zIndex}
                    className="confirmBtn_span_d-no"
                >
                    <span className="nvb_rslb_goBack" onClick={this.handleClose}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        visible && (
                            <CyRcmn
                                ClassName="mm"
                                doubleChoose
                                selectedStartDate={selectedStartDate}
                                selectedEndDate={selectedEndDate}
                                endMonth={dayjs().add(12, 'months').format('YYYY-MM')}
                                startDate={dayjs().add(1, 'days').format('YYYY-MM-DD')}
                                activeInput={activeInput}
                                startLabelTitle="最早出發日"
                                endLabelTitle="最晚出發日"
                                startTxt="最早"
                                endTxt="最晚"
                                ref={e => { this.calendar = e }}
                                onClickConfirm={this.handleConfirm}
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
    }
}

export default DepDateRangeM;