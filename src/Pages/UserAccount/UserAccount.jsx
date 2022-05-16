import React from 'react';
import './UserAccount.css';
import classNames from 'classnames';
import { Tabs } from '../../Components/Tab/Tabs';
import AccountSettings from './AccountSettings/AccountSettings';
import UserOrders from './UserOrders/UserOrders';

const UserAccount = () => {
    const tabs = [
        {
            id: 1,
            name: 'Мій аккаунт',
            title: 'Відредагуйте інформацію свого облікового запису',
            text: <AccountSettings />,
        },
        {
            id: 2,
            name: 'Мої Замовлення',
            title: 'список замовлень',
            text: <UserOrders />,
        },
    ];

    const componentClasses = classNames(
        'lib-user-account',
    );

    return (
        <div className={componentClasses}>
            <Tabs tabs={tabs} />
        </div>
    );
};

export default UserAccount;
