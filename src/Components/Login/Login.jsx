import React from 'react';
import classNames from 'classnames';
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

    return (
        <div className={componentClasses}>
            <div className="container">
                <div className="content-login">
                    <h2>Login</h2>
                    <form action="#" className="from-login">
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

export default Login;
