import React from 'react';
import classNames from 'classnames';
import './ProductInfo.css';
import WishlistHeart from '../WishlistHeart/WishlistHeart';
import { Swatches } from '../Swatches';
import Accardion from '../AccardionProductInfo/AccardionProductInfo';

const ProductInfo = ({
    className,
}) => {
    const componentClasses = classNames(
        'lib-product_info',
        className,
    );

    const data = [
        {
            id: 1,
            color: '#ccc',
        },
    ];

    return (
        <div className={componentClasses}>
            <div className="lib-product_info_content">
                <div>
                    <h1 className="lib-product_info_product-title">
                        Ruffled broderie dress
                    </h1>
                    <p className="lib-product_info_product-normal-price">
                        <b>₴3,522</b>
                    </p>
                    <p className="lib-product_info_colour">
                        Colour
                        {' '}
                        <span><b>- black</b></span>
                    </p>
                </div>
                <Swatches
                    data={data}
                    active={1}
                />
                <div className="lib-product_info_size">
                    <p className="size-title"><b>Size</b></p>
                    <ul className="lib-product_info_size_list">
                        <li>
                            <div className="size_list">XS</div>
                        </li>
                        <li>
                            <div className="size_list">S</div>
                        </li>
                        <li>
                            <div className="size_list">M</div>
                        </li>
                        <li>
                            <div className="size_list">L</div>
                        </li>
                        <li>
                            <div className="size_list">XL</div>
                        </li>
                    </ul>
                    <span>
                        Size chart
                    </span>
                </div>
                <div className="lib-product_info_submit">
                    <button>
                        Add Cart
                    </button>
                </div>
                <div className="lib-product_info_wishlist">
                    <WishlistHeart />
                    <span>in Wishlist</span>
                </div>
                <div className="lib-product_info_product_description">
                    {/* <ul> */}
                    {/*    <li> */}
                    {/*        Description */}
                    {/*        <span> */}
                    {/*            <AccardionArrow */}
                    {/*                width={20} */}
                    {/*                fill="var(--color-accent)" */}
                    {/*            /> */}
                    {/*        </span> */}
                    {/*    </li> */}
                    {/*    <li> */}
                    {/*        Size and fit */}
                    {/*        <span> */}
                    {/*            <AccardionArrow */}
                    {/*                width={20} */}
                    {/*                fill="var(--color-accent)" */}
                    {/*            /> */}
                    {/*        </span> */}
                    {/*    </li> */}
                    {/*    <li> */}
                    {/*        Product measurements */}
                    {/*        <span> */}
                    {/*            <AccardionArrow */}
                    {/*                width={20} */}
                    {/*                fill="var(--color-accent)" */}
                    {/*            /> */}
                    {/*        </span> */}
                    {/*    </li> */}
                    {/*    <li> */}
                    {/*        Care */}
                    {/*        <span> */}
                    {/*            <AccardionArrow */}
                    {/*                width={20} */}
                    {/*                fill="var(--color-accent)" */}
                    {/*            /> */}
                    {/*        </span> */}
                    {/*    </li> */}
                    {/*    <li> */}
                    {/*        Composition */}
                    {/*        <span> */}
                    {/*            <AccardionArrow */}
                    {/*                width={20} */}
                    {/*                fill="var(--color-accent)" */}
                    {/*            /> */}
                    {/*        </span> */}
                    {/*    </li> */}
                    {/* </ul> */}
                    <Accardion />
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
