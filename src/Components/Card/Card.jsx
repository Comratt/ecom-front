import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getFormattedPrice } from 'Constants';
import { Swatches } from '../Swatches';
import WishlistHeart from '../WishlistHeart/WishlistHeart';

import './Card.css';

// <video
//     style={videoCss}
//     className="banner-video"
//     height="100%"
//     width="100%"
//     autoPlay
//     playsInline
//     loop
//     muted
// >
//     <source
//         src="https://back.paparot.com/uploads/images/i0KUB6q61660240468.mp4?ngsw-bypass=true"
//         type="video/mp4"
//     />
// </video>
// const videoCss = {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: '100%',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundSize: 'cover',
//     objectFit: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     backgroundAttachment: 'fixed',
// };

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
    hideColors,
}) => {
    const componentClassNames = classNames('lib-card', className);
    let priceClassNames = classNames('lib-card__info-price');
    const discountPercent = useMemo(() => {
        if (discount && discount > 0) {
            return Math.floor((((purePrice - discount) - purePrice) / purePrice) * 100);
        }

        return null;
    }, [purePrice, discount]);

    if (discount > 0) {
        priceClassNames = classNames(priceClassNames, 'sale');
    }

    return (
        <div className={componentClassNames}>
            <div className="lib-card__heart_wh">
                <WishlistHeart cardId={cardId} />
            </div>
            <NavLink aria-label={`Детальніше про - ${title}`} to={detailsPath}>
                <div
                    className="lib-card__picture"
                    style={{ backgroundImage: `url(${imagePath})` }}
                />
                {!!discountPercent && (
                    <div aria-label={`Знижка ${discountPercent}%`} className="discount-label">{`${discountPercent}%`}</div>
                )}
            </NavLink>
            {!hideInfo && (
                <div className={classNames('lib-card__info', { 'hidden-colors': hideColors })}>
                    <NavLink to={detailsPath} className="lib-card__info-content">
                        <p className="lib-card__info-title">
                            {title}
                        </p>
                    </NavLink>
                    <div className="lib-card__info-price-content">
                        {discount > 0 ? (
                            <>
                                <div className="lib-card__info-price">{getFormattedPrice(purePrice - discount)}</div>
                                <div className={priceClassNames}>{price}</div>
                            </>
                        ) : <div className={priceClassNames}>{price}</div>}
                    </div>
                    {!hideColors && <Swatches data={colors} />}
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
    hideColors: PropTypes.bool,
};

Card.defaultProps = {
    className: '',
    detailsPath: '',
    currency: '₴',
    imagePath: '',
    title: '',
    price: 0,
    hideInfo: false,
    hideColors: false,
};
