import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAsyncCallback } from 'react-async-hook';

import { getAuthToken, getUser } from 'Store/Modules/LocalSettings/selectors';
import { logout as logoutAction } from 'Store/Modules/LocalSettings/localSettingsActions';
import ClientBaseService from 'Services/ClientBaseService';
import { useForm } from 'react-hook-form';

export const useUserAccountData = () => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const isLoggedIn = useSelector(getAuthToken);
    const { loading, execute } = useAsyncCallback(ClientBaseService.modify);
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone,
        },
    });

    const logout = () => dispatch(logoutAction());

    const submitHandler = (body) => execute(user.id, body);
    const onSubmit = handleSubmit(submitHandler);

    return useMemo(() => ({
        user,
        loading,
        onSubmit,
        register,
        errors,
        isLoggedIn,
        logout,
    }), [
        user,
        loading,
        onSubmit,
        register,
        errors,
        isLoggedIn,
        logout,
    ]);
};
