import { useState, useEffect, useCallback } from 'react';
import CategoryService from 'Services/CategoryService';
import { sortOrder } from 'Helpers';

export const adaptCategories = (data = []) => {
    const getParentName = (category) => {
        if (category && category.parent_id) {
            return `${getParentName(data.find(({ category_id }) => +category_id === category.parent_id))} > ${category.category_name}`;
        }

        return category.category_name;
    };

    return data.map((category) => ({
        ...category,
        id: category.category_id,
        name: getParentName(category),
    })).sort(sortOrder);
};

const useFetchCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await CategoryService.getAll();

            setCategories(response);
        } catch (e) {
            console.warn(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        categories: adaptCategories(categories),
        setCategories,
        error,
    };
};

export { useFetchCategories };
