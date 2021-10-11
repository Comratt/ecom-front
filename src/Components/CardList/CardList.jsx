import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { View } from '../View';
import { Card } from '../Card';

import './CardList.css';

export const CardList = ({ className, data, images }) => {
    const componentClasses = classNames('card-list', className);

    return (
        <View className={componentClasses}>
            {data && data.map((product) => (
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
