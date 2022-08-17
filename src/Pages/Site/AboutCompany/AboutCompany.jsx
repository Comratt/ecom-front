import React, { useEffect } from 'react';
import classNames from 'classnames';
import { getImage } from 'API';
import './AboutCompany.css';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import { useLayout } from '../../../hooks/useLayout';

const AboutCompany = ({
    className,
}) => {
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
        'lib-about-company',
        className,
    );

    return (
        <div className={componentClasses}>
            <h2 className="lib-about-company header">
                Про компанію
            </h2>
            <div className="lib-about-company title">
                <div>
                    <h2>KOSTUMCHEK: Хто ми</h2>
                    <p>
                        KOSTUMCHEK - бренд чоловічого одягу з 15-річною історією, який успішно працює на українському ринку.
                        {' '}
                        <br />
                        Приємно познайомитися.
                    </p>
                </div>
            </div>
            <div className="lib-about-company images">
                <img className="lib-about-company img-about" src={getImage('about-2.jpeg')} alt="asd" />
                <p>
                    Всі ці роки компанія створює для покупців якісний і зручний чоловічий одяг для бізнесу та відпочинку з оптимальним поєднанням ціни і якості. Сьогодні роздрібна мережа KOSTUMCHEK налічує 5 магазинів і шоу-рум.
                    KOSTUMCHEK орієнтований на впевнених в собі чоловіків, які цінують якість, комфорт і живуть з відчуттям повноти життя.
                    KOSTUMCHEK - це одяг лідерів, які приймають рішення! Вони відкриті всьому новому, цінують час, свободу і незалежність, мають власну точкою зору.
                </p>
            </div>
            <article className="lib-about-company about">
                <p>
                    KOSTUMCHEK допомагає чоловікам створювати свій образ, щоб завжди бути на висоті.
                    Костюми та одяг KOSTUMCHEK створюється з урахуванням останніх тенденцій моди, з використанням високотехнологічних матеріалів і фурнітури на сучасному виробництві в Італії. Саме так досягається висока якість виробів і чудова посадка. Це є ще однією відмінною рисою бренду KOSTUMCHEK.
                    Ми пишаємося високою якістю нашої продукції, яке контролюємо на всіх етапах виробництва.
                </p>
            </article>
            <div className="lib-about-company images">
                <p>
                    Ми будуємо довгострокові відносини з нашими покупцями на основі кращих пропозицій, спеціальних заходів і привілеїв, якісного сервісу, представленого в магазинах мережі і широкого спектра додаткових послуг.
                    Ми дорожимо визнанням і довірою наших покупців і постійно дбаємо про те, щоб кожна покупка в магазині KOSTUMCHEK стала чимось особливим.
                    KOSTUMCHEK- це професійна команда.
                    Цілеспрямованість і впевненість дозволяють досягти нам кращих результатів і високого рівня обслуговування.
                </p>
                <img className="lib-about-company img-about" src={getImage('about-3.jpeg')} alt="asd" />
            </div>
            <div className="lib-about-company btn">
                <div className="lib-about-company btn-content">
                    <Link to="/" style={{ width: '200px' }}>
                        <Button variant="solid">
                            <span style={{ color: 'white' }}>В магазин</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutCompany;
