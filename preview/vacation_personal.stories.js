import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/vacation/personal/mobile';
import Pc from '../src/vacation/personal/pc';

storiesOf('動態自由行', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));