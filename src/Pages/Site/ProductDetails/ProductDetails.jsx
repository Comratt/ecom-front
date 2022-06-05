import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useAlert } from 'react-alert';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useProduct } from 'context/product/hooks/useProduct';
import { addToCart } from 'Store/Modules/Cart/cartActions';
import { getWishlistProducts } from 'Store/Modules/Wishlist/selectors';
import LocalStorageService from 'Services/LocalStorageService';

import { Swatches } from 'Components/Swatches';
import AddCartBtn from 'Components/AddCartBtn/AddCartBtn';
import WishlistHeart from 'Components/WishlistHeart/WishlistHeart';
import { Accordion, AccordionItem } from 'Components/Accordion';
import { ScrollSlider } from 'Components/ScrollSlider';
import SliderMobileDevices from 'Components/SliderMobileDevices/SliderMobileDevices';
import ProductCarousel from 'Components/PorductCarousel';
import { ProductDetailsLoader } from 'Components/SkeletonLoader';
import { ImagePreview } from 'Components/ImagePreview';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';

import './ProductInfo.css';

export const ProductDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [activeColor, setActiveColor] = useState({});
    const [activeSize, setActiveSize] = useState({});
    const [sizeError, setSizeError] = useState(false);
    const [modalSrc, setModalSrc] = useState(false);
    const {
        result, loading, productId,
    } = useProduct();
    const filteredColorSizes = result?.colorSizes
        ?.filter(({ colorValId }) => activeColor.id === colorValId);
    const listWishProducts = useSelector(getWishlistProducts);
    const isActive = useMemo(() => (
        listWishProducts.includes(result?.id)
    ), [listWishProducts, result]);

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
    const discount = `${parseInt(result?.price, 10) - 200}₴`;

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
            discount,
        }));

        return alert.show({
            name: result?.name,
            price: result?.price,
            size: activeSize?.name,
            image: result?.image,
        });
    };

    useEffect(() => {
        setActiveColor({});
        const viewedPreviously = LocalStorageService.getItem('viewed') || [];
        const modifiedViewed = viewedPreviously?.includes(productId)
            ? viewedPreviously
            : [...viewedPreviously, productId];

        LocalStorageService.setItem({
            viewed: modifiedViewed,
        });
    }, [productId]);

    useEffect(() => {
        if (result?.colors && result?.colors?.length && !Object.keys(activeColor).length) {
            setActiveColor(result?.colors[0]);
        }
    }, [result]);

    if (loading) {
        return <ProductDetailsLoader />;
    }

    let classNameDiscount = 'lib-product_info_product-normal-price';

    if (discount) {
        classNameDiscount += ' discount';
    }

    return (
        <>
            <div className="lib-product_info">
                <div className="container">
                    <div className="left-part">
                        {modalSrc && (
                            <ImagePreview
                                activeIndex={result.images.indexOf(modalSrc)}
                                onClose={() => setModalSrc(null)}
                                images={result.images}
                            />
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
                            {discount
                                ? (
                                    <div>
                                        <p className={classNameDiscount}>
                                            <b>{result.price}</b>
                                        </p>
                                        <div className="lib-product_info_product-normal-price">
                                            <b>{discount}</b>
                                        </div>
                                    </div>
                                ) : (
                                    <p className={classNameDiscount}>
                                        <b>{result.price}</b>
                                    </p>
                                )}
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
                                                    ?.map(({ sizeValId }) => sizeValId)
                                                    .includes(size.id)
                                                || !filteredColorSizes
                                                    ?.find(({ sizeValId }) => sizeValId === size.id)
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
                                <span>
                                    {!isActive ? 'Додати до списку бажань' : 'У списку бажань'}
                                </span>
                            </div>
                        </div>
                        <div className="lib-product_info_product_description_block">
                            <div className="lib-product_info_product_description">
                                <Accordion defaultIndex="0">
                                    <AccordionItem label="Description" index="0">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {result.description}
                                        </ReactMarkdown>
                                    </AccordionItem>
                                    <AccordionItem label="Description" index="2">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {result.description}
                                        </ReactMarkdown>
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
                    title="Viewed Products"
                    data={result.images}
                />
            </div>
        </>
    );
};
