import React from "react";
import { DefaultLayoutContainer, Content } from "./defaultLayout.styles";
import Loading from "../../Common/Loading";

const DefaultLayout = (props) => {
    const { content, loading } = props;
    return (
        <DefaultLayoutContainer>
            {loading ? <Loading /> : <Content>{content}</Content>}
        </DefaultLayoutContainer>
    );
};
export default DefaultLayout;
