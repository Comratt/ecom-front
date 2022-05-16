import React from 'react';
import Input from 'Components/Input';
import { useAddProduct } from 'context/addProduct/useAddProduct';

const ProductTabsData = () => {
    const { values, handleValuesChange } = useAddProduct();

    return (
        <div>
            <form>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="productName">
                            <b>
                                Модель
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Input
                            value={values.model}
                            name="model"
                            onChange={handleValuesChange}
                            id="model"
                            type="text"
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="Quantity">
                            <b>
                                Кількість
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Input
                            value={values.quantity}
                            name="quantity"
                            onChange={handleValuesChange}
                            id="quantity"
                            type="text"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductTabsData;
