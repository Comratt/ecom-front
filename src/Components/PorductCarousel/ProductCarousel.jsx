import React, { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductCarousel.css';
import { useFetchProducts } from '../../context/hooks/useFetchProducts';
import { adaptProducts } from '../../context/adapters';
import { useDetectedMobileDevice } from '../../hooks/useDetectMobileDevice';

const CustomArrowRight = (props) => {
    const { className, style, onClick } = props;
    const componentClassName = classNames('arrow-right', className);

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
    const componentClassName = classNames('arrow-left', className);
    const left = 95;

    return (
        <div
            className={componentClassName}
            style={style}
            onClick={onClick}
        />
    );
};
const ProductCarousel = ({
    className, count = 4,
}) => {
    const componentClasses = classNames(
        'lib-product_related',
        className,
    );

    const [filters, setFilters] = useState({
        page: 1,
        count: (count * 2) + 1,
    });
    const { loading, result, isLastPage } = useFetchProducts(filters);
    const { isTabletSize } = useDetectedMobileDevice();

    const handlePage = (prevCount, nextCount) => (
        setTimeout(() => {
            setFilters((prevFilters) => ({
                ...prevFilters,
                page: ((nextCount > prevCount) && !isLastPage)
                    ? prevFilters.page + 1
                    : prevFilters.page,
            }));
        }, 700)
    );

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: isTabletSize ? 2 : count,
        slidesToScroll: isTabletSize ? 2 : count,
        nextArrow: <CustomArrowRight />,
        prevArrow: <CustomArrowLeft />,
        beforeChange: handlePage,
    };

    return (
        <div className="lib-product_related_content">
            <div className="lib-product_related_title">
                Related Products
            </div>
            <div className="lib-product_related_slider">
                <Slider {...settings}>
                    {result && adaptProducts({ data: result }).map((product) => (
                        <div className="lib-product_related_card">
                            <img className="lib-product_related_img" src={product.image} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default ProductCarousel;
