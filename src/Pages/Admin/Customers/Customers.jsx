import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import {
    Eye,
} from 'Icons';
import { useFetchCustomers } from '../hooks/useFetchCustomers';
import Layout from '../Layout';

import Filter from '../Filter';
import { AdminPagination } from '../../../Components/AdminPagination';
import Modal from '../../../Components/Modal';
import CustomerForm from './CustomerForm';

const Customers = () => {
    const [show, setShow] = useState(false);
    const {
        register, handleSubmit, errors, setValue, unregister,
    } = useForm();
    const toggleModal = () => setShow((a) => !a);
    const {
        result,
        loading,
        error,
        resetFilters,
        filters,
        handleFilter,
        page,
        setPage,
        totalPages,
        executePost,
        postLoading,
        executeUpdate,
        updateLoading,
        setResult,
    } = useFetchCustomers();

    console.log(errors);

    useEffect(() => {
        if (typeof show === 'number') {
            const customer = result.find((c) => c.id === show);

            Object.keys(customer).forEach((key) => {
                setValue(key, customer[key]);
            });
            unregister('password');
        }
    }, [show]);

    const onSubmit = async (values) => {
        try {
            const body = {
                ...values,
                firstName: values.first_name,
                lastName: values.last_name,
            };

            if (typeof show === 'number') {
                const customerUpdated = await executeUpdate(show, body);

                setResult((res) => ({
                    ...res,
                    result: {
                        ...res.result,
                        data: res.result?.data?.map((custom) => {
                            if (+custom?.id === show) {
                                return customerUpdated;
                            }

                            return custom;
                        }),
                    },
                }));
            } else {
                const customerNew = await executePost(body);

                setResult((res) => ({
                    ...res,
                    result: {
                        ...res.result,
                        data: [
                            customerNew,
                            ...res.result?.data,
                        ],
                    },
                }));
            }
            setShow(false);
        } catch (e) {
            console.warn(e);
        }
    };

    const handleClick = (id) => () => setShow(id);

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
                        <th scope="col" style={{ width: '9%' }}>ID</th>
                        <th scope="col">Імя</th>
                        <th scope="col">Фамілія</th>
                        <th scope="col">Телефон</th>
                        <th scope="col">Email</th>
                        <th scope="col">Дата зміни</th>
                        <th scope="col" style={{ width: '4%' }}>Дія</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((customer) => (
                        <tr key={customer.id}>
                            <td className="table-cell-badge">
                                {customer.id}
                            </td>
                            <td className="table-cell__img">
                                {customer.first_name}
                            </td>
                            <td>
                                {customer.last_name}
                            </td>
                            <td>
                                {customer.phone}
                            </td>
                            <td>
                                {customer.email}
                            </td>
                            <td>
                                {customer.updated_at}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={handleClick(customer.id)}
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
        { name: 'orderId', label: 'Order ID', type: 'text' },
        {
            name: 'status',
            label: 'Order status',
            type: 'select',
            options: [],
        },
        { name: 'createdAt', label: 'Created At', type: 'date' },
        { name: 'updatedAt', label: 'Updated At', type: 'date' },
    ];

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1>Користувачі</h1>
                {show && (
                    <Modal
                        show={show}
                        toggleModal={toggleModal}
                        loadingForm={postLoading || updateLoading}
                        submit
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <CustomerForm
                            show={show}
                            register={register}
                            errors={errors}
                        />
                    </Modal>
                )}
                <div className="btn-toolbar mb-2 mb-md-0">
                    <button
                        onClick={toggleModal}
                        type="button"
                        className="btn btn-primary px-3 py-1 mr-0"
                        style={{ fontSize: 22 }}
                    >
                        +
                    </button>
                </div>
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

export default Layout(Customers);
