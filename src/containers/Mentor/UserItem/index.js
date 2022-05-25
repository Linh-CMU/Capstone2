import React from "react";
import Button from "@mui/material/Button";
import "./_useritem.scss";

const UserItem = (props) => {
    const { userName, status, handleOpen, setUserSelected, handleOpenProfile } = props;
    return (
        <div className="MentorDashboard__listItem">
            <div className="MentorDashboard__listItem__name">{userName}</div>
            <div className="MentorDashboard__listItem__linkCV">
                <Button
                    onClick={() => {
                        setUserSelected(props);
                        handleOpen();
                    }}
                    variant="outlined"
                >
                    View basic info
                </Button>
            </div>
            <div className="MentorDashboard__listItem__linkCV">
              <Button
                onClick={() => {
                  setUserSelected(props);
                  handleOpenProfile();
                }}
                variant="outlined"
              >
                View detail profile
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
