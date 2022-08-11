import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import Eye from 'Icons/Eye';
import Remove from 'Icons/Remove';
import { useFetchPromo } from '../hooks/useFetchPromo';
import Layout from '../Layout';

import Filter from '../Filter';
import { AdminPagination } from '../../../Components/AdminPagination';
import Modal from '../../../Components/Modal';
import PromoForm from './PromoForm';

const PromoCode = () => {
    const [show, setShow] = useState(false);
    const {
        register, handleSubmit, errors, setValue,
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
        executeDelete,
        deleteLoading,
        setResult,
    } = useFetchPromo();

    useEffect(() => {
        if (typeof show === 'number') {
            const ban = result.find((prom) => prom.promocodes_id === show);

            Object.keys(ban).forEach((key) => {
                setValue(key, ban[key]);
            });
        }
    }, [show]);

    const onSubmit = async (values) => {
        try {
            const body = {
                name: values.promocode_name,
                price: values.promocode_price,
                prefix: values.promocode_prefix,
            };

            if (typeof show === 'number') {
                const promoUpdated = await executeUpdate(show, body);

                setResult((res) => ({
                    ...res,
                    result: {
                        ...res.result,
                        data: res.result?.data?.map((custom) => {
                            if (+custom?.promocodes_id === show) {
                                return promoUpdated;
                            }

                            return custom;
                        }),
                    },
                }));
            } else {
                const promoNew = await executePost(body);

                setResult((res) => ({
                    ...res,
                    result: {
                        ...res.result,
                        data: [
                            promoNew,
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
                        <th scope="col">Номер</th>
                        <th scope="col">Тип знижки</th>
                        <th scope="col">Ціна</th>
                        <th scope="col" style={{ width: '4%' }}>Дія</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((promo) => (
                        <tr key={promo.promocodes_id}>
                            <td className="table-cell-badge">
                                {promo.promocodes_id}
                            </td>
                            <td>
                                {promo.promocode_name}
                            </td>
                            <td>
                                {promo.promocode_prefix ? '%' : '₴'}
                            </td>
                            <td>
                                {promo.promocode_price}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={handleClick(promo.promocodes_id)}
                                >
                                    <Eye
                                        width={14}
                                        height={14}
                                        fill="blue"
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => executeDelete(promo.promocodes_id)}
                                    disabled={deleteLoading}
                                >
                                    {deleteLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <Remove
                                            fill="red"
                                            width={14}
                                            height={14}
                                        />
                                    )}
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
                <h1>Промокоди</h1>
                {show && (
                    <Modal
                        show={show}
                        toggleModal={toggleModal}
                        loadingForm={postLoading || updateLoading}
                        submit
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <PromoForm
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

export default Layout(PromoCode);
