import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckboxFilterItem from '../CheckboxFilterItem/CheckboxFilterItem';
import { useDetectedMobileDevice } from '../../hooks/useDetectMobileDevice';

import Relevance from '../../Icons/Relevance';
import Filters from '../../Icons/Filters';
import './CheckboxFilter.css';

const CheckboxFilter = ({
    className,
}) => {
    const initialOptions = [
        { name: 'Relevance', id: 1 },
        { name: 'Title A-Z', id: 2 },
        { name: 'Title Z-A', id: 3 },
        { name: 'Date | Old to New', id: 4 },
        { name: 'Date | New to Old', id: 5 },
        { name: 'Price | Low to high', id: 6 },
        { name: 'Price | High to Low', id: 7 },
        { name: 'Discount', id: 8 },
    ];

    const [options, setOption] = useState(initialOptions);
    const { isTabletSize } = useDetectedMobileDevice();

    const componentClasses = classNames(
        'lib-checkboxFilter',
        'wrapper',
        className,
    );
    const checkBoxContainerDesktop = classNames(
        'checkBoxContainerDesktop',
        { desktop: isTabletSize },
    );

    const checkBoxContainerMobile = classNames(
        'checkBoxContainerMobile',
        { mobile: !isTabletSize },
    );

    return (
        <div className={componentClasses}>
            <div className="upper__filter">
                <h2 className="title__text">Coming Soon</h2>
                <div className={checkBoxContainerDesktop}>
                    <CheckboxFilterItem />
                </div>
                <div className={checkBoxContainerMobile}>
                    <div className="wrapperSort sort__mobile">
                        <span className="sort__mobile svg">
                            <Relevance />
                        </span>
                        <select className="sort__select mobile">
                            {options.map((option) => (
                                <option key={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="wrapperSort sort__mobile filter">
                        <span className="sort__mobile svg">
                            <Filters />
                        </span>
                        <div className="modalButton">
                            <span className="modalButton__text">Filters</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lower__filter">
                <div className="counter">
                    <div className="counter__amount">82</div>
                    <span className="counter__text">products</span>
                </div>
                <div className="sort">
                    <span className="sort__text">Sorting:</span>
                    <select className="sort__select">
                        {options.map((option) => (
                            <option key={option.id}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

CheckboxFilter.propTypes = {
    className: PropTypes.string,
};

CheckboxFilter.defaultProps = {
    className: '',
};

export default CheckboxFilter;
