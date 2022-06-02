import React from 'react';

import ProductTabGeneral from './ProductTabGeneral';
import ProductTabLinks from './ProductTabLinks';
import ProductTabOptions from './ProductTabOption/ProductTabOptions';
import ProductTabDiscount from './ProductTabDiscount';
import ProductTabImage from './ProductTabImage';
import ProductTabSeo from './ProductTabSeo';

export const initialValues = {
    productName: '',
    manufacturer: '',
    description: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    metaTags: '',
    model: '',
    status: 1,
};

export const items = [
    {
        id: 0,
        name: 'General',
        content: <ProductTabGeneral />,
    },
    {
        id: 2,
        name: 'Links',
        content: <ProductTabLinks />,
    },
    {
        id: 4,
        name: 'Option',
        content: <ProductTabOptions />,
    },
    {
        id: 6,
        name: 'Discount',
        content: <ProductTabDiscount />,
    },
    {
        id: 8,
        name: 'Image',
        content: <ProductTabImage />,
    },
    {
        id: 10,
        name: 'Seo',
        content: <ProductTabSeo />,
    },
];
