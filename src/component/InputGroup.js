import React, { PureComponent } from 'react';
import IntRcln from '../../magaele/int_rcln';
import IcRcln from '../../magaele/ic_rcln';

class Demo extends PureComponent {
    render () {
        return (
            <div className="input_group">
                <IntRcln
                    placeholder="請輸入"
                    label="出發地"
                    icon={<IcRcln name="toolmember" />}
                    breakline
                />
                <span className="cal_icon">~</span>
                <IntRcln
                    placeholder="請輸入"
                    label="目的地"
                    breakline
                />
            </div>
        );
    }
}

export default Demo;