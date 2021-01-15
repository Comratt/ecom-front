import { useState, useEffect } from 'react';
import { MOBILE_VIEWPORT_MAX_WIDTH, TABLET_VIEWPORT_MAX_WIDTH } from 'Constants';

const detectIsMobile = () => document.body.clientWidth <= MOBILE_VIEWPORT_MAX_WIDTH;
const detectIsTablet = () => document.body.clientWidth <= TABLET_VIEWPORT_MAX_WIDTH;

export const useDetectedMobileDevice = () => {
    const [isMobileSize, setMobileSize] = useState(detectIsMobile());
    const [isTabletSize, setTabletSize] = useState(detectIsTablet());

    useEffect(() => {
        const handleResize = () => {
            setMobileSize(detectIsMobile());
            setTabletSize(detectIsTablet());
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobileSize, isTabletSize };
};
