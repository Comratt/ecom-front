import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';

import { fetchBanners } from 'context/api/fetchBanners';
import { adaptBanners } from 'context/adapters';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { sortOrder } from 'Helpers';

const adaptCategories = (data = []) => data
    ?.filter(({ parent_id }) => !parent_id)
    ?.sort(sortOrder)
    ?.map((cat) => ({
        id: cat.category_id,
        name: cat.category_name,
    }));

export const useHomeData = () => {
    const { loading, error, result } = useAsync(fetchBanners, []);
    const {
        categoriesLoading,
        categoriesError,
        categories,
    } = useCategories();

    return useMemo(() => ({
        loading,
        loadingCategories: categoriesLoading,
        result: adaptBanners(result),
        resultCategories: adaptCategories(categories),
        error,
        errorCategories: categoriesError,
    }), [
        loading,
        categoriesLoading,
        result,
        categories,
        error,
        categoriesError,
    ]);
};
