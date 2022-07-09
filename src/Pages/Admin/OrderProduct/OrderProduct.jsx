import React, { useState, useEffect, useMemo } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
    Calendar, Cart, CardIcon, Truck, Mail, Phone, Edit, PlusIcon,
} from 'Icons';
import User from 'Icons/User';
import Loader from 'Components/Loader';
import Alert from 'Components/Alert';
import {
    DATE_FORMAT,
    DATEDDMMYYYY,
    getFormattedPrice,
    SHIPPING_CODES,
    SHIPPING_RATE,
} from 'Constants';
import OrderService from 'Services/OrderService';
import Layout from '../Layout';
import ReturnModal from './ReturnModal';

import { useFetchOrder } from '../hooks/useFetchOrders';
import './OrderProduct.css';
import ReturnService from '../../../Services/ReturnService';

const OrderProduct = () => {
    const [show, setShow] = useState(false);
    const [returnProducts, setReturnProducts] = useState({});
    const [returnComment, setReturnComment] = useState('');
    const toggleModal = () => setShow((prevState) => !prevState);
    const { register, handleSubmit, errors } = useForm();
    const {
        result,
        error,
        loading,
        orderId,
        setResult,
    } = useFetchOrder();
    const {
        loading: loadingHistory,
        error: errorHistory,
        execute: executeHistory,
    } = useAsyncCallback(OrderService.addHistoryStatus);
    const {
        loading: loadingReturn,
        error: errorReturn,
        execute: executeReturn,
    } = useAsyncCallback(ReturnService.store);
    const handleReturnProducts = (prodId, quantity) => (
        setReturnProducts((prev) => ({
            ...prev,
            [prodId]: quantity,
        }))
    );
    const returnedProducts = useMemo(() => {
        if (result?.products?.length) {
            return result?.products?.filter(({ return_quantity }) => !!return_quantity);
        }

        return [];
    }, [result]);

    const onReturnSubmit = async (e) => {
        e.preventDefault();

        const params = {
            comment: returnComment,
            price: Object.keys(returnProducts)?.reduce((acc, val) => {
                const findProduct = result?.products?.find(({ color_size_product_id }) => color_size_product_id === +val)?.price;

                return acc + +findProduct;
            }, 0),
            products: Object.keys(returnProducts).map((prodId) => ({
                id: prodId,
                quantity: returnProducts[prodId],
            })),
        };

        await executeReturn(params, orderId);
    };

    useEffect(() => {
        if (result?.products?.length) {
            const productIdQuantity = result.products.reduce((acc, product) => ({
                ...acc,
                [product.product_option_id]: 0,
            }), {});

            setReturnProducts(productIdQuantity);
        }
    }, [result]);

    const onSubmit = (values) => {
        executeHistory({ ...values, id: orderId })
            .then((resp) => {
                setResult((res) => ({
                    ...res,
                    result: {
                        ...res.result,
                        history: [
                            ...res.result.history,
                            {
                                ...resp,
                                dateAdd: moment(resp.created_at, DATE_FORMAT).format(DATEDDMMYYYY),
                                status: SHIPPING_CODES[resp.history_status],
                                notify: resp.notify_customer ? 'Yes' : 'No',
                            },
                        ],
                    },
                }));
            });
    };

    if (loading) {
        return <Loader size={7} center />;
    }
    if (!loading && error) {
        return <Alert type="warning" text={error.message} />;
    }

    return (
        <div className="orderContent">
            {show && (
                <ReturnModal
                    returnComment={returnComment}
                    setReturnComment={setReturnComment}
                    handleReturnProducts={handleReturnProducts}
                    returnProducts={returnProducts}
                    show={show}
                    products={result?.products}
                    toggleModal={toggleModal}
                    onSubmit={onReturnSubmit}
                    loading={loadingReturn}
                />
            )}
            <div className="orderProductDetailsTable">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Cart
                                    style={{ marginRight: '10px' }}
                                    width={18}
                                />
                                Деталі замовлення
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Cart
                                    style={{ marginRight: '10px' }}
                                    width={18}
                                />
                                Ваш магазин
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Calendar
                                    width={18}
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                />
                                {result.dateAdd}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CardIcon
                                    style={{ marginRight: '10px' }}
                                    width={18}
                                    fill="var(--color-accent)"
                                />
                                Наложений платіж
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Truck
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                Фіксована ставка доставки
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <User
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                Інформація про клієнта
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <User
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                {result.customer}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <User
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                За замовчуванням
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Mail
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                {result.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Phone
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                {result.phone}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Edit
                                    style={{ marginRight: '10px' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                                Параметри
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Рахунок-фактура
                                <Edit
                                    style={{ float: 'right' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Бонусні бали
                                <PlusIcon
                                    style={{ float: 'right' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Наложений платіж
                                <PlusIcon
                                    style={{ float: 'right' }}
                                    fill="var(--color-accent)"
                                    width={18}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="orderProductId">
                <h4
                    className="orderProductIdHeader"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>
                        {' '}
                        Order (#
                        {result.id}
                        )
                    </span>
                    <button type="button" className="btn btn-danger" onClick={toggleModal}>Повернення</button>
                </h4>
                {!!returnedProducts?.length && (
                    <>
                        <h4 className="orderProductIdHeader">Історія повернених товарів</h4>
                        <table className="orderProductTablePrice">
                            <thead>
                                <tr>
                                    <th>Продукт</th>
                                    <th>Модель</th>
                                    <th>Колір</th>
                                    <th>Розмір</th>
                                    <th>Кількість</th>
                                    <th>Ціна за одиницю</th>
                                    <th>Всього</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnedProducts?.map((product) => (
                                    <tr>
                                        <td>
                                            {product.name}
                                        </td>
                                        <td>
                                            {product.model}
                                        </td>
                                        <td>
                                            {product.color}
                                        </td>
                                        <td>
                                            {product.size}
                                        </td>
                                        <td className="text-right">
                                            {product.return_quantity}
                                        </td>
                                        <td className="text-right">
                                            {getFormattedPrice(product.price)}
                                        </td>
                                        <td className="text-right">
                                            {getFormattedPrice(product.price * product.return_quantity)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                <table className="orderProductTableAddress">
                    <thead>
                        <tr>
                            <th>Платіжна адреса</th>
                            <th>Адреса доставки</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul>
                                    <li>
                                        {result.customer}
                                    </li>
                                    <li>
                                        {result.email}
                                    </li>
                                    <li>
                                        {result.phone}
                                    </li>
                                    <li>
                                        {result.comment}
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>
                                        {result.customer}
                                    </li>
                                    <li>
                                        {result.shipping_country}
                                    </li>
                                    <li>
                                        {result.shipping_city}
                                    </li>
                                    <li>
                                        {result.shipping_address}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="orderProductTablePrice">
                    <thead>
                        <tr>
                            <th>Продукт</th>
                            <th>Модель</th>
                            <th>Колір</th>
                            <th>Розмір</th>
                            <th>Кількість</th>
                            <th>Ціна за одиницю</th>
                            <th>Всього</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.products?.map((product) => (
                            <tr>
                                <td style={{ backgroundColor: product?.return_quantity ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {product.name}
                                </td>
                                <td style={{ backgroundColor: product?.return_quantity ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {product.model}
                                </td>
                                <td style={{ backgroundColor: product?.return_quantity ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {product.color}
                                </td>
                                <td style={{ backgroundColor: product?.return_quantity ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {product.size}
                                </td>
                                <td className="text-right" style={{ backgroundColor: (product?.return_quantity === product?.quantity) ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {product.quantity}
                                </td>
                                <td className="text-right" style={{ backgroundColor: product?.return_quantity ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {getFormattedPrice(product.price)}
                                </td>
                                <td className="text-right" style={{ backgroundColor: product?.return_quantity ? 'rgba(255, 0, 0, .3)' : 'transparent' }}>
                                    {getFormattedPrice(product.price * product.quantity)}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="text-right" colSpan="6">
                                Проміжний підсумок
                            </td>
                            <td>
                                {getFormattedPrice(result.order_total_sum)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right" colSpan="6">
                                Фіксована ставка доставки
                            </td>
                            <td>
                                {getFormattedPrice(SHIPPING_RATE)}
                            </td>
                        </tr>
                        {result.promoName && (
                            <tr>
                                <td className="text-right" colSpan="6">
                                    Знижка по промокоду:
                                    {' '}
                                    <b>{result.promoName}</b>
                                </td>
                                <td>
                                    -
                                    {getFormattedPrice(result.discount)}
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td className="text-right" colSpan="6">
                                Всього
                            </td>
                            <td>
                                {/* eslint-disable-next-line max-len */}
                                {getFormattedPrice(+result.order_total_sum + SHIPPING_RATE - (result.discount))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="orderProductId">
                <h4 className="orderProductIdHeader"> Історія Замовлень</h4>
                <table className="orderProductTableAddress">
                    <thead>
                        <tr>
                            <th>
                                дату додано
                            </th>
                            <th>
                                Коментар
                            </th>
                            <th>
                                Статус
                            </th>
                            <th>
                                Повідомлено клієнта
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.history?.map((orderHistory) => (
                            <tr>
                                <td>
                                    {orderHistory.dateAdd}
                                </td>
                                <td>
                                    {orderHistory.history_comment}
                                </td>
                                <td>
                                    {orderHistory.status}
                                </td>
                                <td>
                                    {orderHistory.notify}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="orderProductHistory">
                <h4 className="orderProductHistoryHeader">
                    Додати історію замовлень
                </h4>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="orderFormContent">
                            <div className="orderLabelContent">
                                <label>
                                    <b>
                                        Статус замовлення
                                    </b>
                                </label>
                            </div>
                            <div className="orderInputContent">
                                <select
                                    name="shippingCode"
                                    className="custom-select my-1 mr-sm-2"
                                    id="inlineFormCustomSelectPref"
                                    ref={register({
                                        required: true,
                                    })}
                                >
                                    <option value="" disabled selected>Order status</option>
                                    {Object.keys(SHIPPING_CODES).map((codeId) => (
                                        <option
                                            value={codeId}
                                        >
                                            {SHIPPING_CODES[codeId]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="orderFormContent">
                            <div className="orderLabelContent">
                                <label>
                                    <b>
                                        Повідомити клієнта
                                    </b>
                                </label>
                            </div>
                            <div className="orderInputContent">
                                <div className="form-check form-check-inline">
                                    <input
                                        name="notify"
                                        className="form-check-input"
                                        type="checkbox"
                                        ref={register({})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="orderFormContent">
                            <div className="orderLabelContent">
                                <label>
                                    <b>
                                        Коментар
                                    </b>
                                </label>
                            </div>
                            <div className="orderInputContent">
                                <textarea
                                    ref={register({})}
                                    className="form-control"
                                    name="comment"
                                    id="#"
                                    cols="30"
                                    rows="10"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary orderButtonHistory" disabled={loadingHistory}>
                            {loadingHistory && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                            <div className="orderButtonContent">
                                <PlusIcon
                                    style={{ marginRight: '5px' }}
                                    fill="white"
                                    width={18}
                                />
                                <div>
                                    Додати історію
                                </div>
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Layout(OrderProduct);
