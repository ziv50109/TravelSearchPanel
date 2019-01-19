import Loadable from 'react-loadable';
import React, { PureComponent } from 'react';

import NtbRcln, { Tab } from '../../../magaele/ntb_rcln';
import IcRcln from '../../../magaele/ic_rcln';
import PpRcln from '../../../magaele/pp_rcln';
import LbxRcln from '../../component/LbxRcln';
import '../css.scss';

const CustomComponent = (props) => {
    return (
        <div className="icRcln_custom" onClick={props.onClick}>
            <IcRcln name="toolif" />
        </div>
    );
};

// 彈出視窗的自訂模組
const ContentComponent1 = (props) => {
    return (
        <p className={props.className}>天數航班自己選</p>
    );
};
const ContentComponent2 = (props) => {
    return (
        <p className={props.className}>團體湊票享優惠</p>
    );
};

const Label3 = (props) => {
    const handleClick = () => {
        props.toggleLbxRcln(0);
    };
    return (
        <div>
            個人自由行
            <div className="icRcln_custom" onClick={handleClick}>
                <IcRcln name="toolif" />
            </div>
            <LbxRcln open={props.openLbx === 0} closeLbxRcln={() => props.toggleLbxRcln(null)}>
                <ContentComponent1 className="lbx_wrap" />
            </LbxRcln>
        </div>
    );
};
const Label4 = (props) => {
    const handleClick = () => {
        props.toggleLbxRcln(1);
    };
    return (
        <div>
            團體自由行
            <div className="icRcln_custom" onClick={handleClick}>
                <IcRcln name="toolif" />
            </div>
            <LbxRcln open={props.openLbx === 1} closeLbxRcln={() => props.toggleLbxRcln(null)}>
                <ContentComponent2 className="lbx_wrap" />
            </LbxRcln>
        </div>
    );
};

const MyLoadingComponent = (props) => {
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
};

const LoadComponent = (src, hrefTarget) => {
    const Component = Loadable({
        loader: () => src,
        loading: MyLoadingComponent,
    });
    return <Component hrefTarget={hrefTarget} />;
};

class SearchPanelAllMobile extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            show: 0,
            openLbx: null
        };
    }

    toggleLbxRcln = (value) => {
        this.setState({ openLbx: value });
    }
    switchFlight = (show, hrefTarget) => {
        return (
            <NtbRcln activeTabIndex={0} customClass="search_panel_two" onClick={(i) => this.setState({ show: Number('1' + i) })}>
                <Tab label="國際機票預訂">
                    {(show === 1 || show === 10) && LoadComponent(import(/* webpackChunkName: "internationalFlight-m" */ '../../flight/international/mobile'), hrefTarget)}
                </Tab>
                <Tab label="大陸境內機票">
                    {show === 11 && LoadComponent(import(/* webpackChunkName: "chineseFlight-m" */ '../../flight/chinese/mobile'), hrefTarget)}
                </Tab>
                <Tab label="台灣境內機票">
                    {show === 12 && LoadComponent(import(/* webpackChunkName: "taiwanFlight-m" */ '../../flight/taiwan/mobile'), hrefTarget)}
                </Tab>
            </NtbRcln>
        );
    }
    switchVacation = (show, hrefTarget) => {
        return (
            <NtbRcln activeTabIndex={0} customClass="search_panel_two" onClick={(i) => this.setState({ show: Number('3' + i) })}>
                <Tab label="國外">
                    <NtbRcln activeTabIndex={0} customClass="search_panel_three" onClick={(j) => this.setState({ show: Number('30' + j) })}>
                        <Tab label={<Label3 openLbx={this.state.openLbx} toggleLbxRcln={this.toggleLbxRcln} />}>
                            {(show === 3 || show === 30 || show === 300) && LoadComponent(import(/* webpackChunkName: "personalVacation-m" */ '../../vacation/personal/mobile'), hrefTarget)}
                        </Tab>
                        <Tab label={<Label4 openLbx={this.state.openLbx} toggleLbxRcln={this.toggleLbxRcln} />}>
                            {(show === 30 || show === 301) && LoadComponent(import(/* webpackChunkName: "groupVacation-m" */ '../../vacation/group/mobile'), hrefTarget)}
                        </Tab>
                    </NtbRcln>
                </Tab>
                <Tab label="國內">
                    {show === 31 && LoadComponent(import(/* webpackChunkName: "taiwanVacation-m" */ '../../vacation/taiwan/mobile'), hrefTarget)}
                </Tab>
            </NtbRcln>
        );
    }
    handleChangeTab = (i) => {
        const { show } = this.state;
        if (String(show)[0] === String(i)) { return }
        this.setState({ show: i });
    }
    render () {
        const { show } = this.state;
        const { hrefTarget } = this.props;

        return (
            <NtbRcln activeTabIndex={show} onClick={(i) => this.handleChangeTab(i)} customClass="search_panel_one search_panel_all_mobile">
                <Tab label="團體">
                    {show === 0 && LoadComponent(import(/* webpackChunkName: "travel-m" */ '../../travel/mobile'), hrefTarget)}
                </Tab>
                <Tab label="機票">
                    {String(show)[0] === '1' && this.switchFlight(show, hrefTarget)}
                </Tab>
                <Tab label="訂房">
                    {show === 2 && LoadComponent(import(/* webpackChunkName: "hotel-m" */ '../../hotel/mobile'), hrefTarget)}
                </Tab>
                <Tab label="自由行">
                    {String(show)[0] === '3' && this.switchVacation(show, hrefTarget)}
                </Tab>
                <Tab label={<span><span className="search_panel-block">主題</span>旅遊</span>}>
                    {show === 4 && LoadComponent(import(/* webpackChunkName: "themeTravel-m" */ '../../themeTravel/mobile'), hrefTarget)}
                </Tab>
                <Tab label={<span><span className="search_panel-block">票券</span>當地遊</span>}>
                    {show === 5 && LoadComponent(import(/* webpackChunkName: "activity-m" */ '../../activity/mobile'), hrefTarget)}
                </Tab>
            </NtbRcln>
        );
    }
}

export default SearchPanelAllMobile;