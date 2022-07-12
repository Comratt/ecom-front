import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { scrollToElm } from 'Helpers';

import './ScrollSlider.css';

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
                {data.map((imageSrc) => (
                    <img
                        onClick={() => {
                            setBlockScroll(true);
                            setActiveImage(imageSrc);
                        }}
                        className={thumbnailImageClassName(imageSrc)}
                        key={imageSrc}
                        src={imageSrc}
                        alt="product details"
                    />
                ))}
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
                            <img
                                className="image-inner"
                                src={imageSrc}
                                onClick={() => setModalOpen(imageSrc)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
