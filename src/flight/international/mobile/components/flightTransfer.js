import React, { Component } from 'react';
import { flightInternational } from '../../../../../source.config';
import IntRcln from '../../../../../magaele/int_rcln';
import NvbRslb from '../../../../../magaele/nvb_rslb';
import SingleInputMenuFMdischange from '../../../../shared/SingleInputMenu/SingleInputMenuFMdischange';
import IcRcln from '../../../../../magaele/ic_rcln';

class FlightTransfer extends Component {
    state = {
        selectedDataMkeyword: '',
        selectPlace: [],
        nvbOpen: false,
    }

    openAndClose = (key, val) => {
        this.setState({ [key]: val });
    }

    getSelectDate = (data) => {
        if (this.props.setNonprefertrans) {
            if (data.length > 0) {
                this.props.setNonprefertrans('nonprefertrans', data[0].country);
            } else {
                this.props.setNonprefertrans('nonprefertrans', '');
            }
        }


        this.setState({
            selectPlace: data,
            selectedDataMkeyword: data.length ? data[0].txt : '',
            nvbOpen: false
        });
    }

    render () {
        const { selectPlace, selectedDataMkeyword, nvbOpen } = this.state;
        return (
            <div className={this.props.customClass}>
                <IntRcln
                    value={selectedDataMkeyword || ''}
                    onClick={() => this.openAndClose('nvbOpen', true)}
                    label="排除轉機國家"
                    placeholder="請輸入國家"
                    breakline
                    readOnly
                />
                <NvbRslb
                    className="panel-nvb_rslb flight_m_place"
                    visible={nvbOpen}
                    direction="right"
                >
                    <span className="nvb_rslb_goBack" onClick={() => this.openAndClose('nvbOpen', false)}>
                        <IcRcln name="toolbefore" />
                    </span>
                    {
                        nvbOpen &&
                        <SingleInputMenuFMdischange
                            className="SingleInputMenu"
                            isRequired
                            size="lg"
                            label={'排除轉機國家'}
                            iconName={'toolmap'}
                            fetchPath={flightInternational.filter}
                            selectedData={selectPlace}
                            placeholder="城市/國家/機場"
                            minimumStringQueryLength={2}
                            minimumStringQuery="請輸入至少兩個文字"
                            noMatchText="很抱歉，找不到符合的項目"
                            subLabel="找不到選項？請輸入關鍵字查詢"
                            onChange={this.getSelectDate}
                        />
                    }
                </NvbRslb>
            </div>
        );
    }
}

export default FlightTransfer;