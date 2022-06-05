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
    categories,
    filters,
}) => {
    const [isOpen, setOpen] = useState(false);
    const { isTabletSize } = useDetectedMobileDevice();
    const { result: minMaxPrice, loading: minMaxLoading } = useAsync(ProductsService.getMinMaxPrice, [filters.category]);
    const { result: colors, loading: colorsLoading } = useAsync(ProductsService.getColors, [filters.category]);
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
            {(!minMaxLoading && !colorsLoading) && (
                <BottomModal
                    isOpen={isOpen}
                    setOpen={setOpen}
                    filters={filters}
                    handleSortBy={handleSortBy}
                    handleFilterBy={handleFilterBy}
                    handleAvailable={handleAvailable}
                    minMaxPrice={minMaxPrice}
                    colors={colors}
                />
            )}
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
                            />
                        </div>
                        <div className={checkBoxContainerMobile}>
                            <Filters onClick={() => setOpen(true)} />
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
