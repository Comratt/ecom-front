import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';
import { v4 as uuidv4 } from 'uuid';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import { View } from '../View';

const CatalogLoader = ({
    row = 2,
    column = 3,
    padding = 12,
    borderRadius = 4,
    widthPadding = 0,
    ...props
}) => {
    const { clientWidth, isDesktopSize } = useDetectedMobileDevice();
    const maxWidth = clientWidth > 1440 ? (1440 - widthPadding) : (clientWidth - widthPadding);
    const maxColumn = isDesktopSize ? 2 : column;
    const list = [];

    let height;

    for (let i = 1; i <= row; i++) {
        for (let j = 0; j < maxColumn; j++) {
            const itemWidth = (maxWidth - padding * (maxColumn + 1)) / maxColumn;

            const x = padding + j * (itemWidth + padding);

            const height1 = itemWidth;

            const height2 = 20;

            const height3 = 20;

            const space = padding + height1 + (padding / 2 + height2) + height3 + padding * 4;

            const y1 = padding + padding * 2 + space * (i - 1);

            const y2 = y1 + padding + height1;

            const y3 = y2 + padding / 2 + height2;

            list.push(
                <Fragment key={uuidv4()}>
                    <rect
                        x={x}
                        y={y1}
                        rx={borderRadius}
                        ry={borderRadius}
                        width={itemWidth}
                        height={height1}
                    />
                    <rect x={x} y={y2} rx={0} ry={0} width={itemWidth} height={height2} />
                    <rect
                        x={x}
                        y={y3}
                        rx={0}
                        ry={0}
                        width={itemWidth * 0.6}
                        height={height3}
                    />
                </Fragment>,
            );

            if (i === row) {
                height = y3 + height3;
            }
        }
    }

    return (
        <View overflowHidden>
            <ContentLoader
                // viewBox={`0 0 ${maxWidth} ${height}`}
                width={maxWidth}
                height={height}
                {...props}
            >
                {list}
            </ContentLoader>
        </View>
    );
};

export default CatalogLoader;
