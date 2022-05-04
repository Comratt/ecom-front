import React from 'react';
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

import { useFetchOrder } from '../hooks/useFetchOrders';
import './OrderProduct.css';

const OrderProduct = () => {
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

    console.log(result);

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
            <div className="orderProductDetailsTable">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Cart
                                    style={{ marginRight: '10px' }}
                                    width={18}
                                />
                                Order Details
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
                                Your Store
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Calendar
                                    width={18}
                                    style={{ marginRight: '10px' }}
                                    fill="#887569"
                                />
                                {result.dateAdd}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <CardIcon
                                    style={{ marginRight: '10px' }}
                                    width={18}
                                    fill="#887569"
                                />
                                Cash On Delivery
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Truck
                                    style={{ marginRight: '10px' }}
                                    fill="#887569"
                                    width={18}
                                />
                                Flat Shipping Rate
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
                                    fill="#887569"
                                    width={18}
                                />
                                Customer Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <User
                                    style={{ marginRight: '10px' }}
                                    fill="#887569"
                                    width={18}
                                />
                                {result.customer}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <User
                                    style={{ marginRight: '10px' }}
                                    fill="#887569"
                                    width={18}
                                />
                                Default
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Mail
                                    style={{ marginRight: '10px' }}
                                    fill="#887569"
                                    width={18}
                                />
                                {result.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Phone
                                    style={{ marginRight: '10px' }}
                                    fill="#887569"
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
                                    fill="#887569"
                                    width={18}
                                />
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Invoice
                                <Edit
                                    style={{ float: 'right' }}
                                    fill="#887569"
                                    width={18}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Reward Points
                                <PlusIcon
                                    style={{ float: 'right' }}
                                    fill="#887569"
                                    width={18}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cash On Delivery
                                <PlusIcon
                                    style={{ float: 'right' }}
                                    fill="#887569"
                                    width={18}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="orderProductId">
                <h4 className="orderProductIdHeader">
                    {' '}
                    Order (#
                    {result.id}
                    )
                </h4>
                <table className="orderProductTableAddress">
                    <thead>
                        <tr>
                            <th>Payment Address</th>
                            <th>Shipping Address</th>
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
                            <th>Product</th>
                            <th>Model</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.products?.map((product) => (
                            <tr>
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.model}
                                </td>
                                <td className="text-right">
                                    {product.quantity}
                                </td>
                                <td className="text-right">
                                    {getFormattedPrice(product.price)}
                                </td>
                                <td className="text-right">
                                    {getFormattedPrice(product.price * product.quantity)}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td className="text-right" colSpan="4">
                                Sub-Total
                            </td>
                            <td>
                                {getFormattedPrice(result.order_total_sum)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right" colSpan="4">
                                Flat Shipping Rate
                            </td>
                            <td>
                                {getFormattedPrice(SHIPPING_RATE)}
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right" colSpan="4">
                                Total
                            </td>
                            <td>
                                {getFormattedPrice(+result.order_total_sum + SHIPPING_RATE)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="orderProductId">
                <h4 className="orderProductIdHeader"> Order History</h4>
                <table className="orderProductTableAddress">
                    <thead>
                        <tr>
                            <th>
                                Date Added
                            </th>
                            <th>
                                Comment
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Customer Notified
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
                    Add Order History
                </h4>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="orderFormContent">
                            <div className="orderLabelContent">
                                <label>
                                    <b>
                                        Order Status
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
                                        Notify Customer
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
                                        Comment
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
                                    Add history
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
