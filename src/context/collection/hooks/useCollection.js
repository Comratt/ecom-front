import { useMemo } from 'react';

import { useCollectionLayout } from './useCollectionLayout';
import { useCollectionData } from './useCollectionData';

export const useCollection = () => {
    const {
        loading,
        loadingNext,
        result,
        categories,
        pureCategories,
        isLastPage,
        currentPage,
        setFilters,
        filters,
        collectionId,
        resetFilters,
        isFiltered,
        filtersDiff,
    } = useCollectionData();
    const handleSelectCategory = ({ target: { id } }) => {
        setFilters((prevFilters) => {
            let filteredFilters = prevFilters?.category;

            if (collectionId) {
                filteredFilters = prevFilters?.category?.filter((cat) => cat != collectionId);
            }

            if (filteredFilters.includes(+id)) {
                if (collectionId && filteredFilters?.length === 1) {
                    return ({
                        ...prevFilters,
                        page: 1,
                        category: [+collectionId],
                    });
                }

                return ({
                    ...prevFilters,
                    page: 1,
                    category: filteredFilters.filter((cat) => cat != id)?.map((v) => +v),
                });
            }

            return ({
                ...prevFilters,
                page: 1,
                category: [...filteredFilters.map((v) => +v), +id],
            });
        });
    };
    const handlePageCount = (page) => setFilters((prevFilters) => ({
        ...prevFilters,
        page,
    }));
    const handleSortBy = (value) => setFilters((prevFilters) => ({
        ...prevFilters,
        page: 1,
        sortBy: value,
    }));
    const handleFilterBy = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            page: 1,
            [name]: value,
        }));
    };
    const handleAvailable = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            page: 1,
            available: !prevFilters.available,
        }));
    };
    const meta = useMemo(() => {
        if (collectionId) {
            const category = pureCategories?.find((cat) => +cat?.category_id === +collectionId);

            if (category) {
                return {
                    title: category?.category_name,
                    metaTitle: category?.meta_title,
                    metaDescription: category?.meta_description,
                    metaKeywords: category?.meta_keywords,
                    metaTags: category?.tag,
                };
            }

            return {
                title: '',
                metaTitle: '',
                metaDescription: '',
                metaKeywords: '',
                metaTags: '',
            };
        }

        return {
            title: '',
            metaTitle: '',
            metaDescription: '',
            metaKeywords: '',
            metaTags: '',
        };
    }, [pureCategories, collectionId]);

    useCollectionLayout();

    return useMemo(() => ({
        loading,
        loadingNext,
        result,
        categories,
        pureCategories,
        isLastPage,
        currentPage,
        collectionId,
        handleSelectCategory,
        handlePageCount,
        handleSortBy,
        handleFilterBy,
        handleAvailable,
        resetFilters,
        isFiltered,
        filtersDiff,
        filters,
        meta,
    }), [
        loading,
        loadingNext,
        result,
        categories,
        pureCategories,
        isLastPage,
        currentPage,
        collectionId,
        handleSelectCategory,
        handlePageCount,
        handleSortBy,
        handleFilterBy,
        handleAvailable,
        resetFilters,
        isFiltered,
        filtersDiff,
        filters,
        meta,
    ]);
};
