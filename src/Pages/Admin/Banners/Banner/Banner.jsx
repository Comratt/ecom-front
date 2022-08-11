import React from 'react';
import { getImage } from 'API';
import Remove from 'Icons/Remove';
import { extensionRegExp } from 'Constants';

const ItemVideo = ({ path = '', ext = '' }) => {
    const extWithoutDot = ext.replace('.', '');

    return (
        <video height="225" width="100%" autoPlay muted loop>
            <source src={getImage(path)} type={`video/${extWithoutDot}`} />
        </video>
    );
};

const ItemImage = ({ image }) => (
    <img
        className="bd-placeholder-img card-img-top"
        src={getImage(image)}
        alt=""
        width="100%"
        height="225"
    />
);

const getBannerBody = (image = '') => {
    const extension = image.match(extensionRegExp)?.[0];

    if (!['.webp', '.jpeg', '.jpg'].includes(extension)) {
        return <ItemVideo path={image} ext={extension} />;
    }

    return <ItemImage image={image} />;
};

const Banner = ({
    image, title, setShow, onRemove, loading, banner_id,
}) => (
    <div className="card mb-4 shadow-sm">
        {getBannerBody(image)}
        <div className="card-body">
            <p className="card-text">
                {title}
            </p>
            <div
                className="d-flex justify-content-between align-items-center"
            >
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => setShow(banner_id)}
                >
                    Изменить
                </button>
                <small className="text-muted">
                    <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => onRemove(banner_id)}
                        disabled={loading === banner_id}
                    >
                        {(loading === banner_id) ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                        ) : (
                            <Remove
                                fill="red"
                                width={15}
                                height={15}
                            />
                        )}
                    </button>
                </small>
            </div>
        </div>
    </div>
);

export default Banner;
