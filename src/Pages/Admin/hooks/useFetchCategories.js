import { useState, useEffect, useCallback } from 'react';
import CategoryService from 'Services/CategoryService';

const adapt = (data = []) => {
    const getParentName = (id) => {
        const findCategory = data.find((category) => +category.category_id === +id);

        if (findCategory) {
            return `${findCategory.category_name} > `;
        }

        return '';
    };

    return data.map((category) => ({
        ...category,
        name: `${getParentName(category.parent_id)}${category.category_name}`.trim(),
    }));
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

            setCategories(adapt(response));
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
        categories,
        setCategories,
        error,
    };
};

export { useFetchCategories };
