import Loadable from 'react-loadable';
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import '@babel/polyfill';

import(/* webpackChunkName: "magaele.core" */ './magaele/core/core.scss');

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
        panel,
        type,
        target,
        mTitle,
        mCloseBtn,
        renderNode
    } = opts;

    this.panel = panel || 'all';
    this.type = type;
    this.target = target || '_blank';
    this.mTitle = mTitle || '搜尋引擎';
    this.mCloseBtn = mCloseBtn;
    this.renderNode = document.getElementById(renderNode);

    this.panelClass = classNames({
        'search_panel-singlePanel': this.panel !== 'all' && this.panel !== '',
        'search_panel-m': this.type === 'm',
        'search_panel-pc': this.type === 'pc'
    });

    this.init();
};

SearchPanel.prototype.init = function () {
    // 如果試館頁就載入館頁的CSS
    this.panel !== 'all' && import(/* webpackChunkName: "singlePanelCss" */ './src/all/css.scss');

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

    ReactDOM.render(
        <div>
            {this.type === 'm' && <MobileHead title={this.mTitle} onClick={this.mCloseBtn} />}
            <div className={this.panelClass}>
                <Templete hrefTarget={this.target} />
            </div>
        </div>,
        this.renderNode
    );
};

SearchPanel.prototype.returnPanel = function () {
    switch (this.panel) {
        case 'travel':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "travel-m" */ './src/travel/mobile') : import(/* webpackChunkName: "travel-pc" */ './src/travel/pc');
        case 'flight':
            return (this.type === 'm') ?
                import(/* webpackChunkName: "flight-m" */ './src/flight/international/mobile') : import(/* webpackChunkName: "flight-pc" */ './src/flight/international/pc');
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
        case 'all':
        default:
            return (this.type === 'm') ?
                import(/* webpackChunkName: "all-m" */ './src/all/mobile') : import(/* webpackChunkName: "all-pc" */ './src/all/pc');
    }
};


window.SearchPanel = SearchPanel;
