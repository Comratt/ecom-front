import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';
import moment from 'moment';
import AnalyticService from 'Services/AnalyticService';

const getPercent = (yesterday, today) => {
    const prefix = ((today - yesterday) < 0) ? '-' : '+';
    // const percent = Math.floor((((today - yesterday) / (yesterday || 1)) * 100));
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
                    total: findHour.total,
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
                    total: findDay.total,
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
                    total: findMonth.total,
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
