import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserExpireDate } from 'Store/Modules/LocalSettings/selectors';
import moment from 'moment';
import { useLayoutState } from './useLayoutState';
import { useTopNav } from './topNav/index';
import { logout } from '../../Store/Modules/LocalSettings/localSettingsActions';

export const LayoutContext = React.createContext({});
LayoutContext.displayName = 'LayoutContext';

// eslint-disable-next-line react/prop-types
export const LayoutProvider = ({ children }) => {
    const dispatch = useDispatch();
    const userExpiredDate = useSelector(getUserExpireDate);
    const isExpired = userExpiredDate < moment();
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

    React.useEffect(() => {
        if (isExpired) {
            dispatch(logout());
        }
    }, []);

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};
