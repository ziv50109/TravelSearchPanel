import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/flight/mobile';
import Pc from '../src/flight/pc';

storiesOf('機票', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));