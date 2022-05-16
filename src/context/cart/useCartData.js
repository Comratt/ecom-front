import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    changeNotes,
    removeItemFromCart,
    toggleQuantity,
} from 'Store/Modules/Cart/cartActions';
import { getCartNotes, getCartProducts } from 'Store/Modules/Cart/selectors';
import { getFormattedPrice } from '../../Constants';

export const useCartData = () => {
    const products = useSelector(getCartProducts);
    const notes = useSelector(getCartNotes);
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleCartQuantity = ({
        id,
        quantity,
        color,
        size,
        totalCount,
    }) => () => {
        if ((quantity > totalCount) || (quantity < 1)) {
            return;
        }
        dispatch(toggleQuantity({
            id, quantity, color, size,
        }));
    };

    const removeProduct = ({ id, size, color }) => () => (
        dispatch(removeItemFromCart({ id, size, color }))
    );
    const changeCartNotes = ({ target }) => dispatch(changeNotes(target.value));

    const goToCheckoutPage = () => history.push('/order');

    const totalPrice = ({ purePrice, quantity }) => getFormattedPrice(purePrice * quantity);
    const subtotalPrice = (p) => (
        getFormattedPrice(
            p.reduce((acc, { purePrice, quantity }) => acc + (purePrice * quantity), 0),
        )
    );

    return useMemo(() => ({
        products,
        notes,
        toggleCartQuantity,
        removeProduct,
        changeCartNotes,
        goToCheckoutPage,
        totalPrice,
        subtotalPrice,
    }), [
        products,
        notes,
        toggleCartQuantity,
        removeProduct,
        changeCartNotes,
        goToCheckoutPage,
        totalPrice,
        subtotalPrice,
    ]);
};
