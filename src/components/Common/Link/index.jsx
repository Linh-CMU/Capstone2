import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const LinkComponent = ({ href, children, ...props }) => (
    <Link to={href}>
        <Button variant="contained" {...props}>
            {children}
        </Button>
    </Link>
);

export default LinkComponent;
