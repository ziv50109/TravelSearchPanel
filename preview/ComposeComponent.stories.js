import React from 'react';
import { storiesOf } from '@storybook/react';
import ComposeCalendar from '../src/component/ComposeCalendar';
import IntGroup from '../src/component/InputGroup';

storiesOf('component組合', module)
    .add('ComposeCalendar', () => (
        <div>
            <h2>月曆組合</h2>
            <ComposeCalendar
                onChange={state => {
                    console.log('ComposeCalendar', state);
                }}
            />
            <h2>input組合(純樣式, dom結構相同可直接套用input_group.scss)</h2>
            <IntGroup />
        </div>
    ));