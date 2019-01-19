import '@babel/polyfill';

import { configure } from '@storybook/react';
import { configureViewport } from '@storybook/addon-viewport';

import '../src/all/base.scss';


const req = require.context('../preview/', false, /\.stories\.js$/);

function loadStories() {
    req.keys().map(req);
}

configure(loadStories, module);
configureViewport();