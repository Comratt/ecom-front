import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';

import './CardPopUp.css';
import { getFormattedPrice } from '../../Constants';

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
        size, price, image, name, discount, purePrice,
    },
    style,
    options: { type } = { type: '' },
}) => {
    const componentClassNames = classNames('card-pop-up');

    if (type === 'success' || type === 'error') {
        return (
            <div className={componentClassNames} style={{ ...alertStyle, ...style }}>
                {type === 'success' && <SuccessIcon />}
                {type === 'error' && <ErrorIcon />}
                <span style={{ flex: 2 }}>{name}</span>
            </div>
        );
    }

    return (
        <div className={componentClassNames} style={style}>
            <div className="card-pop-up__title">
                1 товар(ів) додано до вашого кошика
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
                        {discount > 0 ? (
                            <>
                                <div className="price">{getFormattedPrice(purePrice - discount)}</div>
                                <div className="sale">{price}</div>
                            </>
                        ) : <div className="price">{price}</div>}
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
        purePrice: PropTypes.string,
        image: PropTypes.string,
        name: PropTypes.string,
        discount: PropTypes.number,
    }).isRequired,
};
