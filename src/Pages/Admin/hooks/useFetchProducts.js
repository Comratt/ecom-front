import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';

import ProductsService from 'Services/ProductsService';
import { getFormattedPrice } from 'Constants';
import { getImage } from 'API';

const adapt = (data = []) => data.map((product) => ({
    ...product,
    price: getFormattedPrice(product.price),
    quantity: product?.options?.reduce((acc, option) => acc + option.quantity, 0),
    image: getImage(product.image),
}));

export const useFetchProducts = () => {
    const [page, setPage] = useState(1);
    const { loading, error, result } = useAsync(ProductsService.getAll, [page]);

    return useMemo(() => ({
        loading,
        error,
        result: adapt(result?.data),
        page,
        setPage,
    }), [
        loading,
        error,
        result,
        page,
        setPage,
    ]);
};
