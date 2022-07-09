import { useMemo, useState } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import PromoCodeService from 'Services/PromoCodeService';

const defaultFilters = {
    page: 1,
    status: '',
    orderId: '',
    createdAt: '',
    updatedAt: '',
};

export const useFetchPromo = () => {
    const [filters, setFilters] = useState(defaultFilters);
    const handleFilter = (name, value) => setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        page: 1,
    }));
    const handleChangePage = (pageNumber) => setFilters((prevFilters) => ({
        ...prevFilters,
        page: pageNumber,
    }));
    const resetFilters = () => setFilters(defaultFilters);
    const {
        result,
        set: setResult,
        loading,
        error,
    } = useAsync(PromoCodeService.getAll, []);
    const {
        execute: executePost,
        loading: postLoading,
    } = useAsyncCallback(PromoCodeService.store, []);
    const {
        execute: executeUpdate,
        loading: updateLoading,
    } = useAsyncCallback(PromoCodeService.modify, []);
    const {
        execute: executeDelete,
        loading: deleteLoading,
    } = useAsyncCallback(PromoCodeService.delete, []);

    return useMemo(() => ({
        totalPages: result?.last_page,
        page: filters.page,
        result: result?.data,
        setResult,
        filters,
        setPage: handleChangePage,
        handleFilter,
        resetFilters,
        executePost,
        postLoading,
        executeUpdate,
        updateLoading,
        executeDelete,
        deleteLoading,
        loading,
        error,
    }), [
        loading,
        error,
        result,
        setResult,
        filters,
        executePost,
        postLoading,
        executeUpdate,
        updateLoading,
        executeDelete,
        deleteLoading,
        handleChangePage,
        handleFilter,
        resetFilters,
    ]);
};
