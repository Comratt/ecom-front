import {
    useState, useEffect, useCallback, useMemo,
} from 'react';

export const useAsync = ({
    method, defaultData = [], adaptor, params,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(defaultData);

    const asyncMethod = () => method(params);

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

            return asyncData;
        } catch (e) {
            setError(e);

            return e;
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
        setData,
        fetch,
    }), [
        data,
        loading,
        error,
        setData,
        fetch,
    ]);
};
