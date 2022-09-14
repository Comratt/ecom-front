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
                Про наш магазин
            </h2>
            <div className="lib-about-company title">
                <div>
                    <h2>PULSE: Хто ми</h2>
                    <p>
                        PULSE - це модний бренд, команда професіоналів та величезна спільнота дівчат, закоханих у моду. Бренд представлений на ринку з 2010 року і в нас понад 10 тисяч задоволених клієнтів.
                        {' '}
                        <br />
                        Практично кожна дівчина знає, як складно буває вибрати та купити жіночий одяг.
                    </p>
                </div>
            </div>
            <div className="lib-about-company images">
                <img className="lib-about-company img-about" src={getImage('about-2.jpeg')} alt="asd" />
                <p>
                    Широкий асортимент товару в інтернет-магазині жіночого одягу PULSE дозволить створити повноцінний образ для будь-якого приводу – повсякденний аутфіт, святковий захід або розкішний вечірній лук.
                    PULSE - це про різноманітність. До вподоби oversize чи приталені речі? Ми ретельно плануємо нашу колекцію, щоб задовольнити всі ваші потреби.
                </p>
            </div>
            <article className="lib-about-company about">
                <p>
                    У нас Ви знайдете речі, які ідеально підкреслять вашу красу. Адже, ми намагаємося зробити щасливою і впевненою кожну дівчину. Більше у вас не виникне питання ”Що одягнути?” — самостійно складіть свій базовий гардероб або скористайтеся готовою капсулою та радійте щодня стильним образам.
                </p>
            </article>
            <div className="lib-about-company images">
                <p>
                    Зручний каталог з різними фільтрами за ціною, розміром, кольором та проста навігація сайтом, дозволяють знайти ту саму річ, яка гармонійно доповнить гардероб або кардинально змінить ваш стиль. Брендовий жіночий одяг в інтернет-магазині «Pulse» вирізняється високою якістю, ідеальною посадкою та широкою розмірною сіткою. Ми змінюємось і ростемо щодня для Вас. PULSE– це бренд, створений підкреслити твою унікальність.
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
