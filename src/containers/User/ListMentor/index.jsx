import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import "./_listmentor.scss";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "src/assets/images";
import UserContext from "src/contexts/userContext";
import Loading from "src/components/Common/Loading";
import LayoutUser from "../LayoutUser";

import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import TodayIcon from '@mui/icons-material/Today';
import WorkIcon from '@mui/icons-material/Work';

const ListMentor = () => {
    const { mentorList, getAllMentors } = useContext(UserContext);
    const [mentors, setMentors] = useState(mentorList);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            mentorList.length == 0 && (await getAllMentors());
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setMentors(mentorList);
    }, [mentorList]);

    return (
        <LayoutUser title={"List Mentor"}>
            {isLoading && <Loading />}
            <div className="ListMentor">
                {/*<Header title={"List Mentor"} open={false} />*/}
                <Box sx={{ display: "flex" }} className="ListMentor__wrapper">
                    <div className="ListMentor__content" component="main">
                        {/*<Toolbar />*/}
                        <div className="row ListMentor__content__list">
                            {mentors.map((mentor, index) => (
                                <div className="col-md-4 mb-4" key={mentor.id}>
                                    <Link
                                        to={`/user/mentor/${mentor.id}`}
                                        className="ListMentor__content__list__link"
                                    >
                                        <Card className="ListMentor__content__list__card">
                                            <CardHeader
                                                action={
                                                    <IconButton aria-label="settings">
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }
                                                title={
                                                    mentor?.userResource
                                                        ?.userName
                                                }
                                                subheader={
                                                    <div
                                                        className={`Status Status--${mentor?.status}`}
                                                    >
                                                        {mentor?.status}
                                                    </div>
                                                }
                                            />
                                            <CardMedia
                                                component="img"
                                                image={Image.Avatar}
                                                alt={
                                                    mentor?.userResource
                                                        ?.userName
                                                }
                                            />
                                            <CardContent>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    style={{fontSize: "20px", fontWeight: "500"}}
                                                >
                                                    <WorkIcon />&nbsp;
                                                    {mentor?.specializationResource.description}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    <BusinessIcon />&nbsp;
                                                    {mentor?.nameCompany}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    <EmailIcon />&nbsp;
                                                    {mentor?.emailCompany}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    <TodayIcon />&nbsp;
                                                    {mentor?.listDayOfWeek.map(
                                                        (day, index) => (
                                                            <span key={index}>
                                                                &nbsp;{day}
                                                            </span>
                                                        )
                                                    )}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
            </div>
        </LayoutUser>
    );
};

export default ListMentor;
