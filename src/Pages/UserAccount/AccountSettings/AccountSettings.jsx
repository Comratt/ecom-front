import React from 'react';
import classNames from 'classnames';
import './AccountSettings.css';
import Input from '../../../Components/Input';

const AccountSettings = () => {
    const componentClasses = classNames(
        'lib-account-settings',
    );

    return (
        <div className={componentClasses}>
            <form className="lib-account-settings-form" action="">
                <Input label="Ім'я" className="lib-account-settings-input" id="name" type="text" />
                <Input className="lib-account-settings-input" id="lastname" type="text" />
                <Input className="lib-account-settings-input" id="phone" type="tel" />
            </form>
            <h5>Змінити пароль</h5>
            <form className="lib-account-settings-form" action="">
                <label htmlFor="password">
                    Пароль
                </label>
                <input className="lib-account-settings-input" id="password" type="password" />
                <label htmlFor="confirm-password">
                    Підтвердьте пароль
                </label>
                <input className="lib-account-settings-input" id="confirm-password" type="password" />
            </form>
        </div>
    );
};

export default AccountSettings;
