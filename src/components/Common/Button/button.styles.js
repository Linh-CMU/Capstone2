import styled from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 20px;
    min-height: 37px;
    color: white;
    background-color: ${(props) => props.background || "#8D48FF"};
    border-radius: 10px;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0px 2px 0px 1px ${(props) => props.boxShow || "#713acc"};
    padding: 0 12px;
    width: 150px;
    margin: 1em 0;
`;

export { ButtonContainer };
