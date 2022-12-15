import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import { useAsync } from 'react-async-hook';
import classNames from 'classnames';
import { numberify } from 'apparel-sorter';
import { Title } from 'Components/Title';
import { BottomModal } from 'Components/BottomModal';
import ProductsService from 'Services/ProductsService';
import Filters from 'Icons/Filters';
import CheckboxFilterItem from '../CheckboxFilterItem/CheckboxFilterItem';
import { useDetectedMobileDevice } from '../../hooks/useDetectMobileDevice';

import './CheckboxFilter.css';

const adaptedMess = (data = []) => data?.filter((item) => !!item?.name);

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
    let { result: colors, loading: colorsLoading } = useAsync(ProductsService.getColors, [filters.category, filters.price]);
    const { result: sizes, loading: sizesLoading } = useAsync(ProductsService.getSizes, [filters.category, filters.price]);
    const categoryName = categories?.find(({ id }) => +id === +collectionId)?.name || 'Категорія';
    const sortedSizes = adaptedMess(sizes)?.sort(({ name: size1 }, { name: size2 }) => numberify(size1) - numberify(size2));

    colors = adaptedMess(colors);

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
                sizes={sortedSizes}
                resetFilters={resetFilters}
                isFiltered={isFiltered}
                filtersDiff={filtersDiff}
                collectionId={collectionId}
                subcategories={categories?.find(({ id }) => +id === +collectionId)?.subcategories}
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
                                sizes={sortedSizes}
                                resetFilters={resetFilters}
                                isFiltered={isFiltered}
                                filtersDiff={filtersDiff}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className={classNames(
                                checkBoxContainerMobile,
                                { filtered: isFiltered },
                            )}
                        >
                            Фільтр
                            <Filters
                                className={classNames('filter-icon', { filtered: isFiltered })}
                            />
                        </button>
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
