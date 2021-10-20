import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';

import { fetchBanners } from 'context/api/fetchBanners';
import { adaptBanners } from 'context/adapters';

export const useHomeData = () => {
    const { loading, error, result } = useAsync(fetchBanners, []);

    return useMemo(() => ({
        loading,
        result: adaptBanners(result),
        error,
    }), [
        loading,
        result,
        error,
    ]);
};
