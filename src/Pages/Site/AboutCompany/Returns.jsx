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
            <div className="lib-return-company title-2">
                <h1>ОБМІН Й ПОВЕРНЕННЯ</h1>
                <div>Не підійшов розмір? Ми можемо зробити обмін на інший розмір або інший товар!</div>
            </div>
            <div className="lib-return-company title-2">
                <h2>ЯК ЗДІЙСНИТИ ОБМІН РЕЧЕЙ</h2>
                <div>
                    Щоб обміняти товар необхідно повідомити про це менеджера зручним для вас способом (подзвонивши по номеру телефону +38 (096) 394 77 92, написавши нам у Instagram @pulse_cv або Telegram), щоб уточнити наявність бажаного розміру.

                    Після того, як менеджер підтвердив обмін, необхідно заповнити Бланк обміну та повернення та додати його до посилки-обмін.
                    {' '}
                </div>
            </div>
            <p className="lib-return-company title-2">
                <div>Відправте належно упаковані товари на адресу:</div>
                <div>
                    Місто: Чернівці, відділення Нової Пошти, №10
                    +38 (096) 394 77 92
                </div>
            </p>
            <div className="lib-return-company title-2">
                <h2>ПОВЕРНЕННЯ</h2>
                <div>
                    Необхідно здійснити повернення? Без проблем!
                    Ви можете повернути товар протягом 14 днів з моменту отримання посилки (враховуючи кілька днів на зворотню доставку).
                </div>
            </div>
            <h3 className="lib-return-company title-2">ВАЖЛИВО! Послуги за доставки повернення товару сплачує клієнт. Писилка, доставка якої не сплачена, повернеться назад до вас. </h3>
            <p className="lib-return-company title-2">
                Після отримання повернення на нашому складі, протягом 5-х робочих днів вам буде надіслано грошовий переказ на рахунок, який ви вказали у Бланці обміну та повернення  або на ту карту, з якої була здійснена оплата онлайн.
            </p>
            <h3 className="lib-return-company title-2">ДОДАТКОВА ІНФОРМАЦІЯ</h3>
            <ul>
                <li>Повернути або обміняти можна будь-який товар крім піжам, рукавичок, носків, купальників</li>
                <li>Товари придбані під час розпродажу також можна повернути.</li>
                <li>Ми приймаємо повернення товарів у яких збережений товарний вигляд та наявні всі бірки.</li>
                <li>Ми не несемо відповідальності за будь-які товари, які були повернуті нам помилково.</li>
            </ul>
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
