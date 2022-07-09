import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { useProduct } from 'context/product/hooks/useProduct';
import { addToCart } from 'Store/Modules/Cart/cartActions';
import { getWishlistProducts } from 'Store/Modules/Wishlist/selectors';
import { getCartProducts } from 'Store/Modules/Cart/selectors';
import LocalStorageService from 'Services/LocalStorageService';
import { getFormattedPrice } from 'Constants';

import { Swatches } from 'Components/Swatches';
import Button from 'Components/Button/Button';
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
    const sizesRef = useRef();
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const products = useSelector(getCartProducts);
    const [activeColor, setActiveColor] = useState({});
    const [activeSize, setActiveSize] = useState({});
    const [sizeError, setSizeError] = useState(false);
    const [modalSrc, setModalSrc] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
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

    const isSizeDisabled = (sizeId) => (
        !filteredColorSizes
            ?.map(({ sizeValId }) => sizeValId)
            .includes(sizeId)
        || !filteredColorSizes
            ?.find(({ sizeValId }) => sizeValId === sizeId)
            ?.quantity > 0
    );

    const handleSizeChange = (id) => () => {
        if (isSizeDisabled(id)) return;
        setActiveSize(result?.sizes.find(({ id: sizeId }) => sizeId === id));
        setSizeError(false);
    };

    const handleColorChange = (item) => {
        setActiveColor(item);
        setActiveSize({});
    };
    const discount = result?.discounts || 0;

    const isSelectedProduct = useMemo(() => {
        const selectedItems = products.map(({ id, color, size }) => [id, color, size]);

        return selectedItems.some((item) => item
            .includes(activeColor?.name) && item
            .includes(activeSize?.name) && item
            .includes(result.id));
    }, [products, activeSize, activeColor]);

    const handleAddToCart = () => {
        setSizeError(false);
        if (!activeSize?.id) {
            sizesRef?.current?.scrollIntoView({ block: 'center' });

            return setSizeError(true);
        }

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
        setShowAlert(true);
    };

    useEffect(() => {
        setActiveColor({});
        setActiveSize({});
        const viewedPreviously = LocalStorageService.getItem('viewed') || [];
        const modifiedViewed = viewedPreviously?.includes(productId)
            ? viewedPreviously
            : [...viewedPreviously, productId];

        LocalStorageService.setItem({
            viewed: modifiedViewed,
        });
    }, [productId]);

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                alert.show({
                    name: result?.name,
                    price: result?.price,
                    purePrice: result?.purePrice,
                    size: activeSize?.name,
                    image: result?.image,
                    discount,
                });
                setShowAlert(false);
            });
        }
    }, [showAlert, alert]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [result]);

    useEffect(() => {
        if (result?.colors && result?.colors?.length && !Object.keys(activeColor).length) {
            setActiveColor(result?.colors[0]);
        }
    }, [result]);

    if (loading) {
        return <ProductDetailsLoader />;
    }
    const handleClick = () => {
        history.push('/cart');
    };

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
                            <h3 className="lib-product_info_product-subtitle">
                                {'Артикул: '}
                                {result.model}
                            </h3>
                            {discount
                                ? (
                                    <div>
                                        <p className="lib-product_info_product-normal-price discount">
                                            <b>{result.price}</b>
                                        </p>
                                        <div className="lib-product_info_product-normal-price">
                                            <b>{getFormattedPrice(result.purePrice - discount)}</b>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="lib-product_info_product-normal-price">
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
                            <ul ref={sizesRef} className="lib-product_info_size_list">
                                {result.sizes.map((size) => (
                                    <li key={size.option_value_id}>
                                        <button
                                            type="button"
                                            onClick={handleSizeChange(size.id)}
                                            className={itemClassNames(size.id)}
                                            disabled={isSizeDisabled(size.id)}
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
                            <div className="lib-product_cart_btn">
                                <Button variant="solid" onClick={isSelectedProduct ? handleClick : handleAddToCart}>
                                    {isSelectedProduct ? 'Перейти в кошик' : 'Додати в кошик'}
                                </Button>
                            </div>
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
                                    <AccordionItem label="Детальніше про товар" index="0">
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
                    title="Можуть вам сподобатись"
                    data={result.images}
                    hideColors
                />
            </div>
            <div>
                <ProductCarousel
                    id={historyViewed}
                    title="Переглянуті товари"
                    data={result.images}
                    hideColors
                />
            </div>
        </>
    );
};
