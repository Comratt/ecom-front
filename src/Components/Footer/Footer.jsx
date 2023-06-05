import React from 'react';
import classNames from 'classnames';
import './Footer.css';
import FooterLogo from 'Icons/FooterLogo';
import Facebook from 'Icons/Facebook';
import Instagram from 'Icons/Instagram';
import Telegram from 'Icons/Telegram';
import Viber from 'Icons/Viber';
import Visa from 'Icons/Visa';
import MasterCard from 'Icons/MasterCard';
import FooterInput from '../FooterInput/FooterInput';
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
                <div className="container-title">
                    <h1>KOSTUMCHEK</h1>
                </div>
                <div className="content-footer">
                    <div className="accordion-info">
                        <Accordion defaultIndex="0">
                            <AccordionItem label="Покупцям" index="1" isCollapsed>
                                <ul className="footer-list">
                                    <li>
                                        <Link to="/delivery">
                                            Доставка
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/returns">
                                            Повернення
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/bonus">
                                            Бонусна програма
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/contacts">
                                            Контакти
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            +380 50 660 7097
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            Kostumchek.pro@gmail.com
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem label="Ми в магазинах України" index="2" isCollapsed>
                                <ul className="footer-list">
                                    <li>
                                        <Link to="/">
                                            м.Чернівці,вул.Героїв Майдану 12
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            шоу-рум “Kostumchek”
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            м.Львів,вул.Івана-Франка 33
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            шоу-рум “Kostumchek”
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem label="Про компанію" index="3">
                                <ul className="footer-list">
                                    <li>
                                        <Link to="/aboutcompany">
                                            Про нас
                                        </Link>
                                    </li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="footer-title-info-client">
                        <ul className="footer-list">
                            <li>
                                <Link to="/delivery">
                                    <b className="footer-list-city">Ми в магазинах України</b>
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    м.Чернівці,вул.Героїв Майдану 12
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    <u>шоу-рум “Kostumchek”</u>
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    м.Львів,вул.Івана-Франка 33
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    <u>шоу-рум “Kostumchek”</u>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-title-info-client">
                        <ul className="footer-list">
                            <li>
                                <Link to="/delivery">
                                    Доставка і оплата
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    Повернення
                                </Link>
                            </li>
                            <li>
                                <Link to="/bonus">
                                    Бонусна програма
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacts">
                                    Контактна особа
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    ФОП Степанов Олександр Миколайович
                                    {' '}
                                    <br />
                                    М.Чернівці вул. Воробкевича 13
                                    {' '}
                                    <br />
                                    ІПН:3046114751
                                    {' '}
                                    <br />
                                    +380 (68) 807 12 47
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    Kostumchek.pro@gmail.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-title-info-client">
                        <ul className="footer-list">
                            <li>
                                <Link to="/delivery">
                                    Новини
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    Питання і відповіді
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    Подарункові сертифікати
                                </Link>
                            </li>
                            <li>
                                <Link to="/returns">
                                    Гарантія
                                </Link>
                            </li>
                        </ul>
                        <div className="footer-links">
                            <ul className="sidebar-social">
                                <li>
                                    <a className="sidebar-social__facebook" rel="noreferrer" target="_blank" href="https://www.facebook.com/Kostumchek/">
                                        <Facebook height="18" width="18" />
                                    </a>
                                </li>
                                <li>
                                    <a className="sidebar-social__instagram" rel="noreferrer" target="_blank" href="https://instagram.com/kostumchek_official?igshid=YmMyMTA2M2Y=">
                                        <Instagram height="18" width="18" />
                                    </a>
                                </li>
                                <li>
                                    <a className="sidebar-social__telegram" href="https://t.me/kostumchekofficial_bot">
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
                    <div className="footer-title-info-company">
                        <div className="footer-title-info">
                            Про компанію
                        </div>
                        <ul className="footer-list">
                            <li>
                                <Link to="/aboutcompany">
                                    Про нас
                                </Link>
                            </li>
                            <li>
                                <Visa style={{ marginLeft: '10px' }} />
                            </li>
                            <li>
                                <MasterCard style={{ marginLeft: '10px' }} />
                            </li>
                        </ul>
                    </div>
                    <div />
                </div>
            </div>
        </footer>
    );
};
