import { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import qs from 'query-string';

import { adaptProducts, adaptCategories } from 'context/adapters';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { getObjectDiff } from 'Helpers';
import { useFetchProducts } from '../../hooks/useFetchProducts';

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
        categories,
        categoriesLoading,
    } = useCategories();
    const {
        loading,
        loadingNext,
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

    useEffect(() => {
        if (urlFilters?.category?.length) {
            if (filters.category.includes(+id)) {
                return;
            }
            if (!isEqual(urlFilters.category, filters.category)) {
                setFilters((prevF) => ({
                    ...prevF,
                    category: urlFilters.category,
                }));
            }
        }
    }, [urlFilters?.category, filters.category]);

    return useMemo(() => ({
        loading: loading || categoriesLoading,
        loadingNext,
        result: adaptProducts({ data: result }),
        categories: adaptCategories(categories),
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
        loadingNext,
        categoriesLoading,
        result,
        categories,
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
