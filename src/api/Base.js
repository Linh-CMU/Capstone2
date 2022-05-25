import { create } from "apisauce";
import Utils from "../libs/Utils";

let token = Utils.getSavedToken();
const BASE_URL = "https://review-cv.herokuapp.com";

const api = create({
    baseURL: `${BASE_URL}/api/`,
    headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
api.setHeader("Authorization", `Bearer ${token}`);

const _handleResponse = (res, resolve, reject) => {
    if (res.status === 401) {
        Utils.clearAllSavedData();
        Utils.popupAlert({
            title: "Error",
            text: "Your Login session has expired or your token was invalid, please Login again, system will redirect to Login screen ...",
        }).then((response) => {
            window.location.href = "/";
        });
        return;
    } else if (res.status === 501 || res.status === 422 || res.status === 400) {
        reject(res);
    } else if (res.problem) {
        Utils.popupAlert({
            title: `Server error`,
            text: `Error detail: ${res.problem}`,
        });
        const error = "Server error";
        reject(error);
    } else {
        resolve(res);
    }
};

const post = async (url, data = {}) => {
    data = { ...data };
    const res = await api.post(url, data);
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const postWithoutToken = async (url, data = {}) => {
    api.setHeader("Authorization", `Bearer null`);
    data = { ...data };
    const res = await api.post(url, data);
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const postFormData = async (url, data) => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    const res = await api.post(url, data, { headers });
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const get = async (url, data = {}) => {
    const res = await api.get(url, data);
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const put = async (url, data = {}) => {
    data = { ...data };
    const res = await api.put(url, data);
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const patch = async (url, data = {}) => {
    data = { ...data };
    const res = await api.patch(url, data);
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const del = async (url, data = {}) => {
    data = { ...data };
    const res = await api.delete(url, data);
    return new Promise((resolve, reject) => {
        _handleResponse(res, resolve, reject);
    });
};

const upload = (url, data) => {
    return api.put(url, data.payload, {
        onUploadProgress: data.onUploadProgress,
    });
};

const setToken = (newToken) => {
    token = newToken;
    api.setHeader("Authorization", `Bearer ${token}`);
};

const getToken = () => {
    return token;
};

export default {
    postFormData,
    post,
    put,
    del,
    patch,
    upload,
    get,
    postWithoutToken
};

export { setToken, getToken };
