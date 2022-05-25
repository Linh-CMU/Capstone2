import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import "./_mentor.scss";
import UserContext from "src/contexts/userContext";
import Loading from "src/components/Common/Loading";
import Utils from "src/libs/Utils";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from "@mui/icons-material/Work";
import API from "src/api";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import LayoutUser from "../LayoutUser";

const Mentor = () => {
    let { id } = useParams();
    const { mentorList, getAllMentors } = useContext(UserContext);
    const [detailMentor, setDetailMentor] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [dateAppointment, setDateAppointment] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            mentorList.length == 0 && (await getAllMentors());
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setDetailMentor(mentorList.find((mentor) => mentor.id == id));
    }, [mentorList]);

    const handleBookMentor = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (id) {
            console.log({
                timeStart: dateAppointment,
                professionalId: id,
            });
            await API.postBookMentor({
                timeStart: dateAppointment,
                professionalId: id,
            })
                .then(async (res) => {
                    setIsLoading(false);
                    console.log(res, res.status, res.status == 200);
                    if (res.status == 200) {
                        Utils.popupAlert({
                            title: "Book mentor successfully!!! Please wait for the mentor to accept your request",
                            type: "success",
                        });
                    }
                })
                .catch((e) => {
                    Utils.popupAlert({
                        title: "Oops...",
                        text: "Mentor is not available during this time",
                        type: "error",
                    });
                    setIsLoading(false);
                });
        } else {
            Utils.popupAlert({
                title: "Oops...",
                text: "Error booking mentor",
                type: "error",
            });
        }
    };

    return (
        <LayoutUser title={"Mentor Detail"}>
            <div className="Mentor">
                {isLoading && <Loading />}
                <Box sx={{ display: "flex" }} className="Mentor__wrapper">
                    <div className="Mentor__content" component="main">
                        <div className="row Mentor__content__main">
                            <div className="col-md-8">
                                <div className="Mentor__content__background">
                                    <div
                                        className="Mentor__content__avatar"
                                        style={{
                                            background: `url(${
                                                detailMentor?.linkAvatar
                                                    ? detailMentor?.linkAvatar
                                                    : "https://upload.wikimedia.org/wikipedia/commons/b/ba/Logo-Rikkei.png"
                                            })`,
                                        }}
                                    >
                                        <div className="Mentor__content__menu">
                                            <div className="Mentor__content__info">
                                                <div className="Mentor__content__name">
                                                    {`${detailMentor?.userResource?.firstName} ${detailMentor?.userResource?.lastName}`}
                                                </div>
                                                <div
                                                    className={`Status Status--${detailMentor?.status}`}
                                                >
                                                    {detailMentor?.status}
                                                </div>
                                            </div>
                                            <div className="Mentor__content__book">
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                >
                                                    <DatePicker
                                                        label="Book"
                                                        value={dateAppointment}
                                                        minDate={new Date()}
                                                        inputFormat="yyyy/MM/dd"
                                                        onChange={(value) => {
                                                            setDateAppointment(
                                                                moment(
                                                                    moment(
                                                                        value
                                                                    ).format(
                                                                        "YYYY-MM-DD"
                                                                    ) +
                                                                        `T${detailMentor?.timeStart}`
                                                                ).utc(false)
                                                            );
                                                        }}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                size="small"
                                                                variant="filled"
                                                                sx={{
                                                                    "& .MuiInputLabel-root,& .MuiFilledInput-input,& .MuiInputLabel-root.Mui-focused":
                                                                        {
                                                                            color: "#fff",
                                                                        },
                                                                    "& .MuiSvgIcon-fontSizeMedium path":
                                                                        {
                                                                            fill: "#fff",
                                                                        },
                                                                    "& .MuiFilledInput-underline":
                                                                        {
                                                                            backgroundColor:
                                                                                "rgba(255,255,255,0.2)!important",
                                                                        },
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                                <Button
                                                    variant="contained"
                                                    className="ButtonStatus ButtonStatus--booked"
                                                    size="large"
                                                    onClick={handleBookMentor}
                                                >
                                                    Book
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Mentor__content__information">
                                    <div className="Mentor__content__information__title">
                                        <div className="d-flex mt-2 mb-2 align-items-center">
                                            <span>
                                                <WorkIcon />
                                            </span>
                                            <span>
                                                <Typography
                                                    variant="h4"
                                                    className="m-2"
                                                >
                                                    {detailMentor
                                                        ?.specializationResource
                                                        ?.name
                                                        ? detailMentor
                                                              ?.specializationResource
                                                              ?.name
                                                        : "Information"}
                                                </Typography>
                                            </span>
                                        </div>
                                    </div>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className="fw-bold">
                                                Personal information
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Email:{" "}
                                                {
                                                    detailMentor?.userResource
                                                        ?.email
                                                }
                                            </Typography>
                                            <Typography>
                                                Phone:{" "}
                                                {
                                                    detailMentor?.userResource
                                                        ?.numberPhone
                                                }
                                            </Typography>
                                            <Typography>
                                                Gender:{" "}
                                                {
                                                    detailMentor?.userResource
                                                        ?.gender
                                                }
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className="fw-bold">
                                                Company information
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography
                                                variant="h5"
                                                className="mb-2"
                                            >
                                                {detailMentor?.nameCompany}
                                            </Typography>
                                            <Typography>
                                                Address:{" "}
                                                {detailMentor?.addressCompany}
                                            </Typography>
                                            <Typography>
                                                Email:{" "}
                                                {detailMentor?.emailCompany}
                                            </Typography>
                                            <Typography>
                                                Phone:{" "}
                                                {detailMentor?.phoneCompany}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className="fw-bold">
                                                Booking information
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography className="mt-1 mb-1 fw-bold">
                                                Time: {detailMentor?.timeStart}
                                            </Typography>
                                            <Typography className="mt-1 mb-1 fw-bold">
                                                Price: ${detailMentor?.price}
                                            </Typography>
                                            <Typography>
                                                Gender:{" "}
                                                {
                                                    detailMentor?.userResource
                                                        ?.gender
                                                }
                                            </Typography>
                                            <Typography>
                                                <Typography
                                                    variant="div"
                                                    className="mt-1 mb-1 fw-bold"
                                                >
                                                    Day of the week:{" "}
                                                </Typography>
                                                {detailMentor?.listDayOfWeek?.map(
                                                    (item, index) => (
                                                        <Typography
                                                            variant="div"
                                                            key={index}
                                                        >
                                                            {item}, &nbsp;
                                                        </Typography>
                                                    )
                                                )}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </LayoutUser>
    );
};

export default Mentor;
