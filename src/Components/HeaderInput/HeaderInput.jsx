import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import { fetchProducts } from 'context/api/fetchProducts';
import { getFormattedPrice } from 'Constants';
import { getImage } from 'API';
import { Search } from '../../Icons';

import './HeaderInput.css';
import '../SearchResults/searchResults.css';
import { useLayout } from '../../hooks/useLayout';

const styles = {
    control: (style) => ({
        ...style,
        borderColor: 'hsl(0, 0%, 70%)',
        boxShadow: 'none',
        outline: 'none',
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
};

const adaptFoundedProducts = (data = []) => data?.map((product) => ({
    id: product.product_id,
    name: product.model + product.name,
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

const SelectOptionContainer = ({ children, ...props }) => (
    <components.Menu {...props}>
        <div className="lib-search-results_info">
            <div className="product-matches__title">
                Збіги товару
            </div>
            <div className="product-matches__wrapper">
                <div className="product-matches__items">
                    {children}
                </div>
                <div className="product-matches__btn-block">
                    <button className="product-matches__btn">Переглянути всі результати</button>
                </div>
            </div>
        </div>
    </components.Menu>
);

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
    const [foundProducts, setFoundProducts] = useState([]);
    const {
        handleCloseNavigationModal,
        changeTopNavState,
    } = useLayout();

    useEffect(() => {
        fetchProducts().then(({ data }) => setFoundProducts(adaptFoundedProducts(data)));
    }, []);

    const filterProducts = async (inputValue) => {
        const products = await fetchProducts({ search: inputValue });

        return adaptFoundedProducts(products.data);
    };

    const promiseOptions = async (inputValue) => filterProducts(inputValue);

    return (
        <form action="#" className="header-input-form">
            <AsyncSelect
                menuPortalTarget={document.body}
                menuShouldBlockScroll
                cacheOptions
                styles={styles}
                defaultOptions={foundProducts}
                loadOptions={promiseOptions}
                components={{
                    DropdownIndicator,
                    Option: SelectOption,
                    Menu: SelectOptionContainer,
                }}
                onChange={handleCloseNavigationModal}
                onFocus={() => changeTopNavState({ transparent: false })}
                className="react-select-container"
                classNamePrefix="react-select"
            />
        </form>
    );
};

export default HeaderInput;
