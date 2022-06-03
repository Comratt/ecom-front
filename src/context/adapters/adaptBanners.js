import { getImage } from 'API';
import { sortOrder } from 'Helpers';

export const adaptBanners = (data = []) => data.sort(sortOrder).map(({
    banner_id,
    description,
    title,
    image,
    link,
}) => ({
    id: banner_id,
    link,
    title,
    image: getImage(image),
    description,
}));
