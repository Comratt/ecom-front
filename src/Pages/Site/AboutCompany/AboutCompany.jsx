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
                    <h2>LANCASTER: Хто ми</h2>
                    <p>
                        LANCASTER - бренд чоловічого одягу з 15-річною історією, який успішно працює на українському ринку.
                        {' '}
                        <br />
                        Приємно познайомитися.
                    </p>
                </div>
            </div>
            <div className="lib-about-company images">
                <img className="lib-about-company img-about" src={getImage('about-2.jpg')} alt="asd" />
                <p>
                    Всі ці роки компанія створює для покупців якісний і зручний чоловічий одяг для бізнесу та відпочинку з оптимальним поєднанням ціни і якості. Сьогодні роздрібна мережа LANCASTER налічує 5 магазинів і шоу-рум.
                    LANCASTER орієнтований на впевнених в собі чоловіків, які цінують якість, комфорт і живуть з відчуттям повноти життя.
                    LANCASTER - це одяг лідерів, які приймають рішення! Вони відкриті всьому новому, цінують час, свободу і незалежність, мають власну точкою зору.
                </p>
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
