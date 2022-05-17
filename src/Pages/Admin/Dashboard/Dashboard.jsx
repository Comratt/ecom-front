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

const Dashboard = () => {
    const { result, loading, error } = useAnalytics();

    const productTotal = {
        totalProducts: result?.products || {},
        totalOrders: result?.orders || {},
        totalSales: result?.completed || {},
        totalUsers: result?.users || {},
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
                        <div className="card text-white bg-secondary  mb-3" style={{ width: '18rem' }}>
                            <div className="card-header">
                                <span>TOTAL ORDERS </span>
                                <div>
                                    <AccardionArrow
                                        width={24}
                                        fill="white"
                                    />
                                    <span>{`${productTotal?.totalOrders?.percent}%`}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                {loading ? <Loader size={2} />
                                    : (
                                        <span className="card-text">
                                            <Truck width={24} />
                                            <span>
                                                {productTotal?.totalOrders?.total}
                                                <sub>штук</sub>
                                            </span>
                                        </span>
                                    )}
                            </div>
                            <div className="card-header">Детальніше...</div>
                        </div>
                        <div className="card text-white bg-secondary mb-3" style={{ width: '18rem' }}>
                            <div className="card-header">
                                <span>TOTAL SALES</span>
                                <div>
                                    <AccardionArrow
                                        width={24}
                                        fill="white"
                                    />
                                    <span>{`${productTotal?.totalSales?.percent}%`}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                {loading ? <Loader size={2} />
                                    : (
                                        <p className="card-text">
                                            <Card width={24} />
                                            <span>
                                                {productTotal?.totalSales?.total}
                                                <sub>грн</sub>
                                            </span>
                                        </p>
                                    )}
                            </div>
                            <div className="card-header">view more...</div>
                        </div>
                        <div className="card text-white bg-secondary  mb-3" style={{ width: '18rem' }}>
                            <div className="card-header">
                                TOTAL CUSTOMERS
                                <div>
                                    <AccardionArrow
                                        width={24}
                                        fill="white"
                                    />
                                    <span>{`${productTotal?.totalUsers?.percent}%`}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                {loading ? <Loader size={2} />
                                    : (
                                        <p className="card-text">
                                            <User width={24} />
                                            <span>
                                                {productTotal?.totalUsers?.total}
                                                <sub>штук</sub>
                                            </span>
                                        </p>
                                    )}
                            </div>
                            <div className="card-header">Детальніше...</div>
                        </div>
                        <div className="card text-white bg-secondary  mb-3" style={{ width: '18rem' }}>
                            <div className="card-header">
                                TOTAL PRODUCTS
                            </div>
                            <div className="card-body">
                                {loading ? <Loader size={2} />
                                    : (
                                        <p className="card-text">
                                            <Cart width={24} />
                                            <span>
                                                {productTotal.totalProducts?.total}
                                                <sub>штук</sub>
                                            </span>
                                        </p>
                                    )}
                            </div>
                            <Link to="/admin/products">
                                <div className="card-header">Детальніше...</div>
                            </Link>
                        </div>

                    </div>

                    <div className="dashboard-map">
                        <h3 style={{ textAlign: 'center' }}>Order Map</h3>
                    </div>
                    <div className="svg-container">
                        <UkraineMap className="card-img-top" />
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
