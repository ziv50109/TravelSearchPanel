import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/themeTravel/mobile';
import Pc from '../src/themeTravel/pc';

storiesOf('主題旅遊', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));