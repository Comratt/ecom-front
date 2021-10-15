import React from 'react';

const ProductTabSeo = () => (
    <div>
        <form>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Meta Tag Title">
                        <b>
                            Meta Tag Title
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Meta Tag Title" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Meta Tag Description">
                        <b>
                            Meta Tag Description
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Meta Tag Description" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Meta Tag Keywords">
                        <b>
                            Meta Tag Keywords
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Meta Tag Keywords" type="text" />
                </div>
            </div>
            <div className="from-section">
                <div className="productTabLabel">
                    <label htmlFor="Product Tags">
                        <b>
                            Product Tags
                        </b>
                    </label>
                </div>
                <div className="productTabInput">
                    <input id="Product Tags" type="text" />
                </div>
            </div>
        </form>
    </div>
);

export default ProductTabSeo;
