import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderWithDisableVerticalScroll } from 'Components/Slider/SliderWithDisableVerticalScroll';

import './SliderMobile.css';

const SliderMobileDevices = ({ data, setModalOpen }) => {
    const settings = {
        dots: true,
        arrows: false,
    };

    return (
        <SliderWithDisableVerticalScroll>
            <Slider className="slider-mobile" {...settings}>
                {data.map((imageSrc) => (
                    <img
                        key={imageSrc}
                        src={imageSrc}
                        alt="product details"
                        onClick={() => setModalOpen(imageSrc)}
                    />
                ))}
            </Slider>
        </SliderWithDisableVerticalScroll>
    );
};

export default SliderMobileDevices;
