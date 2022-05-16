import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import {
    Edit,
    Eye,
    Menu,
    Pencil,
} from 'Icons';
import { useFetchOrders } from '../hooks/useFetchOrders';
import Layout from '../Layout';

import './Order.css';

const Order = () => {
    const history = useHistory();
    const { result, loading, error } = useFetchOrders();

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
                        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                        <th scope="col" style={{ width: '3%' }} />
                        <th scope="col" style={{ width: '9%' }}>Ідентифікатор замовлення</th>
                        <th scope="col">Замовник</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Всього</th>
                        <th scope="col">дату додано</th>
                        <th scope="col">Дата зміни</th>
                        <th scope="col" style={{ width: '4%' }}>Дія</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((order) => (
                        <tr key={order.id}>
                            <td>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="customCheck "
                                    />
                                </div>
                            </td>
                            <td className="table-cell__img">
                                {order.id}
                            </td>
                            <td>
                                {order.customer}
                            </td>
                            <td>
                                {order.status}
                            </td>
                            <td>
                                {order.totalPrice}
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

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1>Orders</h1>
                <div className="btn-toolbar mb-2 mb-md-0" />
            </div>
            <div className="container">
                <div className="row">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default Layout(Order);
