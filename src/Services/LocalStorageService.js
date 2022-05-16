import get from 'lodash/get';
import UserException from 'Exceptions/UserException';

class LocalStorageService {
    constructor() {
        try {
            this.localStorageKey = process.env.REACT_APP_REDUX_STORAGE_NAME;
            this.localStore = window.localStorage.getItem(this.localStorageKey);
        } catch (e) {
            throw new UserException('Enable localStorage access');
        }
    }

    getItem(itemKey, defaultValue = null) {
        try {
            const parsedLocalStore = this.localStore ? JSON.parse(this.localStore) : {};

            return get(parsedLocalStore, itemKey, defaultValue);
        } catch (e) {
            return null;
        }
    }

    getLocalStorage() {
        try {
            return this.localStore ? JSON.parse(this.localStore) : {};
        } catch (e) {
            return {};
        }
    }

    setItem(state) {
        try {
            const parsedLocalStore = this.localStore ? JSON.parse(this.localStore) : {};
            const modifiedObject = {
                ...parsedLocalStore,
                ...state,
            };
            const stringifyObject = JSON.stringify(modifiedObject);

            window.localStorage.setItem(this.localStorageKey, stringifyObject);

            return modifiedObject;
        } catch (e) {
            return null;
        }
    }
}

export default new LocalStorageService();
