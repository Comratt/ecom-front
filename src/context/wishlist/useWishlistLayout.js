import { useEffect } from 'react';
import { useLayout } from 'hooks/useLayout';

export const useWishlistLayout = () => {
    const { initTopNavState, initLayoutState } = useLayout();

    useEffect(() => {
        initTopNavState({
            bordered: true,
            transparent: false,
            showLogo: true,
        });

        initLayoutState({
            className: 'wishlist-page',
        });

        window.scrollTo(0, 0);
    }, []);
};
