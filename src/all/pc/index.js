import Loadable from 'react-loadable';
import React, { PureComponent } from 'react';

import NtbRcln, { Tab } from '../../../magaele/ntb_rcln';
import IcRcln from '../../../magaele/ic_rcln';
import PpRcln from '../../../magaele/pp_rcln';
import '../css.scss';

const CustomComponent = (props) => {
    return (
        <div>
            <IcRcln name="toolif" />
        </div>
    );
};

// 彈出視窗的自訂模組
const ContentComponent1 = (props) => {
    return (
        <p>天數航班自己選</p>
    );
};
const ContentComponent2 = (props) => {
    return (
        <p>團體湊票享優惠</p>
    );
};
const Label3 = (props) => (
    <div>
        個人自由行
        <PpRcln
            CustomComponent={<CustomComponent />}
            ContentComponent={<ContentComponent1 />}
            events={['click', 'hover']}
            position={['bottom', 'horizon_center']}
        />
    </div>
);
const Label4 = (props) => (
    <div>
        團體自由行
        <PpRcln
            CustomComponent={<CustomComponent />}
            ContentComponent={<ContentComponent2 />}
            events={['click', 'hover']}
            position={['bottom', 'horizon_center']}
        />
    </div>
);

const MyLoadingComponent = (props) => {
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
};

const LoadComponent = (src, hrefTarget, emitRtow, flightRtow) => {
    const Component = Loadable({
        loader: () => src,
        loading: MyLoadingComponent,
    });
    return <Component hrefTarget={hrefTarget} emitRtow={emitRtow} rtow={flightRtow} />;
};

class SearchPanelAllPc extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            show: 0,
            flightRtow: 0
        };
    }

    changeWidth = (val) => {
        this.setState({
            flightRtow: val
        });
    }
    dischangeWidth = () => {
        this.setState({
            flightRtow: 0
        });
    }
    switchFlight = (show, hrefTarget) => {
        return (
            <NtbRcln
                activeTabIndex={0}
                customClass="search_panel_two"
                onClick={(i) => {
                    this.setState({ show: Number('1' + i) });
                    this.dischangeWidth();
                }}
            >
                <Tab label="國際機票預訂">
                    {(show === 1 || show === 10) && LoadComponent(import(/* webpackChunkName: "internationalFlight-pc" */ '../../flight/international/pc'), hrefTarget, this.changeWidth, this.state.flightRtow)}
                </Tab>
                <Tab label="大陸境內機票">
                    {show === 11 && LoadComponent(import(/* webpackChunkName: "chineseFlight-pc" */ '../../flight/chinese/pc'), hrefTarget)}
                </Tab>
                <Tab label="台灣境內機票">
                    {show === 12 && LoadComponent(import(/* webpackChunkName: "taiwanFlight-pc" */ '../../flight/taiwan/pc'), hrefTarget)}
                </Tab>
            </NtbRcln>
        );
    }
    switchVacation = (show, hrefTarget) => {
        return (
            <NtbRcln customClass="search_panel_two" onClick={(i) => this.setState({ show: Number('3' + i) })}>
                <Tab label="國外">
                    <NtbRcln activeTabIndex={0} customClass="search_panel_three" onClick={(j) => this.setState({ show: Number('30' + j) })}>
                        <Tab label={<Label3 />}>
                            {(show === 3 || show === 30 || show === 300) && LoadComponent(import(/* webpackChunkName: "personalVacation-pc" */ '../../vacation/personal/pc'), hrefTarget)}
                        </Tab>
                        <Tab label={<Label4 />}>
                            {(show === 30 || show === 301) && LoadComponent(import(/* webpackChunkName: "groupVacation-pc" */ '../../vacation/group/pc'), hrefTarget)}
                        </Tab>
                    </NtbRcln>
                </Tab>
                <Tab label="國內">
                    {show === 31 && LoadComponent(import(/* webpackChunkName: "taiwanVacation-pc" */ '../../vacation/taiwan/pc'), hrefTarget)}
                </Tab>
            </NtbRcln>
        );
    }
    handleChangeTab = (i) => {
        const { show } = this.state;
        if (String(show)[0] === String(i)) { return }
        this.setState({ show: i });
        this.dischangeWidth();
    }

    render () {
        const { show, flightRtow } = this.state;
        const { hrefTarget } = this.props;

        return (
            <NtbRcln
                activeTabIndex={show}
                onClick={(i) => this.handleChangeTab(i)}
                customClass={`search_panel_one search_panel_all_pc ${flightRtow === 3 ? 'search_panel-inFlight' : ''}`}
            >
                <Tab label="團體">
                    {show === 0 && LoadComponent(import(/* webpackChunkName: "travel-pc" */ '../../travel/pc'), hrefTarget)}
                </Tab>
                <Tab label="機票">
                    {String(show)[0] === '1' && this.switchFlight(show, hrefTarget)}
                </Tab>
                <Tab label="訂房">
                    {show === 2 && LoadComponent(import(/* webpackChunkName: "hotel-pc" */ '../../hotel/pc'), hrefTarget)}
                </Tab>
                <Tab label="自由行">
                    {String(show)[0] === '3' && this.switchVacation(show, hrefTarget)}
                </Tab>
                <Tab label="主題旅遊">
                    {show === 4 && LoadComponent(import(/* webpackChunkName: "themeTravel-pc" */ '../../themeTravel/pc'), hrefTarget)}
                </Tab>
                <Tab label={<span><span className="search_panel-block">票券</span>當地遊</span>}>
                    {show === 5 && LoadComponent(import(/* webpackChunkName: "activity-pc" */ '../../activity/pc'), hrefTarget)}
                </Tab>
            </NtbRcln>
        );
    }
}

export default SearchPanelAllPc;