import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size, center }) => (
    <div
        className="spinner-border"
        role="status"
        style={{
            width: `${size}rem`,
            height: `${size}rem`,
            margin: center ? 'auto auto' : 0,
        }}
    >
        <span className="sr-only">Loading...</span>
    </div>
);

Loader.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    center: PropTypes.bool,
};

Loader.defaultProps = {
    size: 3,
    center: false,
};

export default Loader;
