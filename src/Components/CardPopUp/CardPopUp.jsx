import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CardPopUp.css';

export const CardPopUp = ({
    message: {
        size, price, image, name,
    },
    style,
}) => {
    const componentClassNames = classNames('card-pop-up');

    return (
        <div className={componentClassNames} style={style}>
            <div className="card-pop-up__title">
                1 item(s) added to your cart
            </div>
            <div className="card-pop-up__info">
                <div className="card-pop-up__img">
                    <img className="card-pop-up__img" src={image} alt="" />
                </div>
                <div className="card-pop-up__description">
                    <div className="card-pop-up__product-name">
                        <span>{name}</span>
                    </div>
                    <div className="card-pop-up__product-description" />
                    <div className="card-pop-up__size">
                        <span>{size}</span>
                    </div>
                    <div className="card-pop-up__price">
                        <span>{price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

CardPopUp.propTypes = {
    message: PropTypes.shape({
        size: PropTypes.string,
        price: PropTypes.string,
        image: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
};
