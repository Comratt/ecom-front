import React from 'react';
import classNames from 'classnames';
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

    return (
        <div className={componentClasses}>
            <div className="container">
                <div className="content-login">
                    <h2>Login</h2>
                    <form action="#" className="from-login">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" />
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" />
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" />
                        <LoginBtn />
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
