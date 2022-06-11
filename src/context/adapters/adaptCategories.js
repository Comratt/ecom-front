import { sortOrder } from '../../Helpers';

export const adaptCategories = (data = []) => {
    if (!Array.isArray(data)) return [];

    const parentCategories = data.filter(({ parent_id }) => !parent_id).sort(sortOrder);

    return parentCategories.map((cat) => ({
        id: cat.category_id,
        name: cat.category_name,
        subcategories: data.filter((subCat) => cat.category_id === subCat.parent_id),
    }));
};
