import React from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';
import { Tabs } from 'Components/Tab/Tabs';
import Button from 'Components/Button/Button';
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
        isOrders,
        user,
        logout,
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
            text: <UserOrders email={user?.email} />,
        },
    ];

    const componentClasses = classNames(
        'lib-user-account',
    );

    return (
        <div className={componentClasses}>
            <Button variant="logout" onClick={logout}>
                <Logout width={27} height={27} />
                <span>Вихід</span>
            </Button>
            <Tabs activeIndex={isOrders ? 1 : 0} tabs={tabs} />
        </div>
    );
};

export default UserAccount;
