import React, { useMemo, useState, useEffect } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import { Link } from 'Components/Link';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Title } from 'Components/Title';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import { useFetchProducts } from 'context/hooks/useFetchProducts';
import { adaptProducts } from 'context/adapters';
import { CatalogLoader } from 'Components/SkeletonLoader';
import { SliderWithDisableVerticalScroll } from 'Components/Slider/SliderWithDisableVerticalScroll';

import { Card } from '../Card';

import './SliderCardList.css';

const CustomArrowLeft = (props) => {
    const { className, style, onClick } = props;
    const componentClassName = classNames('arrow-left', className);

    return (
        <button
            aria-label="Попередній слайд"
            type="button"
            className={componentClassName}
            style={style}
            onClick={onClick}
        />
    );
};

const CustomArrowRight = (props) => {
    const {
        className, style, onClick, ...rest
    } = props;
    const componentClassName = classNames('arrow-right', className);

    return (
        <button
            aria-label="Наступний слайд"
            type="button"
            className={componentClassName}
            style={style}
            onClick={onClick}
        />
    );
};

export const SliderCardList = ({
    count = 4,
    title,
    category,
    hideColors,
}) => {
    const [filters, setFilters] = useState({
        page: 1,
        count: (count * 2) + 1,
        category: category || [],
    });
    const {
        loading,
        result,
        isLastPage,
    } = useFetchProducts(filters);
    const { isTabletSize } = useDetectedMobileDevice();
    const collectionLink = useMemo(() => {
        if (category && category?.length) {
            return `/collection/${category[0]}`;
        }

        return '/collection';
    }, [category]);

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

    useEffect(() => {
        if (result && result?.length) {
            let index = 0;
            const items = result.map((product) => {
                const quantity = product.colors?.reduce((acc, val) => acc + val.quantity, 0);

                return product.colors?.map((color) => {
                    index += 1;

                    return ({
                        item_name: product.name,
                        item_id: product.product_id,
                        price: parseFloat(product.price),
                        item_brand: product.name,
                        item_category: title,
                        item_variant: color?.name_value,
                        index,
                        quantity,
                    });
                });
            });

            window.dataLayer?.push({ ecommerce: null });
            window.dataLayer?.push({
                event: 'view_item_list',
                ecommerce: {
                    items: items.flat(),
                },
            });
        }
    }, [result]);

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

    if (!loading && !result?.length) {
        return null;
    }

    if (loading) {
        return <CatalogLoader row={1} column={count} widthPadding={30} />;
    }

    return (
        <div className="lib-slider-card">
            <div className="slider-card-list-header">
                <Link to={collectionLink} className="list-link">
                    <Title type={2}>{title}</Title>
                </Link>
                <Link to={collectionLink} className="list-link">
                    Подивитись все
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                            fill="currentColor"
                        />
                    </svg>
                </Link>
            </div>
            <LazyLoadComponent>
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
                                images={product.images}
                                discount={product.discount}
                                purePrice={product.purePrice}
                                hideColors={hideColors}
                                category={product?.category}
                            />
                        ))}
                    </Slider>
                </SliderWithDisableVerticalScroll>
            </LazyLoadComponent>
        </div>
    );
};
