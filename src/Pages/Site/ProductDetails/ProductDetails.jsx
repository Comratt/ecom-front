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
import MetaTags from 'Components/MetaTags';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import NovaPoshta from '../../../Icons/NovaPoshta';
import './ProductInfo.css';

export const ProductDetails = () => {
    const localStorageKey = process.env.REACT_APP_REDUX_STORAGE_NAME;
    const storage = window.localStorage.getItem(localStorageKey);
    const parsedStorage = JSON.parse(storage);

    const sizesRef = useRef();
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();
    const products = useSelector(getCartProducts);
    const [activeColor, setActiveColor] = useState({});
    const [activeSize, setActiveSize] = useState({});
    const [sizeError, setSizeError] = useState(false);
    const [modalSrc, setModalSrc] = useState(false);
    const [modalTableSizeSrc, setModalTableSizeSrc] = useState(false);
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
    const historyViewed = parsedStorage?.viewed || [];
    const { isMobileSize, isTabletSize } = useDetectedMobileDevice();
    const getQuantity = () => {
        const colorQuantity = result?.colors?.reduce((acc, val) => acc + val?.product_quantity, 0);
        const sizeQuantity = result?.sizes?.reduce((acc, val) => acc + val?.product_quantity, 0);

        return colorQuantity + sizeQuantity;
    };

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
        const relatedColorSize = result.colorSizes?.find(({ colorValId, sizeValId }) => (
            colorValId === activeColor?.option_value_id && sizeValId === activeSize.option_value_id
        ));

        dispatch(addToCart({
            id: result?.id,
            name: result?.name,
            price: result?.price,
            purePrice: result?.purePrice,
            image: result?.image,
            sizeId: relatedColorSize?.sizeId,
            colorId: relatedColorSize?.colorId,
            size: relatedColorSize?.sizeName,
            color: relatedColorSize?.colorName,
            totalCount: relatedColorSize?.quantity,
            discount,
        }));
        setShowAlert(true);

        const categoriesArr = result.categories?.reduce((acc, val, indx) => ({
            ...acc,
            [`item_category${indx || ''}`]: val?.category_name,
        }), {});

        window?.fbq('track', 'AddToCart', {
            value: result?.purePrice,
            currency: 'UAH',
            contents: [
                {
                    id: result?.id,
                    quantity: 1,
                },
            ],
        });
        window.dataLayer?.push({ ecommerce: null });
        window.dataLayer?.push({
            event: 'add_to_cart',
            ecommerce: {
                items: [{
                    item_name: result?.name,
                    item_id: result?.id,
                    price: result?.purePrice,
                    ...categoriesArr,
                    item_variant: relatedColorSize?.colorName,
                    item_variant2: relatedColorSize?.sizeName,
                    quantity: 1,
                }],
            },
        });
    };

    useEffect(() => {
        setActiveColor({});
        setActiveSize({});
        setSizeError(false);
        const storageL = window.localStorage.getItem(localStorageKey);
        const parsedStorageL = JSON.parse(storageL);
        const viewedPreviously = parsedStorageL?.viewed?.length ? parsedStorageL?.viewed : [];
        const modifiedViewed = viewedPreviously?.includes(productId)
            ? viewedPreviously
            : [...viewedPreviously, productId];

        window.localStorage.setItem(
            localStorageKey,
            JSON.stringify({
                ...parsedStorageL,
                viewed: modifiedViewed,
            }),
        );
    }, [productId, window]);

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
        if (result?.colors && result?.colors?.length && !Object.keys(activeColor).length) {
            window.scrollTo(0, 0);
            setActiveColor(result?.colors[0]);
            const categoriesArr = result.categories?.reduce((acc, val, indx) => ({
                ...acc,
                [`item_category${indx || ''}`]: val?.category_name,
            }), {});

            window?.fbq('track', 'ViewContent', {
                value: result?.purePrice,
                currency: 'UAH',
                content_ids: result?.id,
            });

            window.dataLayer?.push({ ecommerce: null });
            window.dataLayer?.push({
                event: 'view_item',
                ecommerce: {
                    items: [{
                        item_name: result?.name,
                        item_id: result?.id,
                        price: result?.purePrice,
                        item_brand: result?.name,
                        ...categoriesArr,
                        quantity: 1,
                    }],
                },
            });
        }
    }, [result]);

    if (loading) {
        return <ProductDetailsLoader />;
    }
    const handleClick = () => {
        history.push('/cart');
    };

    console.log(result.images);

    return (
        <>
            <MetaTags
                description={result.meta_description}
                keywords={result.meta_keyword}
                tags={result.meta_tag}
                metaTitle={result.meta_title}
                title={result.name}
            />
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
                        {modalTableSizeSrc && (
                            <ImagePreview
                                activeIndex={0}
                                onClose={() => setModalTableSizeSrc(null)}
                                images={result.tableSize}
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
                            {sizeError && <p className="size-error">Виберіть розмір!</p>}
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
                            {result?.tableSize && (
                                <button type="button" className="table-size" onClick={() => setModalTableSizeSrc(true)}>
                                    Таблиця розмірів
                                </button>
                            )}
                        </div>
                        <div className="cart-container">
                            <div className="lib-product_cart_btn">
                                <Button
                                    variant="solid"
                                    disabled={!getQuantity()}
                                    onClick={isSelectedProduct ? handleClick : handleAddToCart}
                                >
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
                        <a className="lib-product_novaposhta_label" target="_blank" href="https://www.youtube.com/watch?v=8ddPeGYXgL8&embeds_referring_euri=https%3A%2F%2Fnovaposhta.ua%2F&source_ve_path=Mjg2NjY&feature=emb_logo&ab_channel=%D0%9D%D0%BE%D0%B2%D0%B0%D0%BF%D0%BE%D1%88%D1%82%D0%B0">
                            <NovaPoshta width={20} />
                            {' '}
                            Легке повернення
                        </a>
                        <div className="lib-product_info_product_description_block">
                            <div className="lib-product_info_product_description">
                                <Accordion defaultIndex="0">
                                    <AccordionItem label="Детальніше про товар" index="0">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {result.description}
                                        </ReactMarkdown>
                                    </AccordionItem>
                                    <AccordionItem className="product-delivery" label="Доставка та оплата" index="1">
                                        <ReactMarkdown>
                                            {'#### Клієнт може оплатити своє замовлення будь-яким зручним для нього способом: \n'
                                                + '- Готівкою чи картою безпосередньо в шоу-румі: \n'
                                                + 'м. Львів, вул. Івана Франка, 33 \n'
                                                + 'м. Чернівці, вул. Героїв Майдану 12 \n'
                                                + '- При замовленні від 2000грн безкоштовна доставка у зручне відділення будь-якої пошти. \n'
                                                + '- Безкоштовна адресна доставка кур’єром при замовленні від 6000грн. \n'
                                                + '(Ви нічим не ризикуєте, при умові, якщо костюм вам не підходе, зворотня доставка за наш рахунок) \n'
                                                + '- Оплата може бути як по повній передоплаті, або по накладеним платежем, за вашим вибором. \n'
                                                + '- Самовивіз з наших шоу-румів.'}
                                        </ReactMarkdown>
                                    </AccordionItem>
                                    <AccordionItem className="product-delivery" label="Бонусна програма" index="2">
                                        <ReactMarkdown>
                                            {'1.  Все дуже просто! При першій покупці з сайту ви отримуєте -10% на будь-яку товар.\n'
                                                + '2.  Відтепер від кожної вашої покупки, 5% від вартості замовлення буде відкладено на ваш рахунок (кешбек).\n'
                                                + '3.  На що може використати накопичені бонуси? Коштами (бонусами) ви можете сплатити до половини вартості товару, новинок й тих, що на розпродажі.\n'
                                                + '\n'
                                                + 'Про що слід пам\'ятати?\n'
                                                + 'Бонуси (кешбек) слід використувати до кінця поточного року.'}
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
