import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wrapper
} from "./login.styles";
import ButtonComponent from "../../../components/Common/Button";
import Input from "../../../components/Common/Input";
import Utils from "../../../libs/Utils";
import API from "../../../api";
import Loading from "../../../components/Common/Loading";
import PATHS from "../../../constants/Paths";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import logo from 'src/assets/images/Logofinal.png';
import Images from 'src/assets/images'
import Button from "@mui/material/Button";

import "./_login.scss";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputUser = (e) => {
    setUsername(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    setIsLoading(true)
    if (!username || !password) {
      Utils.popupAlert({ title: 'Oops...', text: 'Found empty field(s)', type: 'error' });
      setIsLoading(false)
    } else {
      const data = {
        username,
        password
      }
      await API.login(data)
        .then(async (res) => {
          await Utils.saveToken(res.data.token);
          await Utils.saveUserName(res.data.username);
          await Utils.saveAuthority(res.data.authorities[0].authority);
          await API.setToken(res.data.token);
          setIsLoading(false)
          if (res.data.authorities[0].authority == 'USER') navigate(PATHS.USER.LIST_MENTOR)
          else navigate(`${PATHS.MENTOR.DASHBOARD}/all`)
        }).catch((e) => {
          Utils.popupAlert({ title: 'Oops...', text: 'Error Login', type: 'error' });
          setIsLoading(false)
        });
    }
  }

  const onKeyEnterPress = (e) => {
    if (e.which === 13) {
      login()
    }
  };

  return (
    <>
      <div className="login">
        <Wrapper>
          {isLoading && <Loading />}
          <div className='container-login'>
            <div className='d-flex flex-1 justify-content-center'>
              <img className="logo1" src={Images.Logo} />
            </div>
            <Input placeholder='Enter your username' onChangeHandler={(e) => inputUser(e)} />
            <Input type='password' placeholder='Enter your password' onChangeHandler={(e) => inputPassword(e)} onKeyPressHandler={(e) => onKeyEnterPress(e)} />
            <div className='footer'>
              <div style={{ display: "flex", flex: 1, justifyContent: "center"}}>
                <ButtonComponent content={'Login'} onClickHandler={() => login()} />
              </div>
            </div>
            <span style={{ textDecorationLine: 'underline', textAlign: "center" }}> Login with</span>
            <div className="login_with">
              <div className="icon" style={{ color: '#3498db' }} ><FacebookIcon /></div>
              <div className="icon" style={{ color: '#c0392b' }} ><GoogleIcon /></div>
              <div className="icon" style={{ color: '#3498db' }} ><TwitterIcon /></div>
            </div>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              className="mt-4"
            >
              {"Are you a new person here? "}
              <Link
                href="/register"
                variant="body2"
              >
                Register
              </Link>
            </Typography>
            <div className='d-flex flex-1 justify-content-center'>
              <div className="pt-2 d-flex flex-1 justify-content-between w-50 mt-2">
                <Button
                  fullWidth
                  onClick={() => navigate(PATHS.HOME)}
                  variant="contained"
                >
                  Go to homepage
                </Button>
              </div>
            </div>

          </div>
        </Wrapper>
      </div>
    </>

  );
}

export default Login;
