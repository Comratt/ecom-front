import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './Link.css';

export const Link = ({
    children,
    to,
    className,
    ...rest
}) => {
    const componentClasses = classNames('lib-link', className);

    return (
        <NavLink
            to={to}
            className={componentClasses}
            {...rest}
        >
            {children}
        </NavLink>
    );
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ]).isRequired,
    className: PropTypes.string,
};

Link.defaultProps = {
    className: '',
};
