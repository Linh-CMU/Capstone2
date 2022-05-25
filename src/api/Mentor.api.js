import Api from "./Base";

//order meeting by user
export const getListMentor = () => {
    return Api.get("/user/view-professional");
};

export const getListMentorPending = () => {
    return Api.get("/user/view-pending-order");
};

export const getListMentorPayment = () => {
    return Api.get("/user/view-accept-order");
};

export const getListMentorBooked = () => {
    return Api.get("/user/view-booked-order");
};

export const getListMentorDone = () => {
    return Api.get("/user/view-done-order");
};

export const postBookMentor = (data) => {
    return Api.post("/user/order-professional", data);
};

export const postPaymentMentor = (id) => {
    return Api.put(`/user/payment-order/${id}`);
};

export const postDoneMentor = (id) => {
    return Api.put(`/user/done-order/${id}`);
};
