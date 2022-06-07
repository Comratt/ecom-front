import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import { useAsync } from 'react-async-hook';
import classNames from 'classnames';
import { Title } from 'Components/Title';
import { BottomModal } from 'Components/BottomModal';
import ProductsService from 'Services/ProductsService';
import { Filters } from 'Icons';
import CheckboxFilterItem from '../CheckboxFilterItem/CheckboxFilterItem';
import { useDetectedMobileDevice } from '../../hooks/useDetectMobileDevice';

import './CheckboxFilter.css';

export const CheckboxFilter = ({
    className,
    handleSortBy,
    handleFilterBy,
    handleAvailable,
    collectionId,
    resetFilters,
    filtersDiff,
    isFiltered,
    categories,
    filters,
}) => {
    const [isOpen, setOpen] = useState(false);
    const { isTabletSize } = useDetectedMobileDevice();
    const { result: minMaxPrice, loading: minMaxLoading } = useAsync(ProductsService.getMinMaxPrice, [filters.category, filters.color]);
    const { result: colors, loading: colorsLoading } = useAsync(ProductsService.getColors, [filters.category, filters.price]);
    const categoryName = categories?.find(({ id }) => +id === +collectionId)?.name || 'Категорія';

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
        <>
            <BottomModal
                isOpen={isOpen}
                setOpen={setOpen}
                filters={filters}
                handleSortBy={handleSortBy}
                handleFilterBy={handleFilterBy}
                handleAvailable={handleAvailable}
                minMaxPrice={minMaxPrice}
                colors={colors}
                resetFilters={resetFilters}
                isFiltered={isFiltered}
                filtersDiff={filtersDiff}
            />
            <Sticky isSticky={false} topOffset={-50} className={componentClasses}>
                {({ style }) => (
                    <div
                        style={{
                            ...style,
                            top: 50,
                        }}
                        className="checkbox-filter__container"
                    >
                        <Title type={2}>{categoryName}</Title>
                        <div className={checkBoxContainerDesktop}>
                            <CheckboxFilterItem
                                filters={filters}
                                handleSortBy={handleSortBy}
                                handleFilterBy={handleFilterBy}
                                handleAvailable={handleAvailable}
                                minMaxPrice={minMaxPrice}
                                colors={colors}
                                resetFilters={resetFilters}
                                isFiltered={isFiltered}
                            />
                        </div>
                        <div
                            className={classNames(
                                checkBoxContainerMobile,
                                { filtered: isFiltered },
                            )}
                        >
                            <Filters
                                onClick={() => setOpen(true)}
                                className={classNames('filter-icon', { filtered: isFiltered })}
                            />
                        </div>
                    </div>
                )}
            </Sticky>
        </>
    );
};

CheckboxFilter.propTypes = {
    className: PropTypes.string,
};

CheckboxFilter.defaultProps = {
    className: '',
};
