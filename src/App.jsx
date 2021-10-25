import React from 'react';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import CardPopUp from 'Components/CardPopUp';
import { LayoutProvider } from './context/layout';
import store from './Store/createStore';
import Router from './Router';

const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '5px',
    transition: transitions.SCALE,
};
const containerStyle = {
    marginTop: 60,
    zIndex: 999,
};

const App = () => (
    <Provider store={store}>
        <AlertProvider template={CardPopUp} {...options} containerStyle={containerStyle}>
            <LayoutProvider>
                <Router />
            </LayoutProvider>
        </AlertProvider>
    </Provider>
);

export default App;
