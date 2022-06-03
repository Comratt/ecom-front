import API from 'API';
import ServerException from 'Exceptions/ServerException';

class CategoryService {
    static async getAll() {
        try {
            const categories = await API.get('api/admin/categories');

            return categories.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getCategory(id) {
        try {
            const categories = await API.get(`api/admin/categories/${id}`);

            return categories.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async add(params) {
        try {
            const formData = new FormData();

            formData.append('category_name', params.category_name);
            formData.append('description', params.description);
            formData.append('parent_id', params.parent_id);
            formData.append('meta_title', params.meta_title);
            formData.append('meta_keywords', params.meta_keywords);
            formData.append('meta_description', params.meta_description);
            formData.append('sort_order', params.sort_order);
            formData.append('image', params.image ? params.image[0] : '');
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };

            const categories = await API.post('api/admin/categories', formData, settings);

            return categories.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async update(params, id) {
        try {
            const formData = new FormData();

            formData.append('category_name', params.category_name);
            formData.append('description', params.description);
            formData.append('parent_id', params.parent_id);
            formData.append('meta_title', params.meta_title);
            formData.append('meta_keywords', params.meta_keywords);
            formData.append('meta_description', params.meta_description);
            formData.append('sort_order', params.sort_order);
            formData.append('image', params.image ? params.image[0] : '');
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };

            const categories = await API.post(`api/admin/categories/${id}/edit`, formData, settings);

            return categories.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async delete(id) {
        try {
            const category = await API.delete(`api/admin/categories/${id}`);

            return category.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default CategoryService;
