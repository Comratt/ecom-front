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

export const useFetchProducts = () => {
    const [page, setPage] = useState({ page: 1 });
    const handleChangePage = (pageNumber) => setPage({ page: pageNumber });
    const { loading, error, result } = useAsync(ProductsService.getAll, [page]);

    return useMemo(() => ({
        loading,
        error,
        result: adapt(result?.data),
        totalPages: result?.last_page,
        page: page.page,
        setPage: handleChangePage,
    }), [
        loading,
        error,
        result,
        page,
        handleChangePage,
    ]);
};
