import React from "react";
import { InputContainer } from "./input.styles";

const Input = (props) => {
    const { type, placeholder, onChangeHandler, onKeyPressHandler } = props;

    const onChangeInput = (e) => {
        if (onChangeHandler) onChangeHandler(e);
    };

    const onKeyPressInput = (e) => {
        if (onKeyPressHandler) onKeyPressHandler(e);
    };

    return (
        <InputContainer
            type={type || "text"}
            placeholder={placeholder}
            onChange={(e) => onChangeInput(e)}
            onKeyPress={(e) => onKeyPressInput(e)}
        />
    );
};

export default Input;
