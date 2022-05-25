import styled from "styled-components";

const ButtonLinkContainer = styled.div`
    border-radius: 10px;
    border: 1px solid #ff3333;
    padding: 0.5em 1em;
    min-width: 7em;
    margin: 0.5em;
    cursor: pointer;
    text-align: center;
    &:hover {
        background: #ff3333;
        color: white;
    }
`;

export { ButtonLinkContainer };
