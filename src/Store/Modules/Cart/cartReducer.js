import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART } from './types';

export const initialState = {
    products: [],
    showPopUp: false,
};

const addToCart = (products, {
    id, size, color, name, price,
}) => {
    if (products.find((item) => item.id === id && item.size === size && item.color === color)) {
        return products.map(
            (item) => (id === item.id
                ? ({ ...item, quantity: item.quantity + 1 })
                : ({ ...item, quantity: 1 })),
        );
    }

    return ([
        ...products,
        {
            id,
            name,
            price,
            size,
            color,
            quantity: 1,
        },
    ]);
};

const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_ITEM_TO_CART:
            return ({
                ...state,
                showPopUp: true,
                products: addToCart(state.products, payload),
            });
        case REMOVE_ITEM_FROM_CART:
            return ({
                ...state,
                products: state.products.filter(({ id }) => id !== payload.id),
            });
        case CLEAR_CART:
            return ({
                ...state,
                products: [],
            });
        default:
            return state;
    }
};

export default cartReducer;
