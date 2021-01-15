import {
    createStore,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import LocalStorageService from 'Services/LocalStorageService';
import reducers from './Reducers';
import { dispatchString } from './Middlewares';
import { initialState as LocalSettingsInitialState } from './Modules/LocalSettings/localSettingsReducer';

let enhancer = applyMiddleware(thunk, dispatchString);

if (process.env.NODE_ENV === 'development') {
    enhancer = composeWithDevTools(
        applyMiddleware(thunk, dispatchString),
    );
}

const persistedState = LocalStorageService.getLocalStorage();
const store = createStore(reducers, persistedState, enhancer);

store.subscribe(() => {
    const localSettingsState = store.getState().localSettings;

    const localSettings = {
        ...LocalSettingsInitialState,
        authorizationToken: localSettingsState.authorizationToken,
        user: localSettingsState.user,
        currency: localSettingsState.currency,
        theme: localSettingsState.theme,
    };

    LocalStorageService.setItem('localSettings', localSettings);
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./Reducers', () => store.replaceReducer(reducers));
}

export default store;
