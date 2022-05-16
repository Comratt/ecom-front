import React from 'react';
import './AddCartBtn.css';

const AddCartBtn = (props) => (
    <div className="lib-product_info_submit">
        <button {...props}>
            Додати в кошик
        </button>
    </div>
);

export default AddCartBtn;
