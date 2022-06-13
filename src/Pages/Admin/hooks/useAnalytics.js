import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';
import AnalyticService from 'Services/AnalyticService';

const getPercent = (yesterday, today) => {
    const prefix = ((today - yesterday) < 0) ? '-' : '+';
    const percent = Math.floor((((today - yesterday) / (yesterday || 1)) * 100));

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
