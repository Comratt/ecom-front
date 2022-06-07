import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Alert.css';

const TYPE_WARNING = 'warning';
const TYPE_SUCCESS = 'success';

const getAlertType = (type) => {
    switch (type) {
    case TYPE_SUCCESS:
        return 'alert-success';
    case TYPE_WARNING:
        return 'alert-danger';
    default:
        return 'alert-secondary';
    }
};

const Alert = ({ text, type }) => {
    const timer = useRef(0);
    const [show, setShow] = useState(true);

    useEffect(() => {
        timer.current = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearInterval(timer.current);
        };
    }, []);

    const handleClose = () => setShow(false);

    return (
        <div
            className={classNames(`alert alert-dismissible fade ${getAlertType(type)}`, { show, hide: !show })}
            role="alert"
            style={{ width: '100%' }}
            onClick={handleClose}
        >
            <strong>{text}</strong>
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

Alert.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf([TYPE_WARNING, TYPE_SUCCESS]),
};

Alert.defaultProps = {
    text: '',
    type: TYPE_SUCCESS,
};

export default Alert;
