import React, { useEffect } from 'react';
import classNames from 'classnames';
import { emailRegExp, getValidationMessage } from 'Constants';
import { useSignUp } from 'context/signUp/useSignUp';
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
            alert.success({ name: 'Ви успішно зареєстровані!' });
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
                    <form onSubmit={onSubmit} className="from-login">
                        <CommonInput
                            name="firstName"
                            label="First Name"
                            placeholder="Введіть ім'я"
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
                            placeholder="Введіть прізвище"
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
                            placeholder="Введіть електронну адресу"
                            ref={register({
                                required: 'Enter valid email',
                                pattern: { message: 'Enter valid email', value: emailRegExp },
                            })}
                            error={getValidationMessage(errors?.email)}
                        />
                        <CommonInput
                            name="password"
                            label="Password"
                            placeholder="Введіть пароль"
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
                        Зареєструватися
                    </p>
                    <p>
                        Відновити пароль
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
