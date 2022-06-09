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
                    <Title type={2}>Sign Up</Title>
                    {isError && Object.values(errorMessage).map((error) => (
                        <p className="field-message__error">{error[0]}</p>
                    ))}
                    <form onSubmit={onSubmit} className="from-login">
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
                            type="password"
                            ref={register({
                                required: 'Enter password',
                                maxLength: { message: 'Enter valid password', value: 20 },
                                minLength: { message: 'password', value: 6 },
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
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
