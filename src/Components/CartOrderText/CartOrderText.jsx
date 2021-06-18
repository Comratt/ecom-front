import React from 'react';
import './CartOrderText.css';

const CartOrderText = () => (
    <div>
        <form action="#">
            <label htmlFor="cart-text-area">Order Notes</label>
            <textarea className="order-notes" />
        </form>
        <div className="order-button">
            <button className="order-button-one">
                Checkout
            </button>
            <button className="order-button-two">
                Continue Shopping
            </button>
        </div>
    </div>
);

export default CartOrderText;
