import API from 'API';
import ServerException from 'Exceptions/ServerException';

class ClientBaseService {
    static async signIn(email, password) {
        try {
            const body = {
                email,
                password,
            };
            const responseUser = await API.post('api/auth/login', body);

            return responseUser.data;
        } catch (e) {
            throw new ServerException(e.response);
        }
    }

    static async signUp({
        email,
        password,
        firstName,
        lastName,
    }) {
        try {
            const body = {
                email,
                password,
                firstName,
                lastName,
            };
            const responseUser = await API.post('api/auth/signup', body);

            return responseUser.data;
        } catch (e) {
            throw new ServerException(e.response, 'errors');
        }
    }

    static async logout() {
        try {
            return await API.get('api/logout');
        } catch (e) {
            throw new ServerException('GET logout');
        }
    }
}

export default ClientBaseService;