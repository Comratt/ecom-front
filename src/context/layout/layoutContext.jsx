import * as React from 'react';
import { useTopNav } from './topNav/index';
import { useLayoutState } from './useLayoutState';

export const LayoutContext = React.createContext({});
LayoutContext.displayName = 'LayoutContext';

// eslint-disable-next-line react/prop-types
export const LayoutProvider = ({ children }) => {
    const {
        layoutState,
        initLayoutState,
        navigationOverlayOpened,
        handleCloseNavigationModal,
        handleOpenNavigationModal,
        navigationMenu,
        setNavigationMenu,
    } = useLayoutState();
    const { initTopNavState, topNavState, changeTopNavState } = useTopNav();

    const value = React.useMemo(() => ({
        layoutState,
        initLayoutState,
        navigationOverlayOpened,
        handleCloseNavigationModal,
        handleOpenNavigationModal,
        navigationMenu,
        setNavigationMenu,

        topNavState,
        initTopNavState,
        changeTopNavState,
    }), [
        layoutState,
        initLayoutState,
        navigationOverlayOpened,
        handleCloseNavigationModal,
        handleOpenNavigationModal,
        navigationMenu,
        setNavigationMenu,

        topNavState,
        initTopNavState,
        changeTopNavState,
    ]);

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};
