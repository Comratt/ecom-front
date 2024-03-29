import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { fetchProducts } from 'context/api/fetchProducts';
import { getFormattedPrice } from 'Constants';
import { getImage } from 'API';
import Search from '../../Icons/Search';

import './HeaderInput.css';
import '../SearchResults/searchResults.css';
import { useLayout } from '../../hooks/useLayout';

const styles = {
    control: (style) => ({
        ...style,
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        backgroundColor: 'rgba(245,243,243,.64)',
    }),
    container: (style) => ({
        ...style,
        width: '100%',
    }),
    menu: (style) => ({
        ...style,
        marginTop: 0,
        left: 0,
    }),
    menuPortal: (style) => ({
        ...style,
        marginTop: 4,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 100,
    }),
    option: (style, { isFocused }) => ({
        ...style,
        cursor: 'pointer',
        backgroundColor: isFocused ? 'rgba(0, 0, 0, .05)' : 'transparent',
    }),
    placeholder: (defaultStyles) => ({
        ...defaultStyles,
        color: '#baafa9',
    }),
    input: (style) => ({
        ...style,
        color: 'var(--color-accent)',
    }),
};

const adaptFoundedProducts = (data = []) => data?.map((product) => ({
    id: product.product_id,
    name: product.name,
    price: getFormattedPrice(product.price),
    image: getImage(product.image),
}));

const DropdownIndicator = () => (
    <label className="dropdown-indicator-label">
        <Search
            className="header-icon-search"
            width={24}
            height={24}
        />
    </label>
);

const Control = ({ children, ...props }) => (
    <components.Control {...props}>
        <DropdownIndicator />
        {children}
    </components.Control>
);

const SelectOptionContainer = ({ children, ...props }) => {
    const history = useHistory();
    const goToCollection = () => history.push('/collection');

    return (
        <components.Menu {...props}>
            <div className="lib-search-results_info">
                <div className="product-matches__title">
                    Збіги товару
                </div>
                <div className="product-matches__wrapper">
                    <div className="product-matches__items">
                        {children}
                    </div>
                </div>
            </div>
        </components.Menu>
    );
};

const SelectOption = (props) => {
    const {
        data: {
            image, name, id, price,
        },
    } = props;

    return (
        <components.Option {...props}>
            <NavLink to={`/products/${id}`} className="product-matches__item">
                <div className="product-matches__info-content">
                    <div className="product-matches__item-left">
                        <div className="product-matches__image">
                            <img src={image} alt="" />
                        </div>
                    </div>
                    <div className="product-matches__item-right">
                        <div className="product-matches__name">
                            {name}
                        </div>
                        <div className="product-matches__price">
                            {price}
                        </div>
                    </div>
                </div>
                <div className="line" />
            </NavLink>
        </components.Option>
    );
};

const HeaderInput = () => {
    const {
        handleCloseNavigationModal,
        changeTopNavState,
    } = useLayout();

    const filterProducts = async (inputValue) => {
        const products = await fetchProducts({ search: inputValue });

        return adaptFoundedProducts(products.data);
    };

    const promiseOptions = async (inputValue) => filterProducts(inputValue);

    return (
        <div className="header-input-form">
            <AsyncSelect
                value={null}
                escapeClearsValue
                menuPortalTarget={document.body}
                menuShouldBlockScroll
                cacheOptions
                styles={styles}
                defaultOptions={[]}
                placeholder="Пошук"
                aria-label="Пошук товарів на сайті"
                loadOptions={promiseOptions}
                noOptionsMessage={() => 'Збігів не найдено.'}
                loadingMessage={() => 'Завантажуєм товари...'}
                components={{
                    DropdownIndicator: () => null,
                    Option: SelectOption,
                    Menu: SelectOptionContainer,
                    Control,
                }}
                onChange={handleCloseNavigationModal}
                onFocus={() => changeTopNavState({ transparent: false })}
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </div>
    );
};

export default HeaderInput;
