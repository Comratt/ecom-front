import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getFormattedPrice } from 'Constants';
import { Swatches } from '../Swatches';
import { Title } from '../Title';
import WishlistHeart from '../WishlistHeart/WishlistHeart';

import './Card.css';

export const Card = ({
    className,
    detailsPath,
    imagePath,
    title,
    price,
    purePrice,
    currency,
    colors,
    cardId,
    discount,
    hideInfo,
}) => {
    const componentClassNames = classNames('lib-card', className);
    let priceClassNames = classNames('lib-card__info-price');

    if (discount > 0) {
        priceClassNames = classNames(priceClassNames, 'sale');
    }

    return (
        <div className={componentClassNames}>
            <div className="lib-card__heart_wh">
                <WishlistHeart cardId={cardId} />
            </div>
            <NavLink to={detailsPath}>
                <div
                    className="lib-card__picture"
                    style={{ backgroundImage: `url(${imagePath})` }}
                />
            </NavLink>
            {!hideInfo && (
                <div className="lib-card__info">
                    <NavLink to={detailsPath} className="lib-card__info-content">
                        <Title type={4} className="lib-card__info-title">{title}</Title>
                    </NavLink>
                    <div className="lib-card__info-price-content">
                        {discount > 0 ? (
                            <div>
                                <div style={{ fontSize: '12px' }} className={priceClassNames}>{price}</div>
                                <div className="lib-card__info-price">{getFormattedPrice(purePrice - discount)}</div>
                            </div>
                        ) : <div className={priceClassNames}>{price}</div>}
                    </div>
                    <Swatches data={colors} />
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    className: PropTypes.string,
    detailsPath: PropTypes.string,
    imagePath: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
    ]),
    currency: PropTypes.string,
    hideInfo: PropTypes.bool,
};

Card.defaultProps = {
    className: '',
    detailsPath: '',
    currency: '₴',
    imagePath: '',
    title: '',
    price: 0,
    hideInfo: false,
};
