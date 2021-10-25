import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import './LoginBtn.css';

const LoginBtn = ({ loading }) => (
    <div className="lib-product_info_submit">
        <button type="submit">
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
            Sign In
        </button>
    </div>
);

export default LoginBtn;
