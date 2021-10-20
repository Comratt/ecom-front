import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import { novaPoshtaAPI } from 'API';
import { getCartProducts } from 'Store/Modules/Cart/selectors';

import { Link } from 'Components/Link';
import { Logo, Cart, AccardionArrow } from 'Icons';
import { getFormattedPrice, emailRegExp, getValidationMessage } from 'Constants';

import './OrderForm.css';

export const OrderForm = (className) => {
    const [selectedCity, setSelectedCity] = useState('');
    const [showSideBar, setShowSideBar] = useState(false);
    const [cities, setCities] = useState({
        data: [],
        loading: true,
        error: null,
    });
    const [offices, setOffices] = useState({
        data: [],
        loading: true,
        error: null,
    });
    const cityNames = useMemo(() => cities.data.map(({ DescriptionRu }) => DescriptionRu),
        [cities]);
    const {
        register,
        handleSubmit,
        errors,
        setValue,
        setError,
        clearErrors,
    } = useForm({
        mode: 'onChange',
    });
    const componentClasses = classNames('lib-order', className);
    const products = useSelector(getCartProducts);
    const toggleSidebar = () => setShowSideBar((sideBar) => !sideBar);

    const onSubmit = (v) => {
        if (!selectedCity) {
            setError('city', { message: 'Enter city' });
        }
    };

    const totalPrice = ({ purePrice, quantity }) => getFormattedPrice(purePrice * quantity);
    const subtotalPrice = (p) => (
        getFormattedPrice(
            p.reduce((acc, { purePrice, quantity }) => acc + (purePrice * quantity), 0),
        )
    );

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        clearErrors('city');
    };

    useEffect(() => {
        register('city', { required: true });
    }, []);

    useEffect(() => {
        novaPoshtaAPI.post('', {
            modelName: 'Address',
            calledMethod: 'getCities',
        })
            .then(({ data: { data } }) => setCities({
                data,
                error: null,
                loading: false,
            }))
            .catch((e) => {
                setCities({
                    data: [],
                    error: e,
                    loading: false,
                });
            });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            novaPoshtaAPI.post('', {
                modelName: 'AddressGeneral',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityName: selectedCity,
                },
            })
                .then(({ data: { data } }) => setOffices({
                    data,
                    error: null,
                    loading: false,
                }))
                .catch((e) => {
                    setOffices({
                        data: [],
                        error: e,
                        loading: false,
                    });
                });
        }
    }, [selectedCity]);

    const height = 244 + (products.length * 100);

    return (
        <div className={componentClasses}>
            <div className="order__main">
                <div className="order__form">
                    <div className="order__svg">
                        <Logo />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="order__contact-info">
                            <div className="order__title">
                                <h2 className="order__title-name">Contact Information</h2>
                                <div className="order__log-in">
                                    <span className="order__log-in-text">
                                        Already have an account?
                                    </span>
                                    <a href="#">LogIn</a>
                                </div>
                            </div>
                            <div className="order__contact-form">
                                <input
                                    name="email"
                                    ref={register({ required: true, pattern: emailRegExp })}
                                    className={classNames('input', { 'field-error': errors?.email })}
                                    type="text"
                                    placeholder="Email"
                                />
                                {errors?.email && <p className="field-message__error">Enter valid email</p>}
                            </div>
                        </div>
                        <div className="order__shipping-address">
                            <h2 className="order__shipping-address-title">
                                Shipping address (use the Latin alphabet)
                            </h2>
                            <div className="order__address-name">
                                <div className="order__contact-form">
                                    <input
                                        name="firstName"
                                        ref={register({
                                            required: true, maxLength: 20, minLength: 3,
                                        })}
                                        className={classNames('input order__fifty-to-fifty', { 'field-error': errors?.firstName })}
                                        placeholder="First name"
                                        type="text"
                                    />
                                    {errors?.firstName && <p className="field-message__error">Enter valid email</p>}
                                </div>
                                <div className="order__contact-form">
                                    <input
                                        name="lastName"
                                        ref={register({
                                            required: true, maxLength: 20, minLength: 3,
                                        })}
                                        className={classNames('input order__fifty-to-fifty lastName', { 'field-error': errors?.lastName })}
                                        placeholder="Last name"
                                        type="text"
                                    />
                                    {errors?.lastName && <p className="field-message__error">Enter valid email</p>}
                                </div>
                            </div>
                            <div className="order__contact-form">
                                <TextInput
                                    Component="input"
                                    className={classNames('input input__full-width', { 'field-error': errors?.city })}
                                    placeholder="Apartment, suite, etc. (optional)"
                                    type="text"
                                    options={cityNames}
                                    trigger=""
                                    regex="^[а-яА-Я0-9_-]+$"
                                    spacer=""
                                    disabled={cities.loading}
                                    passThroughEnter
                                    onSelect={handleCitySelect}
                                    onChange={(str = '') => {
                                        if (!str.length && !selectedCity) {
                                            return setError('city', { message: 'Enter city' });
                                        }
                                        clearErrors('city');
                                        setValue('city', str);
                                    }}
                                />
                                {errors?.city && <p className="field-message__error">Enter valid city</p>}
                            </div>
                            <div className="order__contact-form">
                                {!!offices.data.length && (
                                    <>
                                        <select
                                            name="warehouses"
                                            ref={register({ required: true })}
                                            className={classNames({ 'field-error': errors?.warehouses })}
                                        >
                                            <option disabled selected value="">Выберите отделение</option>
                                            {offices.data.map(({ DescriptionRu }) => (
                                                <option value={DescriptionRu}>
                                                    {DescriptionRu}
                                                </option>
                                            ))}
                                        </select>
                                        {errors?.warehouses && <p className="field-message__error">Выберите отделение</p>}
                                    </>
                                )}
                            </div>
                            <div className="order__phone">
                                <input
                                    name="phone"
                                    ref={register({ required: true, minLength: 10, maxLength: 13 })}
                                    className={classNames('input order__phone-input', { 'field-error': errors?.phone })}
                                    placeholder="Phone"
                                    type="text"
                                />
                                {errors?.phone && <p className="field-message__error">Введите номер телефона</p>}
                            </div>
                            <div className="order__contact-form-checkbox-block">
                                <input
                                    className="order__contact-form-checkbox"
                                    id="checkbox-save-info"
                                    type="checkbox"
                                />
                                <label className="label-btn" htmlFor="checkbox-save-info">
                                    Save this information for next time
                                </label>
                            </div>
                            <div className="order__order-button">
                                <button className="order__btn-submit" type="submit">
                                    Continue shipping
                                </button>
                                <div className="order__btn-return">
                                    <Link className="order__btn-return-link" to="/cart">
                                        Return to card
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                    <footer className="order__policy-lists">
                        <div className="order__privacy">
                            <a href="#">Privacy policy</a>
                        </div>
                        <div className="order__term">
                            <a href="#">Terms of service</a>
                        </div>
                    </footer>
                </div>
            </div>
            <div className="order__sidebar">
                <button className={classNames('order__sidebar-toggle', { hide: !showSideBar })} onClick={toggleSidebar}>
                    <div className="order__sidebar-toggle__wrap">
                        <span className="sidebar-toggle__wrap-span">
                            <Cart fill="var(--color-accent)" width={21} height={20} />
                            <span>
                                {`${showSideBar ? 'Hide' : 'Show'} order summary`}
                            </span>
                            <AccardionArrow
                                fill="var(--color-accent)"
                                width={21}
                                height={20}
                                style={{ transform: `rotate(${showSideBar ? '180' : '0'}deg)` }}
                            />
                        </span>
                        <span className="order__total-amount">
                            {subtotalPrice(products)}
                        </span>
                    </div>
                </button>
                <div
                    className={classNames('order__sidebar-content', { hide: showSideBar })}
                    style={{ height: showSideBar ? height : 0 }}
                >
                    {products.map((product) => (
                        <div key={`${product.id}-${product.size}-${product.color}`} className="order__item">
                            <div className="order__item-section">
                                <div className="order__item-image">
                                    <div className="cart-badge">{product.quantity}</div>
                                    <img
                                        src={product.image}
                                        alt=""
                                    />
                                </div>
                                <div className="order__item-description">
                                    <div className="order__item-title">{product.name}</div>
                                    <div className="order__item-size">{product.size}</div>
                                </div>
                            </div>
                            <div className="order__item-price">{totalPrice(product)}</div>
                        </div>
                    ))}
                    <div className="order__discount">
                        <div className="order__discount-input-block">
                            <input
                                className="input order__discount-input"
                                placeholder="Discount code"
                                type="text"
                            />
                        </div>
                        <div className="order__discount-btn-block">
                            <button className="order__discount-bnt">Apply</button>
                        </div>
                    </div>
                    <div className="order__summary">
                        <div className="order__subtotal">
                            <span className="order__aside-text">Subtotal</span>
                            <span className="order__subtotal-amount">{subtotalPrice(products)}</span>
                        </div>
                        <div className="order__shipping">
                            <span className="order__aside-text">Shipping</span>
                            <span className="order__aside-hint">Calculated at next step</span>
                        </div>
                    </div>
                    <div className="order__total">
                        <span>Total</span>
                        <span className="order__total-amount">{subtotalPrice(products)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderForm.propTypes = {
    className: PropTypes.string,
};

OrderForm.defaultProps = {
    className: '',
};