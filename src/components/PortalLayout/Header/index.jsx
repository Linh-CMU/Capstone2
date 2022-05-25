import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { UpdateProfile } from "./header.styles";
import { useNavigate } from "react-router-dom";
import PATHS from "../../../constants/Paths";
import Utils from "../../../libs/Utils";

const NavBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerwidth,
        width: `calc(100% - ${drawerwidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Header = ({
    title,
    position = "absolute",
    open,
    drawerWidth = 240,
    toggleOpen,
}) => {
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenuSetting = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const username = Utils.getSavedUserName();

    const handleLogout = async () => {
        await Utils.clearAllSavedData();
        navigate(PATHS.HOME);
    };
    return (
        <NavBar position={position} open={open} drawerwidth={drawerWidth}>
            <Toolbar
                sx={{
                    pr: "24px",
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleOpen}
                    sx={{
                        marginRight: "20px",
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    <span
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => navigate(PATHS.HOME)}
                    >
                        BOOKING MENTOR
                    </span>
                </Typography>
                <Typography
                  component="h1"
                  variant="h6"
                  noWrap
                  sx={{ flexGrow: 1 }}
                >
                    <span style={{color: "rgb(226 229 11)", fontSize: "larger" }}>Hi! {username}</span>
                </Typography>
                  {/*<UpdateProfile*/}
                  {/*  onClick={() => navigate(PATHS.USER.UPDATE_PROFILE)}*/}
                  {/*>*/}
                  {/*    Update profile*/}
                  {/*</UpdateProfile>*/}
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={
                            openMenuSetting ? "account-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={openMenuSetting ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>L</Avatar>
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenuSetting}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </NavBar>
    );
};
export default Header;
