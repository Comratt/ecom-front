import { useMemo } from 'react';
import { useAsync } from 'react-async-hook';

import { fetchBanners } from 'context/api/fetchBanners';
import { fetchCategories } from 'context/api/fetchCategories';
import { adaptBanners } from 'context/adapters';
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
        loading: loadingCategories,
        error: errorCategories,
        result: resultCategories,
    } = useAsync(fetchCategories, []);

    return useMemo(() => ({
        loading,
        loadingCategories,
        result: adaptBanners(result),
        resultCategories: adaptCategories(resultCategories),
        error,
        errorCategories,
    }), [
        loading,
        loadingCategories,
        result,
        resultCategories,
        error,
        errorCategories,
    ]);
};
