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
        <div>
            <button
                title="Like product"
                type="button"
                className="lib-card__heart"
                onClick={handleClick(cardId, isActive)}
            >
                <Heart height="18" width="20" fill={isActive ? '#fa4343' : '#000000'} />
            </button>
        </div>
    );
};

export default WishlistHeart;
