import {
    ADD_FILTERS,
    CLEAR_FILTERS,
} from './types';

export const addFilters = (payload) => (dispatch) => (
    dispatch({
        type: ADD_FILTERS,
        payload,
    })
);

export const clearFilters = () => (dispatch) => (
    dispatch({
        type: CLEAR_FILTERS,
    })
);
