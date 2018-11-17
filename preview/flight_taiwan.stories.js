import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/flight/taiwan/mobile';
import Pc from '../src/flight/taiwan/pc';

storiesOf('台灣機票', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));