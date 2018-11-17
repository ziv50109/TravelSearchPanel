import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/flight/chinese/mobile';
import Pc from '../src/flight/chinese/pc';

storiesOf('大陸機票', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));