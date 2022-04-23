import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useProductData } from './useProductData';
import { useProductLayout } from './useProductLayout';

export const useProduct = (isUniq = true) => {
    const { id } = useParams();
    const { result, error, loading } = useProductData(id, isUniq);

    useProductLayout();

    return useMemo(() => ({
        result,
        error,
        loading,
    }), [
        result,
        error,
        loading,
    ]);
};
