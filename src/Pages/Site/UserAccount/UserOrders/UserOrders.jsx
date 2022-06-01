import React from 'react';
import { useAsync } from 'react-async-hook';
import classNames from 'classnames';
import OrderService from 'Services/OrderService';
import { ProductCardHorizontal } from 'Components/SkeletonLoader';
import { getImage } from 'API';
import { SHIPPING_CODES, getFormattedPrice } from 'Constants';

import './UserOrders.css';

const UserOrders = ({ email }) => {
    const componentClasses = classNames(
        'lib-user-orders',
    );
    const { loading, result } = useAsync(OrderService.getByEmail, [email]);

    if (loading) {
        return <ProductCardHorizontal />;
    }

    return (
        <div className={componentClasses}>
            <div className="lib-user-orders-table">
                {result?.data?.map((product) => (
                    <div className="lib-user-orders-table-info">
                        <img src={getImage(product?.image)} alt="img-order" />
                        <div className="lib-user-orders-table-info-product">
                            <span className="lib-user-orders-product-model">
                                {'арт. '}
                                {product?.product_id}
                            </span>
                            <span>{product?.size}</span>
                            <span>
                                {product?.model}
                                {' '}
                                {product?.name}
                            </span>
                            <span>
                                Cтатус -
                                {SHIPPING_CODES[product?.status]}
                            </span>
                            <span className="lib-user-orders-product-color" />
                            <span>
                                Ціна:
                                {product?.quantity}
                                {' x '}
                                {getFormattedPrice(product?.price)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrders;
