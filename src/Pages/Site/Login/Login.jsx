import React, { useEffect } from 'react';
import classNames from 'classnames';
import { emailRegExp, getValidationMessage } from 'Constants';
import { CommonInput } from 'Components/CommonInput';
import { Link } from 'Components/Link';
import { Title } from 'Components/Title';
import { useLogin } from 'context/login/useLogin';

import './Login.css';
import LoginBtn from 'Components/Buttons/LoginBtn/LoginBtn';
import GuestBtn from 'Components/Buttons/GuestBtn/GuestBtn';

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
            alert.success({ name: `Добро пожаловать ${user?.first_name}!` });
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
                            placeholder="Enter email"
                            ref={register({
                                required: 'Enter valid email',
                                pattern: { message: 'Enter valid email', value: emailRegExp },
                            })}
                            error={getValidationMessage(errors?.email)}
                        />
                        <CommonInput
                            name="password"
                            label="Password"
                            placeholder="Enter password"
                            ref={register({
                                required: 'Enter password',
                                maxLength: { message: 'Enter valid password', value: 20 },
                                minLength: { message: 'password', value: 6 },
                            })}
                            error={getValidationMessage(errors?.password)}
                        />
                        <LoginBtn loading={isLoading} />
                        <GuestBtn />
                    </form>
                    <Link to="/sign" className="lib-login_sign_up">
                        Sign up
                    </Link>
                    <Link to="/sign" className="lib-login_sign_up">
                        Recover password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
