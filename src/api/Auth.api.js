import Api from "./Base";

export const registerUser = (data) => {
    return Api.postWithoutToken("/auth/signup", data);
};

export const registerMentor = (data) => {
    return Api.postWithoutToken("/auth/signup-professional", data);
};

export const login = (data) => {
    return Api.postWithoutToken("/auth/signing", data);
};

export const updateProfile = (data) => {
    return Api.post("/user/create-cv-information", data);
};

export const getProfile = (data) => {
    return Api.get("/user/create-cv", data);
};

export const getSpecialization = () => {
    return Api.get("/auth/specialization");
};
