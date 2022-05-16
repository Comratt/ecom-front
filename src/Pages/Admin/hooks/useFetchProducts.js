import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';

import ProductsService from 'Services/ProductsService';
import { getFormattedPrice } from 'Constants';
import { getImage } from 'API';

const adapt = (data = []) => data.map((product) => ({
    ...product,
    price: getFormattedPrice(product.price),
    quantity: product?.sizes?.reduce((acc, option) => acc + option.quantity, 0),
    image: getImage(product.image),
}));

const defaultFilters = {
    page: 1,
    name: '',
    model: '',
    status: '',
};

export const useFetchProducts = () => {
    const [filters, setFilters] = useState(defaultFilters);
    const handleFilter = (name, value) => setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
        page: 1,
    }));
    const resetFilters = () => setFilters(defaultFilters);
    const handleChangePage = (pageNumber) => setFilters((prevFilters) => ({
        ...prevFilters,
        page: pageNumber,
    }));
    const { loading, error, result } = useAsync(ProductsService.getAll, [filters]);

    return useMemo(() => ({
        loading,
        error,
        filters,
        result: adapt(result?.data),
        totalPages: result?.last_page,
        page: filters.page,
        setPage: handleChangePage,
        handleFilter,
        resetFilters,
    }), [
        loading,
        error,
        result,
        filters,
        handleChangePage,
        handleFilter,
        resetFilters,
    ]);
};
