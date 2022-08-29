import API from 'API';
import qs from 'query-string';

import ServerException from 'Exceptions/ServerException';

class OrderService {
    static async getAll(filters) {
        try {
            const pageQuery = qs.stringify(filters);
            const orders = await API.get(`api/admin/orders?${pageQuery}`);

            return orders.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getById(id) {
        try {
            return (await API.get(`api/admin/orders/${id}`)).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getByEmail(email) {
        try {
            return (await API.post('api/admin/get/orders/email', { email })).data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async addHistoryStatus(params) {
        try {
            const orders = await API.post('api/admin/orders-history', params);

            return orders.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async store(params) {
        try {
            const orders = await API.post('api/admin/orders', params);

            return orders.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async addTtn(id, ttnRef) {
        try {
            const orders = await API.post(`api/admin/orders-ttn/${id}`, { ttnRef });

            return orders.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default OrderService;
