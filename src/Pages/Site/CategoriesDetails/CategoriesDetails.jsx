import React from 'react';
import './CategoriesDetails.css';
import classNames from 'classnames';
import CollectionList from '../../../Components/CollectionList';
import CheckboxFilterItem from '../../../Components/CheckboxFilterItem';
import { SliderCardList } from '../../../Components/SliderCardList';
import { Card } from '../../../Components/Card';

export const CategoriesDetails = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-product_categories_details',
        className,
    );

    return (
        <div className={componentClasses}>
            <CollectionList />
            <div className="lib-product_categories_details_card_list">
                <CheckboxFilterItem />
                <Card />
            </div>
        </div>
    );
};
