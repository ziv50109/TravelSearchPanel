/* eslint-disable complexity */
import Loadable from 'react-loadable';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import '@babel/polyfill';

// loading 時的 component
const MyLoadingComponent = (props) => {
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
};

// 暴露在全域的方法
const SearchPanel = function (opts = {}) {
    const {
        width,
        panel,
        type,
        target,
        mTitle,
        mCloseBtn,
        renderNode
    } = opts;

    this.width = width || 'search_panel-sm';
    this.panel = panel;
    this.type = type;
    this.target = target || '_blank';
    this.mTitle = mTitle || '搜尋引擎';
    this.mCloseBtn = mCloseBtn;
    this.renderNode = document.getElementById(renderNode);
    this.allPanel = [
        'travel',
        'internationalFlight', 'chineseFlight', 'taiwanFlight',
        'hotel',
        'personalVacation', 'groupVacation', 'taiwanVacation',
        'themeTravel',
        'activity',
        'all',
        'tw_vacationSearch'
    ];
    this.isTwPanel = false;

    this.panelClass = classNames({
        'search_panel-singlePanel': this.panel !== 'all' && this.panel !== '',
        'search_panel-m': this.type === 'm',
        'search_panel-pc': this.type === 'pc'
    });

    this.init();
};

SearchPanel.prototype.init = function () {
    import(/* webpackChunkName: "magaele.core" */ './src/all/base.scss');
    // 如果試館頁就載入館頁的CSS
    this.panel !== 'all' && import(/* webpackChunkName: "singlePanelCss" */ './src/all/css.scss');
    this.isTwPanel = this.allPanel.indexOf(this.panel) !== -1 && this.panel.indexOf('tw') !== -1;

    // this.importBabelPolyfill();
    this.render();
};

SearchPanel.prototype.returnPanel = function () {
    switch (this.panel) {
        case 'travel':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "travel-m" */ './src/travel/mobile') : import(/* webpackChunkName: "travel-pc" */ './src/travel/pc');
        case 'internationalFlight':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "internationalFlight-m" */ './src/flight/international/mobile') : import(/* webpackChunkName: "internationalFlight-pc" */ './src/flight/international/pc');
        case 'chineseFlight':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "chineseFlight-m" */ './src/flight/chinese/mobile') : import(/* webpackChunkName: "ChineseFlight-pc" */ './src/flight/chinese/pc');
        case 'taiwanFlight':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "taiwanFlight-m" */ './src/flight/taiwan/mobile') : import(/* webpackChunkName: "TaiwanFlight-pc" */ './src/flight/taiwan/pc');
        case 'hotel':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "hotel-m" */ './src/hotel/mobile') : import(/* webpackChunkName: "hotel-pc" */ './src/hotel/pc');
        case 'personalVacation':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "personalVacation-m" */ './src/vacation/personal/mobile') : import(/* webpackChunkName: "personalVacation-pc" */ './src/vacation/personal/pc');
        case 'groupVacation':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "groupVacation-m" */ './src/vacation/group/mobile') : import(/* webpackChunkName: "groupVacation-pc" */ './src/vacation/group/pc');
        case 'taiwanVacation':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "taiwanVacation-m" */ './src/vacation/taiwan/mobile') : import(/* webpackChunkName: "taiwanVacation-pc" */ './src/vacation/taiwan/pc');
        case 'themeTravel':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "themeTravel-m" */ './src/themeTravel/mobile') : import(/* webpackChunkName: "themeTravel-pc" */ './src/themeTravel/pc');
        case 'activity':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "activity-m" */ './src/activity/mobile') : import(/* webpackChunkName: "activity-pc" */ './src/activity/pc');
        case 'tw_vacationSearch':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "tw_vacationSearch-m" */ './src/vacationSearchTW/mobile') : import(/* webpackChunkName: "tw_vacationSearch-pc" */ './src/vacationSearchTW/pc');
        case 'all':
        default:
            return (this.type === 'm') ?
                import(/* webpackChunkName: "all-m" */ './src/all/mobile') : import(/* webpackChunkName: "all-pc" */ './src/all/pc');
    }
};

SearchPanel.prototype.importBabelPolyfill = function () {
    if (
        !global._babelPolyfill &&
        (typeof window === 'undefined' || !window._babelPolyfill)
    ) {
        import(/* webpackChunkName: "babel-polyfill" */ '@babel/polyfill');
    }
};

SearchPanel.prototype.render = function () {
    let Templete;
    let MobileHead;

    // 動態載入的容器
    Templete = Loadable({
        loader: () => this.returnPanel(),
        loading: MyLoadingComponent
    });
    MobileHead = Loadable({
        loader: () => import(/* webpackChunkName: "MobileHead" */ './src/all/mobile/MobileHead.js'),
        loading: MyLoadingComponent
    });

    if (this.isTwPanel) {
        ReactDOM.render(
            <Templete hrefTarget={this.target} />,
            this.renderNode
        );
        return;
    }

    ReactDOM.render(
        <React.Fragment>
            {this.type === 'm' && <MobileHead title={this.mTitle} onClick={this.mCloseBtn} />}
            {this.allPanel.indexOf(this.panel) !== -1 &&
                <div className={this.panelClass + ' ' + this.width}>
                    <Templete hrefTarget={this.target} />
                </div>
            }
        </React.Fragment>,
        this.renderNode
    );
};

window.SearchPanel = SearchPanel;
