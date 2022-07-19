import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
    // eslint-disable-next-line
    <App />, document.getElementById('root')
);

serviceWorkerRegistration.register();
