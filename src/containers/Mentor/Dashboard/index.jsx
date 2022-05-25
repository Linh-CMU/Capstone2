import React, { useState, useEffect, useContext } from "react";
import LayoutMentor from "../LayoutMentor";
import "./_dashboard.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import Pagination from "@mui/material/Pagination";
import usePagination from "../../../libs/usePagination";
import MentorContext from "src/contexts/mentorContext";
import Loading from "src/components/Common/Loading";
import { useParams } from "react-router-dom";
import UserItem from "../UserItem";
import EmailIcon from "@mui/icons-material/Email";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import moment from "moment";
import API from "src/api";
import Utils from "src/libs/Utils";
import { useNavigate } from "react-router-dom";
import PATHS from "src/constants/Paths";

const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
};

const DashboardMentor = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const { userList, getAllUsers } = useContext(MentorContext);
    const [isLoading, setIsLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [openModalProfile, setOpenModalProfile] = useState(false);
    const [userSelected, setUserSelected] = useState({});
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => {
        setOpenModal(false);
        setOpenModalProfile(false);
    }
    const handleOpenProfile = () => setOpenModalProfile(true);

    const [anchorEl, setAnchorEl] = useState(null);
    const openFilter = Boolean(anchorEl);

    const [dataList, setDataList] = useState(userList);
    let [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            userList.length == 0 && (await getAllUsers());
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (id == "all") {
            setDataList(userList);
        } else {
            const dataListFilter = userList.filter((user) => user.status == id)
            setDataList(dataListFilter);
        }
        if (dataList.length != 0) {
            setPage(1);
        }
    }, [userList]);

    const PER_PAGE = 5;
    const count = Math.ceil(dataList.length / PER_PAGE);
    let _DATA = usePagination(dataList, PER_PAGE);

    const handlePagination = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseFilter = () => {
        setAnchorEl(null);
    };

    const handleAccept = async () => {
        handleClose();
        setIsLoading(true);
        await API.postAcceptUser(userSelected.orderId)
            .then(async (res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    Utils.popupAlert({
                        title: "Accept successfully",
                        type: "success",
                    }).then(() => navigate(`${PATHS.MENTOR.DASHBOARD}/all`));
                }
            })
            .catch((e) => {
                Utils.popupAlert({
                    title: "Oops...",
                    text: "Error Accept",
                    type: "error",
                });
                setIsLoading(false);
            });
        await getAllUsers();
        setIsLoading(false);
    };

    const handleReject = async () => {
        handleClose();
        setIsLoading(true);
        await API.postRejectUser(userSelected.orderId)
            .then(async (res) => {
                setIsLoading(false);
                if (res.status === 200) {
                    Utils.popupAlert({
                        title: "Reject successfully",
                        type: "success",
                    }).then(() => navigate(`${PATHS.MENTOR.DASHBOARD}/all`));
                }
            })
            .catch((e) => {
                Utils.popupAlert({
                    title: "Oops...",
                    text: "Error Reject",
                    type: "error",
                });
                setIsLoading(false);
            });
        await getAllUsers();
        setIsLoading(false);
    };

    return (
        <LayoutMentor title={`List User ${id}`}>
            {isLoading && <Loading />}
            <div className="MentorDashboard">
                <div className="MentorDashboard__filter">
                    <Button
                        id="basic-button"
                        aria-controls={openFilter ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openFilter ? "true" : undefined}
                        onClick={handleClick}
                    >
                        Status
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openFilter}
                        onClose={handleCloseFilter}
                        MenuListProps={{
                            "aria-labelledby": "basic-Button",
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleCloseFilter();
                                navigate(`${PATHS.MENTOR.DASHBOARD}/all`);
                            }}
                        >
                            All
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseFilter();
                                navigate(`${PATHS.MENTOR.DASHBOARD}/pending`);
                            }}
                        >
                            Pending
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseFilter();
                                navigate(`${PATHS.MENTOR.DASHBOARD}/payment`);
                            }}
                        >
                            Payment
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseFilter();
                                navigate(`${PATHS.MENTOR.DASHBOARD}/booked`);
                            }}
                        >
                            Booked
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseFilter();
                                navigate(`${PATHS.MENTOR.DASHBOARD}/reject`);
                            }}
                        >
                            Reject
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                handleCloseFilter();
                                navigate(`${PATHS.MENTOR.DASHBOARD}/done`);
                            }}
                        >
                            Done
                        </MenuItem>
                    </Menu>
                </div>
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
                                handleOpenProfile={handleOpenProfile}
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
                                    Information
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
                                        <EmailIcon /> Email:{" "}
                                        {userSelected.email}
                                    </div>
                                    <div className="UserItem__content__item">
                                        <PermPhoneMsgIcon /> Phone:{" "}
                                        {userSelected.numberPhone}
                                    </div>
                                    <div className="UserItem__content__item">
                                        <TransgenderIcon /> Gender:{" "}
                                        {userSelected.gender}
                                    </div>
                                    <div className="UserItem__content__item">
                                        <HomeIcon /> Address:{" "}
                                        {userSelected.addressOfUser}
                                    </div>
                                    <div className="UserItem__content__item">
                                        <CalendarMonthIcon /> Appointment date:{" "}
                                        {moment(userSelected.timeStart).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </div>
                                    <div className="UserItem__content__item">
                                        <ScheduleIcon /> Appointment time:{" "}
                                        {moment(userSelected.timeStart).format(
                                            "HH:mm"
                                        )}
                                    </div>
                                    <div className="UserItem__content__button">
                                        {userSelected.status === "pending" ? (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleAccept}
                                                    className="bg--booked"
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleReject}
                                                    className="bg--reject"
                                                >
                                                    Reject
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleClose}
                                                    className="bg--done"
                                                >
                                                    Close
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleClose}
                                                className="bg--done"
                                            >
                                                Close
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    <Modal
                      open={openModalProfile}
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
                                    Detail profile
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
                                    {userSelected.curriculumVitaeUserOrder ? (
                                      <>
                                          <div className="mt-3">
                                              <span className="fw-bold">Achievement:</span>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}> Name:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.achievementsResource?.nameAchieved}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Description:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.achievementsResource?.description}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Time:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.achievementsResource?.timeAchieved}
                                              </div>
                                          </div>
                                          <div className="mt-3">
                                              <span className="fw-bold">Education:</span>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Major:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.educationResources?.major}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Name:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.educationResources?.nameEducation}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Score:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.educationResources?.scoreEducation}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Time start:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.educationResources?.timeStart}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Time end:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.educationResources?.timeEnd}
                                              </div>
                                          </div>
                                          <div className="mt-3">
                                              <span className="fw-bold">Hobby:</span>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Name:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.hobbiesResource?.nameHobbies}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Description:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.hobbiesResource?.description}
                                              </div>
                                          </div>
                                          <div className="mt-3">
                                              <span className="fw-bold">Publication:</span>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Name:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.publicationsResource?.namePublications}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Description:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.publicationsResource?.description}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Number member:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.publicationsResource?.numberMember}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Time start:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.publicationsResource?.timeStart}
                                              </div>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>Time end:{" "}</span>
                                                  {userSelected?.curriculumVitaeUserOrder?.publicationsResource?.timeEnd}
                                              </div>
                                          </div>
                                          <div className="mt-3">
                                              <span className="fw-bold">Specialization:</span>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>{userSelected?.curriculumVitaeUserOrder?.specializationResource?.name}</span>
                                              </div>
                                          </div>
                                          <div className="mt-3">
                                              <span className="fw-bold">Skill:</span>
                                              <div className="UserItem__content__item">
                                                  <span style={{marginLeft: "20px"}}>{userSelected?.curriculumVitaeUserOrder?.skillResource[0]}</span>
                                              </div>
                                          </div>
                                      </>
                                    ) : (
                                      <span style={{marginLeft: "20px", color: "red"}}>No data found!</span>
                                    )}
                                    <div className="UserItem__content__button">
                                        {userSelected.status === "pending" ? (
                                          <>
                                              <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleAccept}
                                                className="bg--booked"
                                              >
                                                  Accept
                                              </Button>
                                              <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleReject}
                                                className="bg--reject"
                                              >
                                                  Reject
                                              </Button>
                                              <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleClose}
                                                className="bg--done"
                                              >
                                                  Close
                                              </Button>
                                          </>
                                        ) : (
                                          <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleClose}
                                            className="bg--done"
                                          >
                                              Close
                                          </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </LayoutMentor>
    );
};
export default DashboardMentor;
