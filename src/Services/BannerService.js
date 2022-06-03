import API from 'API';
import ServerException from 'Exceptions/ServerException';

class BannerService {
    static async getAll() {
        try {
            const banners = await API.get('api/admin/banners');

            return banners.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getBanner(id) {
        try {
            const banner = await API.get(`api/admin/banners/${id}`);

            return banner.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async add(params) {
        try {
            const formData = new FormData();

            formData.append('title', params.title);
            formData.append('link', params.link);
            formData.append('description', params.description);
            formData.append('sort_order', params.sort_order);
            formData.append('image', params.image ? params.image[0] : '');
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };

            const banner = await API.post('api/admin/banners', formData, settings);

            return banner.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async update(params, id) {
        try {
            const formData = new FormData();

            formData.append('title', params.title);
            formData.append('link', params.link);
            formData.append('description', params.description);
            formData.append('sort_order', params.sort_order || 1);
            formData.append('image', params.image ? params.image[0] : '');
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };

            const banner = await API.post(`api/admin/banners/${id}/edit`, formData, settings);

            return banner.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async delete(id) {
        try {
            const banner = await API.delete(`api/admin/banners/${id}`);

            return banner.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default BannerService;
