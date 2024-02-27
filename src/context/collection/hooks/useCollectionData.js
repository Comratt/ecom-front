import {
    useMemo, useState, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import qs from 'query-string';

import { adaptProducts, adaptCategories } from 'context/adapters';
import { useCategories } from 'context/CategoriesWrapper/useCategories';
import { addFilters } from 'Store/Modules/Filters/filtersActions';
import { getAllFilters } from 'Store/Modules/Filters/selectors';
import { getObjectDiff } from 'Helpers';
import { useFetchProducts } from '../../hooks/useFetchProducts';

const defaultBreadcrumb = {
    href: '/collection',
    name: 'Всі товари',
    position: 2,
};

export const useCollectionData = () => {
    const dispatch = useDispatch();
    const reduxFilters = useSelector(getAllFilters);
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
        size: [],
        price: [],
        available: true,
    };
    const defaultReduxFilters = {
        page: reduxFilters.page || 1,
        count: reduxFilters.count || 15,
        // eslint-disable-next-line
        category: reduxFilters.category?.length ? reduxFilters.category?.map((v) => +v) : id ? [+id] : [],
        sortBy: reduxFilters.sortBy || '',
        color: reduxFilters.color || [],
        size: reduxFilters.size || [],
        price: reduxFilters.price || [],
        available: reduxFilters.available || true,
    };
    const [filters, setFilters] = useState({ ...defaultReduxFilters, ...urlFilters });
    const [breadcrumbs, setBreadcrumbs] = useState([defaultBreadcrumb]);
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

    const resetFilters = () => {
        setFilters({
            ...defaultFilters,
            category: id ? [+id] : [],
        });
        dispatch(addFilters({
            ...defaultFilters,
            category: id ? [+id] : [],
        }));
    };
    const { page: dfPage, count: dfCount, ...defaultFiltersWithoutPage } = {
        ...defaultFilters,
        category: id ? [+id] : [],
    };
    const { page, count, ...filtersWithoutPage } = filters;
    const isFiltered = !isEqual(defaultFiltersWithoutPage, {
        ...filtersWithoutPage,
        category: filtersWithoutPage?.category?.map((v) => +v),
    });
    const filtersDiff = getObjectDiff(defaultFiltersWithoutPage, {
        ...filtersWithoutPage,
        category: filtersWithoutPage?.category?.map((v) => +v),
    });

    useEffect(() => {
        const selectedCategory = filters.category?.[0] || 0;

        if (selectedCategory) {
            const category = categories.find((cat) => +cat.category_id === +selectedCategory);

            if (category && !category?.parent_id) {
                setBreadcrumbs([
                    defaultBreadcrumb,
                    {
                        href: `/collection/${selectedCategory}`,
                        position: 3,
                        name: category.category_name,
                    },
                ]);
            } else if (category && category?.parent_id) {
                const categoryParent = categories.find((cat) => +cat.category_id === +category?.parent_id);

                if (categoryParent) {
                    setBreadcrumbs([
                        defaultBreadcrumb,
                        {
                            href: `/collection/${categoryParent.category_id}`,
                            position: 3,
                            name: categoryParent.category_name,
                        },
                    ]);
                }
            }
        } else {
            setBreadcrumbs([defaultBreadcrumb]);
        }
    }, [filters, categories]);

    useEffect(() => {
        const { page: pageFilter, category } = filters;
        const modFilters = {
            ...filters,
            category: category?.map((v) => +v),
            page: 1,
            count: pageFilter * defaultFilters.count,
        };

        history.replace({
            pathname,
            search: `?${qs.stringify(modFilters, { arrayFormat: 'bracket', skipNull: true })}`,
        });
        dispatch(addFilters({
            ...filters,
            category: filters?.category?.map((v) => +v),
        }));
    }, [filters]);

    // useEffect(() => {
    //     if (urlFilters?.category?.length && urlFilters?.from_sidebar) {
    //         setFilters((prevF) => ({
    //             ...prevF,
    //             category: urlFilters.category,
    //         }));
    //         history.replace({
    //             pathname,
    //             search: '',
    //         });
    //     }
    // }, [urlFilters.category]);

    return useMemo(() => ({
        loading: loading || categoriesLoading,
        loadingNext,
        result: adaptProducts({ data: result }),
        categories: adaptCategories(categories),
        pureCategories: categories,
        isLastPage,
        currentPage,
        setFilters,
        filters,
        collectionId: +id,
        resetFilters,
        isFiltered,
        filtersDiff,
        breadcrumbs,
    }), [
        loading,
        loadingNext,
        categoriesLoading,
        result,
        categories,
        resetFilters,
        isFiltered,
        filtersDiff,
        breadcrumbs,
        isLastPage,
        currentPage,
        setFilters,
        filters,
        id,
    ]);
};
