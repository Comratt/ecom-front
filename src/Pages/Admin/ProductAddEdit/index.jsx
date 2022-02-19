import React from 'react';
import { AddProductProvider } from 'context/addProduct/addPoductContext';

import ProductEdit from './ProductEdit';

const ProductEditContainer = ({ isFromAdd }) => (
    <AddProductProvider>
        <ProductEdit isFromAdd={isFromAdd} />
    </AddProductProvider>
);

export default ProductEditContainer;
