import React, { useMemo, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import Input from 'Components/Input';
import { useAddProduct } from 'context/addProduct/useAddProduct';
import { MinusCircle } from 'Icons';

import { useFetchCategories } from '../../hooks/useFetchCategories';

import './ProductTabLinks.css';

const ProductTabLinks = () => {
    const [val, setVal] = useState('');
    const { categories } = useFetchCategories();
    const {
        values,
        handleValuesChange,
        selectedCategories,
        handleSelectCategory,
        removeCategory,
    } = useAddProduct();
    const categoryNames = useMemo(() => (
        categories
            .map(({ name }) => name)
            .filter((name) => !selectedCategories.includes(name))
    ),
    [categories, selectedCategories]);

    return (
        <div className="product-tab__link">
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
                        <Input
                            value={values.manufacturer}
                            name="manufacturer"
                            onChange={handleValuesChange}
                            id="manufacturer"
                            type="text"
                        />
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
                        <TextInput
                            value={val}
                            onChange={setVal}
                            Component="input"
                            className="form-control"
                            type="text"
                            options={categoryNames}
                            trigger=""
                            matchAny
                            regex={/[а-яА-Я0-9_-]+/}
                            spacer=""
                            offsetY={15}
                            passThroughEnter
                            onSelect={(tName) => {
                                handleSelectCategory(tName);
                                setVal('');
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
};

export default ProductTabLinks;
