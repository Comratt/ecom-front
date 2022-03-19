import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import { useFetchProducts } from 'context/hooks/useFetchProducts';
import { adaptProducts } from 'context/adapters';
import { AccardionArrow } from '../../Icons';
import { Card } from '../Card';

import './SliderCardList.css';

const CustomArrowLeft = (props) => {
    const { className, style, onClick } = props;
    const componentClassName = classNames('arrow-left', className);

    return (
        <div
            className={componentClassName}
            style={style}
            onClick={onClick}
        />
    );
};

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

export const SliderCardList = ({ count = 4 }) => {
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
        speed: 500,
        slidesToShow: isTabletSize ? 2 : count,
        slidesToScroll: isTabletSize ? 2 : count,
        draggable: false,
        lazyLoad: false,
        infinite: false,
        adaptiveHeight: true,
        nextArrow: <CustomArrowRight />,
        prevArrow: <CustomArrowLeft />,
        beforeChange: handlePage,
    };

    if (loading) {
        return 'Loading...';
    }

    return (
        <div>
            <section className="lib-card_title">
                <Link to="/categoriesdetails" className="lib-card_title_btn">sale</Link>
                <Link to="/categoriesdetails" className="lib-card_title_btn">
                    view all
                    <AccardionArrow
                        width={25}
                        style={{ transform: 'rotate(265deg)' }}
                        fill="#887569"
                    />
                </Link>
            </section>
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
                        images={product.images}
                    />
                ))}
            </Slider>
        </div>
    );
};
