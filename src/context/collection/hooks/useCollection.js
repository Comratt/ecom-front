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
    } = useCollectionData();
    const handleSelectCategory = ({ target: { id } }) => {
        setFilters((prevFilters) => {
            if (prevFilters.category.includes(id)) {
                return ({
                    ...prevFilters,
                    page: 1,
                    category: prevFilters.category.filter((cat) => cat !== id),
                });
            }

            return ({
                ...prevFilters,
                page: 1,
                category: [...prevFilters.category, id],
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
        handleSelectCategory,
        handlePageCount,
        handleSortBy,
        handleFilterBy,
        handleAvailable,
        filters,
    ]);
};
