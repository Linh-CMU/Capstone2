import React from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import images from "../../../assets/images";

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerwidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const SideBar = ({ open, drawerWidth = 240, children }) => (
    <Drawer variant="permanent" open={open} drawerwidth={drawerWidth}>
        <Toolbar
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: [1],
            }}
        >
            <img src={images.Logo} alt="" height={50} />
        </Toolbar>
        <Divider />
        <List component="nav">{children}</List>
    </Drawer>
);

export default SideBar;
