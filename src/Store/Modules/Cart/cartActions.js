import { ADD_ITEM_TO_CART, CLEAR_CART, REMOVE_ITEM_FROM_CART } from './types';

export const addToCart = ({
    id, name, price, size, color,
}) => (dispatch) => (
    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: {
            id, name, price, size, color,
        },
    })
);

export const removeItemFromCart = (id) => (dispatch) => (
    dispatch({ type: REMOVE_ITEM_FROM_CART, payload: { id } })
);

export const clearCart = () => (dispatch) => dispatch(CLEAR_CART);
