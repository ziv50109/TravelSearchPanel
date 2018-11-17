import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/travel/mobile';
import Pc from '../src/travel/pc';

storiesOf('團體', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));