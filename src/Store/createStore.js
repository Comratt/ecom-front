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
    const cartState = store.getState().cart;
    const wishListState = store.getState().wishlist;

    const localSettings = {
        ...LocalSettingsInitialState,
        authorizationToken: localSettingsState.authorizationToken,
        expiresAt: localSettingsState.expiresAt,
        user: localSettingsState.user,
        currency: localSettingsState.currency,
        theme: localSettingsState.theme,
    };

    LocalStorageService.setItem({
        localSettings,
        cart: cartState,
        wishlist: wishListState,
    });
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./Reducers', () => store.replaceReducer(reducers));
}

export default store;
