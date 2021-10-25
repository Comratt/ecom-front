import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGN_UP_FAILURE,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
} from './types';

export const initialState = {
    user: {},
    authorizationToken: '',
    isLoading: false,
    isError: false,
    isSignUpSuccess: false,
    errorMessage: '',
};

const localSettingsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_START:
            return {
                ...state,
                user: {},
                authorizationToken: '',
                isLoading: true,
                isError: false,
                errorMessage: '',
            };
        case SIGN_UP_START:
            return {
                ...state,
                user: {},
                authorizationToken: '',
                isLoading: true,
                isError: false,
                isSignUpSuccess: false,
                errorMessage: '',
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                user: {},
                authorizationToken: '',
                isLoading: false,
                isError: true,
                isSignUpSuccess: false,
                errorMessage: payload.message,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSignUpSuccess: true,
                errorMessage: {},
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                user: {},
                authorizationToken: '',
                isLoading: false,
                isError: true,
                errorMessage: payload.message,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: payload.user,
                authorizationToken: payload.acces_token,
                isLoading: false,
                isError: false,
                errorMessage: '',
            };
        default:
            return state;
    }
};

export default localSettingsReducer;
