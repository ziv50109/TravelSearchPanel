import React, { Component } from 'react';
import './css.scss';
// components
import DepAndDtnPlace from './components/DepAndDtnPlace';
import DepAndDtnDate from './components/DepAndDtnDate';
import Accommodation from './components/Accommodation';

class Panel extends Component {
    constructor (props) {
        super(props);
        this.state = { };
    }
    render () {
        return (
            <div className="tw_vacation_product">
                {/* 左區塊 */}
                <div className="left">
                    <DepAndDtnPlace customClass={'pc_DepAndDtnPlace'} />
                    <DepAndDtnDate customClass={'pc_DepAndDtnDate'} />
                </div>
                {/* 中間 */}
                <div className="middle">
                    <Accommodation />
                </div>
                {/* 右邊 */}
                <div className="right"></div>
            </div>
        );
    }
}

export default Panel;