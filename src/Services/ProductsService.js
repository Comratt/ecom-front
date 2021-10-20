import API from 'API';
import qs from 'query-string';

import ServerException from 'Exceptions/ServerException';

class ProductsService {
    static async getAll(page) {
        try {
            const pageQuery = qs.stringify({ page });

            return (await API.get(`api/admin/products?${pageQuery}`)).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async store(params) {
        try {

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

        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default ProductsService;
