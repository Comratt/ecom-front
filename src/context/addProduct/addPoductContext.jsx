import React, { createContext, useState, useMemo } from 'react';
import { initialValues } from 'Pages/Admin/ProductEdit/constants';

export const AddProductContext = createContext({});
AddProductContext.displayName = 'AddProductContext';

export const AddProductProvider = ({ children }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [values, setValues] = useState(initialValues);

    const handleValuesChange = ({ target: { name, value } }) => (
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    );

    const handleSelectCategory = (name) => (
        setSelectedCategories((prevState) => [...prevState, name])
    );
    const removeCategory = (name) => (
        setSelectedCategories((prevState) => prevState.filter((n) => n !== name))
    );

    const contextValue = useMemo(() => ({
        selectedCategories,
        setSelectedCategories,
        handleValuesChange,
        handleSelectCategory,
        values,
        removeCategory,
    }), [
        selectedCategories,
        setSelectedCategories,
        handleValuesChange,
        handleSelectCategory,
        values,
        removeCategory,
    ]);

    return (
        <AddProductContext.Provider value={contextValue}>
            {children}
        </AddProductContext.Provider>
    );
};
