import React from 'react';
import { useHistory } from 'react-router-dom';
import { useWishlist } from 'context/wishlist/useWishlist';
import { View } from 'Components/View';
import { Title } from 'Components/Title';
import { CardList } from 'Components/CardList';
import { CatalogLoader } from 'Components/SkeletonLoader';
import Button from 'Components/Button/Button';
import MetaTags from 'Components/MetaTags';

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
                <div className="wishlist-page-btn">
                    <Button variant="primary" onClick={() => history.goBack()}>
                        Обрати товари
                    </Button>
                </div>
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
        <>
            <MetaTags
                title="Інтернет магазин - 13"
                metaTitle="Інтернет магазин - 12"
                description="Description"
                tags="Tags"
                keywords="asd, dds, sfdsf"
            />
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
        </>
    );
};

export default Wishlist;
