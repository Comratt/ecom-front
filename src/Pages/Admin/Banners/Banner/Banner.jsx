import React from 'react';
import { getImage } from 'API';
import Remove from 'Icons/Remove';

const Banner = ({
    image, title, setShow, onRemove, loading, banner_id,
}) => (
    <div className="card mb-4 shadow-sm">
        <img
            className="bd-placeholder-img card-img-top"
            src={getImage(image)}
            alt=""
            width="100%"
            height="225"
        />
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
