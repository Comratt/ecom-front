import React from 'react';
import './Dashboard.css';
import Link from 'react-router-dom/es/Link';
import Layout from '../Layout';
import {
    AccardionArrow, Truck, UkraineMap,
} from '../../../Icons';
import { useAnalytics, useOrdersAnalytics } from '../hooks/useAnalytics';
import Loader from '../../../Components/Loader';
import { ChartWithFilters } from '../../../Components/ChartWithFilters/ChartWithFilters';

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
    const {
        result: orders,
        loading: ordersLoading,
        onFiltersChange,
        filters,
    } = useOrdersAnalytics();

    const productTotal = {
        totalProducts: result?.products || {},
        totalOrders: result?.orders || {},
        totalSales: result?.completed || {},
        totalUsers: result?.users || {},
        ordersMap: result?.ordersMap || {},
    };

    const handleFilters = ({ target }) => {
        onFiltersChange(target.value);
    };

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
                        <ChartWithFilters
                            title="Графік замовлень"
                            filterBy={filters.filterBy}
                            data={orders}
                            loading={ordersLoading}
                            type="bar"
                            onChange={handleFilters}
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default Layout(Dashboard);
