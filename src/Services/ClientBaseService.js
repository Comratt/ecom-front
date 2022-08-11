import API from 'API';
import ServerException from 'Exceptions/ServerException';

class ClientBaseService {
    static async signIn(email, password, fromAdmin = false) {
        try {
            const body = {
                email,
                password,
                from_admin: fromAdmin,
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
        phone,
        role = 'customer',
    }) {
        try {
            const body = {
                email,
                password,
                firstName,
                lastName,
                phone,
                role,
            };
            const responseUser = await API.post('api/auth/signup', body);

            return responseUser.data;
        } catch (e) {
            throw new ServerException(e.response, 'errors');
        }
    }

    static async modify(id, {
        firstName,
        lastName,
        phone,
        email,
        newPassword,
        password,
        role = 'customer',
    }) {
        try {
            const body = {
                firstName,
                lastName,
                phone,
                email,
                newPassword,
                password,
                role,
                id,
            };
            const userResponse = await API.post('api/admin/customers/update', body);

            return userResponse.data;
        } catch (e) {
            throw new ServerException(e.response, 'errors');
        }
    }

    static async getAll() {
        try {
            const customers = await API.get('api/admin/customers');

            return customers.data;
        } catch (e) {
            throw new ServerException(e.response);
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
