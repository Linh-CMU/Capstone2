import swal from "sweetalert";
import Cookies from "universal-cookie";

const SAVED_SECURE_TOKEN = "@DELIVERY:secure_token";
const SAVED_USERNAME = "@DELIVERY:username";
const SAVED_AUTHORITY = "@DELIVERY:authority";

const cookies = new Cookies();
const saveToken = (token) => {
    cookies.set(SAVED_SECURE_TOKEN, token, { path: "/" });
};

const getSavedToken = () => {
    const token = cookies.get(SAVED_SECURE_TOKEN);
    return token;
};

const saveUserName = (token) => {
    cookies.set(SAVED_USERNAME, token, { path: "/" });
};

const getSavedUserName = () => {
    return cookies.get(SAVED_USERNAME);
};

const saveAuthority = (token) => {
    cookies.set(SAVED_AUTHORITY, token, { path: "/" });
};

const getSavedAuthority = () => {
    return cookies.get(SAVED_AUTHORITY);
};

const clearAllSavedData = async () => {
    cookies.remove(SAVED_SECURE_TOKEN, { path: "/" });
    cookies.remove(SAVED_USERNAME, { path: "/" });
    cookies.remove(SAVED_AUTHORITY, { path: "/" });
};

const popupAlert = (data) => {
    const { type, title, text, buttons } = data;
    return new Promise((resolve) => {
        swal({ title, text, icon: type, buttons }).then((response) =>
            resolve(response)
        );
    });
};

export default {
    popupAlert,
    saveToken,
    getSavedToken,
    saveUserName,
    getSavedUserName,
    saveAuthority,
    getSavedAuthority,
    clearAllSavedData,
};
