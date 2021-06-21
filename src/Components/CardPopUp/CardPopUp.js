import React from 'react';
import classNames from 'classnames';

import './CardPopUp.css';

export const CardPopUp = ({ className }) => {
    const componentClassNames = classNames('card-pop-up', className);

    return (
        <div className={componentClassNames}>
            <div className="card-pop-up__title">
                1 item(s) added to your cart
            </div>
            <div className="card-pop-up__info">
                <div className="card-pop-up__img">
                    <img className="card-pop-up__img" src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/16-02-202148416_150x.jpg?v=1614201760" alt="" />
                </div>
                <div className="card-pop-up__description">
                    <div className="card-pop-up__product-name">
                        <span>Draped double-breast...</span>
                    </div>
                    <div className="card-pop-up__product-description" />
                    <div className="card-pop-up__size">
                        <span>XS</span>
                    </div>
                    <div className="card-pop-up__price">
                        <span>₴5,001</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardPopUp;
