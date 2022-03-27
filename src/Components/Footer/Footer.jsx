import React from 'react';
import classNames from 'classnames';
import './Footer.css';
import FooterInput from '../FooterInput/FooterInput';
import FooterLogo from '../../Icons/FooterLogo';
import { Accordion, AccordionItem } from '../Accordion';
import { useProduct } from '../../context/product/hooks/useProduct';

export const Footer = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-footer',
        className,
    );
    const { result, error, loading } = useProduct();

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
                            Скачайте приложение для iOSc
                        </div>
                        <div>
                            и получите ранний доступ
                        </div>
                        <div>
                            к новинкам
                        </div>
                    </div>
                    <div className="accordion-info">
                        <Accordion defaultIndex="0">
                            <AccordionItem label="Покупателям" index="0" isCollapsed>
                                <ul className="footer-list">
                                    <li>Доставка</li>
                                    <li>Возврат</li>
                                    <li>Как вибрать размер</li>
                                    <li>Вопроси и ответи</li>
                                    <li>Отзиви</li>
                                    <li>Связаться с нами</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem label="О Компании" index="2">
                                <ul className="footer-list">
                                    <li>О нас</li>
                                    <li>Устойчивое развитие</li>
                                    <li>Капсулы</li>
                                    <li>Пресса о нас</li>
                                    <li>Карьера</li>
                                    <li>Контакты</li>
                                    <li>Офис</li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="footer-title-info-client">
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
