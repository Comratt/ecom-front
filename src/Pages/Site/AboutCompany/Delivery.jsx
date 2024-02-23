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
                <h2>СПОСОБИ ОПЛАТИ</h2>
                <div>Ви можете здійснити оплату в інтернет-магазині PULSE наступними способами: </div>
            </p>
            <ul>
                <li><b>Онлайн оплата на сайті</b></li>
                <p>
                    Зручно оплатити покупку на сайті можна за допомогою сервісу безпечних платежів Way for Pay. Ви можете здійснити повну оплату ввівши всі необхідні дані вашої картки та підтвердивши платіж.
                </p>
            </ul>
            <p className="lib-delivery-company variants">
                <h2>СПОСОБИ ДОСТАВКИ</h2>
                <div>
                    Під час оформлення замовлення на сайті можна вибрати один з варіантів доставки:
                </div>
            </p>
            <p>
                <ul>
                    <li>
                        <b>Транспортна компанія «Нова Пошта»</b>
                        <p>
                            Доставка здійснюється у відділення «Нова Пошта» та поштомати по всій Україні.
                            Після того, як менеджер відправить ваше замовлення, ви отримаєте текстове повідомлення з номером експрес накладної (ттн). За цим номером ви зможете в будь-який момент відстежити ваше замовлення на офіційному сайті або у додатку компанії «Нова Пошта» і дізнатися, коли воно буде в відділенні.
                        </p>
                    </li>
                    <li>
                        <b>Транспортна компанія «Нова Пошта»</b>
                        <p>
                            Доставка здійснюється у відділення «Нова Пошта» та поштомати по всій Україні.
                            Після того, як менеджер відправить ваше замовлення, ви отримаєте текстове повідомлення з номером експрес накладної (ттн). За цим номером ви зможете в будь-який момент відстежити ваше замовлення на офіційному сайті або у додатку компанії «Нова Пошта» і дізнатися, коли воно буде в відділенні.
                        </p>
                    </li>
                    <li>
                        <b>Міжнародна доставка</b>
                        <p>
                            Міжнародна доставка по всьому світу здійснюється службою "Нова Пошта" та "Укрпошта". Вартість і терміни обговорюються в індивідуальному порядку з менеджером інтернет магазину. Ми доставляємо товар в будь-яку країну світу крім Росії та Білорусі.
                        </p>
                    </li>
                    <li>
                        <b>Самовивіз з магазину</b>
                        <p>
                            Ви можете оформити замовлення та забрати свою покупку в найближчому магазині PULSE.
                        </p>
                    </li>
                    <li>
                        <b>Інші варіанти доставки</b>
                        <p>
                            Адресна доставка кур'єром Нової Пошти.
                        </p>
                    </li>
                </ul>
            </p>
            <h3><b>Важливо! Послуги за доставку товарів сплачує клієнт.</b></h3>
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
