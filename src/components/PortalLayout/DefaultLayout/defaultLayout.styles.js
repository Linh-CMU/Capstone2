import styled from "styled-components";

const DefaultLayoutContainer = styled.div``;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    & .title-page {
        font-size: 20px;
        margin-bottom: 1em;
        color: #ff3333;
    }
`;

export { DefaultLayoutContainer, Content };
