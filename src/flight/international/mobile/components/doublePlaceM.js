import React from 'react';
import { flightInternational } from '../../../../../source.config';
import IntRcln from '../../../../../magaele/int_rcln';
import IcRcln from '../../../../../magaele/ic_rcln';
import NvbRslb from '../../../../../magaele/nvb_rslb';
import SingleInputMenuFM from '../../../../shared/SingleInputMenu/SingleInputMenuFM';

const DoublePlace = (props) => {
    const fetchPath = flightInternational.place;
    return (
        <React.Fragment>
            <div className={props.customClass}>
                <IntRcln
                    request
                    value={props.value1}
                    onClick={props.nvbOpen1}
                    label="出發地"
                    placeholder="城市/國家/機場"
                    breakline
                    readOnly
                />
                <div className="changeBtn" onClick={props.switch} />
                <IntRcln
                    request
                    value={props.value2}
                    onClick={props.nvbOpen2}
                    label="目的地"
                    placeholder="城市/國家/機場"
                    breakline
                    readOnly
                />
            </div>
            <NvbRslb
                className="panel-nvb_rslb flight_m_place"
                visible={props.visible1}
                direction="right"
            >
                <span className="nvb_rslb_goBack" onClick={props.nvbClose1}>
                    <IcRcln name="toolbefore" />
                </span>
                {
                    props.visible1 &&
                    <SingleInputMenuFM
                        className="SingleInputMenu"
                        isRequired
                        size="lg"
                        label={'出發地'}
                        iconName={'toolmap'}
                        fetchPath={fetchPath}
                        selectedData={props.selectDate1}
                        placeholder="城市/國家/機場"
                        minimumStringQueryLength={2}
                        minimumStringQuery="請輸入至少兩個文字"
                        noMatchText="很抱歉，找不到符合的項目"
                        subLabel="找不到選項？請輸入關鍵字查詢"
                        onChange={props.onChange1}
                    />
                }
            </NvbRslb>
            <NvbRslb
                className="panel-nvb_rslb flight_m_place"
                visible={props.visible2}
                direction="right"
            >
                <span className="nvb_rslb_goBack" onClick={props.nvbClose2}>
                    <IcRcln name="toolbefore" />
                </span>
                {
                    props.visible2 &&
                    <SingleInputMenuFM
                        className="SingleInputMenu"
                        isRequired
                        size="lg"
                        label={'目的地'}
                        iconName={'toolmap'}
                        fetchPath={fetchPath}
                        selectedData={props.selectDate2}
                        placeholder="城市/國家/機場"
                        minimumStringQueryLength={2}
                        minimumStringQuery="請輸入至少兩個文字"
                        noMatchText="很抱歉，找不到符合的項目"
                        subLabel="找不到選項？請輸入關鍵字查詢"
                        onChange={props.onChange2}
                    />
                }
            </NvbRslb>
        </React.Fragment>
    );
};

export default DoublePlace;