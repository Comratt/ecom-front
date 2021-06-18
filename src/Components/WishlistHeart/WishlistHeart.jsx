import React from 'react';
import { Heart } from '../../Icons';
import './WishlistHeart.css';

const WishlistHeart = () => (
    <div>
        <button title="Like product" type="button" className="lib-card__heart">
            <Heart height="18" width="20" />
        </button>
    </div>
);

export default WishlistHeart;
