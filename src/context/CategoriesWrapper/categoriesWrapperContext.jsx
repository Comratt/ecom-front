import React, {
    createContext, useMemo,
} from 'react';
import { useAsync } from 'react-async-hook';
import CategoryService from 'Services/CategoryService';

export const CategoriesWrapperContext = createContext({});
CategoriesWrapperContext.displayName = 'CategoriesWrapperContext';

export const CategoriesWrapperProvider = ({ children }) => {
    const { result, error, loading } = useAsync(CategoryService.getAll, []);

    const contextValue = useMemo(() => ({
        categories: result,
        categoriesLoading: loading,
        categoriesError: error,
    }), [
        result,
        loading,
        error,
    ]);

    return (
        <CategoriesWrapperContext.Provider value={contextValue}>
            {children}
        </CategoriesWrapperContext.Provider>
    );
};
