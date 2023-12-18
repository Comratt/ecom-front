import uniqBy from 'lodash/uniqBy';
import { getImage } from 'API';
import { getFormattedPrice } from 'Constants';

export const adaptProducts = ({ data = [] } = {}) => {
    if (!Array.isArray(data)) return [];

    return data.map(({
        p_id,
        description,
        name,
        image,
        price,
        related,
        discounts,
        colors,
        sizes,
        slug,
    }) => {
        const colorsF = colors?.map(
            (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
        );
        const sizesF = sizes?.map(
            (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
        );
        const discount = discounts?.reduce((acc, item) => acc + +item.discount_price, 0);

        return ({
            id: p_id,
            link: `/products/${slug}`,
            name,
            image: getImage(image),
            price: getFormattedPrice(price),
            purePrice: price,
            colors: uniqBy(colorsF, 'id'),
            sizes: uniqBy(sizesF, 'id'),
            description,
            related,
            discount,
        });
    });
};

export const adaptProduct = (data = {}, allCategories, isUniq) => {
    if (!Object.keys(data).length) {
        return ({});
    }

    const colorsF = data?.colors?.map(
        (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
    );
    const sizesF = data?.sizes?.map(
        (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
    );
    const discounts = data?.discounts?.reduce((acc, item) => acc + +item.discount_price, 0);
    const uniqColors = isUniq ? uniqBy(colorsF, 'id') : colorsF;
    const uniqSizes = isUniq ? uniqBy(sizesF, 'id') : sizesF;
    const colorSizes = data?.colors?.reduce((acc, val) => {
        const findSize = data?.sizes?.find(
            ({ color_size_product_id }) => (
                color_size_product_id === val.color_size_product_id
            ),
        );

        return [
            ...acc,
            {
                colorId: val.color_id,
                colorValId: val.opt_val_id,
                colorName: val.name_value,
                sizeId: findSize?.size_id,
                sizeValId: findSize?.opt_val_id,
                sizeName: findSize?.name_value,
                quantity: val.product_quantity,
            },
        ];
    }, []);

    return ({
        ...data,
        id: data.product_id,
        name: data.name,
        model: data.model,
        images: [
            getImage(data.image),
            ...data.images.map(({ image }) => getImage(image)),
        ],
        imagesOrig: [
            ...data.images.map(({ image, product_image_id }) => (
                { id: product_image_id, image: getImage(image) }
            )),
        ],
        image: getImage(data.image),
        tableSize: data.table_size ? getImage(data.table_size) : null,
        price: getFormattedPrice(data.price),
        purePrice: data.price,
        colors: uniqColors,
        sizes: uniqSizes,
        colorSizes,
        description: data.description,
        categories: data.categories?.map(({ category_id, ...rest }) => ({
            ...rest,
            category_id,
            name: allCategories.find((cat) => cat.id === category_id)?.name,
        })),
        related: data.related,
        discount: data.discounts,
        discounts,
        meta_description: data.meta_description,
        meta_keyword: data.meta_keyword,
        meta_title: data.meta_title,
        meta_tag: data.tag,
    });
};
