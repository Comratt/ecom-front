import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { getLocalSettingsState } from 'Store/Modules/LocalSettings/selectors';
import { useForm } from 'react-hook-form';
import { signIn } from 'Store/Modules/LocalSettings/localSettingsActions';

export const useSignUpData = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const {
        isLoading, isError, errorMessage, isSignUpSuccess,
    } = useSelector(getLocalSettingsState);
    const {
        register,
        handleSubmit,
        errors,
        watch,
    } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (params) => {
        dispatch(signIn(params));
    };

    const submitForm = handleSubmit(onSubmit);

    return useMemo(() => ({
        alert,
        history,
        register,
        errors,
        watch,
        isLoading,
        isError,
        errorMessage,
        isSignUpSuccess,
        onSubmit: submitForm,
    }), [
        alert,
        history,
        register,
        errors,
        watch,
        isLoading,
        isError,
        errorMessage,
        isSignUpSuccess,
        submitForm,
    ]);
};
