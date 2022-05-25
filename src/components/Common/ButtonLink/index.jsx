import React from "react";
import { ButtonLinkContainer } from "./buttonLink.styles";

const ButtonLink = (props) => {
    const { content, onClickHandler } = props;

    const onClickButton = (e) => {
        if (onClickHandler) onClickHandler();
    };
    return (
        <ButtonLinkContainer onClick={(e) => onClickButton(e)}>
            {content}
        </ButtonLinkContainer>
    );
};

export default ButtonLink;
