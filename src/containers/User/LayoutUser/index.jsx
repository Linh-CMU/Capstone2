import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import MessageIcon from "@mui/icons-material/Message";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import DefaultLayout from "../../../components/PortalLayout/DefaultLayout";
import Header from "../../../components/PortalLayout/Header";
import SideBar from "../../../components/PortalLayout/SideBar";
import "./_layout.scss";
import PATHS from "src/constants/Paths";
import { useLocation } from "react-router-dom";
import Utils from "../../../libs/Utils";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PaymentIcon from "@mui/icons-material/Payment";
import BookIcon from "@mui/icons-material/Book";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
const LayoutUser = ({ children, title }) => {
    let navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const toggleOpen = () => {
        setOpen(!open);
    };
    const location = useLocation();

    const handleLogout = async () => {
        await Utils.clearAllSavedData();
        navigate(PATHS.HOME);
    };

    const [openItemMenu, setOpenItemMenu] = React.useState(false);

    const handleClick = () => {
        setOpenItemMenu(!openItemMenu);
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
                                href={PATHS.USER.LIST_MENTOR}
                                className="MentorLayout__sidebar__link"
                            >
                                {" "}
                                <ListItemText
                                    primary="All mentor"
                                    primaryTypographyProps={{
                                        fontWeight: `${
                                            location.pathname ===
                                            PATHS.USER.LIST_MENTOR
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
                                    href={PATHS.USER.LIST_PENDING}
                                    className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PendingActionsIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="Mentor pending"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.USER.LIST_PENDING
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                    href={PATHS.USER.LIST_PAYMENT}
                                    className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PaymentIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="Mentor payment"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.USER.LIST_PAYMENT
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                    href={PATHS.USER.LIST_BOOKED}
                                    className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <BookIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="Mentor booked"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.USER.LIST_BOOKED
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                                <Link
                                    href={PATHS.USER.LIST_DONE}
                                    className="MentorLayout__sidebar__link"
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LibraryAddCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          primary="Mentor done"
                                          primaryTypographyProps={{
                                              fontWeight: `${
                                                location.pathname ===
                                                PATHS.USER.LIST_DONE
                                                  ? "600"
                                                  : "400"
                                              }`,
                                          }}
                                        />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                        <Link
                            href={PATHS.USER.UPDATE_PROFILE}
                            className="MentorLayout__sidebar__link"
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <BookmarkAddedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Update profile"
                                    primaryTypographyProps={{
                                        fontWeight: `${
                                            location.pathname ===
                                            PATHS.USER.UPDATE_PROFILE
                                                ? "600"
                                                : "400"
                                        }`,
                                    }}
                                />
                            </ListItemButton>
                        </Link>
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
export default LayoutUser;
