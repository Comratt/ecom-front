import React, { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { LayoutProvider } from './context/layout';
import store from './Store/createStore';
import Router from './Router';

// TODO: Analytics for Instagram, Facebook, Telegram in mobile browser.
// const ua = navigator.userAgent || navigator.vendor || window.opera;
// const isInstagram = (ua.indexOf('Instagram') > -1);
//
// if (isInstagram) {
//     alert('asd');
// }

const App = () => {
    const checkForUpdates = useCallback(async () => {
        let appUpdateAvailable = false;

        const { headers } = await axios.head('/manifest.json', {
            method: 'HEAD',
            headers: {
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                cache: false,
            },
        });

        const storedLastModified = localStorage.getItem('last-modified');
        const lastModified = headers['last-modified'];

        if (storedLastModified == null) {
            localStorage.setItem('last-modified', lastModified);
        } else if (storedLastModified !== lastModified) {
            appUpdateAvailable = true;
            localStorage.removeItem('last-modified');
        }
        if (appUpdateAvailable) {
            window.location.reload(true);
        }
    }, []);

    useEffect(() => {
        checkForUpdates();
    }, []);

    return (
        <Provider store={store}>
            <LayoutProvider>
                <Router />
            </LayoutProvider>
        </Provider>
    );
};

export default App;
