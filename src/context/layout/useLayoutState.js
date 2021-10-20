import { useState, useMemo, useCallback } from 'react';
import { useModal } from 'hooks/useModal';

const defaultLayoutState = {};

export const useLayoutState = () => {
    const [layoutState, setLayoutState] = useState(defaultLayoutState);

    const {
        opened: navigationOverlayOpened,
        setModalState: setNavigationOverlayOpened,
    } = useModal();

    // eslint-disable-next-line max-len
    const handleCloseNavigationModal = useCallback(() => setNavigationOverlayOpened(false), [setNavigationOverlayOpened]);
    // eslint-disable-next-line max-len
    const handleOpenNavigationModal = useCallback(() => setNavigationOverlayOpened(true), [setNavigationOverlayOpened]);
    const [navigationMenu, setNavigationMenu] = useState();

    const initLayoutState = useCallback((initial) => {
        setLayoutState(initial);
    }, [setLayoutState]);

    return useMemo(() => ({
        layoutState,
        initLayoutState,
        navigationOverlayOpened,
        handleCloseNavigationModal,
        handleOpenNavigationModal,
        navigationMenu,
        setNavigationMenu,
    }), [
        layoutState,
        initLayoutState,
        navigationOverlayOpened,
        handleCloseNavigationModal,
        handleOpenNavigationModal,
        navigationMenu,
        setNavigationMenu,
    ]);
};
