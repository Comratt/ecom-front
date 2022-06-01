import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getWishlistProducts } from 'Store/Modules/Wishlist/selectors';
import { useWishlistLayout } from './useWishlistLayout';
import { useWishlistData } from './useWishlistData';

export const useWishlist = () => {
    const productIDs = useSelector(getWishlistProducts);
    const {
        result,
        loading,
        isLastPage,
        setFilters,
        filters,
        currentPage,
    } = useWishlistData(productIDs);

    const handlePageCount = (page) => setFilters((prevFilters) => ({
        ...prevFilters,
        page,
    }));

    useWishlistLayout();

    return useMemo(() => ({
        result,
        loading,
        isLastPage,
        handlePageCount,
        filters,
        currentPage,
        productIDs,
    }), [
        result,
        loading,
        isLastPage,
        handlePageCount,
        filters,
        currentPage,
        productIDs,
    ]);
};
