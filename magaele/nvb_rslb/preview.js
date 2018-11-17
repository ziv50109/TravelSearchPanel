import React, { Component } from 'react';
import NvbRslb from './index.js';
import { storiesOf } from '@storybook/react';
import IcRcln from '../ic_rcln';

// 顯示的自訂內容
const ContentComponent = (props) => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

class Demo extends Component {
    state = {
        visible: false,
    };
    openPage = () => {
        this.setState({
            visible: true,
        });
    }
    render () {
        return (
            <div>
                <h2>Style:用 ContentComponent 傳content</h2>
                <button onClick={this.openPage}>
                    打開分頁
                </button>
                <NvbRslb
                    visible={this.state.visible}
                    ContentComponent={<ContentComponent />}
                    direction="right"
                    width="100%"
                />
            </div>
        );
    }
}

class Demo2 extends Component {
    state = {
        visible: false,
    };
    openPage = () => {
        this.setState({
            visible: true,
        });
    }
    closePage = () => {
        this.setState({
            visible: false,
        });
    }
    render () {
        return (
            <div>
                <h2>Style: 使用children傳content</h2>
                <button onClick={this.openPage}>
                    打開分頁
                </button>
                <NvbRslb
                    visible={this.state.visible}
                    direction="right"
                    width="100%"
                    className="custom"
                >
                    <span className="nvb_rslb_goBack" onClick={this.closePage}>
                        <IcRcln name="toolbefore" />
                    </span>
                    <h4>hello world</h4>
                </NvbRslb>
            </div>
        );
    }
}


storiesOf('導航列 (navbar)', module)
    .add('nvb_rslb', () => (
        <div>
            <Demo />
            <Demo2 />
        </div>
    ));
