import React, { useEffect, useRef } from 'react';

let firstClientX;
let clientX;

const preventTouch = (e) => {
    const minValue = 5; // threshold

    clientX = e.touches[0].clientX - firstClientX;

    if (Math.abs(clientX) > minValue) {
        e.preventDefault();
        e.returnValue = false;

        return false;
    }
};

const touchStart = (e) => {
    firstClientX = e.touches[0].clientX;
};

export const SliderWithDisableVerticalScroll = ({ children }) => {
    const containerRef = useRef();

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('touchstart', touchStart);
            containerRef.current.addEventListener('touchmove', preventTouch, {
                passive: false,
            });
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('touchstart', touchStart);
                containerRef.current.removeEventListener('touchmove', preventTouch, {
                    passive: false,
                });
            }
        };
    });

    return (
        <div ref={containerRef}>
            {children}
        </div>
    );
};
