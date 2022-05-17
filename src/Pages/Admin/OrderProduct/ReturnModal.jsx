import React from 'react';
import { getFormattedPrice } from 'Constants';
import Modal from 'Components/Modal';
import Input from 'Components/Input';

const ReturnModal = ({
    products, show, toggleModal, loading, onSubmit, handleReturnProducts, returnProducts,
    returnComment, setReturnComment,
}) => {
    const onQuantityChange = (id, maxQuantity) => ({ target: { value } }) => {
        if (maxQuantity >= value && value >= 0) {
            handleReturnProducts(id, value);
        }
    };
    const handleReturnComment = ({ target: { value } }) => setReturnComment(value);

    return (
        <Modal
            show={show}
            toggleModal={toggleModal}
            loadingForm={loading}
            submit
            onSubmit={onSubmit}
            className="return-modal"
        >
            <div>
                <table className="orderProductTablePrice table table-bordered">
                    <thead>
                        <tr>
                            <th>Продукт</th>
                            <th>Модель</th>
                            <th>Колір</th>
                            <th>Розмір</th>
                            <th>К-ть</th>
                            <th>Ціна</th>
                            <th style={{ width: '5%' }}>Повернути</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr>
                                <td>
                                    {product.name}
                                </td>
                                <td>
                                    {product.model}
                                </td>
                                <td>
                                    {product.color}
                                </td>
                                <td>
                                    {product.size}
                                </td>
                                <td className="text-right">
                                    {product.quantity}
                                </td>
                                <td className="text-right">
                                    {getFormattedPrice(product.price)}
                                </td>
                                <td>
                                    <input
                                        value={returnProducts[product.product_option_id]}
                                        defaultValue="0"
                                        onChange={onQuantityChange(product.product_option_id, product.quantity)}
                                        className="form-control"
                                        type="number"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Input
                    onChange={handleReturnComment}
                    value={returnComment}
                    label="Причина повернення"
                    placeholder="Вкажіть причину повернення"
                    type="text"
                    as="textarea"
                />
            </div>
        </Modal>
    );
};

export default ReturnModal;
