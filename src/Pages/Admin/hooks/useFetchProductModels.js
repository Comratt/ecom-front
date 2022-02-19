import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';

import ProductsService from 'Services/ProductsService';

const adapt = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map(({ product_id, ...rest }) => ({ id: product_id, ...rest }));
};

export const useFetchProductModels = () => {
    const { loading, error, result } = useAsync(ProductsService.getAllModels, []);

    return useMemo(() => ({
        loading, error, result: adapt(result),
    }), [loading, error, result]);
};
