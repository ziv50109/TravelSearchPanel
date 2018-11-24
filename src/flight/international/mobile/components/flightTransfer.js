import React, { Component } from 'react';
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

    getSelectDate = (data, keyword) => {
        let arr = [];
        if (typeof data === 'object') {
            arr.push(data);
        }
        if (this.props.setNonprefertrans) {
            if (arr.length > 0) {
                this.props.setNonprefertrans('nonprefertrans', arr[0].country);
            } else {
                this.props.setNonprefertrans('nonprefertrans', '');
            }
        }


        this.setState({
            selectPlace: arr,
            selectedDataMkeyword: arr.length ? keyword : '',
            nvbOpen: false
        });
    }

    render () {
        const { selectPlace, selectedDataMkeyword, nvbOpen } = this.state;
        return (
            <div className={this.props.customClass}>
                <IntRcln
                    request
                    value={selectedDataMkeyword || ''}
                    onClick={() => this.openAndClose('nvbOpen', true)}
                    label="排除轉機國家"
                    placeholder="請輸入國家"
                    breakline
                    readOnly
                />
                <NvbRslb
                    className="panel-nvb_rslb"
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
                            label={'出發地'}
                            iconName={'toolmap'}
                            fetchPath={this.props.fetchPath}
                            selectedData={selectPlace}
                            placeholder="請輸入國家/城市/機場"
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