import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './SliderModal.css';

export const SliderModal = ({ onClose, children }) => {
    const modalRoot = useRef(document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(modalRoot.current);

        return () => document.body.removeChild(modalRoot.current);
    });

    return createPortal(
        <div className="lib-slider-modal_overlay">
            <div className="lib-slider-modal_content">{children}</div>
        </div>,
        modalRoot.current,
    );
};
