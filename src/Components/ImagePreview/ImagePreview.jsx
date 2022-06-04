import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

export const ImagePreview = ({ images, onClose, activeIndex }) => {
    const [photoIndex, setPhotoIndex] = useState(activeIndex);

    const movePrev = () => setPhotoIndex((photoIndex + images.length - 1) % images.length);
    const moveNext = () => setPhotoIndex((photoIndex + 1) % images.length);

    return (
        <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
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
