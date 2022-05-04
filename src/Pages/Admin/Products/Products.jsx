import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import { AdminPagination } from 'Components/AdminPagination';
import { Edit } from 'Icons';
import { useFetchProducts } from '../hooks/useFetchProducts';
import Layout from '../Layout';

import './Products.css';

const Products = () => {
    const history = useHistory();
    const {
        result, loading, error, page, setPage, totalPages,
    } = useFetchProducts();

    const handleClick = (id) => () => history.push(`/admin/products/${id}`);
    const handleAddClick = () => history.push('/admin/add/products');

    const quantityBadgeClass = (quantity = 0) => classNames('product-quantity badge', {
        'badge-success': quantity > 10,
        'badge-danger': quantity <= 5,
        'badge-warning': quantity > 5 && quantity <= 10,
    });

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
                        <th scope="col" style={{ width: '9%' }}>Картинка</th>
                        <th scope="col">Название продукта</th>
                        <th scope="col">Модель</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Статус</th>
                        <th scope="col" style={{ width: '10%' }}>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((product) => (
                        <tr key={product.product_id}>
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
                                <img
                                    src={product.image}
                                    alt="Apple Cinema 30&quot;"
                                    className="img-thumbnail"
                                />
                            </td>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.model}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                <span className={quantityBadgeClass(product.quantity)}>
                                    {product.quantity}
                                </span>
                            </td>
                            <td>
                                {product.status}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mr-2"
                                    onClick={handleClick(product.product_id)}
                                >
                                    <Edit
                                        fill="blue"
                                        width={14}
                                        height={14}
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
                <h1>Products</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button
                        onClick={handleAddClick}
                        type="button"
                        className="btn btn-primary px-3 py-1 mr-0"
                        style={{ fontSize: 22 }}
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {renderContent()}
                    <AdminPagination
                        loading={loading}
                        current={page}
                        onChange={(pageNumber) => setPage(pageNumber)}
                        total={totalPages}
                    />
                </div>
            </div>
        </>
    );
};

export default Layout(Products);
