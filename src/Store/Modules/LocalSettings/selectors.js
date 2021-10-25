import { createSelector } from 'reselect';

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

export const getAuthToken = createSelector(
    [getLocalsSettings], ({ authorizationToken }) => authorizationToken || '',
);
