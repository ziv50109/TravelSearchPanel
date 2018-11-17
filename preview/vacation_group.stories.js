import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/vacation/group/mobile';
import Pc from '../src/vacation/group/pc';

storiesOf('團體自由行', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));