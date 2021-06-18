import React from 'react';
import { Minus, SelectPlus } from '../../Icons';
import './CartProductQuantity.css';

const CartProductQuantity = () => (
    <form action="#" className="cart-product-quantity">
        <button className="cart-product-btn">
            <Minus
                fill="var(--color-accent-light)"
                width={16}
            />
        </button>
        <input type="text" placeholder="1" />
        <button className="cart-product-btn">
            <SelectPlus
                fill="var(--color-accent-light)"
                width={16}
            />
        </button>
    </form>
);

export default CartProductQuantity;
