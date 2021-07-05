import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Root } from "../Store";
import { useSelector, useDispatch } from 'react-redux';
import './Mypage.css';
import SelectImg from './SelectImg';
import { bindActionCreators } from "redux";
import * as notificationCreators from "../action-creators/notificationCreators";
import axios from 'axios';

interface Values {
  email: string;
  password: string;
  name: string;
  mobile: string;
}

const Mypage = () => {
  const dispatch = useDispatch();
  const { notify } = bindActionCreators(
    notificationCreators,
    dispatch
  )

  const token:any = useSelector((state: Root) => state.login);
  const [imgUrl, setImgUrl] = useState<string>("https://image.flaticon.com/icons/png/512/64/64572.png");
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    name: "",
    mobile: "",
  })

  const saveCheck = async() => {
    if( window.confirm("저장하시겠습니까?") === true ) {

      notify("저장 되었습니다.")
      setValues({email: "", password: "", name: "", mobile: ""})
    } else {
      return false;
    }
  };

  const saveHandler = () => {
    if(!values.email || !values.password || !values.name || !values.mobile) {
      notify("모든 항목은 필수입니다.")
    } else {
      saveCheck()
    }
  }

  return (
    <div>
      <div className="mypage__main-box">
        <div>
          <div className="mypage__image">
            <SelectImg setImgUrl={setImgUrl} imgUrl={imgUrl}/>
          </div>
        </div>

        <div className="mypage__side">
          <h1>내정보</h1>
          <input 
            className="mypage__side-input" 
            placeholder="EMAIL" 
            value={values.email}
            onChange={(e) => setValues({...values, email:e.target.value})}
          />
          <input
            className="mypage__side-input" 
            placeholder="PASSWORD"
            value={values.password}
            onChange={(e) => setValues({...values, password:e.target.value})}
            />
          <input 
            className="mypage__side-input" 
            placeholder="NAME"
            value={values.name}
            onChange={(e) => setValues({...values, name:e.target.value})}
            />
          <input 
            className="mypage__side-input" 
            placeholder="MOBILE"
            value={values.mobile}
            onChange={(e) => setValues({...values, mobile:e.target.value})}
            />
          {/* <input className="mypage__side-title" placeholder="DATE OF BIRTH"/> */}
          <div>
          <button className="mypage__side-save" onClick={saveHandler}>저장</button>
          </div>
        </div>
      </div>
      <div className="mypage__content-box">
        <div className="mypage__content">
          <button className="mypage__receipt">
            <Link to='/receipt'>영수증</Link>
          </button>
          <ul className="mypage__content-list">
            <li className="mypage__content-item"> 후원 리스트</li>
            <li className="mypage__content-item"> 후원 리스트</li>
            <li className="mypage__content-item"> 후원 리스트</li>
            <li className="mypage__content-item"> 후원 리스트</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Mypage;