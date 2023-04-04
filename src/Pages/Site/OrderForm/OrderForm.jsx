import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import TextInput from 'react-autocomplete-input';
import { useAsyncCallback } from 'react-async-hook';
import 'react-autocomplete-input/dist/bundle.css';

import { novaPoshtaAPI } from 'API';
import { getCartProducts, getCartNotes, getCartDiscount } from 'Store/Modules/Cart/selectors';
import { getUser } from 'Store/Modules/LocalSettings/selectors';
import { clearCart, addDiscount, removeDiscount } from 'Store/Modules/Cart/cartActions';
import OrderService from 'Services/OrderService';
import PromoCodeService from 'Services/PromoCodeService';
import { useScript } from 'hooks/useScript';

import { Link } from 'Components/Link';
import { CommonInput } from 'Components/CommonInput';
import Cart from 'Icons/Cart';
import AccardionArrow from 'Icons/AccardionArrow';
import Close from 'Icons/Close';
import {
    getFormattedPrice,
    emailRegExp,
    PAYMENT_ONLINE,
    PAYMENT_NP,
    PAYMENT_ONLINE_FAILURE,
    WAYFORPAY_MERCHANT, WAYFORPAY_WEBSITE,
} from 'Constants';

import './OrderForm.css';
import { useHistory } from 'react-router-dom';
import Button from '../../../Components/Button/Button';
import { Title } from '../../../Components/Title';
import { clearFilters } from '../../../Store/Modules/Filters/filtersActions';
import { getMerchantSignature } from '../../../Helpers';

