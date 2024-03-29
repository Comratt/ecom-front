import React, {
    createContext, useState, useMemo, useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialValues } from 'Pages/Admin/ProductAddEdit/constants';

export const AddProductContext = createContext({});
AddProductContext.displayName = 'AddProductContext';

export const AddProductProvider = ({ children }) => {
    const [product, setProduct] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [options, setOptions] = useState([]);
    const [images, setImages] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [mainImage, setMainImage] = useState({
        image: undefined,
        imagePreview: undefined,
    });
    const [tableSizeImage, setTableSizeImage] = useState({
        image: undefined,
        imagePreview: undefined,
    });
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if (Object.keys(product).length) {
            setValues({
                ...product,
                productName: product.name,
                model: product.model,
                description: product.description,
                metaDescription: product.meta_description,
                metaKeywords: product.meta_keyword,
                metaTitle: product.meta_title,
                metaTags: product.meta_tag,
                price: product.purePrice,
                status: product.status,
            });
            if (product.categories && product.categories.length) {
                const categoryNames = product.categories.map((cat) => ({
                    value: cat.category_id,
                    label: cat.name,
                    id: cat.product_category_id,
                }));

                setSelectedCategories(categoryNames);
            }
            if (product.related && product.related.length) {
                const relatedProductNames = product.related.map((prod) => ({
                    value: prod.related_product_id,
                    label: prod.name,
                    id: prod.products_related_id,
                }));

                setRelatedProducts(relatedProductNames);
            }
            if (
                (product.sizes && product.sizes.length)
                && (product.colors && product.colors.length)
            ) {
                const optionNames = product.colors.map((color) => {
                    const size = product.sizes.find(({ size_id }) => size_id === color.size_id);

                    return ({
                        id: color.color_size_product_id,
                        color: color.option_value_id,
                        size: size.option_value_id,
                        quantity: color.product_quantity,
                    });
                });

                setOptions(optionNames);
            }
            if (product.discount && product.discount.length) {
                const discountNames = product.discount.map((discount) => ({
                    id: discount.discount_id,
                    price: discount.discount_price,
                    quantity: discount.discount_quantity,
                    priority: discount.discount_priority,
                }));

                setDiscounts(discountNames);
            }
            if (product.image) {
                setMainImage({
                    image: product.image,
                    imagePreview: product.image,
                });
            }
            if (product.tableSize) {
                setTableSizeImage({
                    image: product.tableSize,
                    imagePreview: product.tableSize,
                });
            }
            if (product.imagesOrig && product.imagesOrig.length) {
                const imageNames = product.imagesOrig.map(({ id, image }) => ({
                    id,
                    image,
                    imagePreview: image,
                }));

                setImages(imageNames);
            }
        }
    }, [product]);

    const handleValuesChange = ({ target: { name, value } }) => (
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    );

    const handleDescriptionChange = (value) => (
        setValues((prevState) => ({
            ...prevState,
            description: value,
        }))
    );

    const handleSelectCategory = (params) => (
        setSelectedCategories((prevState) => [...prevState, params])
    );
    const removeCategory = (id) => (
        setSelectedCategories((prevState) => prevState.filter(({ value }) => value !== id))
    );

    const handleSelectRelatedProducts = (name) => (
        setRelatedProducts((prevState) => [...prevState, name])
    );
    const removeSelectRelatedProducts = (id) => (
        setRelatedProducts((prevState) => prevState.filter(({ value }) => value !== id))
    );

    const handleAddOption = () => {
        setOptions((prevState) => ([
            ...prevState,
            {
                id: uuidv4(),
                color: '',
                size: '',
                quantity: '',
            },
        ]));
    };

    const handleOptionDelete = (id) => {
        setOptions((prevOptions) => prevOptions.filter(
            (item) => item.id !== id,
        ));
    };

    const handleChangeOption = (id) => ({ target }) => {
        setOptions((prevState) => prevState.map(
            (item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        [target.name]: target.value,
                    };
                }

                return item;
            },
        ));
    };

    const onChangeProductImage = (id) => ({ target }) => {
        setImages((prevImages) => prevImages.map(
            (item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        image: target.files[0],
                        imagePreview: URL.createObjectURL(target.files[0]),
                    };
                }

                return item;
            },
        ));
    };

    const onAddProductImage = () => {
        setImages((prevImages) => ([
            ...prevImages,
            {
                id: uuidv4(),
                image: undefined,
                imagePreview: undefined,
            },
        ]));
    };

    const onAddProductDiscount = () => {
        setDiscounts((prevDiscounts) => ([
            ...prevDiscounts,
            {
                id: uuidv4(),
                price: 0,
                quantity: 0,
                priority: 0,
            },
        ]));
    };

    const onChangeProductDiscount = (discountId) => ({ target }) => (
        setDiscounts((prevState) => prevState.map((discount) => {
            if (discount.id === discountId) {
                return {
                    ...discount,
                    [target.name]: target.value,
                };
            }

            return discount;
        }))
    );

    const onDeleteProductDiscount = (discountId) => (
        setDiscounts((prevImages) => prevImages.filter(({ id }) => id !== discountId))
    );

    const onDeleteProductImage = (imageId) => (
        setImages((prevImages) => prevImages.filter(({ id }) => id !== imageId))
    );

    const onChangeMainImage = ({ target }) => (
        setMainImage({
            image: target.files[0],
            imagePreview: URL.createObjectURL(target.files[0]),
        })
    );

    const onChangeTableSizeImage = ({ target }) => (
        setTableSizeImage({
            image: target.files[0],
            imagePreview: URL.createObjectURL(target.files[0]),
        })
    );
    const onDeleteTableSizeImage = () => (
        setTableSizeImage({
            image: undefined,
            imagePreview: undefined,
        })
    );

    const contextValue = useMemo(() => ({
        selectedCategories,
        setSelectedCategories,
        handleValuesChange,
        handleSelectCategory,
        values,
        removeCategory,
        relatedProducts,
        handleSelectRelatedProducts,
        removeSelectRelatedProducts,
        handleAddOption,
        handleOptionDelete,
        handleChangeOption,
        options,
        images,
        mainImage,
        tableSizeImage,
        discounts,
        product,
        onChangeProductImage,
        onAddProductImage,
        onDeleteProductImage,
        onChangeMainImage,
        onChangeTableSizeImage,
        onDeleteTableSizeImage,
        onAddProductDiscount,
        onDeleteProductDiscount,
        onChangeProductDiscount,
        setProduct,
        handleDescriptionChange,
    }), [
        selectedCategories,
        setSelectedCategories,
        handleValuesChange,
        handleSelectCategory,
        values,
        removeCategory,
        relatedProducts,
        handleSelectRelatedProducts,
        removeSelectRelatedProducts,
        handleAddOption,
        handleOptionDelete,
        handleChangeOption,
        options,
        images,
        mainImage,
        tableSizeImage,
        discounts,
        product,
        onChangeProductImage,
        onAddProductImage,
        onDeleteProductImage,
        onChangeMainImage,
        onChangeTableSizeImage,
        onDeleteTableSizeImage,
        onAddProductDiscount,
        onDeleteProductDiscount,
        onChangeProductDiscount,
        setProduct,
        handleDescriptionChange,
    ]);

    return (
        <AddProductContext.Provider value={contextValue}>
            {children}
        </AddProductContext.Provider>
    );
};
