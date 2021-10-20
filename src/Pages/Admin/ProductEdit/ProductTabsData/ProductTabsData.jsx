import React from 'react';

const ProductTabsData = () => (
    <div>
        <form>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="productName">
                        <b>
                            Model
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="ProductName" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Quantity">
                        <b>
                            Quantity
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Quantity" type="text" />
                </div>
            </div>
        </form>
    </div>
);

export default ProductTabsData;
