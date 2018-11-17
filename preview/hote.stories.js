import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/hotel/mobile';
import Pc from '../src/hotel/pc';

storiesOf('訂房', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));