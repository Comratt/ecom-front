import { useState, useMemo } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { adaptProducts } from '../adapters';

export const useWishlistData = (id) => {
    const [filters, setFilters] = useState({
        page: 1,
        count: 20,
        id,
    });
    const {
        loading, result, isLastPage, currentPage,
    } = useFetchProducts(filters);

    return useMemo(() => ({
        filters,
        loading,
        result: adaptProducts({ data: result }),
        isLastPage,
        setFilters,
        currentPage,
    }), [
        filters,
        loading,
        result,
        isLastPage,
        setFilters,
        currentPage,
    ]);
};
