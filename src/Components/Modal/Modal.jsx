import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';

import './Modal.css';

const Modal = ({
    show, toggleModal, submit, onSubmit, loadingForm, children, className = '',
}) => {
    const [showModal, setShowModal] = useState(false);
    const modalRoot = useRef(document.createElement('div'));
    const element = useRef(document.getElementById('root'));
    const timer = useRef();

    useEffect(() => {
        element.current.appendChild(modalRoot.current);

        return () => {
            element.current.removeChild(modalRoot.current);
            clearTimeout(timer.current);
        };
    }, []);

    useEffect(() => {
        timer.current = setTimeout(() => setShowModal(() => show), 100);
    }, [show]);

    return ReactDOM.createPortal((
        <>
            <div
                className={classNames('modal fade d-block', className, { show: showModal })}
                id="staticBackdropLive"
                data-backdrop="static"
                data-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLiveLabel"
                aria-modal="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Модальна назва</h5>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {submit ? (
                            <form className="needs-validation" onSubmit={onSubmit} noValidate>
                                <div className="modal-body">
                                    {children}
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={toggleModal}
                                    >
                                        Закрити
                                    </button>
                                    <button type="submit" className="btn btn-primary" disabled={loadingForm}>
                                        {loadingForm && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />}
                                        <span className="ml-1">Зберегти</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="modal-body">
                                {children}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={classNames('modal-backdrop fade', { show: showModal })} />
        </>
    ), modalRoot.current);
};

Modal.propTypes = {
    show: PropTypes.bool,
    submit: PropTypes.bool,
    toggleModal: PropTypes.func,
    children: PropTypes.node,
};

Modal.defaultProps = {
    show: false,
    submit: false,
    toggleModal: () => {
    },
    children: <></>,
};

export default Modal;
