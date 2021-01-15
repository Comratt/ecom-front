import axios from 'axios';

import store from './Store/createStore';

export const baseURL = 'http://ecom.back/';

export const loginUrl = 'api/auth/login';
export const dataUrl = 'api';
export const imgPath = `${baseURL}uploads/images`;
export const getImage = (imgName) => {
    if (imgName === '' || !imgName) {
        return `${imgPath}/no-photo.jpg`;
    }

    return `${imgPath}/${imgName}`;
};

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer',
};

const API = axios.create({
    baseURL,
    headers,
});

API.interceptors.request.use(
    (config) => {
        const modifiedConfig = { ...config };

        modifiedConfig.headers.Authorization = `Bearer ${store.getState().localSettings.authorizationToken}`;

        return modifiedConfig;
    },
    (error) => Promise.reject(error),
);

API.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export default API;
