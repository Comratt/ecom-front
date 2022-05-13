import React from 'react';
import Layout from '../Layout';

import 'bootstrap/bootstrap.min.css';
import './style.css';

const Login = () => (
    <div className="text-center">
        <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Введіть ваші дані</h1>
            <label htmlFor="inputEmail" className="float-left">Адреса електронної пошти</label>
            <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Адреса електронної пошти" required autoFocus />
            <label htmlFor="inputPassword" className="float-left">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Пароль" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
                Увійти
            </button>
        </form>
    </div>
);

export default Layout(Login);
