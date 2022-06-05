import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Title.css';

export const Title = ({
    type, children, className, tabIndex, ...rest
}) => {
    const H = `h${type}`;

    const componentClasses = classNames(
        'lib-title',
        `lib-title-${type}`,
        className,
    );

    return (
        <H {...rest} className={componentClasses} tabIndex={tabIndex}>
            {children}
        </H>
    );
};

Title.propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    children: PropTypes.node.isRequired,
    tabIndex: PropTypes.number,
};

Title.defaultProps = {
    className: '',
    tabIndex: null,
    type: 1,
};
