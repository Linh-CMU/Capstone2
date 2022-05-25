import styled from "styled-components";

const PaymentOrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .title {
        font-size: 25px;
    }
    & .wrap-content {
        display: flex;
        width: 100%;
        margin-top: 1em;
        & .flex-1 {
            flex: 1;
        }
        & .d-flex {
            display: flex;
        }
        & .wrap-info {
            margin-top: 10px;
        }
    }
`;

export { PaymentOrderContainer };
