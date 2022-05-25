import { createContext, useState, useEffect } from "react";
import API from "src/api";
import Utils from "src/libs/Utils";
import moment from "moment";

const MentorContext = createContext();

export const MentorContextProvider = ({ children }) => {
    const [userList, setUserList] = useState([
        // {
        //     createBy: "phucs54123",
        //     createDate: "2022-05-17T21:33:08",
        //     modifiedBy: "phucs54123",
        //     modifiedDate: "2022-05-17T21:33:08",
        //     orderId: 8,
        //     userOrder: null,
        //     professionalOrder: {
        //         createBy: "anonymousUser",
        //         createDate: "2022-05-16T11:33:27",
        //         modifiedBy: "anonymousUser",
        //         modifiedDate: "2022-05-16T11:33:27",
        //         id: 6,
        //         nameCompany: "nameCompany",
        //         addressCompany: "address",
        //         phoneCompany: "0616162662",
        //         emailCompany: "email@gmail.com",
        //         status: "is_active",
        //         linkAvatar: "linkAvatar",
        //         timeStart: "10:24:00",
        //         price: null,
        //         userResource: {
        //             createBy: "anonymousUser",
        //             createDate: "2022-05-16T11:33:26",
        //             modifiedBy: "anonymousUser",
        //             modifiedDate: "2022-05-16T11:33:26",
        //             userId: 8,
        //             userName: "phucs54123",
        //             addressOfUser: null,
        //             firstName: "Dat",
        //             lastName: "Nguyen",
        //             email: "thangphu1012@gmail.com",
        //             gender: "male",
        //             dateOfBirth: "1999-02-03",
        //             numberPhone: "0616162662",
        //         },
        //         listDayOfWeek: ["Tuesday", "Friday", "Saturday"],
        //         specializationResource: {
        //             createBy: "user1234",
        //             createDate: "2022-05-15T18:32:33",
        //             modifiedBy: "user1234",
        //             modifiedDate: "2022-05-15T18:32:33",
        //             id: 1,
        //             name: "Developer Back End",
        //             description: "Developer Back End",
        //             status: true,
        //         },
        //         statusWithUser: null,
        //     },
        //     statusMeeting: "pending",
        //     timeStart: "2022-05-17T14:33:01",
        //     timeEnd: null,
        // },
    ]);
    const [userListPending, setUserListPending] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await getAllUsers();
    //     };
    //     if (Utils.getSavedToken() && Utils.getSavedAuthority() !== "USER")
    //         fetchData();
    // }, []);

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
                    // console.log(res.data.data[0].curriculumVitaeUserOrder, "test")
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
