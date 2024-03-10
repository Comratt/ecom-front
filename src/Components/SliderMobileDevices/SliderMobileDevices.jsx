import React, { useState } from 'react';
import Slider from 'react-slick';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderWithDisableVerticalScroll } from 'Components/Slider/SliderWithDisableVerticalScroll';
import { extensionRegExp } from 'Constants';

import './SliderMobile.css';

const ItemVideo = ({ path = '', ext = '' }) => {
    const extWithoutDot = ext.replace('.', '');
    const toggleFullScreen = () => {
        const el = document.getElementById('slide-full-screenVideo');

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

    return (
        <video
            id="slide-full-screenVideo"
            onClick={toggleFullScreen}
            className="video-item"
            height="100%"
            width="100%"
            autoPlay
            playsInline
            muted
            loop
        >
            <source src={`${path}?ngsw-bypass=true`} type={`video/${extWithoutDot}`} />
        </video>
    );
};

const ItemImage = ({ image, onClick }) => {
    const [imgLoad, setImgLoad] = useState(true);

    return (
        <img
            src={image}
            fetchpriority="high"
            decoding="async"
            style={imgLoad ? {
                width: '100%',
                height: '100vh',
            } : null}
            alt="product details"
            // onLoad={() => setImgLoad(false)}
            onClick={onClick}
        />
    );
};

const getSliderBody = (image = '', onClick) => {
    const extension = image.match(extensionRegExp)?.[0];

    if (!['.webp', '.jpeg', '.jpg'].includes(extension.toLowerCase())) {
        return <ItemVideo key={image} path={image} ext={extension} />;
    }

    return <ItemImage key={image} image={image} onClick={onClick} />;
};

const SliderMobileDevices = ({ data, setModalOpen }) => {
    const settings = {
        dots: true,
        arrows: false,
    };

    return (
        <LazyLoadComponent>
            <SliderWithDisableVerticalScroll>
                <Slider className="slider-mobile" {...settings}>
                    {data.map((imageSrc) => getSliderBody(imageSrc, () => setModalOpen(imageSrc)))}
                </Slider>
            </SliderWithDisableVerticalScroll>
        </LazyLoadComponent>
    );
};

export default SliderMobileDevices;
