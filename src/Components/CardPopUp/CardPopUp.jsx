import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SuccessIcon from './icons/SuccessIcon';

import './CardPopUp.css';

const alertStyle = {
    padding: '20px',
    textTransform: 'uppercase',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
    boxSizing: 'border-box',
};

export const CardPopUp = ({
    message: {
        size, price, image, name,
    },
    style,
    options: { type } = { type: '' },
}) => {
    const componentClassNames = classNames('card-pop-up');

    if (type === 'success') {
        return (
            <div className={componentClassNames} style={{ ...alertStyle, ...style }}>
                <SuccessIcon />
                <span style={{ flex: 2 }}>{name}</span>
            </div>
        );
    }

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
