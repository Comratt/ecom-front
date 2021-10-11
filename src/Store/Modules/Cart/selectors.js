import { createSelector } from 'reselect';

const getCart = (state) => state.cart;

export const getCartQuantity = createSelector(
    [getCart], ({ products }) => products.reduce((acc, { quantity }) => acc + quantity, 0) || 0,
);

export const getLastCartProduct = createSelector(
    [getCart], ({ products }) => products.length && products[products.length - 1],
);
