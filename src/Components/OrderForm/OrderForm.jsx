import React, { useState } from 'react';
import classNames from 'classnames';
import './OrderForm.css';
import PropTypes from 'prop-types';
import Logo from '../../Icons/Logo';

const OrderForm = (
    className,
) => {
    const componentClasses = classNames(
        'lib-order',
        className,
    );

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
                                    <span>Already have an account?</span>
                                    <a href="#">LogIn</a>
                                </div>
                            </div>
                            <div className="order__contact-form">
                                <input type="text" placeholder="Email" />
                                <div>
                                    <input id="checkbox-keep" type="checkbox" />
                                    <label htmlFor="checkbox-keep">Keep me up to date on news and exclusive offers</label>
                                </div>
                            </div>
                        </div>
                        <div className="order__shipping-address">
                            <h2>Shipping address (use the Latin alphabet)</h2>
                            <div className="order__address-name">
                                <input className="order__first-name" placeholder="First name" type="text" />
                                <input className="order__last-name" placeholder="Last name" type="text" />
                            </div>
                            <div className="order__location-info">
                                <input placeholder="Address" type="text" />
                                <input placeholder="Apartment, suite, etc. (optional)" type="text" />
                                <input placeholder="City (use the Latin alphabet)" type="text" />
                            </div>
                            <div className="order__country-name">
                                <select className="order__select" name="Country" id="">
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Poland">Poland</option>
                                </select>
                                <input className="order__postal" placeholder="Postal Code" type="text" />
                            </div>
                            <div className="order__phone">
                                <input placeholder="Phone" type="text" />
                            </div>
                            <div className="order__checkbox-save">
                                <input id="checkbox-save-info" type="checkbox" />
                                <label htmlFor="checkbox-save-info">Save this information for next time</label>
                            </div>
                            <div className="order__order-button">
                                <button className="order__btn-submit" type="submit">Continue shipping</button>
                                <div className="order__btn-return">
                                    <a href="#">Return to card</a>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="order__policy-lists">
                        <div className="order__privacy">
                            <a href="#">Privacy policy</a>
                        </div>
                        <div className="order__term">
                            <a href="#">Terms of service</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order__sidebar">
                <div className="order__sidebar-content">
                    <div className="order__item">
                        <div className="order__item-section">
                            <div className="order__item-image">
                                <img src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_0358_9f2d406a-b3cc-4a50-9f39-c79cb8aafb20_small.jpg?v=1622012823" alt="" />
                            </div>
                            <div className="order__item-description">
                                <div className="order__item-title">Knot detail dress</div>
                                <div className="order__item-size">XS</div>
                            </div>
                        </div>
                        <div className="order__item-price">
                            €65.00
                        </div>
                    </div>
                    <div className="order__discount">
                        <div className="order__discount-input">
                            <input placeholder="discount" type="text" />
                        </div>
                        <button className="order__discount-bnt">
                            Apply
                        </button>
                    </div>
                    <div className="order__summary">
                        <div className="order__subtotal">
                            <span>Subtotal</span>
                            <span>€245.00</span>
                        </div>
                        <div className="order__shipping">
                            <span>Shipping</span>
                            <span>Calculated at next step</span>
                        </div>
                    </div>
                    <div className="order__total">
                        <span>Total</span>
                        <span>€245.00</span>
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
