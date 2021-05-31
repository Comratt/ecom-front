import { useState, useCallback, useMemo } from 'react';
import { ADD_METHOD, UPDATE_METHOD } from 'Constants';
import OptionService from '../../../Services/OptionService';

export const usePostOptions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(0);

    const addOptions = useCallback((params) => {
        setLoading(true);
        setError(null);

        return OptionService.add(params)
            .then((option) => option)
            .catch((e) => {
                setError(e);

                return e;
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const deleteOption = useCallback((id) => {
        setDeleteLoading(id);

        return OptionService.delete(id)
            .then((option) => {
                setDeleteLoading(0);

                return option;
            })
            .catch((e) => {
                setDeleteLoading(0);

                return e;
            });
    }, []);

    const updateOption = useCallback((params, id) => {
        setLoading(true);
        setError(null);

        return OptionService.update(params, id)
            .then((option) => {
                setLoading(false);

                return option;
            })
            .catch((e) => {
                setLoading(false);
                setError(e);

                return e;
            });
    }, []);

    // eslint-disable-next-line consistent-return
    const handleSubmit = (params, id, method = ADD_METHOD) => {
        if (method === ADD_METHOD) return addOptions(params);
        if (method === UPDATE_METHOD) return updateOption(params, id);
    };

    return useMemo(() => ({
        loading,
        deleteLoading,
        error,
        handleSubmit,
        deleteOption,
    }), [
        loading,
        deleteLoading,
        error,
        handleSubmit,
        deleteOption,
    ]);
};
