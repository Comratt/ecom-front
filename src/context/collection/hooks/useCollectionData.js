import { useMemo, useState, useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import qs from 'query-string';

import { adaptProducts } from 'context/adapters';
import { getObjectDiff, sortOrder } from 'Helpers';
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
    const history = useHistory();
    const { search, pathname } = useLocation();
    const urlFilters = qs.parse(search, { arrayFormat: 'bracket', parseBooleans: true, parseNumbers: true });
    const defaultFilters = {
        page: 1,
        count: 15,
        category: id ? [+id] : [],
        sortBy: '',
        color: [],
        price: [],
        available: false,
    };
    const [filters, setFilters] = useState({ ...defaultFilters, ...urlFilters });
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
    const { page: dfPage, count: dfCount, ...defaultFiltersWithoutPage } = defaultFilters;
    const { page, count, ...filtersWithoutPage } = filters;
    const isFiltered = !isEqual(defaultFiltersWithoutPage, filtersWithoutPage);
    const filtersDiff = getObjectDiff(defaultFiltersWithoutPage, filtersWithoutPage);

    useEffect(() => {
        const { page: pageFilter } = filters;
        const modFilters = {
            ...filters,
            page: 1,
            count: pageFilter * defaultFilters.count,
        };

        history.push({
            pathname,
            search: `?${qs.stringify(modFilters, { arrayFormat: 'bracket', skipNull: true })}`,
        });
    }, [filters]);

    return useMemo(() => ({
        loading: loading || categoriesLoading,
        result: adaptProducts({ data: result }),
        categories: adaptCategories(categoriesResult),
        isLastPage,
        currentPage,
        setFilters,
        filters,
        collectionId: +id,
        resetFilters,
        isFiltered,
        filtersDiff,
    }), [
        loading,
        categoriesLoading,
        result,
        categoriesResult,
        resetFilters,
        isFiltered,
        filtersDiff,
        isLastPage,
        currentPage,
        setFilters,
        filters,
        id,
    ]);
};
