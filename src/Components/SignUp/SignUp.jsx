import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

import { signIn } from 'Store/Modules/LocalSettings/localSettingsActions';
import { getLocalSettingsState } from 'Store/Modules/LocalSettings/selectors';
import { emailRegExp, getValidationMessage } from 'Constants';
import { CommonInput } from '../CommonInput';
import LoginBtn from '../Buttons/LoginBtn/LoginBtn';
import GuestBtn from '../Buttons/GuestBtn/GuestBtn';
import './SignUp.css';

const SignUp = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-sign-up',
        className,
    );
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {
        isLoading, isError, errorMessage, isSignUpSuccess,
    } = useSelector(getLocalSettingsState);
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (params) => {
        dispatch(signIn(params));
    };

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
                    <h2>Login</h2>
                    {isError && Object.values(errorMessage).map((error) => (
                        <p className="field-message__error">{error[0]}</p>
                    ))}
                    <form onSubmit={handleSubmit(onSubmit)} className="from-login">
                        <CommonInput
                            name="firstName"
                            label="First Name"
                            placeholder="Enter first name"
                            ref={register({
                                required: 'Enter first name',
                                maxLength: { message: 'Enter valid first name', value: 20 },
                                minLength: { message: 'Enter valid first name', value: 3 },
                            })}
                            error={getValidationMessage(errors?.firstName)}
                        />
                        <CommonInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Enter last name"
                            ref={register({
                                required: 'Enter last name',
                                maxLength: { message: 'Enter valid last name', value: 20 },
                                minLength: { message: 'Enter valid last name', value: 3 },
                            })}
                            error={getValidationMessage(errors?.lastName)}
                        />
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

export default SignUp;
