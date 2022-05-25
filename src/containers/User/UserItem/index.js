import React from "react";
import Button from "@mui/material/Button";
import "./_useritem.scss";

const UserItem = (props) => {
    const { userName, status, handleOpen, setUserSelected } = props;
    return (
        <div className="MentorDashboard__listItem UserItem__listItem ">
            <div className="MentorDashboard__listItem__name">{userName}</div>
            <div style={{flex: "0 0 40%", padding: "0 10px"}}  >
                <Button
                    onClick={() => {
                        setUserSelected(props);
                        handleOpen();
                    }}
                    variant="outlined"
                >
                    Click to pay
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
