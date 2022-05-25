import React, { useState } from "react";
import DefaultLayout from "../../../components/PortalLayout/DefaultLayout";
import { PaymentOrderContainer } from "./paymentOrder.styles";
import Input from "../../../components/Common/Input";
import Button from "../../../components/Common/Button";
import LayoutUser from "../LayoutUser";
import Utils from "src/libs/Utils";
import Loading from "src/components/Common/Loading";
import {useNavigate} from "react-router-dom";
import PATHS from "../../../constants/Paths";

const PaymentOrder = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const handlePayment = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Utils.popupAlert({
                title: "Payment successfully!!! Please check email confirm ",
                type: "success",
            }).then((response) => {
                navigate(PATHS.USER.LIST_BOOKED)
            });
        }, 5000);
    };

    const _renderMain = () => {
        return (
            <LayoutUser title="Payment order">
                {isLoading && <Loading />}
                <PaymentOrderContainer>
                    <div className="title">Billing information</div>
                    <div className="wrap-content">
                        <div className="flex-1" />
                        <div className="flex-1">
                            <div className="wrap-info">
                                <span>Name</span>
                                <Input placeholder="Enter name" />
                            </div>
                            <div className="wrap-info">
                                <span>Email</span>
                                <Input placeholder="Enter email" />
                            </div>
                            <div className="wrap-info">
                                <span>Card number</span>
                                <Input placeholder="Enter number" />
                            </div>
                            <div className="wrap-info d-flex">
                                <div className="flex-1">
                                    <span>Expiration date</span>
                                    <Input placeholder="Enter expiration date" />
                                </div>
                                <div
                                    className="flex-1"
                                    style={{ marginLeft: "1em" }}
                                >
                                    <span>Security code</span>
                                    <Input placeholder="Enter code" />
                                </div>
                            </div>
                            <div className="wrap-info">
                                <span>Country</span>
                                <Input placeholder="Enter country" />
                            </div>
                            <div className="wrap-info">
                                <span>State</span>
                                <Input placeholder="Enter state" />
                            </div>
                            <div className="wrap-info">
                                <span>City</span>
                                <Input placeholder="Enter city" />
                            </div>
                            <div className="wrap-info">
                                <span>Address</span>
                                <Input placeholder="Enter address" />
                            </div>
                        </div>
                        <div className="flex-1" />
                    </div>
                    <Button content={"Submit"} onClickHandler={handlePayment} />
                </PaymentOrderContainer>
            </LayoutUser>
        );
    };

    return (
        <DefaultLayout titlePage={"Payment order"} content={_renderMain()} />
    );
};
export default PaymentOrder;
