import React from 'react';
import { useHistory } from 'react-router-dom';
import { useWishlist } from 'context/wishlist/useWishlist';
import { View } from 'Components/View';
import { Title } from 'Components/Title';
import { CardList } from 'Components/CardList';
import { CatalogLoader } from 'Components/SkeletonLoader';

import './Wishlist.css';

const Wishlist = () => {
    const {
        result,
        loading,
        isLastPage,
        handlePageCount,
        currentPage,
        productIDs,
    } = useWishlist();
    const history = useHistory();

    if (!productIDs?.length) {
        return (
            <View className="wishlist-page__container wishlist-empty">
                <Title type={1}>
                    Список вподобаних товарів
                </Title>
                <Title className="wishlist-page__title" type={2}>У Вас поки що немає улюблених товарів :(</Title>
                <button
                    type="button"
                    className="btn-continue-empty"
                    onClick={() => history.goBack()}
                >
                    Обрати товари
                </button>
            </View>
        );
    }

    if (loading) {
        return (
            <View className="wishlist-page__container">
                <h4 className="wishlist-header">
                    Список вподобаних товарів
                </h4>
                <CatalogLoader />
            </View>
        );
    }

    return (
        <View className="wishlist-page__container">
            <h4 className="wishlist-header">
                Список вподобаних товарів
            </h4>
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
