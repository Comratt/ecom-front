import { getImage } from 'API';

export const adaptBanners = (data = []) => data.map(({
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
