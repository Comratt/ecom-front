import React from 'react';
import classNames from 'classnames';

import { View } from '../View';
import { Card } from '../Card';

import './CardList.css';

export const CardList = ({ className }) => {
    const componentClasses = classNames('card-list', className);

    return (
        <View className={componentClasses}>
            {[1, 2, 3, 4].map((i) => (
                <Card
                    key={i}
                    imagePath="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/26-05-202170942_2048x2048.jpg?v=1623096447"
                    detailsPath="/"
                    price={1777}
                    title="V-neck camisole"
                />
            ))}
        </View>
    );
};
