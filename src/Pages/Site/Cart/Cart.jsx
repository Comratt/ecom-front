import React from 'react';
import { Remove } from 'Icons';
import { useCart } from 'context/cart/useCart';

import './Cart.css';
import { useHistory } from 'react-router-dom';
import { Title } from '../../../Components/Title';

const CartQuantity = ({ product, handleQuantity }) => (
    <div className="quantity_inner">
        <button
            onClick={handleQuantity({
                id: product.id,
                size: product.size,
                color: product.color,
                quantity: product.quantity - 1,
                totalCount: product.totalCount,
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
                totalCount: product.totalCount,
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
    const {
        products,
        notes,
        toggleCartQuantity,
        removeProduct,
        changeCartNotes,
        goToCheckoutPage,
        totalPrice,
        subtotalPrice,
    } = useCart();
    const history = useHistory();

    return (
        <div className="cart-page">
            {products.length ? (
                <>
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
                                            <td>
                                                <div className="cart-product-description">
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
                                                </div>
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
                </>
            ) : (
                <div className="cart-product-order">
                    <div className="cart-empty">
                        <Title type={1}>Shopping cart</Title>
                        <Title type={3}>Your cart is empty</Title>
                        <button
                            type="button"
                            className="btn-continue-empty"
                            onClick={() => history.goBack()}
                        >
                            Continue Shoppnig
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
