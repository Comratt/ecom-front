import React from 'react';
import classNames from 'classnames';
import './Cart.css';
import {
    Basket, Minus, SelectPlus,
} from '../../Icons';
import CartOrderText from '../CartOrderText/CartOrderText';
import CartProductQuantity from '../CartProductQuantity/CartProductQuantity';

const Cart = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-cart',
        className,
    );

    return (
        <div className={componentClasses}>
            <h2 className="cart-title">Shopping cart</h2>
            <div className="content-cart">
                <div className="left">
                    <table>
                        <thead>
                            <tr>
                                <td className="td-header">
                                    Product
                                </td>
                                <td className="td-header">
                                    Price
                                </td>
                                <td className="td-header">
                                    Quanity
                                </td>
                                <td className="td-header">
                                    Total
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tr-body">
                                <td className="td-body">
                                    <div className="product-cart">
                                        <img className="cart-img" src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_1680_e52ca964-c9c5-484a-aadc-f470367b9bcb_300x.jpg?v=1618325489" alt="img" />
                                        <div>
                                            Flared cropped mid rise jeans
                                            <br />
                                            <div>S</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="td-body">
                                    <div>
                                        <b>₴2,923</b>
                                    </div>
                                </td>
                                <td className="td-body">
                                    <CartProductQuantity />
                                </td>
                                <td className="td-body">
                                    <div className="price-remove">
                                        <div>
                                            ₴2,923
                                        </div>
                                        <div className="remove">
                                            <Basket
                                                width={16}
                                            />
                                            <div>Remove</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="right">
                    <p className="cart-total-price">
                        <span className="subtotal">Subtotal: </span>
                        <span>₴10,084</span>
                    </p>
                    <div className="cart-tax-info">Excluding taxes and shipping</div>
                    <CartOrderText />
                </div>
            </div>
        </div>
    );
};

export default Cart;
