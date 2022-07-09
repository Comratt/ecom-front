import {
    ADD_FILTERS,
} from './types';

export const initialState = {
    page: 1,
    count: 15,
    category: [],
    sortBy: '',
    color: [],
    size: [],
    price: [],
    available: false,
};

const filtersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
    case ADD_FILTERS:
        return ({
            ...state,
            ...payload,
        });
    default:
        return state;
    }
};

export default filtersReducer;
