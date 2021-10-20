import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getCartProducts, getCartNotes } from 'Store/Modules/Cart/selectors';
import { toggleQuantity, removeItemFromCart, changeNotes } from 'Store/Modules/Cart/cartActions';
import { getFormattedPrice } from 'Constants';
import { Remove } from 'Icons';

import './Cart.css';

const CartQuantity = ({ product, handleQuantity }) => (
    <div className="quantity_inner">
        <button
            onClick={handleQuantity({
                id: product.id,
                size: product.size,
                color: product.color,
                quantity: product.quantity - 1,
            })}
            className="bt_minus"
        >
            <svg viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
        <input
            type="number"
            value={product.quantity}
            className="quantity"
            max="20"
            min={1}
        />
        <button
            onClick={handleQuantity({
                id: product.id,
                size: product.size,
                color: product.color,
                quantity: product.quantity + 1,
            })}
            className="bt_plus"
        >
            <svg viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
    </div>
);

export const Cart = () => {
    const products = useSelector(getCartProducts);
    const notes = useSelector(getCartNotes);
    const dispatch = useDispatch();
    const history = useHistory();

    const toggleCartQuantity = ({
        id,
        quantity,
        color,
        size,
    }) => () => {
        if (quantity) {
            dispatch(toggleQuantity({
                id, quantity, color, size,
            }));
        }
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

    return (
        <div className="cart-page">
            <h4 className="cart-product-header">
                Shopping Cart
            </h4>
            <div className="cart-product-order">
                <div className="cart-product-order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Product
                                </th>
                                <th className="cart-product-thead">
                                    Price
                                </th>
                                <th className="cart-product-thead">
                                    Quantity
                                </th>
                                <th className="cart-product-thead">
                                    Total
                                </th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={`${product.id}-${product.size}-${product.color}`}>
                                    <td className="cart-product-description">
                                        <img src={product.image} alt="product photo" />
                                        <ul>
                                            <li>
                                                {product.name}
                                            </li>
                                            <li>
                                                {product.size}
                                            </li>
                                            <li className="cart-product-li-hidden">
                                                {product.price}
                                            </li>
                                            <li className="cart-product-li-hidden">
                                                <CartQuantity
                                                    product={product}
                                                    handleQuantity={toggleCartQuantity}
                                                />
                                            </li>
                                        </ul>
                                    </td>
                                    <td className="cart-product-tbody">
                                        {product.price}
                                    </td>
                                    <td className="cart-product-tbody">
                                        <CartQuantity
                                            product={product}
                                            handleQuantity={toggleCartQuantity}
                                        />
                                    </td>
                                    <td className="cart-product-tbody">
                                        {totalPrice(product)}
                                    </td>
                                    <td>
                                        <button onClick={removeProduct(product)} className="cart-product-btn-remove">
                                            <Remove
                                                fill="#C5A995"
                                                width={15}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="cart-product-order-submit">
                    <div className="cart-product-price">
                        <div>
                            Subtotal:
                        </div>
                        <div>
                            {subtotalPrice(products)}
                        </div>
                    </div>
                    <div className="info">
                        Excluding taxes and shipping
                    </div>
                    <div className="orders">
                        <label htmlFor="orders">Order notes</label>
                        <textarea
                            id="orders"
                            cols="30"
                            rows="10"
                            value={notes}
                            onChange={changeCartNotes}
                        />
                    </div>
                    <div>
                        <button onClick={goToCheckoutPage} className="cart-product-btn-checkout">
                            Checkout
                        </button>
                    </div>
                    <div>
                        <button className="cart-product-btn-continue">
                            Continue Shoppnig
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
