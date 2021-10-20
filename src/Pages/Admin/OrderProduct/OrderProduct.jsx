import React from 'react';
import Layout from '../Layout';
import './OrderProduct.css';
import {
    Calendar, Cart, CardIcon, Truck, Mail, Phone, Edit, PlusIcon,
} from '../../../Icons';
import User from '../../../Icons/User';

const OrderProduct = () => (
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
                            02/10/2019
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
                            test test
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
                            test@test.dk
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Phone
                                style={{ marginRight: '10px' }}
                                fill="#887569"
                                width={18}
                            />
                            2312412412
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
            <h4 className="orderProductIdHeader"> Order (#7191)</h4>
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
                                    test test
                                </li>
                                <li>
                                    sdfsdfjsdif 3
                                </li>
                                <li>
                                    sidjasio 4920
                                </li>
                                <li>
                                    Arhus
                                </li>
                                <li>
                                    Denmark
                                </li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>
                                    test test
                                </li>
                                <li>
                                    sdfsdfjsdif 3
                                </li>
                                <li>
                                    sidjasio 4920
                                </li>
                                <li>
                                    Arhus
                                </li>
                                <li>
                                    Denmark
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
                    <tr>
                        <td>
                            HP LP3065
                            - Delivery Date: 2011-04-22
                        </td>
                        <td>
                            Product 21
                        </td>
                        <td className="text-right">
                            1
                        </td>
                        <td className="text-right">
                            $100.00
                        </td>
                        <td className="text-right">
                            $100.00
                        </td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan="4">
                            Sub-Total
                        </td>
                        <td>
                            $100.00
                        </td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan="4">
                            Flat Shipping Rate
                        </td>
                        <td>
                            $5.00
                        </td>
                    </tr>
                    <tr>
                        <td className="text-right" colSpan="4">
                            Total
                        </td>
                        <td>
                            $105.00
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
                    <tr>
                        <td>
                            02/10/2019
                        </td>
                        <td>
                            comment
                        </td>
                        <td>
                            Pending
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="orderProductHistory">
            <h4 className="orderProductHistoryHeader">
                Add Order History
            </h4>
            <div>
                <form action="#">
                    <div className="orderFormContent">
                        <div className="orderLabelContent">
                            <label>
                                <b>
                                    Order Status
                                </b>
                            </label>
                        </div>
                        <div className="orderInputContent">
                            <select name="status" id="#">
                                <option value="pending">pending</option>
                                <option value="processed">processed</option>
                                <option value="failed">failed</option>
                            </select>
                        </div>
                    </div>
                    <div className="orderFormContent">
                        <div className="orderLabelContent">
                            <label>
                                <b>
                                    Override
                                </b>
                            </label>
                        </div>
                        <div className="orderInputContent">
                            <input type="checkbox" />
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
                            <input type="checkbox" />
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
                            <textarea name="comment" id="#" cols="30" rows="10" />
                        </div>
                    </div>
                    <button className="orderButtonHistory">
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

export default Layout(OrderProduct);
