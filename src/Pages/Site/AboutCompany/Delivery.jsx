import React, { useEffect } from 'react';
import classNames from 'classnames';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import './Delivery.css';
import { useLayout } from '../../../hooks/useLayout';

const Delivery = ({
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
                Доставка та оплата
            </div>
            <p className="lib-delivery-company variants">
                <h3>Способи оплати</h3>
            </p>
            <p>
                <b>- Швидка доставка 1-2 дні</b>
            </p>
            <p><b>- Відправка в день замовлення до 21-00</b></p>
            <p>
                - Клієнт може оплатити своє замовлення будь-яким зручним для нього способом:
            </p>
            <p>
                – Накладний платіж: оплата за товар здійснюється безпосередньо
                при отримані на пошті. Відправляємо новою поштою за вказаним відділеням при оформленні замовлення.
            </p>
            <p> – При замовленні від 1500грн безкоштовна доставка у зручне відділення будь-якої пошти.</p>
            <p>
                – Безготівковий розрахунок: клієнт перераховує повну суму товару
                на надіслані реквізити. Після отримання перерахунку ми відправляєм
                замовлення.
            </p>
            <p>
                <b>Гарантія на товар 14 днів з моменту покупки</b>
            </p>
            <p className="lib-delivery-company variants">
                Способи доставки
            </p>
            <p>
                – Новою поштою на відділення.
            </p>
            <p>
                – Укр поштою на відділення.
            </p>
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

export default Delivery;
