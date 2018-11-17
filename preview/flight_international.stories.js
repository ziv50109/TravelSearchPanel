import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/flight/international/mobile';
import Pc from '../src/flight/international/pc';

storiesOf('國際機票', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));