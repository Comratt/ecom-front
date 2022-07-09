import {
    ADD_FILTERS,
} from './types';

export const addFilters = (payload) => (dispatch) => (
    dispatch({
        type: ADD_FILTERS,
        payload,
    })
);
