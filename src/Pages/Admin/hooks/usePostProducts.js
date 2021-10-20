import { useMemo, useCallback, useState } from 'react';

import ProductsService from 'Services/ProductsService';
import { ADD_METHOD, UPDATE_METHOD } from 'Constants';

export const usePostProducts = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(0);

    const addProduct = useCallback((params) => {
        setLoading(true);
        setError(null);

        return ProductsService.store(params)
            .catch((e) => {
                setError(e);

                return e;
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const updateProduct = useCallback((params, id) => {
        setLoading(true);
        setError(null);

        return ProductsService.update(params)
            .catch((e) => {
                setError(e);

                return e;
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const deleteProduct = useCallback((id) => {
        setDeleteLoading(id);

        return ProductsService.delete(id)
            .then((product) => {
                setDeleteLoading(0);

                return product;
            })
            .catch((e) => {
                setDeleteLoading(0);

                return e;
            });
    }, []);

    const handleSubmit = useCallback((params, id, method = ADD_METHOD) => {
        if (method === ADD_METHOD) return addProduct(params);
        if (method === UPDATE_METHOD) return updateProduct(params, id);
    }, []);

    return useMemo(() => ({
        loading,
        deleteLoading,
        error,
        handleSubmit,
        deleteProduct,
    }), [
        loading,
        deleteLoading,
        error,
        handleSubmit,
        deleteProduct,
    ]);
};
