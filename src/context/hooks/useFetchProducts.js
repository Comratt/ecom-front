import { useMemo, useState, useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import { fetchProducts, fetchProduct } from '../api/fetchProducts';

export const useFetchProducts = (filters) => {
    const [sdata, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLastPage, setLastPage] = useState(false);

    useEffect(() => {
        setLoading(false);
        fetchProducts(filters).then(({ data, last_page }) => {
            setLastPage(last_page === filters?.page);
            setData((prevData) => [...prevData, ...data]);
        });
    }, [filters?.page]);

    return useMemo(() => ({
        loading,
        result: sdata,
        isLastPage,
    }), [
        loading,
        sdata,
        isLastPage,
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
