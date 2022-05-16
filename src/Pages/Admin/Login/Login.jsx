import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Input from 'Components/Input';
import { emailRegExp, getValidationMessage } from 'Constants';
import { getIsLoginLoading, getAuthToken } from 'Store/Modules/LocalSettings/selectors';
import { login } from 'Store/Modules/LocalSettings/localSettingsActions';

import 'bootstrap/bootstrap.min.css';
import './style.css';
import Loader from 'react-loader-spinner';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }

  #root {
    width: 100%;
  }
`;

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoading = useSelector(getIsLoginLoading);
    const authToken = useSelector(getAuthToken);
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });

    const onSubmit = ({ email, password }) => {
        dispatch(login(email, password, true)).then(() => {
            history.push('/admin/dashboard');
        });
    };

    if (authToken) {
        return (
            <Redirect to="/admin/dashboard" />
        );
    }

    return (
        <div className="text-center">
            <GlobalStyle />
            <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h3 mb-3 font-weight-normal">Введіть ваші дані</h1>
                <Input
                    name="email"
                    label="Email"
                    placeholder="Введіть ваш email"
                    ref={register({
                        required: 'Поле email порожнє',
                        pattern: { message: 'Введіть коректний email', value: emailRegExp },
                    })}
                    error={getValidationMessage(errors?.email)}
                />
                <Input
                    name="password"
                    label="Password"
                    placeholder="Введіть пароль"
                    ref={register({
                        required: 'Поле пароль порожнє',
                        maxLength: { message: 'Ви впевнені, що запамʼятаєте?', value: 20 },
                        minLength: { message: 'Необхідно, не менеше 6 символів', value: 6 },
                    })}
                    error={getValidationMessage(errors?.password)}
                />
                <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">
                    {isLoading && (
                        <Loader
                            className="button-loader"
                            type="Oval"
                            height={20}
                            width={20}
                            color="var(--color-accent)"
                            radius={16}
                        />
                    )}
                    Увійти
                </button>
            </form>
        </div>
    );
};

export default Login;
