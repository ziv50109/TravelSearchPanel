import React from 'react';
import IntRcln from '../../../../magaele/int_rcln';
import IcRcln from '../../../../magaele/ic_rcln';
import NvbRslb from '../../../../magaele/nvb_rslb';
import BtRcnb from '../../../../magaele/bt_rcnb';
import App from '../components/App';
import { activity } from '../../../../source.config';

import '../../activity.scss';

const Taiwan = (props) => {
    return (
        <React.Fragment>
            <IntRcln
                className="outSideSearchInput wrapper-xs m-t-sm"
                value={props.outsideInputValue}
                placeholder="輸入城市、景點、體驗行程或活動名稱"
                onClick={() => props.openPage(2)}
                readOnly
            />
            <NvbRslb
                visible={props.nvbRslbVisible}
                direction="right"
                className="activityM custom"
            >
                <span className="nvb_rslb_goBack fz-xxl" onClick={props.closePage}>
                    <IcRcln name="toolbefore" />
                </span>
                <App
                    home={true} // 告訴 Component 這是國內
                    fetchData={activity.ticketTaiwan}
                    selectedData={props.appSelectedData}
                    showAct={props.appSelectedData.txt ? true : false}
                    dtmLevelKey={['vLine', 'vLinetravel', 'vLinewebarea']}
                    onClickItem={props.onClickItem}
                />
            </NvbRslb>
            <BtRcnb
                className="w-full btn-wrap search b-no" lg radius
                whenClick={props.handlePost}
            >搜尋</BtRcnb>
        </React.Fragment>
    );
};

export default Taiwan;
