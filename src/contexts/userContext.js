import { createContext, useState, useEffect } from "react";
import API from "src/api";
import Utils from "src/libs/Utils";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [mentorList, setMentorList] = useState([]);
    const [pendingList, setPendingList] = useState([]);
    const [paymentList, setPaymentList] = useState([]);
    const [bookedList, setBookedList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    console.log({ bookedList });
    useEffect(() => {
        const fetchData = async () => {
            await getAllMentors();
            await getMentorsPending();
            await getMentorsPayment();
            await getMentorsBooked();
            await getMentorsDone();
        };
        if (
            Utils.getSavedToken() &&
            Utils.getSavedAuthority() !== "PROFESSIONAL"
        )
            fetchData();
    }, []);

    const getAllMentors = async () => {
        await API.getListMentor()
            .then(async (res) => {
                if (res.status === 200) {
                    setMentorList(
                        res.data.data.map((item) => {
                            return {
                                ...item,
                                status:
                                    item.statusWithUser == "is_active"
                                        ? "active"
                                        : item.statusWithUser,
                            };
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const getMentorsPending = async () => {
        await API.getListMentorPending()
            .then(async (res) => {
                if (res.status === 200) {
                    setPendingList(
                        res.data.data.map((item) => {
                            return {
                                ...item,
                                id: item.professionalOrder.id,
                                userName:
                                    item.professionalOrder.userResource
                                        .userName,
                                firstName:
                                    item.professionalOrder.userResource
                                        .firstName,
                                lastName:
                                    item.professionalOrder.userResource
                                        .lastName,
                                email: item.professionalOrder.userResource
                                    .email,
                                numberPhone:
                                    item.professionalOrder.userResource
                                        .numberPhone,
                                gender: item.professionalOrder.userResource
                                    .gender,
                                addressOfUser:
                                    item.professionalOrder.userResource
                                        .addressOfUser,
                                timeStart: item.timeStart,
                                linkAvatar: item.professionalOrder.linkAvatar,
                                userResource:
                                    item.professionalOrder.userResource,
                                status:
                                    item.statusMeeting == "is_active"
                                        ? "active"
                                        : item.statusMeeting,
                            };
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const getMentorsPayment = async () => {
        await API.getListMentorPayment()
            .then(async (res) => {
                if (res.status === 200) {
                    setPaymentList(
                        res.data.data.map((item) => {
                            return {
                                ...item,
                                id: item.professionalOrder.id,
                                userName:
                                    item.professionalOrder.userResource
                                        .userName,
                                firstName:
                                    item.professionalOrder.userResource
                                        .firstName,
                                lastName:
                                    item.professionalOrder.userResource
                                        .lastName,
                                email: item.professionalOrder.userResource
                                    .email,
                                numberPhone:
                                    item.professionalOrder.userResource
                                        .numberPhone,
                                gender: item.professionalOrder.userResource
                                    .gender,
                                addressOfUser:
                                    item.professionalOrder.userResource
                                        .addressOfUser,
                                timeStart: item.timeStart,
                                linkAvatar: item.professionalOrder.linkAvatar,
                                userResource:
                                    item.professionalOrder.userResource,
                                status:
                                    item.statusMeeting == "is_active"
                                        ? "active"
                                        : item.statusMeeting,
                            };
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const getMentorsBooked = async () => {
        await API.getListMentorBooked()
            .then(async (res) => {
                if (res.status === 200) {
                    setBookedList(
                        res.data.data.map((item) => {
                            return {
                                ...item,
                                id: item.professionalOrder.id,
                                userName:
                                    item.professionalOrder.userResource
                                        .userName,
                                firstName:
                                    item.professionalOrder.userResource
                                        .firstName,
                                lastName:
                                    item.professionalOrder.userResource
                                        .lastName,
                                email: item.professionalOrder.userResource
                                    .email,
                                numberPhone:
                                    item.professionalOrder.userResource
                                        .numberPhone,
                                gender: item.professionalOrder.userResource
                                    .gender,
                                addressOfUser:
                                    item.professionalOrder.userResource
                                        .addressOfUser,
                                timeStart: item.timeStart,
                                linkAvatar: item.professionalOrder.linkAvatar,
                                userResource:
                                    item.professionalOrder.userResource,
                                status:
                                    item.statusMeeting == "is_active"
                                        ? "active"
                                        : item.statusMeeting,
                            };
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const getMentorsDone = async () => {
        await API.getListMentorDone()
            .then(async (res) => {
                if (res.status === 200) {
                    setDoneList(
                        res.data.data.map((item) => {
                            return {
                                ...item,
                                id: item.professionalOrder.id,
                                userName:
                                    item.professionalOrder.userResource
                                        .userName,
                                firstName:
                                    item.professionalOrder.userResource
                                        .firstName,
                                lastName:
                                    item.professionalOrder.userResource
                                        .lastName,
                                email: item.professionalOrder.userResource
                                    .email,
                                numberPhone:
                                    item.professionalOrder.userResource
                                        .numberPhone,
                                gender: item.professionalOrder.userResource
                                    .gender,
                                addressOfUser:
                                    item.professionalOrder.userResource
                                        .addressOfUser,
                                timeStart: item.timeStart,
                                linkAvatar: item.professionalOrder.linkAvatar,
                                userResource:
                                    item.professionalOrder.userResource,
                                status:
                                    item.statusMeeting == "is_active"
                                        ? "active"
                                        : item.statusMeeting,
                            };
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const getMentor = (id) => {
        const a = mentorList.filter((mentor) => mentor.id == id);
        return a[0];
    };

    const UserContextData = {
        mentorList,
        pendingList,
        paymentList,
        bookedList,
        doneList,
        getMentor,
        getAllMentors,
        getMentorsPayment,
        getMentorsBooked,
        getMentorsDone,
        getMentorsPending,
    };

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
