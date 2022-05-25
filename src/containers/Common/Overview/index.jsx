import React, { useState, useEffect } from "react";
import ButtonLink from "../../../components/Common/ButtonLink";
import PATHS from "../../../constants/Paths";
import { useNavigate } from "react-router-dom";
import logo from 'src/assets/images/Logofinal.png';
import "./_overview.scss";

import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';

const Overview = () => {
  let navigate = useNavigate();


  return (
    // <div>
    //   <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    //     <ButtonLink content={'Login'} onClickHandler={() => navigate(PATHS.LOGIN)} />
    //     <ButtonLink content={'Register'} onClickHandler={() => navigate(PATHS.REGISTER)} />
    //   </div>
    //   <div style={{fontSize: 50, textAlign: 'center', marginTop: 100}}>
    //     OVERVIEW
    //   </div>
    // </div>
    <>
      <div className="header">
        <img className="logo" src={logo} />
        <div className="left">
           <div className="icon" ><FacebookIcon /></div>
           <div className="icon" ><YouTubeIcon /></div>
           <div className="icon" ><TwitterIcon /></div>
           <div className="icon" ><GoogleIcon /></div>
        </div>
      </div>
      <div>
        <div className="overview">
          <div className="button_login" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="register"><ButtonLink content={'Register'} onClickHandler={() => navigate(PATHS.REGISTER)} /></div>
            <div className="register" style={{fontWeight: 'bold'}}><ButtonLink content={'Login ->'} onClickHandler={() => navigate(PATHS.LOGIN)} /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
