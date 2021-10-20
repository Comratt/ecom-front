import { combineReducers } from 'redux';

import localSettingsReducer from '../Modules/LocalSettings/localSettingsReducer';
import cartReducer from '../Modules/Cart/cartReducer';
import wishlistReducer from '../Modules/Wishlist/wishlistReducer';

export default combineReducers({
    localSettings: localSettingsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
});
