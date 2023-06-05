import React, { useEffect } from 'react';
import classNames from 'classnames';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import './Delivery.css';
import { useLayout } from '../../../hooks/useLayout';

const Delivery = ({ className }) => {
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
    const componentClasses = classNames('lib-delivery-company', className);

    return (
        <div className={componentClasses}>
            <div className="lib-delivery-company title">Доставка та оплата</div>
            <p className="lib-delivery-company variants">Способи оплати</p>
            <p>
                Клієнт може оплатити своє замовлення будь-яким зручним для нього
                способом:
            </p>
            <p>
                – Готівкою чи картою безпосередньо в шоу-румі: м. Львів, вул. Івана
                Франка, 33 м. Чернівці, вул. Героїв Майдану 12
            </p>
            <p>
                – При замовленні від 2000грн безкоштовна доставка у зручне відділення будь-якої пошти.
            </p>
            <p>-Безкоштовна адресна доставка кур’єром при замовленні від 6000грн.</p>
            <p>(Ви нічим не ризикуєте, при умові, якщо костюм вам не підходе, зворотня доставка за наш рахунок)</p>
            <p>– Оплата може бути як по повній передоплаті, або по накладеним платежем, за вашим вибором.</p>
            <p>– Самовивіз з наших шоу-румів.</p>
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
