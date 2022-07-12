import { useMemo } from 'react';

import { adaptProduct } from 'context/adapters/adaptProducts';
import { useFetchProduct } from 'context/hooks/useFetchProducts';
import { useCategories } from '../../CategoriesWrapper/useCategories';
import { adaptCategories } from '../../../Pages/Admin/hooks/useFetchCategories';

export const useProductData = (id, isUniq) => {
    const { loading, error, result } = useFetchProduct(id);
    const { categories } = useCategories();

    return useMemo(() => ({
        loading,
        error,
        result: adaptProduct(result, adaptCategories(categories), isUniq),
    }), [
        loading,
        error,
        result,
        categories,
        isUniq,
    ]);
};
