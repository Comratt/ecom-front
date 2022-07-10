import {
    useMemo,
    useState,
    useEffect,
    useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-async-hook';
import { fetchProducts, fetchProduct } from '../api/fetchProducts';

export const useFetchProducts = (filters, setFilters) => {
    const isMounted = useRef(false);
    const { id } = useParams();
    const [sdata, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingNext, setLoadingNext] = useState(false);
    const [isLastPage, setLastPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isMounted.current && id && setFilters) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                category: [+id],
            }));
        }
        isMounted.current = true;
    }, [id, setFilters]);

    useEffect(() => {
        if (!sdata?.length) {
            setLoading(true);
        } else {
            setLoadingNext(true);
        }
        fetchProducts(filters).then(({ data, last_page, current_page }) => {
            setLastPage(last_page === filters?.page);
            setData((prevData) => {
                if (current_page > currentPage) {
                    return [...prevData, ...data];
                }

                return data;
            });
            setLoading(false);
            setLoadingNext(false);
            setCurrentPage(current_page);
        });
    }, [filters]);

    return useMemo(() => ({
        loading,
        loadingNext,
        result: sdata,
        isLastPage,
        currentPage,
    }), [
        loading,
        loadingNext,
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
