import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';
import { fetchProducts, fetchProduct } from '../api/fetchProducts';

export const useFetchProducts = () => {
    const { loading, error, result } = useAsync(fetchProducts, []);

    return useMemo(() => ({
        loading,
        error,
        result,
    }), [
        loading,
        error,
        result,
    ]);
};

export const useFetchProduct = (id) => {
    const { loading, error, result } = useAsync(fetchProduct, [id]);

    return useMemo(() => ({
        loading,
        error,
        result,
    }), [
        loading,
        error,
        result,
    ]);
};
