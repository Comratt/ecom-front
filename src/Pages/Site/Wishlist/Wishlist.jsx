import React from 'react';
import { useWishlist } from 'context/wishlist/useWishlist';
import { View } from 'Components/View';
import { CardList } from 'Components/CardList';
import './Wishlist.css';

const Wishlist = () => {
    const {
        result,
        loading,
        isLastPage,
        handlePageCount,
        currentPage,
    } = useWishlist();

    return (
        <View className="wishlist-page__container">
            <CardList
                isLastPage={isLastPage}
                currentPage={currentPage}
                data={result}
                loading={loading}
                handlePageCount={handlePageCount}
            />
        </View>
    );
};

export default Wishlist;
