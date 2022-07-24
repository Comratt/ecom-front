import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGN_UP_FAILURE,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    MODIFIED_SUCCESS,
    LOGOUT,
} from './types';

export const initialState = {
    user: {},
    authorizationToken: '',
    expiresAt: '',
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
            expiresAt: '',
            isLoading: true,
            isError: false,
            errorMessage: '',
        };
    case SIGN_UP_START:
        return {
            ...state,
            user: {},
            authorizationToken: '',
            expiresAt: '',
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
            expiresAt: '',
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
            expiresAt: '',
            isLoading: false,
            isError: true,
            errorMessage: payload.message,
        };
    case LOGIN_SUCCESS:
        return {
            ...state,
            user: payload.user,
            authorizationToken: payload.acces_token,
            expiresAt: payload.expires_at,
            isLoading: false,
            isError: false,
            errorMessage: '',
        };
    case MODIFIED_SUCCESS:
        return {
            ...state,
            user: payload.user,
        };
    case LOGOUT:
        return initialState;
    default:
        return state;
    }
};

export default localSettingsReducer;
