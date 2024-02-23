import React from 'react';
import classNames from 'classnames';
import './Footer.css';
import Instagram from 'Icons/Instagram';
import Telegram from 'Icons/Telegram';
import Phone from 'Icons/Phone';
import Mail from 'Icons/Mail';
import User from 'Icons/User';
import { Link } from '../Link';
import { Accordion, AccordionItem } from '../Accordion';

export const Footer = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-footer',
        className,
    );

    return (
        <footer className={componentClasses}>
            <div className="container-footer">
                <div className="content-footer">
                    <div className="accordion-info">
                        <Accordion defaultIndex="0">
                            <AccordionItem label="Наш Сервіс" index="1" isCollapsed>
                                <ul className="footer-list">
                                    <li>
                                        <Link to="/delivery">
                                            Оплата і доставка
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/returns">
                                            Обмін і повернення
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem label="Про компанію" index="2">
                                <ul className="footer-list">
                                    <li>
                                        <Link to="/aboutcompany">
                                            Про Компанію
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="footer-title-info-client">
                        <div className="footer-title-info">
                            Наш Сервіс
                        </div>
                        <ul className="footer-list">
                            <li>
                                <Link to="/delivery">
                                    Оплата і доставка
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    Обмін і повернення
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection/15">
                                    Подарункові карти
                                </Link>
                            </li>
                            <li>
                                <Link to="/collection/16">
                                    Аксесуари
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-title-info-company">
                        <div className="footer-title-info">
                            Про компанію
                        </div>
                        <ul className="footer-list">
                            <li>
                                <Link to="/aboutcompany">
                                    Про Компанію
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="footer-links">
                            <div className="footer-title-info">
                                Контакти
                            </div>
                            <ul className="sidebar-social">
                                <li className="sidebar-social--items">
                                    <User width={18} fill="#7a6c64" />
                                    {' '}
                                    <span style={{ marginLeft: '10px' }}>Пн-Нд 09:00 — 19:00</span>
                                </li>
                                <li className="sidebar-social--items">
                                    <Phone width={18} fill="#7a6c64" />
                                    {' '}
                                    <a href="tel:+380963947792" style={{ marginLeft: '10px' }}>+38(096)3947792</a>
                                </li>
                                <li className="sidebar-social--items">
                                    <Mail width={18} fill="#7a6c64" />
                                    {' '}
                                    <a href="mailto:pulse.cv.ua@gmail.com" style={{ marginLeft: '10px' }}>pulse.cv.ua@gmail.com</a>
                                </li>
                                <li className="sidebar-social--items">
                                    <a className="sidebar-social__instagram" rel="noreferrer" target="_blank" href="https://www.instagram.com/pulse.cv/">
                                        <Instagram height="18" width="18" />
                                    </a>
                                    <span style={{ marginLeft: '10px' }}>INSTAGRAM</span>
                                </li>
                                <li className="sidebar-social--items">
                                    <a className="sidebar-social__telegram" rel="noreferrer" target="_blank" href="https://t.me/pulse_cv">
                                        <Telegram height="18" width="18" />
                                    </a>
                                    <span style={{ marginLeft: '10px' }}>TELEGRAM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
