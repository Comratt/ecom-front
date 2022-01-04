import React from 'react';
import { AddProductProvider } from 'context/addProduct/addPoductContext';

import ProductEdit from './ProductEdit';

const ProductEditContainer = () => (
    <AddProductProvider>
        <ProductEdit />
    </AddProductProvider>
);

export default ProductEditContainer;
