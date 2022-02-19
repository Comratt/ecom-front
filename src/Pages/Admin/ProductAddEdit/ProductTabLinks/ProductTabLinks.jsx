import React, { useMemo, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import Input from 'Components/Input';
import { useAddProduct } from 'context/addProduct/useAddProduct';
import { MinusCircle } from 'Icons';

import { useFetchCategories } from '../../hooks/useFetchCategories';
import { useFetchProductModels } from '../../hooks/useFetchProductModels';

import './ProductTabLinks.css';

const ProductTabLinks = () => {
    const [categoryValue, setCategoryValue] = useState('');
    const [relatedValue, setRelatedValue] = useState('');
    const { categories } = useFetchCategories();
    const { result: productModels } = useFetchProductModels();

    const {
        selectedCategories,
        handleSelectCategory,
        removeCategory,
        relatedProducts,
        handleSelectRelatedProducts,
        removeSelectRelatedProducts,
    } = useAddProduct();
    const categoryNames = useMemo(() => (
        categories
            .map(({ name, id }) => `${name} ~ ${id}`)
            .filter((name) => !selectedCategories.includes(name))
    ),
    [categories, selectedCategories]);
    const productModelsNames = useMemo(() => (
        productModels
            .map(({ name, id }) => `${name} ~ ${id}`)
            .filter((name) => !relatedProducts.includes(name))
    ),
    [productModels, relatedProducts]);

    return (
        <div className="product-tab__link">
            <form>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="Categories">
                            <b>
                                Categories
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <TextInput
                            value={categoryValue}
                            onChange={setCategoryValue}
                            Component="input"
                            className="form-control"
                            type="text"
                            options={categoryNames}
                            trigger=""
                            matchAny
                            regex={/[а-яА-Яa-zA-Z0-9_-]+/}
                            spacer=""
                            offsetY={15}
                            passThroughEnter
                            onSelect={(tName) => {
                                handleSelectCategory(tName);
                                setCategoryValue('');
                            }}
                        />
                        <div className="well well-sm">
                            {selectedCategories.map((categoryName) => (
                                <span key={categoryName} className="label-with-button">
                                    <button
                                        onClick={() => removeCategory(categoryName)}
                                        className="minus__button"
                                        type="button"
                                    >
                                        <MinusCircle height={10} width={10} />
                                    </button>
                                    {categoryName}
                                </span>
                            ))}
                        </div>
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
                        <TextInput
                            value={relatedValue}
                            onChange={setRelatedValue}
                            Component="input"
                            className="form-control"
                            type="text"
                            options={productModelsNames}
                            trigger=""
                            matchAny
                            regex={/[а-яА-Яa-zA-Z0-9_-]+/}
                            spacer=""
                            offsetY={15}
                            passThroughEnter
                            onSelect={(tName) => {
                                handleSelectRelatedProducts(tName);
                                setRelatedValue('');
                            }}
                        />
                        <div className="well well-sm">
                            {relatedProducts.map((productName) => (
                                <span key={productName} className="label-with-button">
                                    <button
                                        onClick={() => removeSelectRelatedProducts(productName)}
                                        className="minus__button"
                                        type="button"
                                    >
                                        <MinusCircle height={10} width={10} />
                                    </button>
                                    {productName}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductTabLinks;
