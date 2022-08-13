import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import ClientBaseService from 'Services/ClientBaseService';
import { getUser } from 'Store/Modules/LocalSettings/selectors';

const defaultFilters = {
    page: 1,
    status: '',
    orderId: '',
    createdAt: '',
    updatedAt: '',
};

export const useFetchCustomers = () => {
    const userRole = useSelector(getUser);
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
    } = useAsyncCallback(ClientBaseService.signUpFromAdmin, []);
    const {
        execute: executeUpdate,
        loading: updateLoading,
    } = useAsyncCallback(ClientBaseService.modify, []);
    const {
        execute: executeManagersCall,
        loading: managersLoading,
    } = useAsyncCallback(ClientBaseService.getAllManagers, []);

    const executeManagers = () => {
        if (userRole?.role === 'admin') {
            return executeManagersCall();
        }

        return new Promise((resolve) => {
            resolve([]);
        });
    };

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
        executeManagers,
        managersLoading,
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
        managersLoading,
        executeManagers,
        handleChangePage,
        handleFilter,
        resetFilters,
    ]);
};
