import ClientBaseService from 'Services/ClientBaseService';

import {
    LOGIN_SUCCESS,
    LOGIN_START,
    LOGIN_FAILURE,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOGOUT,
} from './types';

export const signIn = (params = {}) => (dispatch) => {
    dispatch(SIGN_UP_START);

    return ClientBaseService.signUp(params)
        .then((clientResponse) => {
            dispatch({ type: SIGN_UP_SUCCESS, payload: clientResponse });

            return clientResponse;
        })
        .catch((clientError) => {
            console.warn(clientError);
            dispatch({ type: SIGN_UP_FAILURE, payload: { message: clientError.message } });
        });
};

export const login = (email, password, fromAdmin) => (dispatch) => {
    dispatch(LOGIN_START);

    return ClientBaseService.signIn(email, password, fromAdmin)
        .then((clientResponse) => {
            dispatch({ type: LOGIN_SUCCESS, payload: clientResponse });

            return clientResponse;
        })
        .catch((clientError) => {
            console.log(clientError);
            dispatch({ type: LOGIN_FAILURE, payload: { message: clientError.message } });
        });
};

export const logout = () => (dispatch) => dispatch(LOGOUT);
