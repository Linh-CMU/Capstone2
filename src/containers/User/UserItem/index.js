import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./_useritem.scss";

const UserItem = (props) => {
    const [textButton, setTextButton] = useState("")
    const { userName, status, handleOpen, setUserSelected } = props;
    useEffect(() => {
        let url = window.location.href;
        var id = url.substring(url.lastIndexOf('/') + 1);
        setTextButton(id == "payment" ? "Click to pay" : id == "booked" ? "Confirm" : "View detail")
    }, [window.location.href])
    return (
        <div className="MentorDashboard__listItem UserItem__listItem ">
            <div className="MentorDashboard__listItem__name">{userName}</div>
            <div style={{ flex: "0 0 40%", padding: "0 10px" }}  >
                <Button
                    onClick={() => {
                        setUserSelected(props);
                        handleOpen();
                    }}
                    variant="outlined"
                >
                    {textButton}
                </Button>
            </div>
            <div className="MentorDashboard__listItem__status">
                <div className={`ButtonStatus ButtonStatus--${status}`}>
                    {status}
                </div>
            </div>
        </div>
    );
};

export default UserItem;
