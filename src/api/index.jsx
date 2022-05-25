import { setToken, getToken } from "./Base";
import {
    login,
    registerUser,
    registerMentor,
    updateProfile,
    getProfile,
    getSpecialization,
} from "./Auth.api";
import {
    getListMentor,
    postBookMentor,
    postPaymentMentor,
    postDoneMentor,
    getListMentorPayment,
    getListMentorBooked,
    getListMentorDone,
    getListMentorPending,
} from "./Mentor.api";
import { getListPending, postAcceptUser, postRejectUser } from "./User.api";

export default {
    setToken,
    getToken,
    login,
    registerUser,
    registerMentor,
    getListMentor,
    updateProfile,
    getProfile,
    postBookMentor,
    postPaymentMentor,
    postDoneMentor,
    getListPending,
    postAcceptUser,
    postRejectUser,
    getListMentorPayment,
    getSpecialization,
    getListMentorBooked,
    getListMentorDone,
    getListMentorPending,
};
