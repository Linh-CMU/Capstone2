import React, { useEffect } from "react";
import Utils from "../libs/Utils";
import history from "../history";
import PATHS from "../constants/Paths";

const ValidationRoute = () => {
    const _checkAuthentication = () => {
        const { pathname } = history.location;
        const token = Utils.getSavedToken();
        if (
            !token &&
            pathname != PATHS.HOME &&
            pathname != PATHS.REGISTER &&
            pathname != PATHS.LOGIN
        ) {
            Utils.clearAllSavedData();
            window.location.href = "/";
        }
    };
    useEffect(() => {
        _checkAuthentication();
    }, []);

    return <></>;
};

export default ValidationRoute;
