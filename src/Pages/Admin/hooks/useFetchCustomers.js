import { useMemo, useState } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import ClientBaseService from 'Services/ClientBaseService';

const defaultFilters = {
    page: 1,
    status: '',
    orderId: '',
    createdAt: '',
    updatedAt: '',
};

export const useFetchCustomers = () => {
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
    } = useAsync(ClientBaseService.getAll, []);
    const {
        execute: executePost,
        loading: postLoading,
    } = useAsyncCallback(ClientBaseService.signUp, []);
    const {
        execute: executeUpdate,
        loading: updateLoading,
    } = useAsyncCallback(ClientBaseService.modify, []);

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
        handleChangePage,
        handleFilter,
        resetFilters,
    ]);
};
