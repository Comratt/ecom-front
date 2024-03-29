import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAsyncCallback } from 'react-async-hook';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { getAuthToken, getUser } from 'Store/Modules/LocalSettings/selectors';
import { logout as logoutAction, modified } from 'Store/Modules/LocalSettings/localSettingsActions';
import ClientBaseService from 'Services/ClientBaseService';
import { clearFilters } from 'Store/Modules/Filters/filtersActions';

export const useUserAccountData = () => {
    const { hash } = useLocation();
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
    const isOrders = hash === '#orders';

    useEffect(() => {
        dispatch(clearFilters());
    }, []);

    const logout = () => dispatch(logoutAction());

    const submitHandler = (body) => {
        execute(user.id, body).then((modUser) => {
            dispatch(modified(modUser));
        });
    };
    const onSubmit = handleSubmit(submitHandler);

    return useMemo(() => ({
        user,
        loading,
        onSubmit,
        register,
        errors,
        isLoggedIn,
        isOrders,
        logout,
    }), [
        user,
        loading,
        onSubmit,
        register,
        errors,
        isLoggedIn,
        isOrders,
        logout,
    ]);
};
