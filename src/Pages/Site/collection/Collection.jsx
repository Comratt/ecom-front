import React from 'react';
import { useCollection } from 'context/collection/hooks/useCollection';
import { View } from 'Components/View';
import CollectionList from 'Components/CollectionList';
import { CardList } from 'Components/CardList';
import { CheckboxFilter } from 'Components/CheckboxFilter';
import { CatalogLoader } from 'Components/SkeletonLoader';

import './Collection.css';

export const Collection = () => {
    const {
        loading,
        loadingNext,
        result,
        categories,
        isLastPage,
        currentPage,
        collectionId,
        handleSelectCategory,
        handlePageCount,
        handleSortBy,
        handleFilterBy,
        handleAvailable,
        filters,
        resetFilters,
        isFiltered,
        filtersDiff,
    } = useCollection();

    if (loading) {
        return (
            <View className="collection-page__container">
                <CatalogLoader />
            </View>
        );
    }

    return (
        <View className="collection-page__container">
            <CollectionList
                filtered={filters?.category}
                onChange={handleSelectCategory}
                data={categories}
            >
                <div>
                    <CheckboxFilter
                        filtersDiff={filtersDiff}
                        resetFilters={resetFilters}
                        isFiltered={isFiltered}
                        filters={filters}
                        categories={categories}
                        collectionId={collectionId}
                        handleSortBy={handleSortBy}
                        handleFilterBy={handleFilterBy}
                        handleAvailable={handleAvailable}
                    />
                    <CardList
                        categories={categories}
                        filters={filters}
                        isLastPage={isLastPage}
                        currentPage={currentPage}
                        data={result}
                        loading={loading}
                        loadingNext={loadingNext}
                        handlePageCount={handlePageCount}
                    />
                </div>
            </CollectionList>
        </View>
    );
};
