import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../Layout';
import { Pencil } from '../../../Icons';

const ProductList = () => {
    const history = useHistory();

    function handleClick() {
        history.push('/admin/productedit');
    }

    return (
        <>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
            >
                <h1 className="h2">Products</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            Share
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                            Export
                        </button>
                    </div>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                    >
                        <span data-feather="calendar" />
                        This week
                    </button>
                </div>
            </div>
            <h2>Product List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Model</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td><img style={{ width: '40px' }} src="https://demo.opencart.com/image/cache/catalog/demo/apple_cinema_30-40x40.jpg" /></td>
                            <td>Apple Cinema 30"</td>
                            <td>Product 15	</td>
                            <td>$90.00</td>
                            <td>Enabled</td>
                            <td>
                                <button
                                    style={{ border: 'none' }}
                                    onClick={handleClick}
                                >
                                    <Pencil />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Layout(ProductList);
