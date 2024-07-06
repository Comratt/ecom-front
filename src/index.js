import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TagManager from 'react-gtm-module';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const tagManagerArgs = {
    gtmId: 'G-QGXZVGE0TH',
};

TagManager.initialize(tagManagerArgs);
ReactDOM.render(
    // eslint-disable-next-line
    <App />, document.getElementById('root')
);

serviceWorkerRegistration.register();
