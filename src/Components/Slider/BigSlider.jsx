import React, {
    useState, memo, useCallback, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { View } from '../View';
import { Link } from '../Link';
import { Title } from '../Title';

import './BigSlider.css';

const BigSliderItem = memo(({
    link, title, image, active, onHover, onLeave,
}) => {
    const componentClasses = classNames('lib-big-slider_item', { active });

    return (
        <div
            className={componentClasses}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
        >
            <Link className="item-link" to={link} />
            <Link className="item-title" to={link}>
                <Title type={2}>{title}</Title>
            </Link>
            <div className="item-overlay" />
            <div className="item-image" style={{ background: `url(${image}) no-repeat center center fixed` }} />
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

export const BigSlider = memo(({ className, data }) => {
    const timer = useRef(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handlePrev = useCallback(() => {
        if (activeSlide <= 0) return setActiveSlide(data.length - 1);

        return setActiveSlide((prevSlide) => prevSlide - 1);
    }, [activeSlide, setActiveSlide, data]);

    const handleNext = useCallback(() => {
        if (activeSlide >= data.length - 1) return setActiveSlide(0);

        return setActiveSlide((prevSlide) => prevSlide + 1);
    }, [activeSlide, setActiveSlide, data]);

    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 150) {
            handleNext();
        }

        if (touchStart - touchEnd < -150) {
            handlePrev();
        }
    };

    const startTimer = useCallback(() => (
        timer.current = setTimeout(() => handleNext(), 6000)
    ), [timer.current]);

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
                aria-label="Slider previous slide"
                onClick={handlePrev}
                type="button"
                className="lib-big-slider-arrow lib-big-slider__prev"
            />
            {data.map(({ title, link, image }, index) => (
                <BigSliderItem
                    onHover={clearTimer}
                    onLeave={startTimer}
                    key={title}
                    active={(activeSlide === index)}
                    title={title}
                    link={link}
                    image={image}
                />
            ))}
            <BigSliderDots data={data} active={(activeSlide)} />
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
