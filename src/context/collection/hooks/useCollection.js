import { useMemo } from 'react';

import { useCollectionLayout } from './useCollectionLayout';
import { useCollectionData } from './useCollectionData';

export const useCollection = () => {
    const {
        loading,
        result,
        categories,
        isLastPage,
        currentPage,
        setFilters,
        filters,
        collectionId,
    } = useCollectionData();
    const handleSelectCategory = ({ target: { id } }) => {
        setFilters((prevFilters) => {
            let filteredFilters = prevFilters?.category;

            if (collectionId) {
                filteredFilters = prevFilters?.category?.filter((cat) => cat !== collectionId);
            }

            if (filteredFilters.includes(id)) {
                if (collectionId && filteredFilters?.length === 1) {
                    return ({
                        ...prevFilters,
                        page: 1,
                        category: [collectionId],
                    });
                }

                return ({
                    ...prevFilters,
                    page: 1,
                    category: filteredFilters.filter((cat) => cat !== id),
                });
            }

            return ({
                ...prevFilters,
                page: 1,
                category: [...filteredFilters, id],
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

    useCollectionLayout();

    return useMemo(() => ({
        loading,
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
    }), [
        loading,
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
    ]);
};
