import React from 'react';
import './Cart.css';
import { Remove } from '../../Icons';

const Cart = () => (
    <div>
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

                        <tr>
                            <td className="cart-product-description">
                                <img src="https://image.12storeez.com/images/154x188_90_out/uploads/images/CATALOG/jersey/110638/611f899dca72e-12storeez-12-08-20210953.jpg" alt="product photo" />
                                <ul>
                                    <li>
                                        Lurex bikini top
                                    </li>
                                    <li>
                                        S
                                    </li>
                                    <li className="cart-product-li-hidden">
                                        ₴1,679
                                    </li>
                                    <li className="cart-product-li-hidden">
                                        <div className="quantity_inner">
                                            {/* eslint-disable-next-line react/button-has-type */}
                                            <button className="bt_minus">
                                                <svg viewBox="0 0 24 24">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                </svg>
                                            </button>
                                            <input type="text" value="1" size="2" className="quantity" data-max-count="20" />
                                            <button className="bt_plus">
                                                <svg viewBox="0 0 24 24">
                                                    <line x1="12" y1="5" x2="12" y2="19" />
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </td>
                            <td className="cart-product-tbody">
                                ₴1,679
                            </td>
                            <td className="cart-product-tbody">
                                <div className="quantity_inner">
                                    {/* eslint-disable-next-line react/button-has-type */}
                                    <button className="bt_minus">
                                        <svg viewBox="0 0 24 24">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                    <input type="text" value="1" size="2" className="quantity" data-max-count="20" />
                                    <button className="bt_plus">
                                        <svg viewBox="0 0 24 24">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="cart-product-tbody">
                                ₴3,358
                            </td>
                            <td>
                                <button className="cart-product-btn-remove">
                                    <Remove
                                        fill="#C5A995"
                                        width={15}
                                    />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="cart-product-order-submit">
                <div className="cart-product-price">
                    <div>
                        Subtotal:
                    </div>
                    <div>
                        ₴7,174
                    </div>
                </div>
                <div className="info">
                    Excluding taxes and shipping
                </div>
                <div className="orders">
                    <label htmlFor="orders">Order notes</label>
                    <textarea name="" id="orders" cols="30" rows="10" />
                </div>
                <div>
                    <button className="cart-product-btn-checkout">
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

export default Cart;
