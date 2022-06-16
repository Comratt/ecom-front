import API from 'API';
import qs from 'query-string';

import ServerException from 'Exceptions/ServerException';

class AnalyticsService {
    static async getAll(filters) {
        try {
            const pageQuery = qs.stringify(filters);
            const analytics = await API.get(`api/admin/analytics?${pageQuery}`);

            return analytics.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getOrdersGraph(filters) {
        try {
            const pageQuery = qs.stringify(filters);
            const analytics = await API.get(`api/admin/analytics/orders?${pageQuery}`);

            return analytics.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getCategoriesGraph(filters) {
        try {
            const pageQuery = qs.stringify(filters);
            const analytics = await API.get(`api/admin/analytics/categories?${pageQuery}`);

            return analytics.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async getProductsGraph(filters) {
        try {
            const pageQuery = qs.stringify(filters);
            const analytics = await API.get(`api/admin/analytics/products?${pageQuery}`);

            return analytics.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default AnalyticsService;
