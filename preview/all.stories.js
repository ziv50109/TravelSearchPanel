import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/all/mobile';
import Pc from '../src/all/pc';
import MobileHead from '../src/all/mobile/MobileHead.js';

storiesOf('所有面板組裝', module)
    .add('Mobile', () => (
        <div>
            <MobileHead title="搜尋引擎" />
            <Mobile />
        </div>
    ))
    .add('PC', () => (
        <Pc />
    ));