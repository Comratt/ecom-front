import React from 'react';
import classNames from 'classnames';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './LoginBtn.css';

const LoginBtn = ({ loading, text = 'Sign In', className }) => {
    const componentClassName = classNames('lib-product_info_submit', className, { loading });

    return (
        <div className={componentClassName}>
            <button type={loading ? 'button' : 'submit'}>
                {loading && (
                    <Loader
                        className="button-loader"
                        type="Oval"
                        height={20}
                        width={20}
                        color="var(--color-accent)"
                        radius={16}
                    />
                )}
                {text}
            </button>
        </div>
    );
};

export default LoginBtn;
