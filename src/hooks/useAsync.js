import {
    useState, useEffect, useCallback, useMemo,
} from 'react';

export const useAsync = ({ method, defaultData = [], adaptor }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(defaultData);

    const asyncMethod = () => method();

    const adaptData = (serverData) => {
        if (typeof adaptor === 'function') {
            return adaptor(serverData);
        }

        return serverData;
    };

    const fetch = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const asyncData = await asyncMethod();

            setData(adaptData(asyncData));
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetch();
    }, []);

    return useMemo(() => ({
        data,
        loading,
        error,
    }), [
        data,
        loading,
        error,
    ]);
};
