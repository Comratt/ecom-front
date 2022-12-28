import React from 'react';
import classNames from 'classnames';
import './Footer.css';
import FooterLogo from 'Icons/FooterLogo';
import Facebook from 'Icons/Facebook';
import Instagram from 'Icons/Instagram';
import Telegram from 'Icons/Telegram';
import Viber from 'Icons/Viber';
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
                                </ul>
                            </AccordionItem>
                            <AccordionItem label="Про компанію" index="2">
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
                        <div className="footer-title-info">
                            Покупцям
                        </div>
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
                        </ul>
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
                        </ul>
                    </div>
                    <div>
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
                </div>
            </div>
        </footer>
    );
};
