import { ADD_TO_WISH, REMOVE_FROM_WISH } from './types';

export const initialState = {
    products: [],
};

const wishReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_WISH:
            return ({
                ...state,
                products: [
                    ...state.products,
                    payload.id,
                ],
            });
        case REMOVE_FROM_WISH:
            return ({
                ...state,
                products: state.products.filter((id) => id !== payload.id),
            });
        default:
            return state;
    }
};

export default wishReducer;
