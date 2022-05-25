import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PATHS from "./constants/Paths";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Overview from "./containers/Common/Overview";
import Login from "./containers/Common/Login";
import Register from "./containers/Common/Register";
import DashboardUser from "./containers/User/Dashboard";
import ListMentor from "./containers/User/ListMentor";
import Mentor from "./containers/User/Mentor";
import DashboardMentor from "./containers/Mentor/Dashboard";
import PaymentOrder from "./containers/User/PaymentOrder";
import UpdateProfile from "./containers/User/UpdateProfile";
import ListPayment from "src/containers/User/ListPayment";
import ListBooked from "src/containers/User/ListBooked";
import ListDone from "src/containers/User/ListDone";
import ListPending from "src/containers/User/ListPending";
import { UserContextProvider } from "src/contexts/userContext";
import { MentorContextProvider } from "src/contexts/mentorContext";
import ValidationRoute from "./libs/ValidationRoute";
import "src/styles/_global.scss";

const rootElement = document.getElementById("root");
render(
    <MentorContextProvider>
        <UserContextProvider>
            <BrowserRouter>
                <ValidationRoute />
                <Routes>
                    <Route path={PATHS.HOME} element={<Overview />} />
                    <Route path={PATHS.LOGIN} element={<Login />} />
                    <Route path={PATHS.REGISTER} element={<Register />} />
                    <Route
                        path={PATHS.USER.DASHBOARD}
                        element={<DashboardUser />}
                    />
                    <Route
                        path={PATHS.USER.LIST_MENTOR}
                        element={<ListMentor />}
                    />
                    <Route
                        path={`${PATHS.USER.MENTOR}/:id`}
                        element={<Mentor />}
                    />
                    <Route
                        path={PATHS.USER.LIST_PENDING}
                        element={<ListPending />}
                    />
                    <Route
                        path={PATHS.USER.LIST_PAYMENT}
                        element={<ListPayment />}
                    />
                    <Route
                        path={PATHS.USER.LIST_BOOKED}
                        element={<ListBooked />}
                    />
                    <Route path={PATHS.USER.LIST_DONE} element={<ListDone />} />
                    <Route
                        path={PATHS.USER.PAYMENT_ORDER}
                        element={<PaymentOrder />}
                    />

                    <Route
                        path={`${PATHS.MENTOR.DASHBOARD}/:id`}
                        element={<DashboardMentor />}
                    />
                    <Route
                        path={PATHS.USER.UPDATE_PROFILE}
                        element={<UpdateProfile />}
                    />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    </MentorContextProvider>,
    rootElement
);
