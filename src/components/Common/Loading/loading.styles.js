import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    position: fixed;
    z-index: 999;
    background-color: rgba(16, 16, 16, 0.5);
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 1px;
    left: 1px;
`;
const Dot = styled.div`
    background-color: white;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 0 5px;
    /* Animation */
    animation: ${BounceAnimation} 0.5s linear infinite;
    animation-delay: ${(props) => props.delay};
`;

export { BounceAnimation, DotWrapper, Dot };
