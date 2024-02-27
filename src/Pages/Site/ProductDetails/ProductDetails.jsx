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
import { Title } from 'Components/Title';
import { ImagePreview } from 'Components/ImagePreview';
import MetaTags from 'Components/MetaTags';
import { useDetectedMobileDevice } from 'hooks/useDetectMobileDevice';
import './ProductInfo.css';
import { BreadCrumb } from '../../../Components/BreadCrumb';

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
            slug: result?.slug,
            sizeId: relatedColorSize?.sizeId,
            colorId: relatedColorSize?.colorId,
            size: relatedColorSize?.sizeName,
            color: relatedColorSize?.colorName,
            totalCount: relatedColorSize?.quantity,
            discount,
        }));
        setShowAlert(true);
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
        }
    }, [result]);

    if (loading) {
        return <ProductDetailsLoader />;
    }
    const handleClick = () => {
        history.push('/cart');
    };
    const getBreadcrumbCategory = () => {
        if (result?.categories?.length > 1) {
            const parentCategory = result?.categories?.find((cat) => !cat?.parent_id);

            if (parentCategory) {
                const restCategory = result?.categories?.find((cat) => cat?.parent_id);

                return [
                    {
                        href: `/collection/${parentCategory.category_id}`,
                        position: 2,
                        name: parentCategory?.category_name,
                    },
                    {
                        href: `/collection/${restCategory.category_id}`,
                        position: 3,
                        name: restCategory?.category_name,
                    },
                ];
            }
        }

        return [
            {
                href: result?.categories?.[0]?.category_id ? `/collection/${result?.categories?.[0]?.category_id}` : '/collection',
                position: 2,
                name: result?.categories?.[0]?.category_id ? result?.categories?.[0]?.category_name : 'Всі товари',
            },
        ];
    };

    return (
        <>
            <MetaTags
                description={result.meta_description}
                keywords={result.meta_keyword}
                tags={result.meta_tag}
                metaTitle={result.meta_title}
                title={result.name}
            />
            {!isTabletSize && (
                <div className="breadcrumb-wrapper">
                    <BreadCrumb items={getBreadcrumbCategory()} />
                </div>
            )}
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
                            {isTabletSize && <BreadCrumb items={getBreadcrumbCategory()} />}
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
            <div className="lib-product_info">
                <div className="container">
                    <Title type={1}>
                        Вітаємо в інтернет-магазині жіночого одягу Paparot - Вашому провіднику у світі моди та стилю! Відібрані тільки найстрімніші тренди та найбільший вибір жіночого одягу, який задовільнить найвибагливіші смаки! Успішні покупки починаються з Paparot, мета якого - полегшити і зробити приємним Ваш досвід купівлі жіночого одягу онлайн.
                    </Title>
                    <Title type={2}>
                        Цінуєте якість та різноманітність товарів? На полицях нашого магазину зібрані тільки свіжі, актуальні новинки від провідних світових брендів та молодих дизайнерів. Відкрийте для себе широкий асортимент рішень для будь-якого випадку: від феєричного вечірнього плаття до зручних джинсів або світшотів.
                    </Title>
                    <Title type={3}>
                        Paparot - магазин, що враховує дрібниці, що роблять Ваші покупки максимально комфортними. Ми пропонуєmo швидку та безкоштовну доставку для оселярів України. Крім того, Вам належить право на безкоштовне повернення товару протягом 14 днів!
                    </Title>
                    <Title type={4}>
                        З Paparot Ви завжди будете в курсі актуальних акцій та обов'язково знайдете найкращі пропозиції серед новинок! Уважно стежте за асортиментом товарів, робіть вибір та насолоджуйтеся чудовою атмосферою Вашого улюбленого магазину. Дозвольте Paparot зробити Ваші покупки незабутнім та ефективним досвідом і переконайтеся самі, що справжній успіх в пошуках неймовірного жіночого одягу лежить в Paparot!
                    </Title>
                </div>
            </div>
        </>
    );
};
