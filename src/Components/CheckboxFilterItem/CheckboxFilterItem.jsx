import React, { useState } from 'react';
import classNames from 'classnames';
import './CheckboxFilterItem.css';
import PropTypes from 'prop-types';

const CheckboxFilterItem = (
    className,
) => {
    const initialData = [
        { name: 'Collection', id: 1 },
        { name: 'Product Type', id: 2 },
        { name: 'Price', id: 3 },
        { name: 'Size', id: 4 },
        { name: 'Colors', id: 5 },
    ];

    const [filterItem, setFilterItem] = useState(initialData);

    const componentClasses = classNames(
        'lib-checkboxFilterItem',
        className,
    );

    return (
        <>
            <div className={componentClasses}>
                <div className="filters__items">
                    {filterItem.map((filterItem) => (
                        <div className="filters__item" key={filterItem.id}>
                            <span className="filters__text">{filterItem.name}</span>
                            <span className="arrow" />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

CheckboxFilterItem.propTypes = {
    className: PropTypes.string,
};

CheckboxFilterItem.defaultProps = {
    className: '',
};

export default CheckboxFilterItem;
