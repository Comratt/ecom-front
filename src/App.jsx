import React from 'react';
import { Provider } from 'react-redux';
import { LayoutProvider } from './context/layout';
import store from './Store/createStore';
import Router from './Router';

const ua = navigator.userAgent || navigator.vendor || window.opera;
const isInstagram = (ua.indexOf('Instagram') > -1);

if (isInstagram) {
    alert('asd');
}

const App = () => (
    <Provider store={store}>
        <LayoutProvider>
            <Router />
        </LayoutProvider>
    </Provider>
);

export default App;
