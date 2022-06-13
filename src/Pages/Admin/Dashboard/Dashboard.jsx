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

const CardItem = ({
    percent, loading, total, to, title,
}) => (
    <div className="card text-white bg-secondary  mb-3" style={{ width: '18rem' }}>
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
