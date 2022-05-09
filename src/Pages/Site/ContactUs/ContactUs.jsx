import React from 'react';
import './ContactUs.css';
import classNames from 'classnames';

const ContactUs = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-company_contact_us',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="lib-company_contact_us-content">
                <div>
                    <h2>Contact us</h2>
                    <div className="lib-company_contact_us">
                        Whether you have a question about your order or would
                        like some style tips, we’re happy to help.
                        Check out our FAQ section, but if you can't
                        find the answer you're looking for,
                        please get in touch. You may use our Customer
                        Form or contact us using one of the below options.
                    </div>
                    <div className="lib-company_contact_us-p">
                        <span className="lib-company_contact_us-mail-info">
                            E-mail:
                        </span>
                        <a href="mailto:name@email.com">friends@12storeez.com</a>
                    </div>
                    <div className="lib-company_contact_us-p">
                        <span className="lib-company_contact_us-mail-info">
                            Call us:
                        </span>
                        <a type="tel" href="tel:+1234567890">+44 330 027 2383</a>
                    </div>
                    <div className="lib-company_contact_us-p">
                        <h3>Chat with us:</h3>
                        <ul className="lib-company_contact_us-list-contact">
                            <li>
                                <a href="">WhatsApp </a>
                            </li>
                            <li>
                                <a href="">Telegram </a>
                            </li>
                            <li>
                                <a href="">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div className="lib-company_contact_us-p">
                        <span className="lib-company_contact_us-mail-info">Customer Care:</span>
                        <a type="tel" href="tel:+1234567890">+44 330 027 2383</a>
                        <div>Our Customer Care is available to help you 24/7.</div>
                    </div>
                    <div className="lib-company_contact_us-p">
                        For collaboration please contact: friends@12storeez.com.

                    </div>
                    <div className="lib-company_contact_us-p">
                        For PR and media enquiries please contact: pr@12storeez.com.
                    </div>
                    <div className="lib-company_contact_us-p">
                        If you have any other ideas or suggestions,
                        send them to idea@12storeez.com. We love hearing from you.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
