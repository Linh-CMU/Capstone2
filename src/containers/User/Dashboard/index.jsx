import React from "react";
import DefaultLayout from "../../../components/PortalLayout/DefaultLayout";
import "./_dashboard.scss";
import LayoutUser from "../LayoutUser";

const DashboardUser = ({ children, title }) => {
    const _renderMain = () => {
        return <LayoutUser title={title}>{children}</LayoutUser>;
    };

    return (
        <DefaultLayout titlePage={"Dashboard User"} content={_renderMain()} />
    );
};
export default DashboardUser;
