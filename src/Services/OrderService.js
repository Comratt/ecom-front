import API from 'API';
import qs from 'query-string';

import ServerException from 'Exceptions/ServerException';

class OrderService {
    static async store(params) {
        try {
            const orders = await API.post('api/admin/orders', params);

            return orders.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default OrderService;
