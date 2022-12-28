import axios from 'axios';

import store from './Store/createStore';

export const baseURL = 'https://back.paparot.com/';
export const novaPoshtaURL = 'https://api.novaposhta.ua/v2.0/json/';
export const novaPoshtaAPIKEY = '3c34390ca4d3a3b2b97eeb228159beea';

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

const novaPoshtaAPI = axios.create({
    baseURL: novaPoshtaURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

novaPoshtaAPI.interceptors.request.use(
    (resp) => {
        if (resp.method === 'post' || resp.method === 'POST') {
            const modifiedParams = { ...resp };

            modifiedParams.data.apiKey = novaPoshtaAPIKEY;

            return modifiedParams;
        }

        return resp;
    },
    (error) => Promise.reject(error),
);

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

export { novaPoshtaAPI };

export default API;
