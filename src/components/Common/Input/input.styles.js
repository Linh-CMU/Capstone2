import styled from "styled-components";

const InputContainer = styled.input`
    margin: 0.8em 0;
    border-radius: 10px;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    padding: 0.6em 1em;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: 1px solid gray;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export { InputContainer };
