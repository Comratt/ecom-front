import { combineReducers } from 'redux';

import localSettingsReducer from '../Modules/LocalSettings/localSettingsReducer';

export default combineReducers({
    localSettings: localSettingsReducer,
});
