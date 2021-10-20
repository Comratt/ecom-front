import React from 'react';

const ProductTabLinks = () => (
    <div>
        <form>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Manufacturer">
                        <b>
                            Manufacturer
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Manufacturer" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Categories">
                        <b>
                            Categories
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Categories" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Filters">
                        <b>
                            Filters
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Filters" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Stores">
                        <b>
                            Stores
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Stores" type="checkbox" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Downloads">
                        <b>
                            Downloads
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Downloads" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Related Products">
                        <b>
                            Related Products
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Related Products" type="text" />
                </div>
            </div>
        </form>
    </div>
);

export default ProductTabLinks;
