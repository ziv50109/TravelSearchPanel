import React from 'react';
import { storiesOf } from '@storybook/react';
import Mobile from '../src/vacation/taiwan/mobile';
import Pc from '../src/vacation/taiwan/pc';

storiesOf('國內自由行', module)
    .add('Mobile', () => (
        <Mobile />
    ))
    .add('PC', () => (
        <Pc />
    ));