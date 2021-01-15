import { useState, useEffect, useCallback } from 'react';
import BannerService from 'Services/BannerService';

const useFetchAllBanners = () => {
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await BannerService.getAll();

            setBanners(response);
        } catch (e) {
            console.warn(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        banners,
        setBanners,
        error,
    };
};

export {
    useFetchAllBanners,
};
