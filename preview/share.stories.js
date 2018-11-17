import React from 'react';
import { storiesOf } from '@storybook/react';
// import Mobile from '../src/share/mobile';
// import Pc from '../src/share/pc';
import Shared from '../src/shared/panel';

storiesOf('共用', module).add('Share', () => (
    <div>
        <Shared />
    </div>
));
