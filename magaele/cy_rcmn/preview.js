import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import dayjs from 'dayjs';
import CyRcmn from './index.js';
import NvbRslb from '../nvb_rslb';
import IcRcln from '../ic_rcln';

class MobileDemo extends Component {
    state = {
        selectedStartDate: '',
        selectedEndDate: '',
        activeInput: null,
    }
    calendar = null;
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

        this.setState(prevState => ({
            selectedStartDate,
            selectedEndDate,
            activeInput: null,
        }));
    }
    render () {
        const {
            selectedStartDate,
            selectedEndDate,
            activeInput,
        } = this.state;

        const st = {
            'border': '1px solid #ddd',
            'margin': '5px',
            'padding': '5px',
        };

        const visible = activeInput === 0 || activeInput === 1;

        return (
            <div>
                <div style={st} onClick={() => { this.showCalendar(0) }}>
                    <span>選擇開始日期: </span>
                    <span>{selectedStartDate}</span>
                </div>
                <div style={st} onClick={() => { this.showCalendar(1) }}>
                    <span>選擇結束日期: </span>
                    <span>{selectedEndDate}</span>
                </div>
                <NvbRslb
                    visible={visible}
                    direction="right"
                >
                    <span className="nvb_rslb_goBack" onClick={this.handleClose}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        visible && (
                            <CyRcmn
                                doubleChoose
                                selectedStartDate={selectedStartDate}
                                selectedEndDate={selectedEndDate}
                                activeInput={activeInput}
                                startMonth={dayjs().format('YYYY-MM')}
                                endMonth={dayjs().add(12, 'months').format('YYYY-MM')}
                                startDate="2018-10-15"
                                endDate="2019-08-12"
                                startLabelTitle="入住日期"
                                endLabelTitle="退房日期"
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
            </div>
        );
    }
}

class MobileDemo2 extends Component {
    state = {
        selectedStartDate: '',
        showCalendar: false,
    }
    calendar = null;
    showCalendar = () => {
        this.setState(prevState => ({
            ...prevState,
            showCalendar: true,
        }));
    }
    handleClose = () => {
        this.setState({
            showCalendar: false,
        });
    }
    handleConfirm = () => {
        const {
            selectedStartDate,
        } = this.calendar.state;

        this.setState(prevState => ({
            selectedStartDate,
            showCalendar: false,
        }));
    }
    render () {
        const {
            selectedStartDate,
            showCalendar,
        } = this.state;

        const st = {
            'border': '1px solid #ddd',
            'margin': '5px',
            'padding': '5px',
        };

        return (
            <div>
                <div style={st} onClick={this.showCalendar}>
                    <span>選擇日期: </span>
                    <span>{selectedStartDate}</span>
                </div>
                <NvbRslb
                    visible={showCalendar}
                    direction="right"
                >
                    <span className="nvb_rslb_goBack" onClick={this.handleClose}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        showCalendar && (
                            <CyRcmn
                                selectedStartDate={selectedStartDate}
                                startLabelTitle="入住日"
                                ref={e => { this.calendar = e }}
                                onClickConfirm={this.handleConfirm}
                            />
                        )
                    }
                </NvbRslb>
            </div>
        );
    }
}



storiesOf('月曆 (calendar)', module).add('cy_rcmn', () => (
    <div className="">
        <h2>Mobile月曆 雙月曆</h2>
        <MobileDemo />
        <h2>Mobile月曆 單選</h2>
        <MobileDemo2 />
    </div>
));
