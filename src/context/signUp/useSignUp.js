import { useMemo } from 'react';
import { useSignUpLayout } from './useSignUpLayout';
import { useSignUpData } from './useSignUpData';

export const useSignUp = () => {
    const signUpData = useSignUpData();

    useSignUpLayout();

    return useMemo(() => signUpData, [signUpData]);
};
