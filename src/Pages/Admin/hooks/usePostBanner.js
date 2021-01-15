import { useState, useCallback } from 'react';
import BannerService from 'Services/BannerService';
import { ADD_METHOD, UPDATE_METHOD } from 'Constants';

export const usePostBanner = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(0);

    const addBanner = useCallback((params) => {
        setLoading(true);
        setError(null);

        return BannerService.add(params)
            .then((banner) => {
                setLoading(false);

                return banner;
            })
            .catch((e) => {
                setLoading(false);
                setError(e);

                return e;
            });
    }, []);

    const deleteBanner = useCallback((id) => {
        setDeleteLoading(id);

        return BannerService.delete(id)
            .then((banner) => {
                setDeleteLoading(0);

                return banner;
            })
            .catch((e) => {
                setDeleteLoading(0);

                return e;
            });
    }, []);

    const updateBanner = useCallback((params, id) => {
        setLoading(true);
        setError(null);

        return BannerService.update(params, id)
            .then((banner) => {
                setLoading(false);

                return banner;
            })
            .catch((e) => {
                setLoading(false);
                setError(e);

                return e;
            });
    }, []);

    // eslint-disable-next-line consistent-return
    const handleSubmit = (params, id, method = 'add') => {
        if (method === ADD_METHOD) return addBanner(params);
        if (method === UPDATE_METHOD) return updateBanner(params, id);
    };

    return {
        loading,
        deleteLoading,
        error,
        handleSubmit,
        deleteBanner,
    };
};
