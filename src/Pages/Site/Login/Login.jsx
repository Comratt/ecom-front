import React, { useEffect } from 'react';
import classNames from 'classnames';
import { emailRegExp, getValidationMessage } from 'Constants';
import { CommonInput } from 'Components/CommonInput';
import { Link } from 'Components/Link';
import { Title } from 'Components/Title';
import Button from 'Components/Button/Button';
import { useLogin } from 'context/login/useLogin';

import './Login.css';

const Login = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-login',
        className,
    );
    const {
        user,
        onSubmit,
        isError,
        isLoading,
        register,
        errors,
        errorMessage,
        alert,
        history,
    } = useLogin();

    useEffect(() => {
        if (Object.keys(user).length) {
            alert.success({ name: `Раді бачити Вас на нашому сайті ${user?.first_name}!` });
            setTimeout(() => history.push('/'), 200);
        }
    }, [user]);

    return (
        <div className={componentClasses}>
            <div className="container">
                <div className="content-login">
                    <Title type={2}>Login</Title>
                    {isError
                        && <p style={{ display: 'flex' }} className="field-message__error">{errorMessage}</p>}
                    <form onSubmit={onSubmit} className="from-login">
                        <CommonInput
                            name="email"
                            label="Email"
                            placeholder="Введіть ваш email"
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
                            ref={register({
                                required: 'Це поле обов\'язкове',
                                maxLength: { message: 'Не більше ніж 20 символів', value: 20 },
                                minLength: { message: 'Не менше ніж 6 символів', value: 6 },
                            })}
                            error={getValidationMessage(errors?.password)}
                        />
                        <Button variant="solid" loading={isLoading}>
                            Увійти в аккаунт
                        </Button>
                    </form>
                    <div className="lib-login_sign_up-btn">
                        <Button variant="primary" onClick={() => history.push('/')}>
                            Продовжити як гість
                        </Button>
                    </div>
                    <Link to="/sign" className="lib-login_sign_up">
                        Зареєструватись
                    </Link>
                    <Link to="/sign" className="lib-login_sign_up">
                        Відновити пароль
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
