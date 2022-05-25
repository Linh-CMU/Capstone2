import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
  position: fixed;
  z-index: 9;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: 0 auto;
  & .container-login{
    width: 550px;
    background-color: white;
    padding: 3em 4em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
    & .title-login {
        font-size: 30px;
        margin-bottom: 0.5em;
        display: flex;
        justify-content: center;
        font-weight: bold;
        color: #8D48FF
    }
    & .footer{
      display: flex;
    }
  }
`;

export {
    Wrapper
};
