import React from 'react';
import NtbRcln, { Tab } from '../../magaele/ntb_rcln/components/Module.js';
import International from './international/pc';
import Chiness from './chinese/pc';
import Taiwan from './taiwan/pc';

const flight = () => {
    return (
        <NtbRcln
            activeIndex={0}
            customClass="search_panel_two"
        >
            <Tab label="國際機票預訂">
                <International />
            </Tab>
            <Tab label="大陸境內機票">
                <Chiness />
            </Tab>
            <Tab label="台灣境內機票">
                <Taiwan />
            </Tab>
        </NtbRcln>
    );
};

export default flight;
