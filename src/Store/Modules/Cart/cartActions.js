import {
    ADD_ITEM_TO_CART,
    CLEAR_CART,
    REMOVE_ITEM_FROM_CART,
    TOGGLE_CART_QUANTITY,
    CHANGE_CART_NOTE,
} from './types';

export const addToCart = ({
    id, name, price, size, color, purePrice, image,
}) => (dispatch) => (
    dispatch({
        type: ADD_ITEM_TO_CART,
        payload: {
            id, name, price, size, color, purePrice, image,
        },
    })
);

export const toggleQuantity = ({
    id, quantity, size, color,
}) => (dispatch) => (
    dispatch({
        type: TOGGLE_CART_QUANTITY,
        payload: {
            id, quantity, size, color,
        },
    })
);

export const removeItemFromCart = ({ id, size, color }) => (dispatch) => (
    dispatch({ type: REMOVE_ITEM_FROM_CART, payload: { id, size, color } })
);

export const clearCart = () => (dispatch) => dispatch(CLEAR_CART);

export const changeNotes = (notes) => (dispatch) => dispatch({
    type: CHANGE_CART_NOTE,
    payload: { notes },
});
