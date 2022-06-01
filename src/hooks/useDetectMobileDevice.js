import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import {
    DESKTOP_VIEWPORT_MAX_WIDTH,
    MOBILE_VIEWPORT_MAX_WIDTH,
    TABLET_VIEWPORT_MAX_WIDTH,
} from 'Constants';

const detectIsMobile = () => document.body.clientWidth <= MOBILE_VIEWPORT_MAX_WIDTH;
const detectIsTablet = () => document.body.clientWidth <= TABLET_VIEWPORT_MAX_WIDTH;
const detectIsDesktop = () => document.body.clientWidth <= DESKTOP_VIEWPORT_MAX_WIDTH;

export const useDetectedMobileDevice = () => {
    const [isMobileSize, setMobileSize] = useState(detectIsMobile());
    const [isTabletSize, setTabletSize] = useState(detectIsTablet());
    const [isDesktopSize, setDesktopSize] = useState(detectIsDesktop());
    const [clientHeight, setClientHeight] = useState(document.body.clientHeight);
    const [clientWidth, setClientWidth] = useState(document.body.clientWidth);

    const handleResize = () => {
        setMobileSize(detectIsMobile());
        setTabletSize(detectIsTablet());
        setDesktopSize(detectIsDesktop());
        setClientHeight(document.body.clientHeight);
        setClientWidth(document.body.clientWidth);
    };

    const debouncedResize = debounce(handleResize, 300);

    useEffect(() => {
        window.addEventListener('resize', debouncedResize);

        return () => window.removeEventListener('resize', debouncedResize);
    }, []);

    return {
        isMobileSize,
        isTabletSize,
        clientHeight,
        clientWidth,
        isDesktopSize,
    };
};
