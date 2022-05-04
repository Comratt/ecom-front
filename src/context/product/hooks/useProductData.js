import { useMemo } from 'react';

import { adaptProduct } from 'context/adapters/adaptProducts';
import { useFetchProduct } from 'context/hooks/useFetchProducts';
import { useFetchCategories } from 'Pages/Admin/hooks/useFetchCategories';

export const useProductData = (id, isUniq) => {
    const { loading, error, result } = useFetchProduct(id);
    const { categories } = useFetchCategories();

    return useMemo(() => ({
        loading,
        error,
        result: adaptProduct(result, categories, isUniq),
    }), [
        loading,
        error,
        result,
        categories,
    ]);
};
