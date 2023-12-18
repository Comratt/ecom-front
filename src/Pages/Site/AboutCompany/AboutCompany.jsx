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
                    <h2>Інтернет-магазин Paparot</h2>
                    <p>
                        Ласкаво просимо в світ стилю, елегантності та неперевершеного комфорту - ласкаво просимо в інтернет-магазин Paparot! Ми є пишними виробниками та представниками власного бренду, присвяченого творенню вишуканих та стильних виробів для сучасних жінок.
                        {' '}
                        <br />
                        Приємно познайомитися.
                    </p>
                </div>
            </div>
            <div className="lib-about-company images">
                <img className="lib-about-company img-about" src={getImage('about-2.webp')} alt="Paparot about" />
                <p>
                    У Paparot ми створюємо не просто одяг, а втілення вашої індивідуальності та неповторності. Наша місія полягає в тому, щоб допомогти кожній жінці виражати себе через стиль та надавати їй впевненість у своїй неперевершеності.
                </p>
            </div>
            <article className="lib-about-company about">
                <p>
                    Ми пишаємося тим, що всі наші вироби створені власноруч. Від ідеї та дизайну до виробництва - кожен етап відбувається в наших власних майстернях, де ми об'єднуємо найкращі традиції та новаторські технології для того, щоб кожен наш виріб був вишуканим та якісним.
                </p>
            </article>
            <div className="lib-about-company images">
                <p>
                    Безкоштовна Доставка по Україні:
                    У Paparot ми прагнемо зробити ваші покупки приємними та зручними. Тому ми раді надати нашим клієнтам безкоштовну доставку по всій території України. Незалежно від того, де ви знаходитесь, ваші улюблені вироби від Paparot доставляться прямо до вашого дому без додаткових витрат.
                    Ми завжди прагнемо до вдосконалення, слухаємо ваші побажання та враховуємо їх у кожній новій колекції. Paparot - це не просто магазин, це спільнота стильних та вишуканих жінок, які обирають найкраще.
                    Оберіть Paparot, оберіть стиль та комфорт разом з нами. Дякуємо, що обираєте нас!
                </p>
                <img className="lib-about-company img-about" src={getImage('about-3.webp')} alt="Paparot about women" />
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
