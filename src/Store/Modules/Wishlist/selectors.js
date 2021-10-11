import { createSelector } from 'reselect';

const getWishList = (state) => state.wishlist;

export const getWishlistQuantity = createSelector(
    [getWishList], ({ products }) => products.length || 0,
);

export const getWishlistProducts = createSelector(
    [getWishList], ({ products }) => products || [],
);
