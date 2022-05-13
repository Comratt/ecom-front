import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAlert } from 'react-alert';

import { useProduct } from 'context/product/hooks/useProduct';
import { addToCart } from 'Store/Modules/Cart/cartActions';
import LocalStorageService from 'Services/LocalStorageService';

import { Swatches } from 'Components/Swatches';
import AddCartBtn from 'Components/AddCartBtn/AddCartBtn';
import WishlistHeart from 'Components/WishlistHeart/WishlistHeart';
import { Accordion, AccordionItem } from 'Components/Accordion';
import { ScrollSlider } from 'Components/ScrollSlider';
import { SliderModal } from 'Components/SliderModal';
import { BigSlider } from 'Components/Slider';
import SliderMobileDevices from 'Components/SliderMobileDevices/SliderMobileDevices';
import ProductCarousel from 'Components/PorductCarousel';
import { useDetectedMobileDevice } from '../../../hooks/useDetectMobileDevice';

import './ProductInfo.css';

export const ProductDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [activeColor, setActiveColor] = useState({});
    const [activeSize, setActiveSize] = useState({});
    const [sizeError, setSizeError] = useState(false);
    const [modalSrc, setModalSrc] = useState(false);
    const {
        result, error, loading, productId,
    } = useProduct();
    const filteredColorSizes = result.colorSizes
        ?.filter(({ colorValId }) => activeColor.id === colorValId);

    const relatedIds = result?.related?.map(({ related_product_id }) => related_product_id);
    const historyViewed = LocalStorageService.getItem('viewed', []);
    const { isMobileSize, isTabletSize } = useDetectedMobileDevice();

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

    const handleColorChange = (item) => {
        setActiveColor(item);
        setActiveSize({});
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
            sizeId: activeSize?.size_id,
            colorId: activeSize?.color_id,
            size: activeSize?.name,
            color: activeColor?.name,
            totalCount: activeSize?.product_quantity,
        }));

        return alert.show({
            name: result?.name,
            price: result?.price,
            size: activeSize?.name,
            image: result?.image,
        });
    };

    useEffect(() => {
        const viewedPreviously = LocalStorageService.getItem('viewed') || [];
        const modifiedViewed = viewedPreviously?.includes(productId)
            ? viewedPreviously
            : [...viewedPreviously, productId];

        LocalStorageService.setItem({
            viewed: modifiedViewed,
        });
    }, [productId]);

    useEffect(() => {
        if (result?.colors && result?.colors?.length) {
            setActiveColor(result?.colors[0]);
        }
    }, [result?.colors]);

    if (loading) {
        return <div>Завантаження...</div>;
    }
    console.log(result);

    return (
        <>
            <div className="lib-product_info">
                <div className="container">
                    <div className="left-part">
                        {modalSrc && (
                            <SliderModal onClose={() => setModalSrc(null)} className="lib-product-slider">
                                <BigSlider
                                    hideDots
                                    activeImage={result.images.indexOf(modalSrc)}
                                    data={result.images}
                                    onClick={() => setModalSrc(null)}
                                />
                            </SliderModal>
                        )}
                        {!isMobileSize && !isTabletSize ? (
                            <ScrollSlider setModalOpen={setModalSrc} data={result.images} />
                        ) : (
                            <SliderMobileDevices
                                setModalOpen={setModalSrc}
                                data={result.images}
                            />
                        )}
                    </div>
                    <div className="lib-product_info_content">
                        <div>
                            <h1 className="lib-product_info_product-title">
                                {result.name}
                            </h1>
                            <p className="lib-product_info_product-normal-price">
                                <b>{result.price}</b>
                            </p>
                            <p className="lib-product_info_colour">
                                Колір
                                <span>
                                    <b>
                                        {` - ${activeColor?.name}`}
                                    </b>
                                </span>
                            </p>
                        </div>
                        <Swatches
                            data={result.colors}
                            active={activeColor?.id}
                            setActive={handleColorChange}
                        />
                        <div className="lib-product_info_size">
                            <p className="size-title">
                                <b>Розмір</b>
                                {activeSize?.name && (
                                    <b>
                                        {` - ${activeSize?.name}`}
                                    </b>
                                )}
                            </p>
                            <ul className="lib-product_info_size_list">
                                {result.sizes.map((size) => (
                                    <li key={size.option_value_id}>
                                        <button
                                            type="button"
                                            onClick={handleSizeChange(size.id)}
                                            className={itemClassNames(size.id)}
                                            disabled={(
                                                !filteredColorSizes
                                                    .map(({ sizeValId }) => sizeValId)
                                                    .includes(size.id)
                                                || !filteredColorSizes
                                                    .find(({ sizeValId }) => sizeValId === size.id)
                                                    ?.quantity > 0
                                            )}
                                        >
                                            {size.name_value}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <span>
                                Таблиця розмірів
                            </span>
                        </div>
                        <div className="cart-container">
                            <AddCartBtn onClick={handleAddToCart} />
                            <div className="lib-product_info_wishlist">
                                <WishlistHeart cardId={result.id} />
                                <span>у списку бажань</span>
                            </div>
                        </div>
                        <div className="lib-product_info_product_description_block">
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
                </div>
            </div>
            <div>
                <ProductCarousel
                    id={relatedIds}
                    title="Related Products"
                    data={result.images}
                />
            </div>
            <div>
                <ProductCarousel
                    id={historyViewed}
                    title="Related Products"
                    data={result.images}
                />
            </div>
        </>
    );
};
