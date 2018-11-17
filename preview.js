import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './magaele/core/core.scss';
import PcPanel from './src/all/pc';
import MobilePanel from './src/all/mobile';

ReactDOM.render(
    <React.Fragment>
        <h3>==============搜尋引擎PC版==============</h3>
        <PcPanel />
        {/* <h3>==============搜尋引擎mobile版==============</h3>
        <MobilePanel /> */}
    </React.Fragment>,
    document.getElementById('root')
);