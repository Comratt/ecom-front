import { useEffect } from 'react';
import { useLayout } from 'hooks/useLayout';

export const useCollectionLayout = () => {
    const { initTopNavState, initLayoutState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: true,
            transparent: false,
            showLogo: true,
        });

        initLayoutState({
            className: 'collection-page',
        });
    }, []);
};
