import {
    Box, Filters, Relevance, Sales,
} from '../../../Icons';

export const menuItems = [
    {
        key: 'dashboard',
        name: 'Главная',
        link: '/admin/dashboard',
        icon: <Box />,
    },
    {
        key: 'banner',
        name: 'Баннер',
        link: '/admin/banner',
        icon: <Sales />,
    },
    {
        key: 'category',
        name: 'Категории',
        link: '/admin/category',
        icon: <Relevance />,
    },
    {
        key: 'option',
        name: 'Опции',
        link: '/admin/option',
        icon: <Filters />,
    },
    {
        key: 'product',
        name: 'Товары',
        link: '/admin/products',
    },
    {
        key: 'order',
        name: 'Заказы',
        link: '/admin/order',
    },
    {
        key: 'productlist',
        name: 'Продукты',
        link: '/admin/productlist',
    },
    {
        key: 'productview',
        name: 'Cтатистика переглядів',
        link: '/admin/viewproducts',
    },
];
