import API from 'API';
import ServerException from 'Exceptions/ServerException';

class OptionService {
    static async getOptions() {
        try {
            const options = await API.get('api/admin/options');

            return options.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default OptionService;
