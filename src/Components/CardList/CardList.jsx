import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { View } from '../View';
import { Card } from '../Card';
import { Title } from '../Title';

import './CardList.css';

export const CardList = ({
    className,
    data,
    filters,
    categories,
    images,
    loading,
    isLastPage,
    currentPage,
    handlePageCount,
}) => {
    const containerRef = useRef();
    const [isBottom, setIsBottom] = useState(false);
    const componentClasses = classNames('card-list', className);
    const flattenCategories = categories?.reduce(
        (result, { subcategories, ...restCategory }) => ([
            ...result.concat(subcategories?.map((cat) => ({
                id: cat.category_id,
                name: cat.category_name,
                ...cat,
            }))),
            restCategory,
        ]),
        [],
    );
    const selectedCategories = flattenCategories?.filter(({ id }) => filters?.category?.includes(`${id}`));
    const selectedCategoryNames = selectedCategories?.map(({ name }) => name).toString().replaceAll(',', ', ');

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

    const renderContent = () => {
        if (data.length === 0 && !loading) {
            return (
                <div className="card-list-page product-empty">
                    <Title type={2}>
                        {'В категорії '}
                        {selectedCategoryNames}
                        {' товарів в наявності немає('}
                    </Title>
                </div>
            );
        }

return (
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
            );
    };

    return (
        <div ref={containerRef}>
            {renderContent()}
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
    filters: PropTypes.shape({
        category: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        subcategories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        })),
    })).isRequired,
};

CardList.defaultProps = {
    className: '',
};
