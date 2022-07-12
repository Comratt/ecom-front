import React from 'react';
import classNames from 'classnames';
import './Button.css';
import Loader from 'react-loader-spinner';

const Button = ({
    loading, className, variant, disabled, ...props
}) => {
    const componentClassName = classNames(
        'lib-custom-button',
        { primary: variant === 'primary' },
        { solid: variant === 'solid' },
        { dark: variant === 'dark' },
        { logout: variant === 'logout' },
        className,
        { loading },
    );
    const colorStyle = variant === 'solid' ? 'white' : 'var(--color-accent)';

    return (
        <button disabled={disabled} type={loading ? 'button' : 'submit'} className={componentClassName} {...props}>
            {loading && (
                <Loader
                    className="lib-custom-button_button-loader"
                    type="Oval"
                    height={20}
                    width={20}
                    color={colorStyle}
                    radius={16}
                />
            )}
            {props.children}
        </button>
    );
};

export default Button;
