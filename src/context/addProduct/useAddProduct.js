import { useContext } from 'react';

import { AddProductContext } from 'context/addProduct/addPoductContext';

export const useAddProduct = () => {
    const context = useContext(AddProductContext);

    if (context === undefined) {
        throw new Error('useAddProduct must be used within a AddProductContext');
    }

    return context;
};
