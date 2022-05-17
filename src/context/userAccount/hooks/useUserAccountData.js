import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAsyncCallback } from 'react-async-hook';

import { getAuthToken, getUser } from 'Store/Modules/LocalSettings/selectors';
import ClientBaseService from 'Services/ClientBaseService';
import { useForm } from 'react-hook-form';

export const useUserAccountData = () => {
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

    const submitHandler = (body) => execute(user.id, body);
    const onSubmit = handleSubmit(submitHandler);

    return useMemo(() => ({
        user,
        loading,
        onSubmit,
        register,
        errors,
        isLoggedIn,
    }), [
        user,
        loading,
        onSubmit,
        register,
        errors,
        isLoggedIn,
    ]);
};
