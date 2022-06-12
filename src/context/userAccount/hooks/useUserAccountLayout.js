import { useEffect } from 'react';
import { useLayout } from 'hooks/useLayout';

export const useUserAccountLayout = () => {
    const { initTopNavState, initLayoutState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: true,
            transparent: false,
            showLogo: true,
        });

        initLayoutState({
            className: 'userAccount-page',
        });

        window.scrollTo(0, 0);
    }, []);
};
