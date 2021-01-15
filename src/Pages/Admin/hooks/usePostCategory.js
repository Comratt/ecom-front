import { useState, useCallback } from 'react';
import CategoryService from 'Services/CategoryService';
import { ADD_METHOD, UPDATE_METHOD } from 'Constants';

export const usePostCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(0);

    const addCategory = useCallback((params) => {
        setLoading(true);
        setError(null);

        return CategoryService.add(params)
            .then((category) => {
                setLoading(false);

                return category;
            })
            .catch((e) => {
                setLoading(false);
                setError(e);

                return e;
            });
    }, []);

    const deleteCategory = useCallback((id) => {
        setDeleteLoading(id);

        return CategoryService.delete(id)
            .then((category) => {
                setDeleteLoading(0);

                return category;
            })
            .catch((e) => {
                setDeleteLoading(0);

                return e;
            });
    }, []);

    const updateCategory = useCallback((params, id) => {
        setLoading(true);
        setError(null);

        return CategoryService.update(params, id)
            .then((category) => {
                setLoading(false);

                return category;
            })
            .catch((e) => {
                setLoading(false);
                setError(e);

                return e;
            });
    }, []);

    // eslint-disable-next-line consistent-return
    const handleSubmit = (params, id, method = 'add') => {
        if (method === ADD_METHOD) return addCategory(params);
        if (method === UPDATE_METHOD) return updateCategory(params, id);
    };

    return {
        loading,
        deleteLoading,
        error,
        handleSubmit,
        deleteCategory,
    };
};
