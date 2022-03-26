import { useMemo, useState, useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import { fetchProducts, fetchProduct } from '../api/fetchProducts';

export const useFetchProducts = (filters) => {
    const [sdata, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLastPage, setLastPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetchProducts(filters).then(({ data, last_page, current_page }) => {
            setLastPage(last_page === filters?.page);
            setData((prevData) => {
                if (current_page > currentPage) {
                    return [...prevData, ...data];
                }

                return data;
            });
            setLoading(false);
            setCurrentPage(current_page);
        });
    }, [filters]);

    return useMemo(() => ({
        loading,
        result: sdata,
        isLastPage,
        currentPage,
    }), [
        loading,
        sdata,
        isLastPage,
        currentPage,
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
