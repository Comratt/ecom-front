import React, { useEffect } from 'react';
import { useCollection } from 'context/collection/hooks/useCollection';
import { View } from 'Components/View';
import CollectionList from 'Components/CollectionList';
import { CardList } from 'Components/CardList';
import { CheckboxFilter } from 'Components/CheckboxFilter';
import { CatalogLoader } from 'Components/SkeletonLoader';
import MetaTags from 'Components/MetaTags';

import './Collection.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BreadCrumb } from '../../../Components/BreadCrumb';
import { Title } from '../../../Components/Title';

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
        breadcrumbs,
        meta,
    } = useCollection();
    const selectedCategory = categories?.find(({ id }) => id === collectionId);

    const url = useHistory();

    useEffect(() => {
        console.log('test', url.location.pathname);
        if (url.location.pathname === '/collection') {
            resetFilters();
        }
    }, [url, collectionId]);

    if (loading) {
        return (
            <View className="collection-page__container">
                <CatalogLoader />
            </View>
        );
    }

    return (
        <>
            <MetaTags
                description={meta.metaDescription}
                keywords={meta.metaKeywords}
                tags={meta.metaTags}
                metaTitle={meta.metaTitle}
                title={meta.title}
            />
            <View className="collection-page__container">
                <BreadCrumb items={breadcrumbs} />
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
                <View padHrMedium>
                    <Title type={3}>
                        {selectedCategory?.description}
                    </Title>
                </View>
            </View>
        </>
    );
};
