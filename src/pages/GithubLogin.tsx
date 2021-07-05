import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../action-creators/loginCreators';
import axios from "axios";

interface Props {
  auth: any;
  setSignInClick: Function;
  setModalOn: Function;
  notify: Function
}

const GithubLogin = ({auth, setSignInClick, setModalOn, notify}:Props) => {
  const dispatch = useDispatch();
  const { setToken } =bindActionCreators(
    actionCreators,
    dispatch
  );

  const socialLoginHandler = (social = "Github") => {
    try {
      auth
      .login(social)
      .then(async(data:any ) => {
        //console.log(data);
        setToken(data.credential.accessToken);
        const email = data.user.email;
        const name = data.user.displayName;
        
        await axios.post(`${process.env.REACT_APP_API_URL}/oauth-info`, { email, name })
        toMainPage();
      });
      
    } catch (error) {
      console.log(error)
    }
    
  }

  const toMainPage = ():void => {
    setSignInClick(false);
    setModalOn(false);
    notify("로그인 되었습니다.")
  }

  return (
    <div className="github__box">
      <img className="social__logo" alt="logo" src="https://image.flaticon.com/icons/png/512/25/25231.png"/>
      <div
        onClick={() => socialLoginHandler()}
        className="github__login-btn"
      >깃허브 아이디로 로그인</div>
    </div>
  )
}

export default GithubLogin
