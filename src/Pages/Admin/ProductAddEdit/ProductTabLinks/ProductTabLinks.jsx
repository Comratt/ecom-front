import React, { useMemo } from 'react';
import 'react-autocomplete-input/dist/bundle.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { useAddProduct } from 'context/addProduct/useAddProduct';
import MinusCircle from 'Icons/MinusCircle';

import { useFetchCategories } from '../../hooks/useFetchCategories';
import { useFetchProductModels } from '../../hooks/useFetchProductModels';

import './ProductTabLinks.css';

const ProductTabLinks = () => {
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
        categories.map(({ name, id }) => ({
            label: name,
            value: id,
            id: uuidv4(),
        })).filter(({ value }) => !selectedCategories.map(({ value: v }) => v).includes(value))

    ),
    [categories, selectedCategories]);
    const productModelsNames = useMemo(() => (
        productModels
            .map(({ name, id }) => ({
                label: name,
                value: id,
                id: uuidv4(),
            }))
            .filter(({ value }) => !relatedProducts.map(({ value: v }) => v).includes(value))
    ),
    [productModels, relatedProducts]);

    const animatedComponents = makeAnimated();

    return (
        <div className="product-tab__link">
            <form>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="Categories">
                            <b>
                                Категорії
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Select
                            defaultOptions
                            components={animatedComponents}
                            options={categoryNames}
                            onChange={({ value, label, id }) => {
                                handleSelectCategory({
                                    value,
                                    label,
                                    id,
                                });
                            }}
                        />
                        <div className="well well-sm">
                            {selectedCategories.map(({ value, label }) => (
                                <span key={value} className="label-with-button">
                                    <button
                                        onClick={() => removeCategory(value)}
                                        className="minus__button"
                                        type="button"
                                    >
                                        <MinusCircle height={10} width={10} />
                                    </button>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="from-section">
                    <div className="productTabLabel">
                        <label htmlFor="Related Products">
                            <b>
                                Супутні товари
                            </b>
                        </label>
                    </div>
                    <div className="productTabInput">
                        <Select
                            defaultOptions
                            options={productModelsNames}
                            passThroughEnter
                            onChange={({ value, label, id }) => {
                                handleSelectRelatedProducts({
                                    value,
                                    label,
                                    id,
                                });
                            }}
                        />
                        <div className="well well-sm">
                            {relatedProducts.map(({ value, label }) => (
                                <span key={value} className="label-with-button">
                                    <button
                                        onClick={() => removeSelectRelatedProducts(value)}
                                        className="minus__button"
                                        type="button"
                                    >
                                        <MinusCircle height={10} width={10} />
                                    </button>
                                    {label}
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
