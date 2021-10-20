import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import { useFetchProducts } from '../hooks/useFetchProducts';
import Layout from '../Layout';

import './Products.css';

const Products = () => {
    const [show, setShow] = useState(false);
    const {
        register, handleSubmit, errors, setValue,
    } = useForm();
    const { result, loading, error } = useFetchProducts();

    const quantityBadgeClass = (quantity = 0) => classNames('product-quantity badge', {
        'badge-success': quantity > 10,
        'badge-danger': quantity <= 5,
        'badge-warning': quantity > 5 && quantity <= 10,
    });
    const toggleModal = () => setShow((a) => !a);

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
                        <th scope="col">Картинка</th>
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
                            <td>
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
                                {product.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }, [loading, error, result]);

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1>Products</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button
                        // onClick={toggleModal}
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
                </div>
            </div>
        </>
    );
};

export default Layout(Products);
