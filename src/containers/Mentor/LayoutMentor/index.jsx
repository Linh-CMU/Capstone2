import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SubjectIcon from "@mui/icons-material/Subject";
import Link from "@mui/material/Link";
import DefaultLayout from "../../../components/PortalLayout/DefaultLayout";
import Header from "../../../components/PortalLayout/Header";
import SideBar from "../../../components/PortalLayout/SideBar";
import "./_layout.scss";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PaymentIcon from "@mui/icons-material/Payment";
import BookIcon from "@mui/icons-material/Book";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PATHS from "../../../constants/Paths";
import {useLocation, useNavigate} from "react-router-dom";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MessageIcon from "@mui/icons-material/Message";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import Utils from "../../../libs/Utils";
const LayoutMentor = ({ children, title }) => {
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    };
    const location = useLocation();
    let navigate = useNavigate();

    const [openItemMenu, setOpenItemMenu] = React.useState(false);

    const handleClick = () => {
        setOpenItemMenu(!openItemMenu);
    };

    const handleLogout = async () => {
        await Utils.clearAllSavedData();
        navigate(PATHS.HOME);
    };

    const _renderMain = () => {
        return (
            <div className="MentorLayout">
                <Header title={title} open={open} toggleOpen={toggleOpen} />
                <Box sx={{ display: "flex" }} className="MentorLayout__wrapper">
                    <CssBaseline />
                    <SideBar open={open}>
                        <ListItemButton>
                            <ListItemIcon>
                                <FormatListBulletedIcon />
                            </ListItemIcon>
                            <Link
                              href="/mentor/dashboard/all"
                              className="MentorLayout__sidebar__link"
                            >
                                {" "}
                                <ListItemText
                                  primary="All user"
                                  primaryTypographyProps={{
                                      fontWeight: `${
                                        location.pathname ===
                                        PATHS.MENTOR.DASHBOARD + '/all'
                                          ? "600"
                                          : "400"
                                      }`,
                                  }}
                                />
                            </Link>
                            <ListItemIcon
                              onClick={handleClick}
                              className="MentorLayout__children"
                            >
                                {openItemMenu ? <ExpandLess /> : <ExpandMore />}
                            </ListItemIcon>
                        </ListItemButton>

                        <Collapse
                          in={openItemMenu}
                          timeout="auto"
                          unmountOnExit
                        >
                            <List component="div" disablePadding>
                                <Link
                                  href="/mentor/dashboard/pending"
                                  className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PendingActionsIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="User pending"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.MENTOR.DASHBOARD + '/pending'
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                  href="/mentor/dashboard/payment"
                                  className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PaymentIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="User payment"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.MENTOR.DASHBOARD + '/payment'
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                  href="/mentor/dashboard/booked"
                                  className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <BookIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="User booked"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.MENTOR.DASHBOARD + '/booked'
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                  href="/mentor/dashboard/reject"
                                  className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CancelPresentationIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="User reject"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.MENTOR.DASHBOARD + '/reject'
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                  href="/mentor/dashboard/done"
                                  className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LibraryAddCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="User done"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.MENTOR.DASHBOARD + '/done'
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                        <ListItemButton>
                            <ListItemIcon>
                                <MessageIcon />
                            </ListItemIcon>
                            <ListItemText primary="Message" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsApplicationsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Setting" />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </SideBar>
                    <div className="MentorDashboard__content" component="main">
                        <Toolbar />
                        <div
                            style={{
                                fontSize: "20px",
                                padding: "1em 2em",
                                fontWeight: "bold",
                                textTransform: "capitalize",
                            }}
                        >
                            {title}
                        </div>
                        {children}
                    </div>
                </Box>
            </div>
        );
    };

    return <DefaultLayout content={_renderMain()} />;
};
export default LayoutMentor;
