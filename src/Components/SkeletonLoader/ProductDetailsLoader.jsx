import React from 'react';
import ContentLoader from 'react-content-loader';
import { useDetectedMobileDevice } from '../../hooks/useDetectMobileDevice';

const ProductDetailsLoader = ({ widthPadding = 0, ...props }) => {
    const { clientWidth, isDesktopSize } = useDetectedMobileDevice();
    const maxWidth = clientWidth > 1150 ? (1150 - widthPadding) : (clientWidth - widthPadding);

    return (
        <div style={{ float: 'right', marginRight: 50, maxWidth: 1150 }}>
            <ContentLoader viewBox={`0 0 ${maxWidth} 600`} height={600} width={maxWidth} {...props}>
                <circle cx="472" cy="159" r="7" />
                <rect x="calc(100% - 320px)" y="70" rx="0" ry="0" width="250" height="25" />
                <rect x="calc(100% - 320px)" y="110" rx="5" ry="5" width="60" height="20" />
                <circle cx="calc(100% - 320px)" cy="170" rx="5" r="5" />
                <rect x="calc(100% - 320px)" y="214" rx="5" ry="5" width="220" height="20" />
                <rect x="calc(100% - 320px)" y="244" rx="5" ry="5" width="220" height="20" />

                <rect x="160" y="30" rx="0" ry="0" width="50%" height="600" />

                <rect x="10" y="30" rx="0" ry="0" width="50" height="60" />
                <rect x="10" y="100" rx="0" ry="0" width="50" height="60" />
                <rect x="10" y="170" rx="0" ry="0" width="50" height="60" />
                <rect x="10" y="240" rx="0" ry="0" width="50" height="60" />
            </ContentLoader>
        </div>
    );
};

export default ProductDetailsLoader;
