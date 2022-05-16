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
import { clearCart } from 'Store/Modules/Cart/cartActions';
import OrderService from 'Services/OrderService';

import { Link } from 'Components/Link';
import LoginBtn from 'Components/Buttons/LoginBtn/LoginBtn';
import { Logo, Cart, AccardionArrow } from 'Icons';
import { getFormattedPrice, emailRegExp, getValidationMessage } from 'Constants';

import './OrderForm.css';

export const OrderForm = (className) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [formLoading, setFormLoading] = useState(false);
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
    const orderNotes = useSelector(getCartNotes);
    const toggleSidebar = () => setShowSideBar((sideBar) => !sideBar);

    const onSubmit = (formInfo) => {
        if (!selectedCity) {
            return setError('shippingCity', { message: 'Enter city' });
        }
        setFormLoading(true);

        OrderService.store({
            ...formInfo,
            products,
            comment: orderNotes,
            status_id: 1,
        })
            .then((response) => {
                setFormLoading(false);
                dispatch(clearCart());
                alert.success({ name: 'Замовлення успішно оформлене!' });
            })
            .catch((error) => {
                setFormLoading(false);
                alert.error({ name: 'Помилка при оформленні замовлення!' });
            });
    };

    const totalPrice = ({ purePrice, quantity }) => getFormattedPrice(purePrice * quantity);
    const subtotalPrice = (p) => (
        getFormattedPrice(
            p.reduce((acc, { purePrice, quantity }) => acc + (purePrice * quantity), 0),
        )
    );

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        clearErrors('shippingCity');
    };

    useEffect(() => {
        register('shippingCity', { required: true });
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
                                <h2 className="order__title-name">Контактна інформація</h2>
                                <div className="order__log-in">
                                    <span className="order__log-in-text">
                                        Вже є аккаунт?
                                    </span>
                                    <a href="#">Увійти</a>
                                </div>
                            </div>
                            <div className="order__contact-form">
                                <input
                                    name="email"
                                    ref={register({ required: true, pattern: emailRegExp })}
                                    className={classNames('input', { 'field-error': errors?.email })}
                                    type="text"
                                    placeholder="Електронна пошта"
                                />
                                {errors?.email && <p className="field-message__error">Введіть дійсну адресу електронної пошти</p>}
                            </div>
                        </div>
                        <div className="order__shipping-address">
                            <h2 className="order__shipping-address-title">
                                Адреса доставки (використовуйте латинський алфавіт)
                            </h2>
                            <div className="order__address-name">
                                <div className="order__contact-form">
                                    <input
                                        name="firstName"
                                        ref={register({
                                            required: true, maxLength: 20, minLength: 3,
                                        })}
                                        className={classNames('input order__fifty-to-fifty', { 'field-error': errors?.firstName })}
                                        placeholder="Ім'я"
                                        type="text"
                                    />
                                    {errors?.firstName && (
                                        <p className="field-message__error">
                                            Введіть дійсну адресу електронної пошти
                                        </p>
                                    )}
                                </div>
                                <div className="order__contact-form">
                                    <input
                                        name="lastName"
                                        ref={register({
                                            required: true, maxLength: 20, minLength: 3,
                                        })}
                                        className={classNames('input order__fifty-to-fifty lastName', { 'field-error': errors?.lastName })}
                                        placeholder="Прізвище"
                                        type="text"
                                    />
                                    {errors?.lastName && <p className="field-message__error">Enter valid email</p>}
                                </div>
                            </div>
                            <div className="order__contact-form">
                                <TextInput
                                    Component="input"
                                    className={classNames('input input__full-width', { 'field-error': errors?.shippingCity })}
                                    placeholder="Квартира, люкс тощо (за бажанням)"
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
                                            return setError('shippingCity', { message: 'Enter city' });
                                        }
                                        clearErrors('shippingCity');
                                        setValue('shippingCity', str);
                                    }}
                                />
                                {errors?.shippingCity && <p className="field-message__error">Enter valid city</p>}
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
                                            {offices.data.map(({ DescriptionRu }) => (
                                                <option value={DescriptionRu}>
                                                    {DescriptionRu}
                                                </option>
                                            ))}
                                        </select>
                                        {errors?.shippingAddress && <p className="field-message__error">Виберіть відділення</p>}
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
                                {errors?.phone && <p className="field-message__error">Введіть номер телефону</p>}
                            </div>
                            <div className="order__contact-form-checkbox-block">
                                <input
                                    className="order__contact-form-checkbox"
                                    id="checkbox-save-info"
                                    type="checkbox"
                                />
                                <label className="label-btn" htmlFor="checkbox-save-info">
                                    Збережіть цю інформацію для наступного разу
                                </label>
                            </div>
                            <div className="order__order-button">
                                <LoginBtn
                                    className="order__btn-submit"
                                    text="Continue shipping"
                                    loading={formLoading}
                                />
                                <div className="order__btn-return">
                                    <Link className="order__btn-return-link" to="/cart">
                                        Повернутися до картки
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
                                placeholder="Код на знижку"
                                type="text"
                            />
                        </div>
                        <div className="order__discount-btn-block">
                            <button className="order__discount-bnt">Застосувати</button>
                        </div>
                    </div>
                    <div className="order__summary">
                        <div className="order__subtotal">
                            <span className="order__aside-text">Проміжний підсумок</span>
                            <span className="order__subtotal-amount">{subtotalPrice(products)}</span>
                        </div>
                        <div className="order__shipping">
                            <span className="order__aside-text">Доставка</span>
                            <span className="order__aside-hint">Розраховано на наступному кроці</span>
                        </div>
                    </div>
                    <div className="order__total">
                        <span>Всього</span>
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
