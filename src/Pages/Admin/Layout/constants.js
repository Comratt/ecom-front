import Box from 'Icons/Box';
import Dashboard from 'Icons/Dashboard';
import Order from 'Icons/Order';
import AddImg from 'Icons/AddImg';
import Category from 'Icons/Category';
import Eyes from 'Icons/Eyes';
import PromoCode from 'Icons/PromoCode';
import Edit from 'Icons/Edit';

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
