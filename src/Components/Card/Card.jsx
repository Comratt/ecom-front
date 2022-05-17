import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
    currency,
    colors,
    cardId,
    hideInfo,
}) => {
    const componentClassNames = classNames('lib-card', className);
    const isSale = {
        label: `${(parseInt(price) - 200).toFixed(2)}₴`,
    };
    const { label } = isSale;

    let clazz = 'lib-card__info-price';

    if (label) {
        clazz += ' sale';
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
                    <div className="lib-card__info-supsale">
                        <span>Незабаром</span>
                    </div>
                    <NavLink to={detailsPath} className="lib-card__info-content">
                        <Title type={4} className="lib-card__info-title">{title}</Title>
                    </NavLink>
                    <div className="lib-card__info-price-content">
                        {label ? (
                            <div>
                                <div style={{ fontSize: '12px' }} className={clazz}>{price}</div>
                                <div className="lib-card__info-price"><b>{label}</b></div>
                            </div>
                        ) : <div className={clazz}>{price}</div>}
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
