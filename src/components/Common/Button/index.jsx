import React from "react";
import { ButtonContainer } from "./button.styles";

const Button = (props) => {
    const { content, onClickHandler, background, boxShow } = props;

    const onClickButton = (e) => {
        if (onClickHandler) onClickHandler();
    };
    return (
        <ButtonContainer
            onClick={(e) => onClickButton(e)}
            background={background}
            boxShow={boxShow}
        >
            {content}
        </ButtonContainer>
    );
};

export default Button;
