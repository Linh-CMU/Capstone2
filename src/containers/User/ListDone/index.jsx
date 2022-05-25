import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import UserContext from "src/contexts/userContext";
import Loading from "src/components/Common/Loading";
import Dashboard from "src/containers/User/Dashboard";
import "./_listpayment.scss";
import usePagination from "src/libs/usePagination";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import UserItem from "../UserItem";
import EmailIcon from "@mui/icons-material/Email";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Modal from "@mui/material/Modal";
import moment from "moment";

const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

const ListMentor = () => {
    const { doneList, getMentorsDone } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [userSelected, setUserSelected] = useState({});
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const [dataList, setDataList] = useState(doneList);
    let [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            doneList.length == 0 && (await getMentorsDone());
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setDataList(doneList);
    }, [doneList]);

    const PER_PAGE = 5;
    const count = Math.ceil(dataList.length / PER_PAGE);
    const _DATA = usePagination(dataList, PER_PAGE);

    const handlePagination = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    return (
        <Dashboard title={"List Mentor Done"}>
            <div className="ListMentor">
                {isLoading && <Loading />}
                <Box sx={{ display: "flex" }} className="ListMentor__wrapper">
                    <div className="ListMentor__content" component="main">
                        {/* <Toolbar /> */}
                        <div className="MentorDashboard__list">
                            <List
                                sx={{
                                    width: "100%",
                                }}
                            >
                                {_DATA.currentData().map((item) => (
                                    <UserItem
                                        key={item.orderId}
                                        {...item}
                                        openModal={openModal}
                                        handleOpen={handleOpen}
                                        handleClose={handleClose}
                                        setUserSelected={setUserSelected}
                                    />
                                ))}
                            </List>
                            <Pagination
                                className="pt-3"
                                count={count}
                                size="large"
                                page={page}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePagination}
                            />
                            <Modal
                                open={openModal}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{
                                    "& .MuiBackdrop-root": {
                                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                                    },
                                }}
                            >
                                <Box sx={styleModal} className="ModalBox">
                                    <div className="UserItem">
                                        <div className="UserItem__title">
                                            Payment
                                        </div>
                                        <div className="UserItem__content">
                                            <div className="Mentor__content__name UserItem__content__name">
                                                {`${userSelected.firstName} ${userSelected.lastName}`}
                                            </div>
                                            <div className="UserItem__content__status">
                                                <div
                                                    className={`Status Status--${userSelected.status}`}
                                                >
                                                    {userSelected.status}
                                                </div>
                                            </div>
                                            <div className="UserItem__content__item">
                                                <EmailIcon />{" "}
                                                {userSelected.email}
                                            </div>
                                            <div className="UserItem__content__item">
                                                <PermPhoneMsgIcon />{" "}
                                                {userSelected.numberPhone}
                                            </div>
                                            <div className="UserItem__content__item">
                                                <TransgenderIcon />{" "}
                                                {userSelected.gender}
                                            </div>
                                            <div className="UserItem__content__item">
                                                <HomeIcon />{" "}
                                                {userSelected.addressOfUser}
                                            </div>
                                            <div className="UserItem__content__item">
                                                <CalendarMonthIcon />{" "}
                                                {moment(
                                                    userSelected.timeStart
                                                ).format("DD/MM/YYYY")}
                                            </div>
                                            <div className="UserItem__content__item">
                                                <ScheduleIcon />{" "}
                                                {moment(
                                                    userSelected.timeStart
                                                ).format("HH:mm")}
                                            </div>
                                            <div className="UserItem__content__button">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleClose}
                                                    className="bg--done"
                                                >
                                                    Close
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </Box>
            </div>
        </Dashboard>
    );
};

export default ListMentor;
