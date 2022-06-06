import { useMemo, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { adaptProducts } from 'context/adapters';
import { sortOrder } from 'Helpers';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { fetchCategories } from '../../api/fetchCategories';

const adaptCategories = (data = []) => {
    if (!Array.isArray(data)) return [];

    const parentCategories = data.filter(({ parent_id }) => !parent_id).sort(sortOrder);

    return parentCategories.map((cat) => ({
        id: cat.category_id,
        name: cat.category_name,
        subcategories: data.filter((subCat) => cat.category_id === subCat.parent_id),
    }));
};

export const useCollectionData = () => {
    const { id } = useParams();
    const defaultFilters = {
        page: 1,
        count: 15,
        category: id ? [id] : [],
        sortBy: '',
        color: [],
        price: [],
        available: false,
    };
    const [filters, setFilters] = useState(defaultFilters);
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
    } = useFetchProducts(filters, setFilters);

    const resetFilters = () => setFilters(defaultFilters);
    const isFiltered = !isEqual(defaultFilters, filters);

    return useMemo(() => ({
        loading: loading || categoriesLoading,
        result: adaptProducts({ data: result }),
        categories: adaptCategories(categoriesResult),
        isLastPage,
        currentPage,
        setFilters,
        filters,
        collectionId: id,
        resetFilters,
        isFiltered,
    }), [
        loading,
        categoriesLoading,
        result,
        categoriesResult,
        resetFilters,
        isFiltered,
        isLastPage,
        currentPage,
        setFilters,
        filters,
        id,
    ]);
};
