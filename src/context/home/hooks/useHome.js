import {
    useCallback, useEffect, useState, useMemo,
} from 'react';

import { useLayout } from 'hooks/useLayout';
import { useHomeLayout } from './useHomeLayout';
import { useHomeData } from './useHomeData';

export const useHome = () => {
    const [isTransparent, setTransparent] = useState(true);
    const { result, error, loading } = useHomeData();
    const { changeTopNavState } = useLayout();

    const handleScroll = useCallback(
        () => setTransparent(!window.pageYOffset),
        [setTransparent, window.pageYOffset],
    );

    useHomeLayout();

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        changeTopNavState({
            bordered: !isTransparent,
            transparent: isTransparent,
        });
    }, [isTransparent]);

    return useMemo(() => ({
        loading,
        result,
        error,
    }), [
        loading,
        result,
        error,
    ]);
};
