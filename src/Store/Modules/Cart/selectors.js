import { createSelector } from 'reselect';

const getCart = (state) => state.cart;

export const getCartQuantity = createSelector(
    [getCart], ({ products }) => products.reduce((acc, { quantity }) => acc + quantity, 0) || 0,
);

export const getCartProducts = createSelector(
    [getCart], ({ products }) => products || [],
);

export const getCartNotes = createSelector(
    [getCart], ({ notes }) => notes || '',
);

export const getCartDiscount = createSelector(
    [getCart], ({ discount }) => discount || {},
);
