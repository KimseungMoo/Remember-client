import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from "../images/logo-text.png";
import Donation from "./DonationModal";

const Ul = styled.ul<{ open: boolean }>`
  //box-shadow : ${({ open }) => open ? 'rgba(0,0,0,0.2) 0 0 0 9999px' : ''};
  
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  div {
    padding: 40px 40px;
    background-color: white;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    box-shadow: 0 0 3px 0 rgb(0 0 0 / 20%);
    margin-bottom: 30px;
  }

  .hamburger__img {
    width: 23rem;
    background-color: transparent;
    margin-left: 8%;
    position: absolute;
    left: 10%;
    top: 15px;
  }

  li {
    padding: 15px 0 15px 20px;
    cursor: pointer;
    color: #260e04;
    display: flex;
    font-size: 15px;
    font-weight: 500;
  }

  li img {
    margin-right: 25px;
  }

  .hamburger__img-accident {
    width: 20px;
    margin-left: 6px;
    margin-right: 28px; 
  }

  .hamburger__img-receipt {
    width: 25px;
    margin-left: 3px;
    margin-right: 26px;
  }

  .hamburger__img-use {
    width: 25px;
    margin-left: 3px;
    margin-right: 26px;
  }

  .hamburger__img-history {
    width: 30px;
  }

  li:hover {
    background-color: #43a047;
    color: white;
  }
  button {
    padding: 10px;
    width: 100px;
    border-radius: 20px;
    margin: 0 20px;
    cursor: pointer;
  }
  .left {
    background-color: black;
    color: white;
    border: none;
  }
  .right {
    background-color: gray;
    border: none;
    color: white;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  @media {
    flex-flow: column nowrap;
    background-color: white;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    margin-top: 15px;
    right: -10px;
    height: 50px;
    width: 70px;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 0 3px 0 rgb(0 0 0 / 50%);
  }
`;
interface Props {
  open: boolean;
  setOpen:any;
  auth: any;
};

const OpenNav = ({ open, setOpen }:Props) => {

  const [donationClick, setDonationClick] = useState<boolean>(false);

  return (
    <div>
      <Ul open={open}>
        {/* <div>
          <Link to='/'>
            <img className="hamburger__img" src={logo} onClick={() => setOpen(false)}></img>
          </Link>
        </div> */}
        {/* <Link to='/accident'>
          <li className="hamburger__list-first" onClick={() => setOpen(false)}>
            <img className="hamburger__img-accident" src="https://image.flaticon.com/icons/png/512/876/876209.png"></img>
            사건 & 사고
          </li>
        </Link> */}
        {/* <Link to='/prepare'>
          <li onClick={() => setOpen(false)}>
            <img className="hamburger__img-use" src="https://image.flaticon.com/icons/png/512/3173/3173781.png"></img>
            후원 사용처
          </li>
        </Link>
        <li onClick={() => window.open("https://npg.nicepay.co.kr/issue/CheckCardInfo.do?TID=nictest00m01012107091552004444&svcCd=01&sendMail=1&pass2ndConf=N&cart_type=0")}>
          <img className="hamburger__img-receipt" src="https://image.flaticon.com/icons/png/512/985/985714.png"></img>
          후원 영수증
        </li>
        <li onClick={() => {
          setDonationClick(true);
          setOpen(false);
        }}>
          <img className="hamburger__img-history" src="https://image.flaticon.com/icons/png/512/5064/5064717.png"></img>
          <span>후원 내역</span>
        </li> */}
      </Ul>
      <Donation setDonationClick={setDonationClick} donationClick={donationClick}></Donation>
    </div>
  )
}

export default OpenNav;