import { getImage } from 'API';
import { sortOrder } from 'Helpers';

export const adaptBanners = (data = []) => data.sort(sortOrder).map(({
    banner_id,
    description,
    title,
    image,
    image_mobile,
    link,
}) => ({
    id: banner_id,
    link,
    title,
    image: getImage(image),
    image_mobile: image_mobile ? getImage(image_mobile) : getImage(image),
    description,
}));
