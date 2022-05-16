import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { View } from '../View';
import { Card } from '../Card';

import './CardList.css';

export const CardList = ({
    className,
    data,
    images,
    loading,
    isLastPage,
    currentPage,
    handlePageCount,
}) => {
    const containerRef = useRef();
    const [isBottom, setIsBottom] = useState(false);
    const componentClasses = classNames('card-list', className);

    useEffect(() => {
        if (isBottom && !isLastPage) {
            handlePageCount(currentPage + 1);
        }
    }, [isBottom]);

    useScrollPosition(({ currPos: { y } }) => {
        if (containerRef.current) {
            const offsetY = y + containerRef.current.offsetHeight;

            setIsBottom(offsetY < 1000);
        }
    }, [], containerRef, false, 250);

    if (loading) {
        return (
            <div>Завантаження...</div>
        );
    }

    return (
        <div ref={containerRef}>
            <View className={componentClasses}>
                {data.map((product) => (
                    <Card
                        cardId={product.id}
                        key={product.id}
                        imagePath={product.image}
                        detailsPath={product.link}
                        price={product.price}
                        title={product.name}
                        colors={product.colors}
                        images={images}
                    />
                ))}
            </View>
        </div>
    );
};

CardList.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        price: PropTypes.string,
        name: PropTypes.string,
        link: PropTypes.string,
        colors: PropTypes.arrayOf(PropTypes.shape({})),
    })).isRequired,
};

CardList.defaultProps = {
    className: '',
};
