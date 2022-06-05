import React from 'react';
import { Remove } from 'Icons';
import { useCart } from 'context/cart/useCart';

import './Cart.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'Components/Link';
import { Title } from '../../../Components/Title';
import { getFormattedPrice } from '../../../Constants';

const CartQuantity = ({ product, handleQuantity }) => (
    <div className="quantity_inner">
        <button
            type="button"
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
            type="button"
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
                        Кошик
                    </h4>
                    <div className="cart-product-order">
                        <div className="cart-product-order-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Продукт
                                        </th>
                                        <th className="cart-product-thead">
                                            Ціна
                                        </th>
                                        <th className="cart-product-thead">
                                            Кількість
                                        </th>
                                        <th className="cart-product-thead">
                                            Всього
                                        </th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={`${product.id}-${product.size}-${product.color}`}>
                                            <td>
                                                <div className="cart-product-description">
                                                    <Link to={`/products/${product.id}`}><img src={product.image} alt="product-photo" /></Link>
                                                    <ul>
                                                        <Link to={`/products/${product.id}`}>
                                                            <li>
                                                                {product.name}
                                                            </li>
                                                        </Link>
                                                        <li>
                                                            {product.size}
                                                        </li>
                                                        {product.discount
                                                            ? (
                                                                <div>
                                                                    <li className="cart-product-li-hidden discount">
                                                                        {product.price}
                                                                    </li>
                                                                    <li className="cart-product-li-hidden">
                                                                        {getFormattedPrice(
                                                                            product.purePrice
                                                                            - product.discount,
                                                                        )}
                                                                    </li>
                                                                </div>
                                                            ) : (
                                                                <li className="cart-product-li-hidden ">
                                                                    {product.price}
                                                                </li>
                                                            )}
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
                                                {product.discount
                                                    ? (
                                                        <div>
                                                            <li className="cart-product-li discount">
                                                                {product.price}
                                                            </li>
                                                            <li className="cart-product-li">
                                                                {getFormattedPrice(
                                                                    product.purePrice
                                                                    - product.discount,
                                                                )}
                                                            </li>
                                                        </div>
                                                    ) : (
                                                        <li className="cart-product-li">
                                                            {product.price}
                                                        </li>
                                                    )}
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
                                    Всього:
                                </div>
                                <div>
                                    {subtotalPrice(products)}
                                </div>
                            </div>
                            <div className="info">
                                Без урахування податків та доставки
                            </div>
                            <div className="orders">
                                <label htmlFor="orders">Примітки до замовлення</label>
                                <textarea
                                    id="orders"
                                    cols="30"
                                    rows="10"
                                    value={notes}
                                    onChange={changeCartNotes}
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={goToCheckoutPage}
                                    className="cart-product-btn-checkout"
                                >
                                    Оформити замовлення
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="cart-product-btn-continue"
                                    onClick={() => history.goBack()}
                                >
                                    Продовжити покупки :)
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="cart-product-order">
                    <div className="cart-empty">
                        <Title type={1}>Кошик</Title>
                        <Title type={3}>У Вашому кошику, поки що, порожньо :(</Title>
                        <button
                            type="button"
                            className="btn-continue-empty"
                            onClick={() => history.goBack()}
                        >
                            Продовжити покупки
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
