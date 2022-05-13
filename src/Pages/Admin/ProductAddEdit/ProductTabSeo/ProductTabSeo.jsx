import React from 'react';

import { useAddProduct } from 'context/addProduct/useAddProduct';

const ProductTabSeo = () => {
    const { values, handleValuesChange } = useAddProduct();

    return (
        <div>
            <form>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="metaTitle">
                            <b>
                                Назва мета-тегу
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <input
                            className="form-control"
                            id="metaTitle"
                            type="text"
                            name="metaTitle"
                            value={values.metaTitle}
                            onChange={handleValuesChange}
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="metaDescription">
                            <b>
                                Опис мета-тегу
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <input
                            className="form-control"
                            id="metaDescription"
                            type="text"
                            name="metaDescription"
                            value={values.metaDescription}
                            onChange={handleValuesChange}
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="metaKeywords">
                            <b>
                                Ключові слова мета-тегів
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <input
                            className="form-control"
                            id="metaKeywords"
                            type="text"
                            name="metaKeywords"
                            value={values.metaKeywords}
                            onChange={handleValuesChange}
                        />
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="metaTags">
                            <b>
                                Теги продукту
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <input
                            className="form-control"
                            id="metaTags"
                            type="text"
                            name="metaTags"
                            value={values.metaTags}
                            onChange={handleValuesChange}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductTabSeo;
