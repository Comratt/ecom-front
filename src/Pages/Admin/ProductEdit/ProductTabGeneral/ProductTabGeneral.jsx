import React from 'react';
import './ProductTabGeneral.css';

const ProductTabGeneral = () => (
    <div>
        <form>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="productName">
                        <b>
                            Product Name
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="ProductName" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="productTextArea">
                        <b>
                            Description
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <textarea id="productTextArea">
                        Text Area
                    </textarea>
                </div>
            </div>
        </form>
    </div>
);

export default ProductTabGeneral;
