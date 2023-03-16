import React, { useEffect } from 'react';
import Phone from '../../../Icons/Phone';
import './Contacts.css';
import classNames from 'classnames';
import { useLayout } from '../../../hooks/useLayout';

const Contacts = ({ className }) => {
    const { initTopNavState, initLayoutState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: true,
            transparent: false,
            showLogo: true,
        });

        initLayoutState({
            className: 'login-page',
        });

        window.scrollTo(0, 0);
    }, []);
    const componentClasses = classNames(
        'lib-contact-company',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="contacts-container__logo">
                <Phone width={24} fill="var(--color-accent)" />
                <h2>Телефонуй нам</h2>
                <p>+380 50 660 7097</p>
                <p>пн-пт 09:00 — 21:00  сб-нд 09:00 — 19:00</p>
                <p>Тобі потрібна служба підтримки? Наша команда готова відповісти на запитання про роботу і товари інтернет-магазину KOSTUMCHEK. Не соромся зв'язатися з нами по телефону.</p>
            </div>
        </div>
    );
};

export default Contacts;
