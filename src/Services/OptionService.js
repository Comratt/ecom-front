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

    static async add(params) {
        try {
            const formData = new FormData();
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };

            formData.append('name', params.name);
            params.values.forEach((val) => {
                formData.append(`image_${val.id}`, val.image ? val.image : '');
            });
            formData.append('values', JSON.stringify(params.values));

            const options = await API.post('api/admin/options', formData, settings);

            return options.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async update(params, id) {
        try {
            const formData = new FormData();
            const settings = { headers: { 'Content-Type': 'multipart/form-data' } };

            formData.append('name', params.name);
            params.values.forEach((val) => {
                formData.append(`image_${val.id}`, val.image ? val.image : '');
            });
            formData.append('values', JSON.stringify(params.values));

            const option = await API.post(`api/admin/options/${id}/edit`, formData, settings);

            return option.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async delete(id) {
        try {
            const option = await API.delete(`api/admin/options/${id}`);

            return option.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }
}

export default OptionService;
