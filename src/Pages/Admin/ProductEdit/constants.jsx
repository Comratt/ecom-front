import React from 'react';

import ProductTabGeneral from './ProductTabGeneral';
import ProductTabsData from './ProductTabsData';
import ProductTabLinks from './ProductTabLinks';
import ProductTabOptions from './ProductTabOption/ProductTabOptions';
import ProductTabDiscount from './ProductTabDiscount';
import ProductTabSpecial from './ProductTabSpecial';
import ProductTabImage from './ProductTabImage';
import ProductTabSeo from './ProductTabSeo';

export const initialValues = {
    productName: '',
    manufacturer: '',
    description: '',
};

export const items = [
    {
        id: 0,
        name: 'General',
        content: <ProductTabGeneral />,
    },
    {
        id: 1,
        name: 'Data',
        content: <ProductTabsData />,
    },
    {
        id: 2,
        name: 'Links',
        content: <ProductTabLinks />,
    },
    {
        id: 3,
        name: 'Attribute',
        content: <ProductTabsData />,
    },
    {
        id: 4,
        name: 'Option',
        content: <ProductTabOptions />,
    },
    {
        id: 5,
        name: 'Reccuring',
        content: <ProductTabsData />,
    },
    {
        id: 6,
        name: 'Discount',
        content: <ProductTabDiscount />,
    },
    {
        id: 7,
        name: 'Special',
        content: <ProductTabSpecial />,
    },
    {
        id: 8,
        name: 'Image',
        content: <ProductTabImage />,
    },
    {
        id: 9,
        name: 'Reward',
        content: <ProductTabsData />,
    },
    {
        id: 10,
        name: 'Seo',
        content: <ProductTabSeo />,
    },
    {
        id: 11,
        name: 'Design',
        content: <ProductTabsData />,
    },
];
