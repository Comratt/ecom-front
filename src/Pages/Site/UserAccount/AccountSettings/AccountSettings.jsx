import React from 'react';
import classNames from 'classnames';
import { CommonInput } from 'Components/CommonInput';
import LoginBtn from 'Components/Buttons/LoginBtn';
import { getValidationMessage } from 'Constants';

import './AccountSettings.css';

const AccountSettings = ({
    onSubmit, errors, register, loading,
}) => {
    const componentClasses = classNames(
        'lib-account-settings',
    );

    return (
        <div className={componentClasses}>
            <form className="lib-account-settings-form" onSubmit={onSubmit}>
                <CommonInput
                    name="firstName"
                    label="Ім'я"
                    placeholder="Введіть ім'я"
                    ref={register({
                        required: 'Не залишайте поле порожнім.',
                        maxLength: { message: 'Поле повинно бути до 20 символів.', value: 20 },
                        minLength: { message: 'Поле повинно бути більше 2 символів.', value: 2 },
                    })}
                    error={getValidationMessage(errors?.firstName)}
                />
                <CommonInput
                    name="lastName"
                    label="Прізвище"
                    placeholder="Введіть прізвище"
                    ref={register({
                        required: 'Не залишайте поле порожнім.',
                        maxLength: { message: 'Поле повинно бути до 20 символів.', value: 20 },
                        minLength: { message: 'Поле повинно бути більше 2 символів.', value: 2 },
                    })}
                    error={getValidationMessage(errors?.lastName)}
                />
                <CommonInput
                    name="phone"
                    label="Номер телефону"
                    placeholder="Введіть номер телефону"
                    ref={register({
                        required: 'Не залишайте поле порожнім.',
                        maxLength: { message: 'Не коректний номер телефону.', value: 13 },
                        minLength: { message: 'Не коректний номер телефону.', value: 10 },
                    })}
                    error={getValidationMessage(errors?.phone)}
                />
                <CommonInput
                    name="password"
                    label="Пароль"
                    placeholder="Введіть пароль"
                    ref={register({
                        required: 'Підтвердіть свій пароль.',
                        maxLength: { message: 'Не коректний номер телефону.', value: 20 },
                        minLength: { message: 'Не коректний номер телефону.', value: 6 },
                    })}
                    error={getValidationMessage(errors?.password)}
                />
                <LoginBtn loading={loading} text="Оновити" />
            </form>
        </div>
    );
};

export default AccountSettings;
