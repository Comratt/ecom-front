import React from 'react';
import './Dashboard.css';
import Link from 'react-router-dom/es/Link';
import {
    BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar,
} from 'recharts';
import Layout from '../Layout';
import {
    AccardionArrow, Truck, UkraineMap, User,
} from '../../../Icons';
import Cart from '../../../Icons/Cart';
import { useAnalytics } from '../hooks/useAnalytics';
import Loader from '../../../Components/Loader';
import Card from '../../../Icons/Card';
import { useFetchOrders } from '../hooks/useFetchOrders';

const CardItem = ({
    percent, loading, total, to, title,
}) => (
    <div className="card text-white  mb-3" style={{ width: '18rem' }}>
        <div className="card-header">
            <span>{title}</span>
            <div>
                <AccardionArrow
                    style={{ transform: percent > 0 ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    width={24}
                    fill="white"
                />
                <span>{`${percent}%`}</span>
            </div>
        </div>
        <div className="card-body">
            {loading ? <Loader size={2} />
                : (
                    <span className="card-text">
                        <Truck width={24} />
                        <span>
                            {total}
                            <sub>штук</sub>
                        </span>
                    </span>
                )}
        </div>
        <Link to={to}>
            <div className="card-header">Детальніше...</div>
        </Link>
    </div>
);

const LastOrderList = () => {
    const { result, loading } = useFetchOrders();

    const orderLists = result?.filter((item) => item.viewed === 0).filter((product, index) => index < 5);

    return (
        <div className="dashboard_last-orders">
            <section className="dashboard_last-orders-container">
                <h3 className="dashboard_table-order-title">Список останніх замовлень</h3>
                <div className="tbl-header">
                    <table className="dashboard_table-order" cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>
                                    Номер
                                    <br />
                                </th>
                                <th>Замовник</th>
                                <th scope="col">Статус</th>
                                <th scope="col">Всього</th>
                                <th scope="col">дату додано</th>
                                <th scope="col">Дата зміни</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table className="dashboard_table-order" cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {orderLists?.map((order) => (
                                <tr>
                                    <td>
                                        {order.id}
                                        {' '}
                                        <span className="badge rounded-pill text-bg-success">New</span>
                                    </td>
                                    <td>{order.customer}</td>
                                    <td>{order.status}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.dateAdd}</td>
                                    <td>{order.dateUpdate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="dashboard_last-orders-container">
                <h3 className="dashboard_table-order-title">Очікують на новій почті</h3>
                <div className="tbl-header">
                    <table className="dashboard_table-order" cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>
                                    Номер
                                    <br />
                                </th>
                                <th>Замовник</th>
                                <th scope="col">Статус</th>
                                <th scope="col">Всього</th>
                                <th scope="col">дату додано</th>
                                <th scope="col">Дата зміни</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table className="dashboard_table-order" cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {result?.filter((order) => order.status_id === 5).map((item) => (
                                <tr>
                                    <td>
                                        {item.id}
                                        {' '}
                                    </td>
                                    <td>{item.customer}</td>
                                    <td>{item.status}</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.dateAdd}</td>
                                    <td>{item.dateUpdate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

const Dashboard = () => {
    const { result, loading, error } = useAnalytics();

    const productTotal = {
        totalProducts: result?.products || {},
        totalOrders: result?.orders || {},
        totalSales: result?.completed || {},
        totalUsers: result?.users || {},
        ordersMap: result?.ordersMap || {},
    };
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
        },
    ];

    return (
        (
            <div className="dashboard-page">
                <div className="container">
                    <h3 className="dashboardHeader">Панель приладів</h3>
                    <div className="card-total-info-block">
                        <CardItem
                            percent={productTotal?.totalOrders?.percent}
                            loading={loading}
                            title="TOTAL ORDERS"
                            total={productTotal?.totalOrders?.total}
                            to="/admin/orders"
                        />
                        <CardItem
                            percent={productTotal?.totalSales?.percent}
                            loading={loading}
                            title="TOTAL SALES"
                            total={productTotal?.totalSales?.total}
                            to="/admin/orders"
                        />
                        <CardItem
                            percent={productTotal?.totalUsers?.percent}
                            loading={loading}
                            title="TOTAL CUSTOMERS"
                            total={productTotal?.totalUsers?.total}
                            to="/admin/orders"
                        />
                        <CardItem
                            percent={productTotal?.totalProducts?.percent}
                            loading={loading}
                            title="TOTAL PRODUCTS"
                            total={productTotal?.totalProducts?.total}
                            to="/admin/products"
                        />
                    </div>
                    <div className="dashboard-map">
                        <h3 style={{ textAlign: 'center' }}>Order Map</h3>
                    </div>
                    <div>
                        {!loading && (
                            <UkraineMap className="ukraine-map" data={productTotal.ordersMap} />
                        )}
                    </div>
                    <div>
                        <LastOrderList />
                        <h3 style={{ textAlign: 'center' }}>Graphic Orders</h3>
                        <BarChart width={1000} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            </div>
        )
    );
};

export default Layout(Dashboard);
