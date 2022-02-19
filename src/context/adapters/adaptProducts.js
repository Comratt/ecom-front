import { getImage } from 'API';
import { getFormattedPrice, OPTION_TYPES } from 'Constants';
import { adaptCategories } from 'Pages/Admin/hooks/useFetchCategories';
import { getFilteredOptions } from 'Helpers';

export const adaptProducts = ({ data = [] } = {}) => data.map(({
    product_id,
    description,
    name,
    image,
    price,
    related,
    discounts,
    colors,
    sizes,
}) => ({
    id: product_id,
    link: `/products/${product_id}`,
    name,
    image: getImage(image),
    price: getFormattedPrice(price),
    colors: colors?.map(
        (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
    ),
    sizes: sizes?.map(
        (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
    ),
    description,
    related,
    discounts,
}));

export const adaptProduct = (data = {}, allCategories) => {
    if (!Object.keys(data).length) {
        return ({});
    }

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
        price: getFormattedPrice(data.price),
        purePrice: data.price,
        colors: data.colors?.map(
            (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
        ),
        sizes: data.sizes?.map(
            (item) => ({ ...item, id: item.option_value_id, name: item.name_value }),
        ),
        description: data.description,
        categories: data.categories?.map(({ category_id, ...rest }) => ({
            ...rest,
            category_id,
            name: allCategories.find((cat) => cat.id === category_id)?.name,
        })),
        related: data.related,
        discounts: data.discounts,
        meta_description: data.meta_description,
        meta_keyword: data.meta_keyword,
        meta_title: data.meta_title,
        meta_tag: data.tag,
    });
};
