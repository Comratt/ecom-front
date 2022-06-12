import {
    useCallback, useEffect, useState, useMemo, useRef,
} from 'react';

import { useLayout } from 'hooks/useLayout';
import { useHomeLayout } from './useHomeLayout';
import { useHomeData } from './useHomeData';

export const useHome = () => {
    const scrollYRef = useRef(0);
    const [isTransparent, setTransparent] = useState(true);
    const {
        result,
        error,
        loading,
        resultCategories,
        errorCategories,
        loadingCategories,
    } = useHomeData();
    const { changeTopNavState } = useLayout();

    useEffect(() => {
        const scrollYPosition = +localStorage.getItem('scrollYPositionHome');

        if (!scrollYPosition) {
            window.scrollTo(0, 0);
        }

        setTimeout(() => {
            if (scrollYPosition) {
                window.scrollTo(0, scrollYPosition);
                localStorage.setItem('scrollYPositionHome', '0');
            }
        }, 700);
    }, []);

    useEffect(() => {
        const handleScrollHome = () => {
            scrollYRef.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScrollHome);

        return () => {
            localStorage.setItem('scrollYPositionHome', scrollYRef.current);
            window.removeEventListener('scroll', handleScrollHome);
        };
    }, []);

    const handleScroll = useCallback(
        () => setTransparent(!window.pageYOffset),
        [setTransparent, window.pageYOffset],
    );

    useHomeLayout();

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        localStorage.setItem('scrollYPosition', '0');
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
        resultCategories,
        errorCategories,
        loadingCategories,
    }), [
        loading,
        result,
        error,
        resultCategories,
        errorCategories,
        loadingCategories,
    ]);
};
