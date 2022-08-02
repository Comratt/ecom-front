import React from 'react';
import classNames from 'classnames';
import Button from '../../../Components/Button/Button';
import { Link } from '../../../Components/Link';
import './Delivery.css';

const Delivery = ({
    className,
}) => {
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
                Способи оплати
            </p>
            <p>
                Клієнт може оплатити своє замовлення будь-яким зручним для нього способом:
            </p>
            <p>
                – Готівка: оплата можлива безпосередньо в магазині 12 у м.Чернівці.
            </p>
            <p>
                – Накладний платіж: оплата за товар здійснюється безпосередньо
                при отримані на пошті. При такому способі оплати покупець додатково
                оплачує за пересилку грошей 20 грн + 2% від вартості товару (послуга Нової Пошти).
            </p>
            <p>
                – Безготівковий розрахунок: клієнт перераховує повну суму товару
                на карту Приватбанку. Після отримання перерахунку ми відправляєм
                замовлення. У такому випадку ви економите на пересилці коштів кур’єрською
                службою Нової Пошти.
            </p>
            <p className="lib-delivery-company variants">
                Способи доставки
            </p>
            <p>
                – Новою поштою на відділення
            </p>
            <p>
                – Адресна доставка Новою поштою до ваших дверей
                (якщо замовлення не вдається вручити за вказаною
                адресою з першого разу, кур’єр спробує зробити це ще раз.
                Якщо посилку не буде вручено з другої спроби,
                вона повертається до інтернет-магазину)
            </p>
            <p>
                – Самовивіз
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
