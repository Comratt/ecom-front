import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import Eye from 'Icons/Eye';
import {
    SHIPPING_CODES,
    getFormattedPrice,
    PAYMENT_NP,
    PAYMENT_ONLINE,
    PAYMENT_ONLINE_FAILURE,
    PAYMENT_CODES,
} from 'Constants';
import { useFetchOrders } from '../hooks/useFetchOrders';
import Layout from '../Layout';

import './Order.css';
import Filter from '../Filter';
import { AdminPagination } from '../../../Components/AdminPagination';

const Order = () => {
    const [managers, setManagers] = useState([]);
    const history = useHistory();
    const {
        result,
        loading,
        error,
        page,
        setPage,
        totalPages,
        handleFilter,
        filters,
        resetFilters,
        executeManagers,
    } = useFetchOrders();

    useEffect(() => {
        executeManagers().then(({ data }) => setManagers(data));
    }, []);

    const handleClick = (id) => () => history.push(`/admin/order/${id}`);

    const renderContent = useCallback(() => {
        if (loading) {
            return <Loader size={7} center />;
        }
        if (!loading && error) {
            return <Alert type="warning" text={error.message} />;
        }

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: '9%' }}>ID</th>
                        <th scope="col">Замовник</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Всього</th>
                        <th scope="col">Менеджер</th>
                        <th scope="col">Дату додано</th>
                        <th scope="col">Дата зміни</th>
                        <th scope="col" style={{ width: '4%' }}>Дія</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((order) => (
                        <tr key={order.id}>
                            <td>
                                <div className="table-cell__label">
                                    {order.id}
                                    <div>
                                        {order.viewed ? '' : <span className="badge rounded-pill badge-success">New</span>}
                                        {(() => {
                                            switch (order.payment_status) {
                                            case PAYMENT_ONLINE:
                                                return <span className="badge rounded-pill badge-success">{PAYMENT_CODES[PAYMENT_ONLINE]}</span>;
                                            case PAYMENT_ONLINE_FAILURE:
                                                return <span className="badge rounded-pill badge-danger">{PAYMENT_CODES[PAYMENT_ONLINE_FAILURE]}</span>;
                                            case PAYMENT_NP:
                                            default:
                                                return <span className="badge rounded-pill badge-primary">{PAYMENT_CODES[PAYMENT_NP]}</span>;
                                            }
                                        })()}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {order.customer}
                            </td>
                            <td>
                                {order.status}
                            </td>
                            <td>
                                {order.promoName ? (
                                    <b>{getFormattedPrice(order.totalPrice - order.discount)}</b>
                                ) : getFormattedPrice(order.totalPrice)}
                            </td>
                            <td>
                                {order.manager}
                            </td>
                            <td>
                                {order.dateAdd}
                            </td>
                            <td>
                                {order.dateUpdate}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={handleClick(order.id)}
                                >
                                    <Eye
                                        width={14}
                                        height={14}
                                        fill="blue"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }, [loading, error, result, handleClick]);

    const filterFields = [
        { name: 'orderId', label: 'ID Замовлення', type: 'text' },
        {
            name: 'status',
            label: 'Статус',
            type: 'select',
            options: Object.keys(SHIPPING_CODES).map((key) => ({
                value: key,
                name: SHIPPING_CODES[key],
            })),
        },
        {
            name: 'managerId',
            label: 'Менеджери',
            type: 'select',
            options: managers.map((manager) => ({
                value: manager.id,
                name: `${manager.first_name} ${manager.first_name}`,
            })),
        },
        { name: 'createdAt', label: 'Дата створення', type: 'date' },
        { name: 'updatedAt', label: 'Дата зміни', type: 'date' },
    ];

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1>Замовлення</h1>
                <div className="btn-toolbar mb-2 mb-md-0" />
            </div>
            <div className="container">
                <div className="d-flex">
                    {renderContent()}
                    <Filter
                        fields={filterFields}
                        filters={filters}
                        handleFilter={handleFilter}
                        resetFilters={resetFilters}
                    />
                </div>
                <AdminPagination
                    loading={loading}
                    current={page}
                    onChange={(pageNumber) => setPage(pageNumber)}
                    total={totalPages}
                />
            </div>
        </>
    );
};

export default Layout(Order);
