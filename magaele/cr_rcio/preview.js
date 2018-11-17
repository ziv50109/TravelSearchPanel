import React from 'react';
import CrRcio from './components/Module.js';
import { storiesOf } from '@storybook/react';

storiesOf('單複選 (checkbox、radio)', module)
    .add('cr_rcio', () => (
        <div className="container">
            <div>
                <h3>Style: radio</h3>
                <CrRcio type="radio" textContent="inputLabel(default)" />
                <div><CrRcio type="radio" disabled textContent="inputLabel(disabled)" ></CrRcio></div>
                <div><CrRcio type="radio" name="radioGroup" value="radioA" id="radioA" className="org" defaultChecked textContent="inputLabel(org) whenClick defaultChecked" whenClick={() => console.log('whenClickCallBack')} /></div>
                <div><CrRcio type="radio" name="radioGroup" value="radioB" id="radioB" className="l-org" textContent="inputLabel(l-org) whenChange" whenChange={() => console.log('whenChangeCallBack')} /></div>
                <div><CrRcio type="radio" name="radioGroup" value="radioC" id="radioC" className="" textContent="inputLabel(red) whenMouseDown" whenMouseDown={() => console.log('onMouseDownCallBack')} /></div>
            </div>
        </div>
    ));