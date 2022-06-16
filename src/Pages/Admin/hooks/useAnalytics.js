import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';
import moment from 'moment';
import AnalyticService from 'Services/AnalyticService';

const getPercent = (yesterday, today) => {
    const prefix = ((today - yesterday) < 0) ? '-' : '+';
    const percent = Math.floor((today * 100) / yesterday || 0);

    return prefix === '-' ? 0 - percent : percent;
};

const adapt = (data = {}) => Object.keys(data)?.reduce((acc, key) => {
    if (key === 'ordersMap') {
        return ({
            ...acc,
            [key]: data[key],
        });
    }

    return ({
        ...acc,
        [key]: {
            total: data[key]?.total,
            percent: getPercent(data[key]?.yesterday, data[key]?.today),
        },
    });
}, {});

const adaptOrders = (data = [], filterBy) => {
    if (!data) {
        return [];
    }

    switch (filterBy) {
    case 'day': {
        const hoursArray = Array.from({ length: 24 }, (_, i) => i + 1);

        return hoursArray.map((hour) => {
            const findHour = data.find(({ value }) => +value === +hour);

            if (findHour) {
                return ({
                    value: hour,
                    total: parseFloat(findHour.total),
                });
            }

            return ({
                value: hour,
                total: 0,
            });
        });
    }
    case 'month': {
        const daysInMonth = moment().daysInMonth();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

        return daysArray.map((day) => {
            const findDay = data.find(({ value }) => +value === +day);

            if (findDay) {
                return ({
                    value: day,
                    total: parseFloat(findDay.total),
                });
            }

            return ({
                value: day,
                total: 0,
            });
        });
    }
    case 'year': {
        const monthArray = Array.from({ length: 12 }, (_, i) => i + 1);

        return monthArray.map((month) => {
            const findMonth = data.find(({ value }) => +value === +month);

            if (findMonth) {
                return ({
                    value: month,
                    total: parseFloat(findMonth.total),
                });
            }

            return ({
                value: month,
                total: 0,
            });
        });
    }
    }
};

const adaptCategories = (data = []) => data?.map(({ name, value }) => ({
    name,
    label: name,
    value: parseInt(value, 10),
})).sort((a, b) => b.value - a.value);

export const useAnalytics = () => {
    const { result, loading, error } = useAsync(AnalyticService.getAll, []);

    return useMemo(() => ({
        result: adapt(result),
        loading,
        error,
    }), [
        result, loading, error,
    ]);
};

export const useOrdersAnalytics = () => {
    const [filters, setFilters] = useState({ filterBy: 'month' });
    const { result, loading, error } = useAsync(AnalyticService.getOrdersGraph, [filters]);

    const onFiltersChange = (filterBy) => setFilters({ filterBy });

    return useMemo(() => ({
        result: adaptOrders(result, filters.filterBy),
        onFiltersChange,
        loading,
        filters,
        error,
    }), [
        result,
        loading,
        filters,
        error,
        onFiltersChange,
    ]);
};

export const useCategoriesAnalytics = () => {
    const [filters, setFilters] = useState({ filterBy: 'month' });
    const { result, loading, error } = useAsync(AnalyticService.getCategoriesGraph, [filters]);

    const onFiltersChange = (filterBy) => setFilters({ filterBy });

    return useMemo(() => ({
        result: adaptCategories(result),
        onFiltersChange,
        loading,
        filters,
        error,
    }), [
        result,
        loading,
        filters,
        error,
        onFiltersChange,
    ]);
};

export const useProductsAnalytics = () => {
    const [filters, setFilters] = useState({ filterBy: 'month' });
    const { result, loading, error } = useAsync(AnalyticService.getProductsGraph, [filters]);

    const onFiltersChange = (filterBy) => setFilters({ filterBy });

    return useMemo(() => ({
        result: result?.sort((a, b) => b.value - a.value),
        onFiltersChange,
        loading,
        filters,
        error,
    }), [
        result,
        loading,
        filters,
        error,
        onFiltersChange,
    ]);
};
