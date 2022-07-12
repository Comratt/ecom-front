import React from 'react';
import classNames from 'classnames';
import './Footer.css';
import FooterInput from '../FooterInput/FooterInput';
import FooterLogo from '../../Icons/FooterLogo';
import { Accordion, AccordionItem } from '../Accordion';
import { Title } from '../Title';
import {
    Facebook, Instagram, Telegram, Viber,
} from '../../Icons';

export const Footer = ({
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
                    <div className="footer-logo-content">
                        <div className="footer-logo">
                            <span className="logo-text">
                                12storeez
                            </span>
                        </div>
                        <div className="footer-logo-info">
                            Скачайте додаток для iOSc
                        </div>
                        <div>
                            і отримаєте ранній доступ
                        </div>
                        <div>
                            к новинкам
                        </div>
                    </div>
                    <div className="accordion-info">
                        <Accordion defaultIndex="0">
                            <AccordionItem label="Покупателям" index="1" isCollapsed>
                                <ul className="footer-list">
                                    <li>Доставка</li>
                                    <li>Повернення</li>
                                    <li>Як вибрати розмір</li>
                                    <li>Запитання та відповіді</li>
                                    <li>Відгуки</li>
                                    <li>Зв'язатися з нами</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem label="О Компании" index="2">
                                <ul className="footer-list">
                                    <li>Про нас</li>
                                    <li>Стійкий розвиток</li>
                                    <li>Капсули</li>
                                    <li>преса про нас</li>
                                    <li>Карьера</li>
                                    <li>Контакти</li>
                                    <li>Офіс</li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="footer-title-info-client">
                        <div className="footer-title-info">
                            Покупцям
                        </div>
                        <ul className="footer-list">
                            <li>Доставка</li>
                            <li>Повернення</li>
                            <li>Как вибрать размер</li>
                            <li>Вопроси и ответи</li>
                            <li>Отзиви</li>
                            <li>Связаться с нами</li>
                        </ul>
                    </div>
                    <div className="footer-title-info-company">
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
                        <FooterLogo
                            className="footer-logo-img"
                            width={100}
                        />
                        <div className="footer-form-input">
                            <FooterInput />
                        </div>
                        <div className="footer-links">
                            <ul className="sidebar-social">
                                <li>
                                    <a className="sidebar-social__facebook" href="#">
                                        <Facebook height="18" width="18" />
                                    </a>
                                </li>
                                <li>
                                    <a className="sidebar-social__instagram" href="#">
                                        <Instagram height="18" width="18" />
                                    </a>
                                </li>
                                <li>
                                    <a className="sidebar-social__telegram" href="#">
                                        <Telegram height="18" width="18" />
                                    </a>
                                </li>
                                <li>
                                    <a className="sidebar-social__viber" href="#">
                                        <Viber height="18" width="18" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
