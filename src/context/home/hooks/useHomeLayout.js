import { useEffect } from 'react';
import { useLayout } from 'hooks/useLayout';

export const useHomeLayout = () => {
    const { initTopNavState, initLayoutState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: false,
            transparent: true,
            showLogo: true,
        });

        initLayoutState({
            className: 'home-page',
        });
    }, []);
};
