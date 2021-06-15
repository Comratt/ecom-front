import React, { useState } from 'react';
import classNames from 'classnames';
import './OrderForm.css';
import PropTypes from 'prop-types';
import Logo from '../../Icons/Logo';

const OrderForm = (className) => {
    const componentClasses = classNames('lib-order', className);

    return (
        <div className={componentClasses}>
            <div className="order__main">
                <div className="order__form">
                    <div className="order__svg">
                        <Logo />
                    </div>
                    <form action="#">
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
                                <input className="input" type="text" placeholder="Email" />
                                <div className="order__contact-form-checkbox-block">
                                    <input
                                        className="order__contact-form-checkbox"
                                        id="checkbox-keep"
                                        type="checkbox"
                                    />
                                    <label className="label-btn" htmlFor="checkbox-keep">
                                        Keep me up to date on news and exclusive offers
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="order__shipping-address">
                            <h2 className="order__shipping-address-title">
                                Shipping address (use the Latin alphabet)
                            </h2>
                            <div className="order__address-name">
                                <input
                                    className="input order__fifty-to-fifty"
                                    placeholder="First name"
                                    type="text"
                                />
                                <input
                                    className="input order__fifty-to-fifty"
                                    placeholder="Last name"
                                    type="text"
                                />
                            </div>
                            <div className="order__location-info">
                                <input className="input" placeholder="Address" type="text" />
                                <input
                                    className="input"
                                    placeholder="Apartment, suite, etc. (optional)"
                                    type="text"
                                />
                                <input
                                    className="input"
                                    placeholder="City (use the Latin alphabet)"
                                    type="text"
                                />
                            </div>
                            <div className="order__country-name">
                                <select className="order__fifty-to-fifty" name="Country" id="">
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Poland">Poland</option>
                                </select>
                                <input
                                    className="input order__fifty-to-fifty"
                                    placeholder="Postal Code"
                                    type="text"
                                />
                            </div>
                            <div className="order__phone">
                                <input
                                    className="input order__phone-input"
                                    placeholder="Phone"
                                    type="text"
                                />
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
                                    <a className="order__btn-return-link" href="#">
                                        Return to card
                                    </a>
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
                <div className="order__sidebar-content">
                    <div className="order__item">
                        <div className="order__item-section">
                            <div className="order__item-image">
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_0358_9f2d406a-b3cc-4a50-9f39-c79cb8aafb20_small.jpg?v=1622012823"
                                    alt=""
                                />
                            </div>
                            <div className="order__item-description">
                                <div className="order__item-title">Knot detail dress</div>
                                <div className="order__item-size">XS</div>
                            </div>
                        </div>
                        <div className="order__item-price">€65.00</div>
                    </div>
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
                            <span className="order__subtotal-amount">€245.00</span>
                        </div>
                        <div className="order__shipping">
                            <span className="order__aside-text">Shipping</span>
                            <span className="order__aside-hint">Calculated at next step</span>
                        </div>
                    </div>
                    <div className="order__total">
                        <span>Total</span>
                        <span className="order__total-amount">€245.00</span>
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

export default OrderForm;
