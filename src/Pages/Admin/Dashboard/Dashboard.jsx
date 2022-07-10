import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import {
    Box, Customers, PlusIcon, Sales, UkraineIcon, UkraineMap,
} from '../../../Icons';
import {
    useAnalytics,
    useCategoriesAnalytics,
    useOrdersAnalytics,
    useProductsAnalytics,
} from '../hooks/useAnalytics';
import Loader from '../../../Components/Loader';
import { ChartWithFilters } from '../../../Components/ChartWithFilters/ChartWithFilters';
import { useFetchOrders } from '../hooks/useFetchOrders';

const CardItem = ({
    percent, loading, total, to, title, icon,
}) => {
    const value = {
        color: percent > 0 ? '#82d616' : '#fc424a',
    };
    const progressRadio = {
        justifyContent: percent < 0 ? 'flex-end' : '',
    };

    return (
        <div className="status-card   mb-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <div>
                    <span className="card-body-title">{title}</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h5 className="card-body-percent">
                            {loading ? <Loader size={2} />
                                : (
                                    <span className="card-text-about">
                                        <span>
                                            <b>{total}</b>
                                        </span>
                                    </span>
                                )}
                        </h5>
                        <span style={value} className="card-text-about-percent value"><b>{percent ? `${(percent || 0)}%` : ''}</b></span>
                    </div>
                </div>
                <div>
                    {icon}
                </div>
                <Link to={to}>
                    <PlusIcon width={20} fill="#5b6467" />
                </Link>
            </div>
            <div style={progressRadio} className="progress">
                <div
                    style={{ width: `${Math.abs(percent)}%` }}
                    className={`progress-bar-striped ${percent > 0 ? 'bg-success' : 'bg-danger'}`}
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>
        </div>
    );
};

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
                                    <td style={{
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                        gap: '5px',
                                        alignItems: 'center',
                                    }}
                                    >
                                        {/* <Link to={`/admin/order/` + order.id}> */}
                                        {/*    {order.id} */}
                                        {/* </Link> */}
                                        {order.id}
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
            <section className="dashboard_last-orders-container second">
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

    console.log(result);
    const {
        result: orders,
        loading: ordersLoading,
        onFiltersChange,
        filters,
    } = useOrdersAnalytics();
    const {
        result: categories,
        loading: categoriesLoading,
        onFiltersChange: onFiltersCategoriesChange,
        filters: filtersCategories,
    } = useCategoriesAnalytics();
    const {
        result: products,
        loading: productsLoading,
        onFiltersChange: onFiltersProductsChange,
        filters: filtersProducts,
    } = useProductsAnalytics();

    const productTotal = {
        totalProducts: result?.products || {},
        totalOrders: result?.orders || {},
        totalSales: result?.completed || {},
        totalUsers: result?.users || {},
        ordersMap: result?.ordersMap || [],
    };

    const handleFilters = (type) => ({ target }) => {
        if (type === 'area') {
            onFiltersChange(target.value);
        } else if (type === 'pie') {
            onFiltersCategoriesChange(target.value);
        } else if (type === 'bar') {
            onFiltersProductsChange(target.value);
        }
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
                            icon={<Box />}
                        />
                        <CardItem
                            percent={productTotal?.totalSales?.percent}
                            loading={loading}
                            title="TOTAL SALES"
                            total={productTotal?.totalSales?.total}
                            to="/admin/orders"
                            icon={<Sales />}
                        />
                        <CardItem
                            percent={productTotal?.totalUsers?.percent}
                            loading={loading}
                            title="TOTAL CUSTOMERS"
                            total={productTotal?.totalUsers?.total}
                            to="/admin/orders"
                            icon={<Customers />}
                        />
                        <CardItem
                            percent={productTotal?.totalProducts?.percent}
                            loading={loading}
                            title="TOTAL PRODUCTS"
                            total={productTotal?.totalProducts?.total}
                            to="/admin/products"
                            icon={<Box />}
                        />
                    </div>

                    <div className="dashboard-page-map-container">
                        <div className="dashboard-map">
                            <h3 style={{ textAlign: 'center' }}>
                                Ukraine
                                <UkraineIcon />
                            </h3>
                        </div>
                        <div className="dashboard-page-content">
                            {!loading && (
                                <UkraineMap className="ukraine-map" data={productTotal.ordersMap} />
                            )}
                            <section className="dashboard_last-orders-container">
                                <h3 className="dashboard_table-order-title">Найкращі міста</h3>
                                <div className="tbl-header">
                                    <table className="dashboard_table-order" cellPadding="0" cellSpacing="0" border="0">
                                        <thead>
                                            <tr>
                                                <th>Область</th>
                                                <th scope="col">Кількість</th>
                                                <th scope="col">Сума</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="tbl-content">
                                    <table className="dashboard_table-order" cellPadding="0" cellSpacing="0" border="0">
                                        <tbody>
                                            {productTotal.ordersMap
                                                ?.sort((a, b) => b.total - a.total)
                                                .slice(0, 4)
                                                ?.map((city) => (
                                                    <tr>

                                                        <td>{city.shipping_area}</td>
                                                        <td>{city.counted}</td>
                                                        <td>
                                                            {city.total}
                                                            ₴
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div>
                        <LastOrderList />
                        <div className="dashboard-page_chart_container">
                            <div className="dashboard-page_chart">
                                <ChartWithFilters
                                    title="Графік Дохідності"
                                    filterBy={filters.filterBy}
                                    data={orders}
                                    loading={ordersLoading}
                                    type="area"
                                    onChange={handleFilters('area')}
                                />
                            </div>
                            <div className="dashboard-page_chart_info">
                                <CardItem
                                    loading={loading}
                                    title="Загальна сума за обраний період"
                                    total={orders.reduce((acc, curr) => acc + parseInt(curr.total), 0)}
                                />
                            </div>
                        </div>
                        <div className="dashboard-page_chart_container">
                            <div className="dashboard-page_chart">
                                <ChartWithFilters
                                    title="Графік Категорій"
                                    filterBy={filtersCategories.filterBy}
                                    data={categories}
                                    loading={categoriesLoading}
                                    type="pie"
                                    onChange={handleFilters('pie')}
                                />
                            </div>
                            <div className="dashboard-page_chart_info">
                                <CardItem
                                    loading={categoriesLoading}
                                    title="Загальна сума за обраний період"
                                    total={categories.reduce((acc, curr) => acc + parseInt(curr.value), 0)}
                                />
                            </div>
                        </div>
                        <div className="dashboard-page_chart_container">
                            <div className="dashboard-page_chart">
                                <ChartWithFilters
                                    title="Графік Товарів"
                                    filterBy={filtersProducts.filterBy}
                                    data={products}
                                    loading={productsLoading}
                                    type="bar"
                                    onChange={handleFilters('bar')}
                                />
                            </div>
                            <div className="dashboard-page_chart_info">
                                <CardItem
                                    loading={productsLoading}
                                    title="Загальна кількість за обраний період"
                                    total={products?.reduce((acc, curr) => acc + parseInt(curr.value), 0)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Layout(Dashboard);
