import React from 'react';
import Layout from '../Layout';
import './Order.css';
import { Eye, Menu, Pencil } from '../../../Icons';
import { useHistory } from 'react-router-dom';

const Order = () => {
    const history = useHistory();

    function handleClick() {
        history.push('/admin/orderproduct');
    }

    return (
        <div>
            <h4 className="orderListHeader">Orders</h4>
            <div className="orderListContent">

                <h6 className="orderListHeader">
                    <Menu
                        width={24}
                        style={{ marginRight: '10px' }}
                    />
                    Order List
                </h6>
                <div className="orderListTable">
                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>Orders Id</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date Added</th>
                                <th>Date Modified</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    3140
                                </td>
                                <td>
                                    Virat Kohli
                                </td>
                                <td>
                                    Pending
                                </td>
                                <td>
                                    $284.99
                                </td>
                                <td>
                                    01/06/2018
                                </td>
                                <td>
                                    01/06/2018
                                </td>
                                <td>
                                    <button
                                        className="orderButtonDetails"
                                        onClick={handleClick}
                                    >
                                        <Eye
                                            width={20}
                                            fill="white"
                                        />
                                    </button>
                                    <button
                                        className="orderButton"
                                    >
                                        <Pencil
                                            fill="white"
                                        />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Layout(Order);
