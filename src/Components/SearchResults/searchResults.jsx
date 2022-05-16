import React from 'react';
import classNames from 'classnames';

import './searchResults.css';

const SearchResults = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-search-results_info',
        className,
    );

    return (
        <div className={componentClasses}>
            <div className="product-matches__title">
                Product matches
            </div>
            <div className="product-matches__wrapper">
                <div className="product-matches__items">
                    <div className="product-matches__item">
                        <div className="product-matches__info-content">
                            <div className="product-matches__item-left">
                                <div className="product-matches__image">
                                    <img src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_1739.jpg?v=1620139718" alt="" />
                                </div>
                            </div>
                            <div className="product-matches__item-right">
                                <div className="product-matches__name">
                                    Шовковий камзол з V-подібним вирізом
                                </div>
                                <div className="product-matches__price">
                                    €55
                                </div>
                            </div>
                        </div>
                        <div className="line" />
                    </div>
                    <div className="product-matches__item">
                        <div className="product-matches__info-content">
                            <div className="product-matches__item-left">
                                <div className="product-matches__image">
                                    <img src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_1739.jpg?v=1620139718" alt="" />
                                </div>
                            </div>
                            <div className="product-matches__item-right">
                                <div className="product-matches__name">
                                    V-neck silk camisole
                                </div>
                                <div className="product-matches__price">
                                    €55
                                </div>
                            </div>
                        </div>
                        <div className="line" />
                    </div>
                    <div className="product-matches__item">
                        <div className="product-matches__info-content">
                            <div className="product-matches__item-left">
                                <div className="product-matches__image">
                                    <img src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_1739.jpg?v=1620139718" alt="" />
                                </div>
                            </div>
                            <div className="product-matches__item-right">
                                <div className="product-matches__name">

                                    Шовковий камзол з V-подібним вирізом
                                </div>
                                <div className="product-matches__price">
                                    €55
                                </div>
                            </div>
                        </div>
                        <div className="line" />
                    </div>
                    <div className="product-matches__item">
                        <div className="product-matches__info-content">
                            <div className="product-matches__item-left">
                                <div className="product-matches__image">
                                    <img src="https://cdn.shopify.com/s/files/1/0292/1375/3428/products/IMG_1739.jpg?v=1620139718" alt="" />
                                </div>
                            </div>
                            <div className="product-matches__item-right">
                                <div className="product-matches__name">

                                    Шовковий камзол з V-подібним вирізом
                                </div>
                                <div className="product-matches__price">
                                    €55
                                </div>
                            </div>
                        </div>
                        <div className="line" />
                    </div>
                </div>
                <div className="product-matches__btn-block">
                    <button className="product-matches__btn">View all results for</button>
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
