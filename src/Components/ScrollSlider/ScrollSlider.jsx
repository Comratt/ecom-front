import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { scrollToElm } from 'Helpers';
import { extensionRegExp } from 'Constants';

import './ScrollSlider.css';

const ItemVideo = ({
    path = '', ext = '', className, onClick,
}) => {
    const extWithoutDot = ext.replace('.', '');

    return (
        <video id="scroll-full-screenVideo" onClick={onClick} className={className} height="100%" width="100%" autoPlay playsInline muted loop>
            <source src={path} type={`video/${extWithoutDot}`} />
        </video>
    );
};

const getSliderBody = (image = '', className, onClick) => {
    const extension = image.match(extensionRegExp)?.[0];
    const toggleFullScreen = () => {
        const el = document.getElementById('scroll-full-screenVideo');

        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    };

    if (!['.webp', '.jpeg', '.jpg'].includes(extension)) {
        return <ItemVideo path={image} ext={extension} className={className} onClick={toggleFullScreen} />;
    }

    return (
        <img
            alt="Галерея колекцій"
            className="image-inner"
            src={image}
            onClick={onClick}
        />
    );
};

const getSliderSide = (image = '', className, onClick) => {
    const extension = image.match(extensionRegExp)?.[0];

    if (!['.webp', '.jpeg', '.jpg'].includes(extension)) {
        return <ItemVideo path={image} ext={extension} className={className} onClick={onClick} />;
    }

    return (
        <img
            onClick={onClick}
            className={className}
            key={image}
            src={image}
            alt="product details"
        />
    );
};

export const ScrollSlider = ({ data, setModalOpen }) => {
    const imagesRef = useRef({});
    const containerRef = useRef();
    const [activeImage, setActiveImage] = useState(data[0]);
    const [isBlockScroll, setBlockScroll] = useState(false);
    const thumbnailImageClassName = (src) => classNames('thumbnail-image', { active: src === activeImage });

    useEffect(() => {
        if (activeImage && imagesRef.current && imagesRef.current[activeImage] && isBlockScroll) {
            scrollToElm(containerRef.current, imagesRef.current[activeImage], 1);
        }
    }, [activeImage, isBlockScroll]);
    const getImagesDimensions = () => {
        if (imagesRef.current) {
            return Object.keys(imagesRef.current).reduce((acc, key) => ({
                ...acc,
                [key]: imagesRef.current[key].getBoundingClientRect().top - 200,
            }), {});
        }

        return {};
    };

    return (
        <div className="scroll-slider">
            <div className="scroll-slider_thumbnails">
                {data.map((imageSrc) => getSliderSide(imageSrc, thumbnailImageClassName(imageSrc), () => {
                    setBlockScroll(true);
                    setActiveImage(imageSrc);
                }))}
            </div>
            <div className="scroll-slider_content">
                <div
                    ref={containerRef}
                    className="scroll-slider_content-inner"
                    onScroll={() => {
                        if (!isBlockScroll) {
                            const active = Object.keys(getImagesDimensions())
                                .filter((key) => getImagesDimensions()[key] < containerRef.current.offsetTop);

                            setActiveImage(active[active.length - 1]);
                        }
                    }}
                    onMouseOver={() => setBlockScroll(false)}
                >
                    {data.map((imageSrc) => (
                        <div
                            key={imageSrc}
                            ref={(imgRef) => imagesRef.current[imageSrc] = imgRef}
                            className="image-wrapper"
                        >
                            {getSliderBody(imageSrc, 'image-inner', () => setModalOpen(imageSrc))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
