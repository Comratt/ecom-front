import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAlert } from 'react-alert';

import { useProduct } from 'context/product/hooks/useProduct';
import { addToCart } from 'Store/Modules/Cart/cartActions';

import { Swatches } from 'Components/Swatches';
import AddCartBtn from 'Components/AddCartBtn/AddCartBtn';
import WishlistHeart from 'Components/WishlistHeart/WishlistHeart';
import { Accordion, AccordionItem } from 'Components/Accordion';
import { ScrollSlider } from 'Components/ScrollSlider';
import { SliderModal } from 'Components/SliderModal';
import { BigSlider } from 'Components/Slider';

import './ProductInfo.css';

export const ProductDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [activeColor, setActiveColor] = useState({});
    const [activeSize, setActiveSize] = useState({});
    const [sizeError, setSizeError] = useState(false);
    const [modalSrc, setModalSrc] = useState(false);
    const { result, error, loading } = useProduct();

    console.log(result);

    const itemClassNames = (id) => (
        classNames(
            'size_list',
            { active: id === activeSize?.id },
            { error: sizeError },
        )
    );

    const handleSizeChange = (id) => () => {
        setActiveSize(result?.sizes.find(({ id: sizeId }) => sizeId === id));
        setSizeError(false);
    };

    const handleAddToCart = () => {
        setSizeError(false);
        if (!activeSize?.id) return setSizeError(true);

        dispatch(addToCart({
            id: result?.id,
            name: result?.name,
            price: result?.price,
            purePrice: result?.purePrice,
            image: result?.image,
            size: activeSize?.name,
            color: activeColor?.name,
        }));

        return alert.show({
            name: result?.name,
            price: result?.price,
            size: activeSize?.name,
            image: result?.image,
        });
    };

    useEffect(() => {
        if (result?.colors && result?.colors?.length) {
            setActiveColor(result?.colors[0]);
        }
    }, [result?.colors]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="lib-product_info">
            {modalSrc && (
                <SliderModal onClose={() => setModalSrc(null)}>
                    <BigSlider
                        activeImage={result.images.indexOf(modalSrc)}
                        data={result.images}
                        onClick={() => setModalSrc(null)}
                    />
                </SliderModal>
            )}
            <ScrollSlider setModalOpen={setModalSrc} data={result.images} />
            <div className="lib-product_info_content">
                <div>
                    <h1 className="lib-product_info_product-title">
                        {result.name}
                    </h1>
                    <p className="lib-product_info_product-normal-price">
                        <b>{result.price}</b>
                    </p>
                    <p className="lib-product_info_colour">
                        Color
                        {' '}
                        <span>
                            <b>
                                -
                                {activeColor?.name}
                            </b>
                        </span>
                    </p>
                </div>
                <Swatches
                    data={result.colors}
                    active={activeColor?.id}
                    setActive={setActiveColor}
                />
                <div className="lib-product_info_size">
                    <p className="size-title"><b>Size</b></p>
                    <ul className="lib-product_info_size_list">
                        {result.sizes.map((size) => (
                            <li key={size.option_value_id}>
                                <button
                                    onClick={handleSizeChange(size.id)}
                                    className={itemClassNames(size.id)}
                                >
                                    {size.name_value}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <span>
                        Size chart
                    </span>
                </div>
                <AddCartBtn onClick={handleAddToCart} />
                <div className="lib-product_info_wishlist">
                    <WishlistHeart cardId={result.id} />
                    <span>in Wishlist</span>
                </div>
                <div className="lib-product_info_product_description">
                    <Accordion defaultIndex="0">
                        <AccordionItem label="Description" index="0">
                            {result.description}
                        </AccordionItem>
                        <AccordionItem label="Description" index="2">
                            {result.description}
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};
