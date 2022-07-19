import React, { useMemo } from 'react';
import { Heart } from 'Icons';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistProducts } from 'Store/Modules/Wishlist/selectors';
import { addToWish, removeFromWish } from 'Store/Modules/Wishlist/wishlistActions';

import './WishlistHeart.css';

const WishlistHeart = ({ cardId }) => {
    const dispatch = useDispatch();
    const listWishProducts = useSelector(getWishlistProducts);

    const handleClick = (id, isActive) => () => {
        if (isActive) return dispatch(removeFromWish(id));

        return dispatch(addToWish({ id }));
    };
    const isActive = useMemo(() => listWishProducts.includes(cardId), [listWishProducts, cardId]);

    return (
        <button
            title="Додати в список вподобаних"
            type="button"
            className="lib-card__heart"
            aria-label="Додати в список вподобаних"
            onClick={handleClick(cardId, isActive)}
        >
            <Heart
                height="23"
                width="23"
                fill={isActive ? '#fa4343' : 'var(--color-accent)'}
                fillOpacity={isActive ? '0.8' : '0.7'}
            />
        </button>
    );
};

export default WishlistHeart;
