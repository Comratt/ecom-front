import React from 'react';
import { useAsync } from 'react-async-hook';
import { Link } from 'Components/Link';
import { v4 as uuidv4 } from 'uuid';
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
                    <Link key={uuidv4()} to={`/products/${product?.slug}`} className="lib-user-orders-table-info">
                        <img src={getImage(product?.image)} alt="img-order" />
                        <div className="lib-user-orders-table-info-product">
                            <span className="lib-user-orders-product-model">
                                <b>
                                    {'арт. '}
                                    {product?.product_id}
                                </b>
                            </span>
                            <span>
                                {product?.model}
                                {' '}
                                {product?.name}
                            </span>
                            <span>
                                <b>Cтатус</b>
                                {' - '}
                                {SHIPPING_CODES[product?.status_id]}
                            </span>
                            <span>
                                <b>Колір</b>
                                {' - '}
                                {product?.color}
                            </span>
                            <span>
                                <b>Розмір</b>
                                {' - '}
                                {product?.size}
                            </span>
                            <span>
                                <b>Ціна</b>
                                {': '}
                                {product?.quantity}
                                {' x '}
                                {getFormattedPrice(product?.price)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UserOrders;
