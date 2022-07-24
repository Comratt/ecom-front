import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContentLoader from 'react-content-loader';

const ProductCardHorizontal = ({ rows = 2, ...props }) => {
    const items = () => {
        const row = [];

        for (let i = 0; i < rows; i++) {
            const y1 = (150 * i) + 20;
            const y2 = (150 * i) + 20;
            const y3 = (150 * i) + 50;
            const y4 = (150 * i) + 70;
            const y5 = (150 * i) + 90;

            row.push(
                <Fragment key={uuidv4()}>
                    <rect x="12" y={y1} rx="5" ry="5" width="100" height="140" />
                    <rect x="132" y={y2} rx="5" ry="5" width="170" height="20" />
                    <rect x="132" y={y3} rx="5" ry="5" width="140" height="15" />
                    <rect x="132" y={y4} rx="5" ry="5" width="140" height="15" />
                    <rect x="132" y={y5} rx="5" ry="5" width="140" height="15" />
                </Fragment>,
            );
        }

        return row;
    };

    return (
        <ContentLoader
            viewBox={`0 0 300 ${rows * 200}`}
            width={300}
            height={rows * 200}
            title="Loading news..."
            {...props}
        >
            {items()}
        </ContentLoader>
    );
};

export default ProductCardHorizontal;
