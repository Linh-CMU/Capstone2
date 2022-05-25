const PATHS = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    ADMIN: {},
    MENTOR: {
        DASHBOARD: "/mentor/dashboard",
    },
    USER: {
        DASHBOARD: "/user/dashboard",
        LIST_MENTOR: "/user/list-mentor",
        LIST_PENDING: "/user/pending",
        LIST_PAYMENT: "/user/payment",
        LIST_BOOKED: "/user/booked",
        LIST_DONE: "/user/done",
        PAYMENT_ORDER: "/user/payment-order",
        MENTOR: "/user/mentor",
        UPDATE_PROFILE: "/user/update-profile",
    },
};

export default PATHS;
