import React from 'react';
import classNames from 'classnames';
import './UserOrders.css';

const UserOrders = () => {
    const componentClasses = classNames(
        'lib-user-orders',
    );

    return (
        <div className={componentClasses}>
            <div className="lib-user-orders-table">
                <div className="lib-user-orders-table-info">
                    <img src="https://image.12storeez.com/images/154x188_90_out/uploads/images/CATALOG/top/112865/62690c84220f6-171952.jpg" alt="img-order" />
                    <div className="lib-user-orders-table-info-product">
                        <span className="lib-user-orders-product-model">арт. 114175</span>
                        <span>XS</span>
                        <span>Брюки льняные в мужском стиле</span>
                        <span>Cтатус - в дорозі</span>
                        <span className="lib-user-orders-product-color" />
                        <span>До оплати: 2000$</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrders;
