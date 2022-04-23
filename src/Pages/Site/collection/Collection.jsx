import React from 'react';
import { useCollection } from 'context/collection/hooks/useCollection';
import { View } from 'Components/View';
import CollectionList from 'Components/CollectionList';
import { CardList } from 'Components/CardList';
import { CheckboxFilter } from 'Components/CheckboxFilter';

import './Collection.css';

export const Collection = () => {
    const {
        loading,
        result,
        categories,
        isLastPage,
        currentPage,
        handleSelectCategory,
        handlePageCount,
        handleSortBy,
        handleFilterBy,
        handleAvailable,
        filters,
    } = useCollection();

    return (
        <View className="collection-page__container">
            <CollectionList onChange={handleSelectCategory} data={categories}>
                <div>
                    <CheckboxFilter
                        filters={filters}
                        handleSortBy={handleSortBy}
                        handleFilterBy={handleFilterBy}
                        handleAvailable={handleAvailable}
                    />
                    <CardList
                        isLastPage={isLastPage}
                        currentPage={currentPage}
                        data={result}
                        loading={loading}
                        handlePageCount={handlePageCount}
                    />
                </div>
            </CollectionList>
        </View>
    );
};
