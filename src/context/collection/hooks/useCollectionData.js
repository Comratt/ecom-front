import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';

import { adaptProducts } from 'context/adapters';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { fetchCategories } from '../../api/fetchCategories';

const adaptCategories = (data = []) => {
    if (!Array.isArray(data)) return [];

    const parentCategories = data.filter(({ parent_id }) => !parent_id);

    return parentCategories.map((cat) => ({
        name: cat.category_name,
        subcategories: data.filter((subCat) => cat.category_id === subCat.parent_id),
    }));
};

export const useCollectionData = () => {
    const [filters, setFilters] = useState({
        page: 1,
        count: 15,
        category: [],
    });
    const {
        loading: categoriesLoading,
        error: categoriesError,
        result: categoriesResult,
    } = useAsync(fetchCategories, []);
    const {
        loading,
        result,
        isLastPage,
        currentPage,
    } = useFetchProducts(filters);

    return useMemo(() => ({
        loading: loading && categoriesLoading,
        result: adaptProducts({ data: result }),
        categories: adaptCategories(categoriesResult),
        isLastPage,
        currentPage,
        setFilters,
    }), [
        loading,
        categoriesLoading,
        result,
        categoriesResult,
        isLastPage,
        currentPage,
        setFilters,
    ]);
};
