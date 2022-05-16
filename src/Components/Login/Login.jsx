import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { login } from 'Store/Modules/LocalSettings/localSettingsActions';
import {
    getLocalSettingsState,
    getAuthToken,
    getUser,
} from 'Store/Modules/LocalSettings/selectors';
import { emailRegExp, getValidationMessage } from 'Constants';
import { CommonInput } from '../CommonInput';

import './Login.css';
import LoginBtn from '../Buttons/LoginBtn/LoginBtn';
import GuestBtn from '../Buttons/GuestBtn/GuestBtn';

const Login = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-login',
        className,
    );

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
                    <h2>Login</h2>
                    {isError
                        && <p style={{ display: 'flex' }} className="field-message__error">{errorMessage}</p>}
                    <form onSubmit={handleSubmit(onSubmit)} className="from-login">
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
                    <p className="lib-login_sign_up">
                        Sign up
                    </p>
                    <p>
                        Recover password
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
