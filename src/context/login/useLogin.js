import { useMemo } from 'react';

import { useLoginLayout } from './useLoginLayout';
import { useLoginData } from './useLoginData';

export const useLogin = () => {
    const loginData = useLoginData();

    useLoginLayout();

    return useMemo(() => loginData, [loginData]);
};
