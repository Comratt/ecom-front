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
    care: '',
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
        name: 'Головна',
        content: <ProductTabGeneral />,
    },
    {
        id: 2,
        name: 'Звʼязки',
        content: <ProductTabLinks />,
    },
    {
        id: 4,
        name: 'Опції',
        content: <ProductTabOptions />,
    },
    {
        id: 6,
        name: 'Знижки',
        content: <ProductTabDiscount />,
    },
    {
        id: 8,
        name: 'Картинки',
        content: <ProductTabImage />,
    },
    {
        id: 10,
        name: 'SEO',
        content: <ProductTabSeo />,
    },
];
