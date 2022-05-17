import API from 'API';
import qs from 'query-string';

import ServerException from 'Exceptions/ServerException';

class ReturnService {
    static async store(params, id) {
        try {
            const returns = await API.post(`api/admin/return/${id}`, params);

            return returns.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default ReturnService;
