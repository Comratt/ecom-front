import { useMemo } from 'react';
import { useUserAccountLayout } from './useUserAccountLayout';
import { useUserAccountData } from './useUserAccountData';

export const useUserAccount = () => {
    const accountData = useUserAccountData();

    useUserAccountLayout();

    return useMemo(() => accountData, [accountData]);
};
