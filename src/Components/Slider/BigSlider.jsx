import React, {
    useState, memo, useCallback, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';

import { View } from '../View';
import { Link } from '../Link';
import { Title } from '../Title';

import './BigSlider.css';
import { extensionRegExp } from '../../Constants';

const ItemImage = styled.img`
  background-size: cover;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
`;

const ItemImageDiv = styled.div`
  background: url("${({ image }) => image}");
  background-size: cover;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
`;

const ItemVideo = ({ path = '', ext = '' }) => {
    const extWithoutDot = ext.replace('.', '');

    return (
        <video className="banner-video" height="100%" width="100%" autoPlay muted loop>
            <source src={path} type={`video/${extWithoutDot}`} />
        </video>
    );
};

const getSliderBody = (image = '', clientWidth) => {
    const extension = image.match(extensionRegExp)?.[0];

    if (!['.webp', '.jpeg', '.jpg'].includes(extension)) {
        return <ItemVideo path={image} ext={extension} />;
    }
    if (clientWidth <= 900) {
        return <ItemImage alt="Галерея колекцій" className="item-image" src={image} />;
    }

    return <ItemImageDiv alt="Галерея колекцій" className="item-image" image={image} />;
};

const BigSliderItem = memo(({
    link, title, image, active,
}) => {
    const componentClasses = classNames('lib-big-slider_item', { active });
    const { clientWidth } = useDetectedMobileDevice();

    return (
        <div
            className={componentClasses}
        >
            {link && (
                <>
                    <Link aria-label={title} className="item-link" to={link} />
                    <Link className="item-title" to={link}>
                        <Title type={2}>{title}</Title>
                    </Link>
                </>
            )}
            <div className="item-overlay" />
            {getSliderBody(image, clientWidth)}
        </div>
    );
});

const BigSliderDots = memo(({ data, active }) => {
    const dotClasses = (index) => classNames(
        'lib-big-slider_dots-item',
        { active: (active === index) },
    );

    return (
        <ul className="lib-big-slider_dots" role="tablist">
            {data.map(({ title }, index) => {
                const countedIndex = index + 1;
                const label = `${countedIndex} з ${data.length}`;

                return (
                    <li
                        key={title}
                        className={dotClasses(index)}
                        role="presentation"
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-label={label}
                        >
                            {label}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
});

export const BigSlider = memo(({
    className, data,
}) => {
    const timer = useRef(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        if (activeSlide <= 0) return setActiveSlide(data.length - 1);

        return setActiveSlide((prevSlide) => prevSlide - 1);
    }, [activeSlide, setActiveSlide, data]);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        if (activeSlide >= data.length - 1) return setActiveSlide(0);

        return setActiveSlide((prevSlide) => prevSlide + 1);
    }, [activeSlide, setActiveSlide, data]);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (touchEnd && (touchStart - touchEnd > 60)) {
            handleNext();
        }

        if (touchEnd && (touchStart - touchEnd < -60)) {
            handlePrev();
        }
        setTouchEnd(0);
    };

    const startTimer = useCallback(() => {
        timer.current = setTimeout(() => handleNext(), 10000);
    }, [timer.current]);

    const clearTimer = useCallback(() => clearTimeout(timer.current), [timer.current]);

    useEffect(() => {
        startTimer();

        return () => clearTimer();
    }, [timer.current]);

    const componentClasses = classNames('lib-big-slider', className);

    return (
        <View
            className={componentClasses}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <button
                aria-label="Попередній слайд"
                onClick={handlePrev}
                type="button"
                className="lib-big-slider-arrow lib-big-slider__prev"
            />
            {typeof data[0] === 'object' ? data.map(({ title, link, image }, index) => (
                <BigSliderItem
                    key={title}
                    active={(activeSlide === index)}
                    title={title}
                    link={link}
                    image={image}
                />
            )) : data.map((image, index) => (
                <BigSliderItem
                    key={image}
                    active={(activeSlide === index)}
                    title=""
                    link=""
                    image={image}
                />
            ))}
            <BigSliderDots data={data} active={(activeSlide)} />
            <button
                aria-label="Наступний слайд"
                onClick={handleNext}
                type="button"
                className="lib-big-slider-arrow lib-big-slider__next"
            />
        </View>
    );
});

BigSlider.propTypes = {
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
    })),
};
BigSlider.defaultProps = {
    className: '',
    data: [],
};

BigSliderItem.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    active: PropTypes.bool,
};
BigSliderItem.defaultProps = {
    link: '',
    title: '',
    image: '',
    active: false,
};

BigSliderDots.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
    })),
    active: PropTypes.number,
};
BigSliderDots.defaultProps = {
    data: [],
    active: 0,
};
