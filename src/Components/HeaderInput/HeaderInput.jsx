import React from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { Search } from '../../Icons';

import './HeaderInput.css';
import '../SearchResults/searchResults.css';

const options = [
    { value: 'chocolate', label: 'Chocolate', asd: 1 },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const styles = {
    container: () => ({
        width: '100%',
    }),
};

const DropdownIndicator = () => (
    <label className="dropdown-indicator-label">
        <Search
            className="header-icon-search"
            width={24}
            height={24}
        />
    </label>
);

const SelectOptionContainer = ({ children, ...props }) => (
    <components.Menu {...props}>
        <div className="lib-search-results_info">
            <div className="product-matches__title">
                Product matches
            </div>
            <div className="product-matches__wrapper">
                <div className="product-matches__items">
                    {children}
                </div>
                <div className="product-matches__btn-block">
                    <button className="product-matches__btn">View all results for</button>
                </div>
            </div>
        </div>
    </components.Menu>
);

const SelectOption = ({ children, ...props }) => (
    <components.Option {...props}>
        <div className="product-matches__item">
            <div className="product-matches__info-content">
                <div className="product-matches__item-left">
                    <div className="product-matches__image">
                        <img src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_1739.jpg?v=1620139718" alt="" />
                    </div>
                </div>
                <div className="product-matches__item-right">
                    <div className="product-matches__name">
                        V-neck silk camisole
                    </div>
                    <div className="product-matches__price">
                        €55
                    </div>
                </div>
            </div>
            <div className="line" />
        </div>
    </components.Option>
);

const filterColors = (inputValue) => (
    options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
);

const promiseOptions = (inputValue) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(filterColors(inputValue));
    }, 1000);
});

const HeaderInput = () => (
    <form action="#" className="header-input-form">
        <AsyncSelect
            cacheOptions
            styles={styles}
            defaultOptions={options}
            loadOptions={promiseOptions}
            components={{ DropdownIndicator, Option: SelectOption, Menu: SelectOptionContainer }}
            className="react-select-container"
            classNamePrefix="react-select"
        />
    </form>
);

export default HeaderInput;
