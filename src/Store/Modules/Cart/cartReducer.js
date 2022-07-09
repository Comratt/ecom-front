import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    TOGGLE_CART_QUANTITY,
    CHANGE_CART_NOTE,
    ADD_DISCOUNT_TO_CART,
    REMOVE_DISCOUNT_FROM_CART,
} from './types';

export const initialState = {
    products: [],
    showPopUp: false,
    notes: '',
    discount: {
        name: '', price: 0, prefix: 0, id: null,
    },
};

const addToCart = (products, {
    id, size, color, name, price, purePrice, image, ...rest
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
            purePrice,
            size,
            color,
            image,
            quantity: 1,
            ...rest,
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
            products: state.products.filter(({ id, size, color }) => (
                !((id === payload.id) && (size === payload.size) && (color === payload.color))
            )),
        });
    case CLEAR_CART:
        return ({
            ...state,
            products: [],
            notes: '',
            discount: initialState.discount,
        });
    case TOGGLE_CART_QUANTITY:
        return ({
            ...state,
            products: state.products.map((product) => {
                if (product.id === payload.id
                        && product.size === payload.size
                        && product.color === payload.color
                ) {
                    return ({
                        ...product,
                        quantity: payload.quantity,
                    });
                }

                return product;
            }),
        });
    case CHANGE_CART_NOTE:
        return ({
            ...state,
            notes: payload.notes,
        });
    case ADD_DISCOUNT_TO_CART:
        return ({
            ...state,
            discount: payload,
        });
    case REMOVE_DISCOUNT_FROM_CART:
        return ({
            ...state,
            discount: initialState.discount,
        });
    default:
        return state;
    }
};

export default cartReducer;
