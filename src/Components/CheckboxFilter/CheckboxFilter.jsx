import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'react-sticky';
import classNames from 'classnames';
import { Title } from 'Components/Title';
import { BottomModal } from 'Components/BottomModal';
import { Filters } from 'Icons';
import CheckboxFilterItem from '../CheckboxFilterItem/CheckboxFilterItem';
import { useDetectedMobileDevice } from '../../hooks/useDetectMobileDevice';

import './CheckboxFilter.css';

export const CheckboxFilter = ({
    className,
    handleSortBy,
    handleFilterBy,
    handleAvailable,
    filters,
}) => {
    const [isOpen, setOpen] = useState(false);
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
        <>
            <BottomModal isOpen={isOpen} setOpen={setOpen} />
            <Sticky isSticky={false} topOffset={-50} className={componentClasses}>
                {({ style }) => (
                    <div
                        style={{
                            ...style,
                            top: 50,
                        }}
                        className="checkbox-filter__container"
                    >
                        <Title type={2}>Coming Soon</Title>
                        <div className={checkBoxContainerDesktop}>
                            <CheckboxFilterItem
                                filters={filters}
                                handleSortBy={handleSortBy}
                                handleFilterBy={handleFilterBy}
                                handleAvailable={handleAvailable}
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
