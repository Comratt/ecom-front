import { useMemo } from 'react';

import { adaptProduct } from 'context/adapters/adaptProducts';
import { useFetchProduct } from 'context/hooks/useFetchProducts';

export const useProductData = (id) => {
    const { loading, error, result } = useFetchProduct(id);

    return useMemo(() => ({
        loading,
        error,
        result: adaptProduct(result),
    }), [
        loading,
        error,
        result,
    ]);
};
