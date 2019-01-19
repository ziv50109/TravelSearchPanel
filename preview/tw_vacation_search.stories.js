import React from 'react';
import { storiesOf } from '@storybook/react';
// import Preview from '../src/vacationSearchTW/preview';
import Pc from '../src/vacationSearchTW/pc';
import Mobile from '../src/vacationSearchTW/mobile';

storiesOf('國內自由行_搜尋結果頁_搜尋面板', module)
    // .add('Preview', () => (
    //     <Preview />
    // ));
    .add('PC', () => (
        <div>
            <h2>PC版</h2>
            <Pc />
        </div>
    ))
    .add('Mobile', () => (
        <div>
            <h2>Mobile版</h2>
            <Mobile />
        </div>
    ));
