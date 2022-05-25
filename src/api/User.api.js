import Api from "./Base";

export const getListPending = () => {
    return Api.get("/professional/view-order-meeting");
};

export const postAcceptUser = (id) => {
    return Api.put(`/professional/accept-order-meeting/${id}`);
};

export const postRejectUser = (id) => {
    return Api.put(`/professional/deny-order-meeting/${id}`);
};
