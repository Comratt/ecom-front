import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/createStore';
import Router from './Router';

const App = () => (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default App;