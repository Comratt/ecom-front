import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import { novaPoshtaAPI } from 'API';
import { getCartProducts, getCartNotes } from 'Store/Modules/Cart/selectors';
import { getUser } from 'Store/Modules/LocalSettings/selectors';
import { clearCart } from 'Store/Modules/Cart/cartActions';
import OrderService from 'Services/OrderService';

import { Link } from 'Components/Link';
import LoginBtn from 'Components/Buttons/LoginBtn/LoginBtn';
import { CommonInput } from 'Components/CommonInput';
import { Logo, Cart, AccardionArrow } from 'Icons';
import { getFormattedPrice, emailRegExp } from 'Constants';

import './OrderForm.css';
import Button from '../../../Components/Button/Button';

export const OrderForm = (className) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const user = useSelector(getUser);
    const products = useSelector(getCartProducts);
    const orderNotes = useSelector(getCartNotes);
    const [formLoading, setFormLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [showSideBar, setShowSideBar] = useState(false);
    const [discount, setDiscount] = useState({
        data: 0,
        loading: false,
        error: null,
    });
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
    const defaultValues = useMemo(() => {
        if (Object.keys(user).length) {
            return ({
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                phone: user.phone,
            });
        }

        return {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
        };
    }, [user]);
    const cityNames = useMemo(() => cities.data.map(({ Description }) => Description),
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
        defaultValues,
    });
    const componentClasses = classNames('lib-order', className);
    const toggleSidebar = () => setShowSideBar((sideBar) => !sideBar);

    const onSubmit = (formInfo) => {
        if (!selectedCity) {
            return setError('shippingCity', { message: 'Введіть місто' });
        }
        setFormLoading(true);

        OrderService.store({
            ...formInfo,
            products: products?.map((product) => ({
                ...product,
                purePrice: product?.purePrice - (product?.discount || 0),
            })),
            comment: orderNotes,
            status_id: 1,
        })
            .then((response) => {
                setFormLoading(false);
                dispatch(clearCart());
                alert.success({ name: 'Дякуємо! Замовлення успішно оформлене.' });
            })
            .catch((error) => {
                setFormLoading(false);
                alert.error({ name: 'Упсс... Щось пішло не так з оформленням Вашого замовлення.' });
            });
    };

    const totalPrice = ({ purePrice, quantity, discount }) => {
        if (discount) {
            return getFormattedPrice((purePrice - discount) * quantity);
        }

        return getFormattedPrice(purePrice * quantity);
    };
    const subtotalPrice = (p) => (
        getFormattedPrice(
            p.reduce((acc, { purePrice, quantity, discount = 0 }) => (
                acc + ((purePrice - discount) * quantity)
            ), 0),
        )
    );

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        clearErrors('shippingCity');
    };

    useEffect(() => {
        register('shippingCity', { required: true });

        window.scrollTo(0, 0);
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

    const height = 300 + (products.length * 100);

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
                                <h2 className="order__title-name">Контактна інформація</h2>
                                {!user?.email && (
                                    <div className="order__log-in">
                                        <span className="order__log-in-text">
                                            Вже маєте акаунт?
                                        </span>
                                        <Link to="/login">Увійти</Link>
                                    </div>
                                )}
                            </div>
                            <div className="order__contact-form">
                                <CommonInput
                                    name="email"
                                    ref={register({ required: true, pattern: emailRegExp })}
                                    className={classNames('input input__full-width', { 'field-error': errors?.email })}
                                    type="text"
                                    placeholder="Ваш Email"
                                />
                                {errors?.email && <p className="field-message__error">Введіть коректний email</p>}
                            </div>
                        </div>
                        <div className="order__shipping-address">
                            <h2 className="order__shipping-address-title">
                                Адреса доставки
                            </h2>
                            <div className="order__address-name">
                                <div className="order__contact-form">
                                    <CommonInput
                                        name="firstName"
                                        ref={register({
                                            required: true, maxLength: 20, minLength: 2,
                                        })}
                                        className={classNames('input order__fifty-to-fifty', { 'field-error': errors?.firstName })}
                                        placeholder="Ім'я"
                                        type="text"
                                    />
                                    {errors?.firstName && <p className="field-message__error">Не залишайте поле порожнім</p>}
                                </div>
                                <div className="order__contact-form">
                                    <CommonInput
                                        name="lastName"
                                        ref={register({
                                            required: true, maxLength: 20, minLength: 2,
                                        })}
                                        className={classNames('input order__fifty-to-fifty lastName', { 'field-error': errors?.lastName })}
                                        placeholder="Прізвище"
                                        type="text"
                                    />
                                    {errors?.lastName && <p className="field-message__error">Не залишайте поле порожнім</p>}
                                </div>
                            </div>
                            <div className="order__contact-form">
                                <TextInput
                                    Component="input"
                                    className={classNames('input input__full-width', { 'field-error': errors?.shippingCity })}
                                    placeholder="Виберіть місто"
                                    type="text"
                                    options={cityNames}
                                    trigger=""
                                    regex="^[А-Яа-яєіІїЇЄщЩ-]+$"
                                    spacer=""
                                    disabled={cities.loading}
                                    passThroughEnter
                                    onSelect={handleCitySelect}
                                    onChange={(str = '') => {
                                        if (!str.length && !selectedCity) {
                                            return setError('shippingCity', { message: 'Не залишайте поле порожнім' });
                                        }
                                        clearErrors('shippingCity');
                                        setValue('shippingCity', str);
                                    }}
                                />
                                {errors?.shippingCity && <p className="field-message__error">Введіть місто</p>}
                            </div>
                            <div className="order__contact-form">
                                {!!offices.data.length && (
                                    <>
                                        <select
                                            name="shippingAddress"
                                            ref={register({ required: true })}
                                            className={classNames({ 'field-error': errors?.shippingAddress })}
                                        >
                                            <option disabled selected value="">Виберіть відділення</option>
                                            {offices.data.map(({ Description }) => (
                                                <option value={Description}>
                                                    {Description}
                                                </option>
                                            ))}
                                        </select>
                                        {errors?.shippingAddress && <p className="field-message__error">Не залишайте поле порожнім</p>}
                                    </>
                                )}
                            </div>
                            <div className="order__phone">
                                <CommonInput
                                    name="phone"
                                    ref={register({ required: true, minLength: 10, maxLength: 13 })}
                                    className={classNames('input order__phone-input', { 'field-error': errors?.phone })}
                                    placeholder="Номер телефону"
                                    type="text"
                                />
                                {errors?.phone && <p className="field-message__error">Введіть коректний номер</p>}
                            </div>
                            <div className="order__order-button">
                                <Button variant="solid" loading={formLoading}>
                                    Оформити замовлення
                                </Button>
                                <div className="order__btn-return">
                                    <Link className="order__btn-return-link" to="/cart">
                                        Назад у кошик
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                    <footer className="order__policy-lists">
                        <div className="order__privacy">
                            <a href="#">Політика конфіденційності</a>
                        </div>
                        <div className="order__term">
                            <a href="#">Умови обслуговування</a>
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
                                {`${showSideBar ? 'Сховати' : 'Показати'} підсумок`}
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
                        <Link to={`/products/${product.id}`} key={`${product.id}-${product.size}-${product.color}`} className="order__item">
                            <div className="order__item-section">
                                <div className="order__item-image">
                                    <div className="cart-badge">{product.quantity}</div>
                                    <img
                                        src={product.image}
                                        alt=""
                                    />
                                </div>
                                <span className="order__item-description">
                                    <div className="order__item-title">{product.name}</div>
                                    <div className="order__item-size">
                                        {'Розмір: '}
                                        {product.size}
                                    </div>
                                    <div className="order__item-size">
                                        {'Колір: '}
                                        {product.color}
                                    </div>
                                </span>
                            </div>
                            <div className="order__item-price-disc">
                                {!!product.discount && (
                                    <div className="order__item-price discount">
                                        {getFormattedPrice(product.purePrice * product.quantity)}
                                    </div>
                                )}
                                <div className="order__item-price">{totalPrice(product)}</div>
                            </div>
                        </Link>
                    ))}
                    <div className="order__discount">
                        <div className="order__discount-input-block">
                            <input
                                name="discount"
                                className={classNames('input order__discount-input', { 'field-error': discount.error })}
                                placeholder="Промокод"
                                type="text"
                            />
                            {discount.error && <p className="field-message__error">Невірний промокод</p>}
                        </div>
                        <div className="order__discount-btn-block">
                            <button className="order__discount-bnt">Застосувати</button>
                        </div>
                    </div>
                    <div className="order__summary">
                        <div className="order__subtotal">
                            <span className="order__aside-text">Всього</span>
                            <span className="order__subtotal-amount">{subtotalPrice(products)}</span>
                        </div>
                        <div className="order__shipping">
                            <span className="order__aside-text">Доставка</span>
                            <span className="order__aside-hint">Нова пошта</span>
                        </div>
                    </div>
                    <div className="order__total">
                        <span>До оплати</span>
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
