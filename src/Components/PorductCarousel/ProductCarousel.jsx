import React, { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useFetchProducts } from 'context/hooks/useFetchProducts';
import { adaptProducts } from 'context/adapters';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import { Card } from 'Components/Card';
import { SliderWithDisableVerticalScroll } from 'Components/Slider/SliderWithDisableVerticalScroll';

import './ProductCarousel.css';

const CustomArrowRight = (props) => {
    const { className, style, onClick } = props;
    const componentClassName = classNames('arrow-right-carousel', className);

    return (
        <div
            className={componentClassName}
            style={style}
            onClick={onClick}
        />
    );
};
const CustomArrowLeft = (props) => {
    const { className, style, onClick } = props;
    const componentClassName = classNames('arrow-left-carousel', className);

    return (
        <div
            className={componentClassName}
            style={style}
            onClick={onClick}
        />
    );
};
const ProductCarousel = ({
    className,
    hideColors,
    title,
    count = 4,
    id = null,
}) => {
    const componentClasses = classNames(
        'lib-product_related',
        className,
    );

    const [filters, setFilters] = useState({
        page: 1,
        count: (count * 2) + 1,
        id,
    });
    const { loading, result, isLastPage } = useFetchProducts(filters);
    const { isTabletSize } = useDetectedMobileDevice();

    const handlePage = (prevCount, nextCount) => (
        setTimeout(() => {
            if ((nextCount > prevCount) && !isLastPage) {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: prevFilters.page + 1,
                }));
            }
        }, 700)
    );

    const settings = {
        speed: 500,
        slidesToShow: isTabletSize ? 2 : count,
        slidesToScroll: isTabletSize ? 2 : count,
        draggable: false,
        lazyLoad: true,
        infinite: false,
        adaptiveHeight: true,
        nextArrow: <CustomArrowRight />,
        prevArrow: <CustomArrowLeft />,
        beforeChange: handlePage,
    };

    return (
        <div className="lib-product_related_content">
            <div className="lib-product_related_title">
                {title}
            </div>
            <div className="lib-product_related_slider">
                <SliderWithDisableVerticalScroll>
                    <Slider {...settings}>
                        {result && adaptProducts({ data: result }).map((product) => (
                            <Card
                                cardId={product.id}
                                key={product.id}
                                imagePath={product.image}
                                detailsPath={product.link}
                                price={product.price}
                                title={product.name}
                                colors={product.colors}
                                hideColors={hideColors}
                            />
                        ))}
                    </Slider>
                </SliderWithDisableVerticalScroll>
            </div>
        </div>
    );
};

export default ProductCarousel;
