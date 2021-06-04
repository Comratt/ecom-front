import React from 'react';
import { Provider } from 'react-redux';
import { LayoutProvider } from './context/layout';
import store from './Store/createStore';
import Router from './Router';

const App = () => (
    <Provider store={store}>
        <LayoutProvider>
            <Router />
        </LayoutProvider>
    </Provider>
);

export default App;
