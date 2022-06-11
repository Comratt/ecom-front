import { useContext } from 'react';

import { CategoriesWrapperContext } from './categoriesWrapperContext';

export const useCategories = () => {
    const context = useContext(CategoriesWrapperContext);

    if (context === undefined) {
        throw new Error('useCategories must be used within a CategoriesWrapperContext');
    }

    return context;
};