export const OrderForm = (className) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const user = useSelector(getUser);
    const history = useHistory();

    const {
        execute: discountExecute,
        loading: discountLoading,
        error: discountError,
    } = useAsyncCallback(PromoCodeService.getByName, []);

    const products = useSelector(getCartProducts);
    const orderNotes = useSelector(getCartNotes);
    const discountPromo = useSelector(getCartDiscount);
    const [formLoading, setFormLoading] = useState(false);
    const [onlinePayment, setOnlinePayment] = useState(false);
    const [selectedCity, setSelectedCity] = useState('');
    const [showSideBar, setShowSideBar] = useState(false);
    const [discountValue, setDiscount] = useState('');
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
            paymentStatus: '1',
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
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues,
    });
    const shippingCity = watch('shippingCity');
    const areaName = useMemo(() => cities.data.find(({ Description }) => shippingCity === Description)?.AreaDescription, [cities, shippingCity]);
    const componentClasses = classNames('lib-order', className);
    const toggleSidebar = () => setShowSideBar((sideBar) => !sideBar);

    const handleGoNextPage = () => {
        history.push('/orderfinaly');
    };

    const onDiscountSubmit = () => (
        discountExecute(discountValue)
            .then(({ data }) => dispatch(addDiscount({
                id: data.promocodes_id,
                name: data.promocode_name,
                price: data.promocode_price,
                prefix: data.promocode_prefix,
            })))
    );

    const subtotalPrice = (p) => (
        p.reduce((acc, { purePrice, quantity, discount = 0 }) => (
            acc + ((purePrice - discount) * quantity)
        ), 0)
    );

    const orderSubmit = (formInfo) => OrderService.store({
        ...formInfo,
        products: products?.map((product) => ({
            ...product,
            purePrice: product?.purePrice - (product?.discount || 0),
        })),
        comment: orderNotes,
        areaName,
        status_id: 1,
        paymentStatus: +formInfo.paymentStatus === PAYMENT_ONLINE
            ? PAYMENT_ONLINE_FAILURE
            : PAYMENT_NP,
        discount: discountPromo?.name
            ? {
                ...discountPromo,
                // eslint-disable-next-line no-nested-ternary
                total: !discountPromo?.name
                    ? 0
                    // eslint-disable-next-line max-len
                    : discountPromo?.prefix ? (subtotalPrice(products) / 100) * discountPromo?.price : discountPromo?.price,
            }
            : null,
    });

    const onSubmit = async (formInfo) => {
        if (!selectedCity || !areaName) {
            return setError('shippingCity', { message: 'Введіть місто' });
        }
        setFormLoading(true);
        try {
            const order = await orderSubmit(formInfo);

            if (+formInfo.paymentStatus === PAYMENT_ONLINE) {
                const merchantSignature = getMerchantSignature({ ...formInfo, products }, order);
                const productNames = products?.map((val) => val?.name);
                const productQuantity = products?.map((val) => val?.quantity);
                const productPrices = products?.map((val) => val?.purePrice);
                // eslint-disable-next-line max-len
                const productAmount = products?.reduce((acc, val) => acc + +val?.purePrice, 0).toFixed(2);
                const body = {
                    merchantAccount: WAYFORPAY_MERCHANT,
                    merchantDomainName: WAYFORPAY_WEBSITE,
                    authorizationType: 'SimpleSignature',
                    merchantSignature,
                    orderReference: order?.order_id,
                    orderDate: new Date(order.created_at).getTime() / 1000,
                    amount: productAmount,
                    currency: 'UAH',
                    productName: productNames,
                    productPrice: productPrices,
                    productCount: productQuantity,
                    clientFirstName: formInfo?.firstName,
                    clientLastName: formInfo?.lastName,
                    clientEmail: formInfo?.email,
                    clientPhone: formInfo?.phone,
                    language: 'UA',
                };
                const wayforpay = new window.Wayforpay();

                const resp = await wayforpay?.run(body,
                    (response) => {
                        console.log(response);
                        OrderService.changeStatus(order?.order_id, 2)
                            .then(() => {
                                setFormLoading(false);
                                dispatch(clearCart());
                                alert.success({ name: 'Дякуємо! Замовлення успішно оформлене.' });
                                handleGoNextPage();
                            })
                            .catch((e) => {});
                    },
                    (response) => {
                        console.log('error', response);
                        setFormLoading(false);
                        // eslint-disable-next-line max-len
                        const totalPrice = products?.reduce((acc, val) => acc + (val?.purePrice * val?.quantity), 0);
                        const items = products?.map((product) => ({
                            item_name: product.name,
                            item_id: product.id,
                            price: product.purePrice,
                            item_variant: product.color,
                            item_variant2: product.size,
                            quantity: product.quantity,
                        }));

                        window.dataLayer?.push({ ecommerce: null });
                        window.dataLayer?.push({
                            event: 'purchase',
                            ecommerce: {
                                transaction_id: response?.order_id,
                                value: totalPrice,
                                currency: 'UAH',
                                items,
                            },
                        });
                        alert.error({ name: 'Упсс... Щось пішло не так з оплатою.' });
                    },
                    (response) => {
                        console.log('pending', response);
                    });

                console.log(resp);
            } else {
                setFormLoading(false);
                dispatch(clearCart());
                alert.success({ name: 'Дякуємо! Замовлення успішно оформлене.' });
                handleGoNextPage();
            }
        } catch (e) {
            setFormLoading(false);
            alert.error({ name: 'Упсс... Щось пішло не так з оформленням Вашого замовлення.' });
        }
    };

    const totalPrice = ({ purePrice, quantity, discount }) => {
        if (discount) {
            return getFormattedPrice((purePrice - discount) * quantity);
        }

        return getFormattedPrice(purePrice * quantity);
    };
    const subtotalWithDiscountPrice = (price) => {
        // eslint-disable-next-line
        const discountFromPromo = !discountPromo?.name ? 0 : discountPromo?.prefix ? (price / 100) * discountPromo?.price : discountPromo?.price;

        return getFormattedPrice(price - discountFromPromo);
    };

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        clearErrors('shippingCity');
    };

    useScript('https://secure.wayforpay.com/server/pay-widget.js', 'widget-wfp-script');

    useEffect(() => {
        const script = document.querySelector('#widget-wfp-script');

        setOnlinePayment(false);

        script.addEventListener('load', () => {
            setOnlinePayment(true);
        });
        window.addEventListener('message', (e) => {
            if (e.data === 'WfpWidgetEventClose') {
                setFormLoading(false);
            }
        }, false);
    }, []);

    useEffect(() => {
        register('shippingCity', { required: true });
        dispatch(clearFilters());

        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (products && products?.length) {
            const items = products.map((product) => ({
                item_name: product?.name,
                item_id: product?.id,
                price: product?.purePrice,
                item_variant: product?.color,
                item_variant2: product?.size,
                quantity: product?.quantity,
            }));

            window.dataLayer?.push({ ecommerce: null });
            window.dataLayer?.push({
                event: 'begin_checkout',
                ecommerce: {
                    items,
                },
            });
        }
    }, [products]);

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
                        <h1>KOSTUMCHEK</h1>
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
                                    ref={register({ pattern: emailRegExp })}
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
                            <div className="radio-toolbar">
                                <div>
                                    <input
                                        className="option-input radio"
                                        type="radio"
                                        id="payment-status-1"
                                        name="paymentStatus"
                                        ref={register({ required: true })}
                                        value="1"
                                        defaultChecked
                                    />
                                    <label htmlFor="payment-status-1">Оплата через Нову пошту</label>
                                </div>
                                <div>
                                    <input
                                        className="option-input radio"
                                        type="radio"
                                        disabled={!onlinePayment}
                                        id="payment-status-2"
                                        name="paymentStatus"
                                        ref={register({ required: true })}
                                        value="2"
                                    />
                                    <label htmlFor="payment-status-2">Оплата онлайн</label>
                                </div>
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
                            {subtotalWithDiscountPrice(subtotalPrice(products))}
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
                        {discountPromo?.name ? (
                            <div className="order__discount-with_promo">
                                <Title type={4}>
                                    Промокод застосований:
                                    {' '}
                                    {parseInt(discountPromo?.price, 10)}
                                    {discountPromo?.prefix ? '%' : '₴'}
                                </Title>
                                <button onClick={() => dispatch(removeDiscount())} type="button">
                                    <Close width={20} height={20} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="order__discount-input-block">
                                    <input
                                        value={discountValue}
                                        onChange={({ target: { value } }) => setDiscount(value)}
                                        name="discount"
                                        className={classNames('input order__discount-input', { 'field-error': discountError })}
                                        placeholder="Промокод"
                                        type="text"
                                    />
                                    {discountError && <p className="field-message__error">Невірний промокод</p>}
                                </div>
                                <div className="order__discount-btn-block">
                                    <Button
                                        loading={discountLoading}
                                        className="order__discount-bnt"
                                        onClick={onDiscountSubmit}
                                    >
                                        Застосувати
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="order__summary">
                        <div className="order__subtotal">
                            <span className="order__aside-text">Всього</span>
                            <span className="order__subtotal-amount">{getFormattedPrice(subtotalPrice(products))}</span>
                        </div>
                        {discountPromo?.name && (
                            <div className="order__subtotal">
                                <span className="order__aside-text">Знижка</span>
                                <span className="order__subtotal-amount">
                                    -
                                    {parseInt(discountPromo?.price, 10)}
                                    {discountPromo?.prefix ? '%' : '₴'}
                                </span>
                            </div>
                        )}
                        <div className="order__shipping">
                            <span className="order__aside-text">Доставка</span>
                            <span className="order__aside-hint">Нова пошта</span>
                        </div>
                    </div>
                    <div className="order__total">
                        <span>До оплати</span>
                        <span className="order__total-amount">{subtotalWithDiscountPrice(subtotalPrice(products))}</span>
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
