import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = forwardRef(({
    name, type, required, placeholder, label, error, ...restProps
}, ref) => (
    <div style={{ position: 'relative' }} className="lib-input-admin">
        {label && <label htmlFor={name}>{label}</label>}
        <input
            name={name}
            ref={ref}
            type={type}
            className={classNames('form-control', { 'is-invalid': error })}
            id={name}
            placeholder={placeholder}
            required={required}
            {...restProps}
        />
        {error && (
            <div className="invalid-tooltip show">
                {error}
            </div>
        )}
    </div>
));

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};

Input.defaultProps = {
    name: '',
    type: 'text',
    label: '',
    error: '',
    placeholder: '',
    required: false,
};

export default Input;
