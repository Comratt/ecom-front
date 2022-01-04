import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './CommonInput.css';

export const CommonInput = forwardRef(({
    name, type, required, placeholder, label, error, className, ...restProps
}, ref) => (
    <div className="lib-input__common">
        {label && <label className="lib-input__common-label" htmlFor={name}>{label}</label>}
        <input
            id={name}
            name={name}
            ref={ref}
            className={classNames('input', className, { 'field-error': error })}
            placeholder={placeholder}
            type={type}
            {...restProps}
        />
        {error && <p className="field-message__error">{error}</p>}
    </div>
));

CommonInput.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

CommonInput.defaultProps = {
    className: '',
    name: '',
    type: 'text',
    label: '',
    error: '',
    placeholder: '',
    required: false,
};
