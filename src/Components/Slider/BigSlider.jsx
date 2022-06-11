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

const BigSliderItem = memo(({
    link, title, image, active, onHover, onLeave, onClick,
}) => {
    const componentClasses = classNames('lib-big-slider_item', { active });
    const { clientWidth } = useDetectedMobileDevice();

    return (
        <div
            className={componentClasses}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
            onClick={onClick}
        >
            {link && (
                <>
                    <Link className="item-link" to={link} />
                    <Link className="item-title" to={link}>
                        <Title type={2}>{title}</Title>
                    </Link>
                </>
            )}
            <div className="item-overlay" />
            {clientWidth <= 900 ? <ItemImage className="item-image" src={image} /> : <ItemImageDiv className="item-image" image={image} />}
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
                const label = `${countedIndex} из ${data.length}`;

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
    className, data, onClick, activeImage, hideDots,
}) => {
    const timer = useRef(0);
    const [activeSlide, setActiveSlide] = useState(activeImage || 0);
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
        if (touchStart - touchEnd > 50) {
            handleNext();
        }

        if (touchStart - touchEnd < -50) {
            handlePrev();
        }
    };

    const startTimer = useCallback(() => {
        if (!hideDots) {
            timer.current = setTimeout(() => handleNext(), 5000);
        }
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
            onClick={onClick}
        >
            <button
                aria-label="Slider previous slide"
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
                    onClick={() => ({})}
                />
            )) : data.map((image, index) => (
                <BigSliderItem
                    key={image}
                    active={(activeSlide === index)}
                    title=""
                    link=""
                    image={image}
                    onClick={onClick}
                />
            ))}
            {!hideDots && <BigSliderDots data={data} active={(activeSlide)} />}
            <button
                aria-label="Slider next slide"
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
