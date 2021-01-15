import { SERVER_EXCEPTION } from './types';

function ServerException({ data, status }) {
    this.type = SERVER_EXCEPTION;
    this.message = data.message;
    this.status = status;
}

export default ServerException;
