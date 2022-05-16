import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthToken } from 'Store/Modules/LocalSettings/selectors';
import { Menu, Pencil } from 'Icons';
import './UserAccount.css';

const UserAccount = () => {
    const isLoggedIn = useSelector(getAuthToken);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="user-account-content">
            <div className="user-account-user-menu">
                <ul>
                    <li className="user-account-menu-title">
                        <span className="user-account-menu-li">Мой кабинет</span>
                        <Menu
                            className="user-btn"
                            width={24}
                            height={24}
                            fill="white"
                        />
                    </li>
                    <li className="user-account-menu-li">
                        Профиль
                    </li>
                    <li className="user-account-menu-li">
                        Мои заказы
                    </li>
                    <li className="user-account-menu-li">
                        Мои подписки
                    </li>
                    <li className="user-account-menu-li">
                        Wishlist
                    </li>
                    <li className="user-account-menu-li">
                        Выход
                    </li>
                </ul>
            </div>
            <div className="user-account-information">
                <h4>
                    Cаша Ковальов
                    {' '}
                    <span>
                        {' '}
                        <Pencil fill="white" />
                        {' '}
                        РЕДАКТИРОВАТЬ ПРОФИЛЬ
                    </span>
                </h4>
                <div className="user-account-information-content">
                    <div>
                        КОНТАКТНАЯ ИНФОРМАЦИЯ
                        <p>
                            +380964926330
                        </p>
                    </div>
                    <div>
                        ОСНОВНОЙ АДРЕС ДОСТАВКИ
                        <p>не задан</p>
                    </div>
                    <div>
                        ДАТА РОЖДЕНИЯ
                        <p>
                            не задан
                        </p>
                    </div>
                    <div>
                        РАЗМЕР ОДЕЖДЫ
                        <p>S</p>
                    </div>
                    <div>
                        РАЗМЕР ОБУВИ
                        <p>
                            38
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
