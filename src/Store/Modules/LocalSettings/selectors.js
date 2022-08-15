import { createSelector } from 'reselect';
import moment from 'moment';
import { DATE_FORMAT } from 'Constants';

const getLocalsSettings = (state) => state.localSettings;

export const getLocalSettings = createSelector(
    [getLocalsSettings], (localSettings) => localSettings,
);

export const getLocalSettingsState = createSelector(
    [getLocalsSettings], ({
        isLoading, isError, errorMessage, isSignUpSuccess,
    }) => (
        ({
            isLoading, isError, errorMessage, isSignUpSuccess,
        }) || {}
    ),
);

export const getUser = createSelector(
    [getLocalsSettings], ({ user }) => user || {},
);

export const isLoggedIn = createSelector(
    [getLocalsSettings], ({ authorizationToken }) => !!authorizationToken,
);

export const getAuthToken = createSelector(
    [getLocalsSettings], ({ authorizationToken }) => authorizationToken || '',
);

export const getIsAdmin = createSelector(
    [getLocalsSettings], ({ authorizationToken, user }) => (
        authorizationToken && (user?.role === 'admin' || user?.role === 'subadmin')
    ),
);

export const getIsLoginLoading = createSelector(
    [getLocalsSettings], ({ isLoading }) => isLoading,
);

export const getUserExpireDate = createSelector(
    [getLocalsSettings], ({ expiresAt }) => moment(expiresAt, DATE_FORMAT),
);
