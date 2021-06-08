import React from 'react';
import classNames from 'classnames';
import './Footer.css';
import FooterInput from '../FooterInput/FooterInput';

const Footer = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-footer',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="container-footer">
                <div className="content-footer">
                    <div>
                        <div className="footer-logo">
                            <span className="logo-text">
                                12storeez
                            </span>
                        </div>
                        <div className="footer-logo-info">
                            Скачайте приложение для iOSc
                        </div>
                        <div>
                            и получите ранний доступ
                        </div>
                        <div>
                            к новинкам
                        </div>
                    </div>
                    <div>
                        <div className="footer-title-info">
                            Покупателям
                        </div>
                        <ul className="footer-list">
                            <li>Доставка</li>
                            <li>Возврат</li>
                            <li>Как вибрать размер</li>
                            <li>Вопроси и ответи</li>
                            <li>Отзиви</li>
                            <li>Связаться с нами</li>
                        </ul>
                    </div>
                    <div>
                        <div className="footer-title-info">
                            О компании
                        </div>
                        <ul className="footer-list">
                            <li>О нас</li>
                            <li>Устойчивое развитие</li>
                            <li>Капсулы</li>
                            <li>Пресса о нас</li>
                            <li>Карьера</li>
                            <li>Контакты</li>
                            <li>Офис</li>
                        </ul>
                    </div>
                    <div>
                        <div className="footer-title-info">
                            Новости и style tips
                        </div>
                        <div>
                            <FooterInput />
                        </div>
                        <div className="footer-links">
                            <div className="items">Instagram</div>
                            <div className="items">Facebook</div>
                            <div className="items">Youtube</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
