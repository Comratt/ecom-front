import {
    Box,
    Dashboard,
    Order,
    AddImg,
    Category,
    Eyes,
    PromoCode,
    Edit,
} from '../../../Icons';

export const menuItems = [
    {
        key: 'dashboard',
        name: 'Головна',
        link: '/admin/dashboard',
        icon: <Dashboard />,
    },
    {
        key: 'banner',
        name: 'Банери',
        link: '/admin/banner',
        icon: <AddImg />,
    },
    {
        key: 'category',
        name: 'Категорії',
        link: '/admin/category',
        icon: <Category />,
    },
    {
        key: 'option',
        name: 'Опції',
        link: '/admin/option',
        icon: <Edit />,
    },
    {
        key: 'product',
        name: 'Товари',
        link: '/admin/products',
        icon: <Box />,
    },
    {
        key: 'order',
        name: 'Замовлення',
        link: '/admin/order',
        icon: <Order />,
    },
    {
        key: 'order',
        name: 'Користувачі',
        link: '/admin/customers',
        icon: <Order />,
    },
    {
        key: 'productview',
        name: 'Перегляди',
        link: '/admin/viewproducts',
        icon: <Eyes />,
    },
    {
        key: 'promocode',
        name: 'Промокоди',
        link: '/admin/promocode',
        icon: <PromoCode />,
    },
];
