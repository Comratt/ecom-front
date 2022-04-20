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

    useCollectionLayout();

    return useMemo(() => ({
        loading,
        result,
        categories,
        isLastPage,
        currentPage,
        handleSelectCategory,
        handlePageCount,
    }), [
        loading,
        result,
        categories,
        isLastPage,
        currentPage,
        handleSelectCategory,
        handlePageCount,
    ]);
};
