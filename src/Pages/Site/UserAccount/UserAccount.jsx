import React from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';
import { Tabs } from 'Components/Tab/Tabs';
import { Logout } from 'Icons/Logout';
import { useUserAccount } from 'context/userAccount/hooks/useUserAccount';
import AccountSettings from './AccountSettings/AccountSettings';
import UserOrders from './UserOrders/UserOrders';

import './UserAccount.css';

const UserAccount = () => {
    const {
        onSubmit,
        errors,
        register,
        loading,
        isLoggedIn,
    } = useUserAccount();

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const tabs = [
        {
            id: 1,
            name: 'Мій аккаунт',
            title: 'Дані облікового запису',
            text: (
                <AccountSettings
                    errors={errors}
                    loading={loading}
                    register={register}
                    onSubmit={onSubmit}
                />
            ),
        },
        {
            id: 2,
            name: 'Мої Замовлення',
            title: 'Список замовлень',
            text: <UserOrders />,
        },
    ];

    const componentClasses = classNames(
        'lib-user-account',
    );

    return (
        <div className={componentClasses}>
            <button className="logout-btn">
                <Logout width={27} height={27} />
                <span>Вихід</span>
            </button>
            <Tabs tabs={tabs} />
        </div>
    );
};

export default UserAccount;
