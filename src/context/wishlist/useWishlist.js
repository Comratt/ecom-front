import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getWishlistProducts } from 'Store/Modules/Wishlist/selectors';
import { clearFilters } from 'Store/Modules/Filters/filtersActions';
import { useWishlistLayout } from './useWishlistLayout';
import { useWishlistData } from './useWishlistData';

export const useWishlist = () => {
    const dispatch = useDispatch();
    const productIDs = useSelector(getWishlistProducts);
    const {
        result,
        loading,
        isLastPage,
        setFilters,
        filters,
        currentPage,
    } = useWishlistData(productIDs);

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

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
