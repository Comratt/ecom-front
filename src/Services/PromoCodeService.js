import API from 'API';
import ServerException from 'Exceptions/ServerException';

class PromoCodeService {
    static async getAll() {
        try {
            const response = await API.get('api/admin/promocodes');

            return response.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async store({
        name,
        price,
        prefix,
    }) {
        try {
            const body = {
                name,
                price,
                prefix,
            };
            const response = await API.post('api/admin/promocodes', body);

            return response.data;
        } catch (e) {
            throw new ServerException(e.response, 'errors');
        }
    }

    static async modify(id, {
        name,
        price,
        prefix,
    }) {
        try {
            const body = {
                name,
                price,
                prefix,
            };
            const response = await API.post(`api/admin/promocodes/${id}/edit`, body);

            return response.data;
        } catch (e) {
            throw new ServerException(e.response, 'errors');
        }
    }

    static async getByName(name) {
        try {
            return await API.post('api/admin/promocodes/get', { name });
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async delete(id) {
        try {
            return await API.delete(`api/admin/promocodes/${id}`);
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default PromoCodeService;
