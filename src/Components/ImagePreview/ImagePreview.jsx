import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

export const ImagePreview = ({ images, onClose, activeIndex }) => {
    const [photoIndex, setPhotoIndex] = useState(activeIndex);
    const isImageArray = Array.isArray(images);

    const movePrev = () => {
        if (isImageArray) {
            setPhotoIndex((photoIndex + images.length - 1) % images.length);
        }
    };
    const moveNext = () => {
        if (isImageArray) {
            setPhotoIndex((photoIndex + 1) % images.length);
        }
    };

    const mainSrc = isImageArray ? images[photoIndex] : images;
    const nextSrc = isImageArray ? images[(photoIndex + 1) % images.length] : null;
    const prevSrc = isImageArray ? images[(photoIndex + images.length - 1) % images.length] : null;

    return (
        <Lightbox
            mainSrc={mainSrc}
            nextSrc={nextSrc}
            prevSrc={prevSrc}
            onCloseRequest={onClose}
            onMovePrevRequest={movePrev}
            onMoveNextRequest={moveNext}
        />
    );
};

ImagePreview.propTypes = {
    activeIndex: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
};

ImagePreview.defaultProps = {
    activeIndex: 0,
};
