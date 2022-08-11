import React, { useEffect } from 'react';
import classNames from 'classnames';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import './Returns.css';
import { useLayout } from '../../../hooks/useLayout';

const Returns = ({
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
        'lib-return-company',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="lib-return-company title">
                Обмін та повернення
            </div>
            <p className="lib-return-company title-2">
                <b>Обмін</b>
            </p>
            <p>
                При необхідності Ви можете обміняти товар на іншу модель, колір чи розмір.
            </p>
            <p>
                Товари, які обмінюються, не повинні бути пошкодженими або зношеними. Усі оригінальні етикетки та ярлики повинні залишитися.

            </p>
            <p>
                Після отримання Вашої посилки ми перевіряємо, в якому стані знаходяться товари, перед тим, як здійснювати їх обмін.
            </p>
            <p className="lib-return-company title-2">
                <b>Умови повернення</b>
            </p>
            <p>
                Ви можете повернути товар протягом 14 днів, якщо він не підійшов, лише у випадку збереження бірки, цілісності і товарного вигляду.
            </p>
            <p>
                Замовляючи у нас, ви нічим не ризикуєте.
            </p>
            <p>
                Послугу за повернення товару оплачує клієнт.
            </p>
            <p className="lib-return-company title-2">
                <b> Повернення коштів</b>
            </p>
            <p>
                Термін повернення коштів може становити 1-2 робочих днів після отримання повернутих Вами товарів на наш склад. Після перевірки їхнього стану ми повернемо Вам їхню вартість.
            </p>
            <div className="lib-return-company btn">
                <div className="lib-return-company btn-content">
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

export default Returns;
