import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getLocalSettingsState, getUser } from 'Store/Modules/LocalSettings/selectors';
import { login } from 'Store/Modules/LocalSettings/localSettingsActions';

export const useLoginData = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
    });
    const {
        isLoading, isError, errorMessage,
    } = useSelector(getLocalSettingsState);
    const user = useSelector(getUser);

    const onSubmit = ({ email, password }) => {
        dispatch(login(email, password));
    };

    const submitForm = handleSubmit(onSubmit);

    return useMemo(() => ({
        alert,
        history,
        user,
        register,
        errors,
        isLoading,
        isError,
        errorMessage,
        onSubmit: submitForm,
    }), [
        alert,
        history,
        user,
        register,
        errors,
        isLoading,
        isError,
        errorMessage,
        submitForm,
    ]);
};
