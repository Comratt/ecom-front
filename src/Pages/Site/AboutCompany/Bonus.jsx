import React, { useEffect } from 'react';
import classNames from 'classnames';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import './Delivery.css';
import { useLayout } from '../../../hooks/useLayout';

const Bonus = ({
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
        'lib-delivery-company',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="lib-delivery-company title">
                Бонуси при покупці
            </div>
            <ul className="lib-delivery-company variants">
                <li>Все дуже просто! При першій покупці з сайту ви отримуєте -10% на будь-яку товар.</li>
                <li>Відтепер від кожної вашої покупки, 5% від вартості замовлення буде відкладено на ваш рахунок (кешбек).</li>
                <li> На що може використати накопичені бонуси? Коштами (бонусами) ви можете сплатити до половини вартості товару, новинок й тих, що на розпродажі.</li>
                <p>
                    Про що слід пам'ятати?
                    Бонуси (кешбек) слід використувати до кінця поточного року.
                </p>
            </ul>
            <div className="lib-delivery-company btn">
                <div className="lib-delivery-company btn-content">
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

export default Bonus;
