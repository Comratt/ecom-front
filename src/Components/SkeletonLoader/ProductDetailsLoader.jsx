import React from 'react';
import ContentLoader from 'react-content-loader';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';

const ProductDetailsLoader = (props) => {
    const { clientWidth, isTabletSize } = useDetectedMobileDevice();
    const maxWidth = clientWidth > 1400 ? (1400) : (clientWidth);
    const imageWidth = clientWidth < 968 ? '40%' : `${clientWidth > 1400 ? '60%' : clientWidth / 2}`;

    if (isTabletSize) {
        return (
            <ContentLoader viewBox={`0 0 ${maxWidth} 90vh`} height="90vh" width={maxWidth} {...props}>
                <rect x="0" y="0" rx="0" ry="0" width={maxWidth} height="70vh" />
                <rect x="15%" y="calc(70vh + 50px)" rx="2" ry="2" width="320" height="25" />
                <rect x="19%" y="calc(70vh + 90px)" rx="2" ry="2" width="270" height="20" />
                <rect x="23%" y="calc(70vh + 130px)" rx="2" ry="2" width="220" height="20" />
            </ContentLoader>
        );
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ContentLoader viewBox={`0 0 ${maxWidth} 800`} height={600} width={maxWidth} {...props}>
                <rect x="calc(90% - 220px)" y="70" rx="0" ry="0" width="250" height="25" />
                <rect x="calc(90% - 220px)" y="110" rx="5" ry="5" width="80" height="20" />
                <circle cx="calc(90% - 200px)" cy="170" rx="15" r="15" />
                <circle cx="calc(90% - 160px)" cy="170" rx="15" r="15" />

                <rect x="calc(90% - 220px)" y="210" rx="5" ry="5" width="80" height="20" />
                <rect x="calc(90% - 220px)" y="250" rx="7" ry="7" width="30" height="30" />
                <rect x="calc(90% - 180px)" y="250" rx="7" ry="7" width="30" height="30" />
                <rect x="calc(90% - 140px)" y="250" rx="7" ry="7" width="30" height="30" />
                <rect x="calc(90% - 220px)" y="290" rx="5" ry="5" width="220" height="20" />
                <rect x="calc(90% - 220px)" y="340" rx="5" ry="5" width="220" height="20" />
                <rect x="calc(90% - 220px)" y="380" rx="5" ry="5" width="220" height="20" />

                <rect x="160" y="40" rx="0" ry="0" width={imageWidth} height="600" />

                <rect x="20" y="40" rx="0" ry="0" width="60" height="60" />
                <rect x="20" y="110" rx="0" ry="0" width="60" height="60" />
                <rect x="20" y="180" rx="0" ry="0" width="60" height="60" />
                <rect x="20" y="250" rx="0" ry="0" width="60" height="60" />
            </ContentLoader>
        </div>
    );
};

export default ProductDetailsLoader;
