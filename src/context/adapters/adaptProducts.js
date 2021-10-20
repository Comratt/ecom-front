import { getImage } from 'API';
import { getFormattedPrice, OPTION_TYPES } from 'Constants';
import { getFilteredOptions } from 'Helpers';

export const adaptProducts = ({ data = [] } = {}) => data.map(({
    product_id,
    description,
    name,
    image,
    price,
    options,
}) => ({
    id: product_id,
    link: `/products/${product_id}`,
    name,
    image: getImage(image),
    price: getFormattedPrice(price),
    colors: getFilteredOptions(options, OPTION_TYPES.Color),
    sizes: getFilteredOptions(options, OPTION_TYPES.Size),
    description,
}));

export const adaptProduct = (data = {}) => {
    if (!Object.keys(data).length) {
        return ({});
    }

    return ({
        id: data.product_id,
        name: data.name,
        images: [
            getImage(data.image),
            ...data.images.map(({ image }) => getImage(image)),
        ],
        image: getImage(data.image),
        price: getFormattedPrice(data.price),
        purePrice: data.price,
        colors: getFilteredOptions(data.options, OPTION_TYPES.Color),
        sizes: getFilteredOptions(data.options, OPTION_TYPES.Size),
        description: data.description,
    });
};
