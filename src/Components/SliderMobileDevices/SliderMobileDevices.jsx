import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './SliderMobile.css';

const SliderMobileDevices = ({ data, setModalOpen }) => {
    const settings = {
        dots: true,
    };

    return (
        <Slider {...settings}>
            {data.map((imageSrc) => (
                <img
                    src={imageSrc}
                    alt="product details"
                    onClick={() => setModalOpen(imageSrc)}
                />
            ))}

        </Slider>
    );
};

export default SliderMobileDevices;
