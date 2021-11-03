import { useState, useEffect, useCallback } from 'react';
import CategoryService from 'Services/CategoryService';

const adapt = (data = []) => {
    const getParentName = (category) => {
        if (category && category.parent_id) {
            return `${getParentName(data.find(({ category_id }) => +category_id === category.parent_id))} > ${category.category_name}`;
        }

        return category.category_name;
    };

    return data.map((category) => ({
        ...category,
        name: getParentName(category),
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
