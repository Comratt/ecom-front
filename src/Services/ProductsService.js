import API from 'API';
import qs from 'query-string';

import ServerException from 'Exceptions/ServerException';
import { instanceOf } from 'prop-types';

class ProductsService {
    static async getAll(filters) {
        try {
            const pageQuery = qs.stringify(filters);

            return (await API.get(`api/admin/products?${pageQuery}`)).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getAllModels() {
        try {
            return (await API.get('api/admin/product/models')).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getById(id) {
        try {
            return (await API.get(`api/admin/products/${id}`)).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async delete(id) {
        try {

        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async update(params, id) {
        try {
            const formData = new FormData();
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };
            const categories = params.selectedCategories.map((name = '') => name.split(' ~ ')[1]);
            const products = params.relatedProducts.map((name = '') => name.split(' ~ ')[1]);

            formData.append('options', JSON.stringify(params.options));
            formData.append('product', JSON.stringify(params.product));
            formData.append('category', JSON.stringify(categories));
            formData.append('related', JSON.stringify(products));
            formData.append('discounts', JSON.stringify(params.discounts));
            formData.append('mainImage', params?.mainImage?.image);
            formData.append('imagesIds', JSON.stringify(params?.images?.map(({ id }) => id)));
            params.images.forEach(({ image, id: imgId }) => {
                formData.append(`image_${imgId}`, image || '');
            });
            // params?.images?.forEach(({ image, id }) => {
            //     if (image instanceof File) {
            //         formData.append(`image_${id}`, image);
            //     }
            // });
            // console.log(formData);

            return (await API.post(`api/admin/products/${id}/edit`, formData, settings)).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async store(params) {
        try {
            const formData = new FormData();
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };
            const categories = params.selectedCategories.map(({ label, value }) => [label, value]);
            const products = params.relatedProducts.map(({ label, value }) => [label, value]);

            formData.append('options', JSON.stringify(params.options));
            formData.append('product', JSON.stringify(params.product));
            formData.append('category', JSON.stringify(categories));
            formData.append('related', JSON.stringify(products));
            formData.append('discounts', JSON.stringify(params.discounts));
            formData.append('mainImage', params?.mainImage?.image);
            formData.append('imagesIds', JSON.stringify(params?.images?.map(({ id }) => id)));
            params.images.forEach(({ image, id: imgId }) => {
                formData.append(`image_${imgId}`, image || '');
            });
            // params?.images?.forEach(({ image, id }) => {
            //     if (image instanceof File) {
            //         formData.append(`image_${id}`, image);
            //     }
            // });
            // console.log(formData);

            return (await API.post('api/admin/products', formData, settings)).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default ProductsService;
