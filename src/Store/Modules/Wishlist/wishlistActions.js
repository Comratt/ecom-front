import { ADD_TO_WISH, REMOVE_FROM_WISH } from './types';

export const addToWish = ({ id }) => (dispatch) => (
    dispatch({ type: ADD_TO_WISH, payload: { id } })
);

export const removeFromWish = (id) => (dispatch) => (
    dispatch({ type: REMOVE_FROM_WISH, payload: { id } })
);
