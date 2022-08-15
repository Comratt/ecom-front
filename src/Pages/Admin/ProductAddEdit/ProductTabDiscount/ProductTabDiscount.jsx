import React from 'react';

// eslint-disable-next-line import/no-cycle
import { useAddProduct } from 'context/addProduct/useAddProduct';
import PlusIcon from 'Icons/PlusIcon';
import Remove from 'Icons/Remove';

const ProductTabDiscount = () => {
    const {
        onAddProductDiscount, onDeleteProductDiscount, discounts, onChangeProductDiscount,
    } = useAddProduct();

    console.log(discounts);

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Кількість</th>
                        <th>Ціна</th>
                        <th>Пріоритет</th>
                        {/* <th>Date Start</th>
                        <th>Date End</th> */}
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {discounts.map((discount) => (
                        <tr>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={discount.quantity}
                                    name="quantity"
                                    onChange={(e) => onChangeProductDiscount(discount.id)(e)}
                                />
                            </td>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={discount.price}
                                    name="price"
                                    onChange={(e) => onChangeProductDiscount(discount.id)(e)}
                                />
                            </td>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    value={discount.priority}
                                    name="priority"
                                    onChange={(e) => onChangeProductDiscount(discount.id)(e)}
                                />
                            </td>
                            {/* <td>
                                <input className="form-control" type="date" />
                            </td>
                            <td>
                                <input className="form-control" type="date" />
                            </td> */}
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => onDeleteProductDiscount(discount.id)}
                                >
                                    <Remove
                                        fill="red"
                                        width={14}
                                        height={14}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        {/* <td />
                        <td /> */}
                        <td />
                        <td />
                        <td />
                        <td>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={onAddProductDiscount}
                            >
                                <PlusIcon
                                    fill="blue"
                                    width={14}
                                    height={14}
                                />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ProductTabDiscount;
