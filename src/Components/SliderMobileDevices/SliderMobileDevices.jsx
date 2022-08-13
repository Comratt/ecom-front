import React from 'react';
import Slider from 'react-slick';
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

const ItemImage = ({ image, onClick }) => (
    <img
        src={image}
        alt="product details"
        onClick={onClick}
    />
);

const getSliderBody = (image = '', onClick) => {
    const extension = image.match(extensionRegExp)?.[0];

    if (!['.webp', '.jpeg', '.jpg'].includes(extension.toLowerCase())) {
        return <ItemVideo path={image} ext={extension} />;
    }

    return <ItemImage image={image} onClick={onClick} />;
};

const SliderMobileDevices = ({ data, setModalOpen }) => {
    const settings = {
        dots: true,
        arrows: false,
    };

    return (
        <SliderWithDisableVerticalScroll>
            <Slider className="slider-mobile" {...settings}>
                {data.map((imageSrc) => getSliderBody(imageSrc, () => setModalOpen(imageSrc)))}
            </Slider>
        </SliderWithDisableVerticalScroll>
    );
};

export default SliderMobileDevices;
