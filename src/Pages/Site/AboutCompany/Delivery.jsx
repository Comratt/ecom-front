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
                <b>Способи оплати</b>
            </p>
            <p>
                Ви можете здійснити оплату в інтернет-магазині PULSE наступними способами:
            </p>
            <p>
                Переказ на карту
            </p>
            <p>
                Ви можете здійснити повну оплату за допомогою переказу на карту за реквізитами.
            </p>
            <p>
                Оплата готівкою
                Ви можете оплатити товари при отриманні у відділенні служби доставки з передоплатою 200 грн . Обравши цей спосіб оплати, додатково оплачується комісія за накладений платіж ( 20 грн. + 2% від суми покупки).
            </p>
            <p className="lib-delivery-company variants">
                <b>Способи доставки</b>
            </p>
            <p>
                Під час оформлення замовлення на сайті можна вибрати один з варіантів доставки:
            </p>
            <p>
                Транспортна компанія «Нова Пошта»
                Доставка здійснюється у відділення «Нова Пошта» та у поштомати по всій Україні.
            </p>
            <p>
                Після того, як менеджер відправить ваше замовлення, ви отримаєте текстове повідомлення з номером експрес накладної (ттн). За цим номером ви зможете в будь-який момент відстежити ваше замовлення на офіційному сайті або у додатку компанії «Нова Пошта» і дізнатися, коли воно буде в відділенні.
            </p>
            <p>
                Самовивіз з магазину
                Ви можете оформити замовлення та забрати свою покупку в найближчому магазині PULSE в м.Чернівці.
            </p>
            <p>
                Інші варіанти доставки
                Адресна доставка кур'єром Нової Пошти.
            </p>
            <p><b>Важливо! Послуги за доставку товарів сплачує клієнт.</b></p>
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
