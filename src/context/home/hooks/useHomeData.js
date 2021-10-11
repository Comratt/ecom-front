import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';

import { fetchBanners } from 'context/api/fetchBanners';
import { adaptBanners, adaptProducts } from 'context/adapters';
import { useFetchProducts } from 'context/hooks/useFetchProducts';

export const useHomeData = () => {
    const { loading, error, result } = useAsync(fetchBanners, []);
    const { loading: pLoading, error: pError, result: pResult } = useFetchProducts();

    return useMemo(() => ({
        loading,
        result: adaptBanners(result),
        error,
        pResult: adaptProducts(pResult),
        pError,
        pLoading,
    }), [
        loading,
        result,
        error,
        pResult,
        pError,
        pLoading,
    ]);
};
