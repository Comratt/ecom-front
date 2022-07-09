import { combineReducers } from 'redux';

import localSettingsReducer from '../Modules/LocalSettings/localSettingsReducer';
import cartReducer from '../Modules/Cart/cartReducer';
import wishlistReducer from '../Modules/Wishlist/wishlistReducer';
import filtersReducer from '../Modules/Filters/filtersReducer';

export default combineReducers({
    localSettings: localSettingsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    filters: filtersReducer,
});
