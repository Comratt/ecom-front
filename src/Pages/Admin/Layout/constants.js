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
        name: 'Главная',
        link: '/admin/dashboard',
        icon: <Dashboard />,
    },
    {
        key: 'banner',
        name: 'Баннер',
        link: '/admin/banner',
        icon: <AddImg />,
    },
    {
        key: 'category',
        name: 'Категории',
        link: '/admin/category',
        icon: <Category />,
    },
    {
        key: 'option',
        name: 'Опции',
        link: '/admin/option',
        icon: <Edit />,
    },
    {
        key: 'product',
        name: 'Товары',
        link: '/admin/products',
        icon: <Box />,
    },
    {
        key: 'order',
        name: 'Заказы',
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
        name: 'Cтатистика переглядів',
        link: '/admin/viewproducts',
        icon: <Eyes />,
    },
    {
        key: 'promocode',
        name: 'Створити промокод',
        link: '/admin/promocode',
        icon: <PromoCode />,
    },
];
