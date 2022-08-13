import React, { useEffect } from 'react';
import classNames from 'classnames';
import { emailRegExp, getValidationMessage } from 'Constants';
import { useSignUp } from 'context/signUp/useSignUp';
import { CommonInput } from 'Components/CommonInput';
import { Link } from 'Components/Link';
import { Title } from 'Components/Title';

import './SignUp.css';
import Button from 'Components/Button/Button';

const SignUp = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-sign-up',
        className,
    );
    const {
        isSignUpSuccess,
        onSubmit,
        isError,
        isLoading,
        register,
        errors,
        errorMessage,
        alert,
        history,
    } = useSignUp();

    useEffect(() => {
        if (isSignUpSuccess) {
            alert.success({ name: 'Вы успешно зарегистрированы!' });
            history.push('/login');
        }
    }, [isSignUpSuccess]);

    return (
        <div className={componentClasses}>
            <div className="container">
                <div className="content-login">
                    <Title type={2}>Реєстрація</Title>
                    {isError && Object.values(errorMessage).map((error) => (
                        <p className="field-message__error">{error[0]}</p>
                    ))}
                    <form onSubmit={onSubmit} className="from-login">
                        <CommonInput
                            name="firstName"
                            label="Ім'я"
                            placeholder="Введіть ваше Ім'я"
                            ref={register({
                                required: 'Це поле обов\'язкове',
                                maxLength: { message: 'Не більше ніж 20 символів', value: 20 },
                                minLength: { message: 'Не менше ніж 2 символів', value: 2 },
                            })}
                            error={getValidationMessage(errors?.firstName)}
                        />
                        <CommonInput
                            name="lastName"
                            label="Прізвище"
                            placeholder="Введіть ваше Прізвище"
                            ref={register({
                                required: 'Це поле обов\'язкове',
                                maxLength: { message: 'Не більше ніж 20 символів', value: 20 },
                                minLength: { message: 'Не менше ніж 2 символів', value: 2 },
                            })}
                            error={getValidationMessage(errors?.lastName)}
                        />
                        <CommonInput
                            name="phone"
                            label="Телефон"
                            placeholder="Введіть ваш Телефон"
                            ref={register({
                                required: 'Це поле обов\'язкове',
                                maxLength: { message: 'Не більше ніж 13 цифр', value: 13 },
                                minLength: { message: 'Не менше ніж 10 цифр', value: 10 },
                            })}
                            error={getValidationMessage(errors?.phone)}
                        />
                        <CommonInput
                            name="email"
                            label="Email"
                            placeholder="Введіть ваш Email"
                            ref={register({
                                required: 'Це поле обов\'язкове',
                                pattern: { message: 'Некоректно введений email', value: emailRegExp },
                            })}
                            error={getValidationMessage(errors?.email)}
                        />
                        <CommonInput
                            name="password"
                            label="Пароль"
                            placeholder="Введіть ваш пароль"
                            type="password"
                            ref={register({
                                required: 'Це поле обов\'язкове',
                                maxLength: { message: 'Не більше ніж 20 символів', value: 20 },
                                minLength: { message: 'Не менше ніж 6 символів', value: 6 },
                            })}
                            error={getValidationMessage(errors?.password)}
                        />
                        <Button variant="solid" loading={isLoading}>
                            Зареєструватися
                        </Button>
                    </form>
                    <div className="lib-login_sign_up-btn">
                        <Button variant="primary" onClick={() => history.push('/')}>
                            Продовжити як гість
                        </Button>
                    </div>
                    <Link to="/login" className="lib-login_sign_up">
                        Акаунт вже інснує?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
