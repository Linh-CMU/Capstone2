import { createContext, useState, useEffect } from "react";
import API from "src/api";
import Utils from "src/libs/Utils";
import moment from "moment";

const MentorContext = createContext();

export const MentorContextProvider = ({ children }) => {
    const [userList, setUserList] = useState([
    ]);
    const [userListPending, setUserListPending] = useState([]);

    useEffect(() => {
        setUserList(userListPending);
    }, [userListPending]);

    const getAllUsers = async () => {
        await getUsersPending();
    };

    const getUsersPending = async () => {
        await API.getListPending()
            .then(async (res) => {
                if (res.status === 200) {
                    setUserListPending(
                        res?.data?.data?.map((item) => {
                            return {
                                status: item.statusMeeting,
                                createDate: item.createDate,
                                orderId: item.orderId,
                                timeStart: item.timeStart,
                                ...item.userOrder,
                                ...item,
                            };
                        })
                    );
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
    };

    const MentorContextData = {
        userList,
        getAllUsers,
    };

    return (
        <MentorContext.Provider value={MentorContextData}>
            {children}
        </MentorContext.Provider>
    );
};

export default MentorContext;
