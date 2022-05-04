import React from 'react';

import './Filter.css';
import { Filters } from '../../../Icons';

const Filter = () => (
    <div className="orderListFilter">
        <div className="orderListFilter-title">
            <h5>
                <Filters />
                {' '}
                Filter
            </h5>
        </div>
        <form className="orderListFilter-form">

            <label className="orderListFilter-label" htmlFor="orderId"><b>Product Name</b></label>
            <input className="orderListFilter-input" type="text" id="orederId" placeholder="Product Name" />

            <label className="orderListFilter-label" htmlFor="Model"><b>Model</b></label>
            <input className="orderListFilter-input" type="text" id="Model" placeholder="Model" />

            <label className="orderListFilter-label" htmlFor="Price"><b>Price</b></label>
            <input className="orderListFilter-input" type="text" id="Price" placeholder="Price" />

            <label className="orderListFilter-label" htmlFor="Quantity"><b>Quantity</b></label>
            <input className="orderListFilter-input" type="text" id="Quantity" placeholder="Quantity" />

            <label className="orderListFilter-label" htmlFor="Status"><b>Status</b></label>
            <select className="form-select" name="status" id="status">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <div className="d-flex justify-content-end">
                <button className="btn btn-outline-primary">
                    <Filters />
                    {' '}
                    Filter
                </button>
            </div>
        </form>
    </div>
);

export default Filter;
