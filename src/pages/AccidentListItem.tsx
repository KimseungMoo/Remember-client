import React, { useState, useEffect } from "react";
import "./AccidentListItem.css";
import { Link } from "react-router-dom";
import { AccidentData } from "../types/accident";
import { dummyList } from "../data/types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as notificationCreators from "../action-creators/notificationCreators";
import * as postCreators from "../action-creators/postCreators";
import axios from "axios";
import { Root } from "../Store";
import styled from "styled-components";

interface AccidentListItemProps {
  data: AccidentData;
  onClick: (data: AccidentData) => void;
  payClick: (data: AccidentData) => void;
}

interface Values {
  name: string;
  url: string;
}

const AccidentListItem:React.FC<AccidentListItemProps> = ({ data, onClick, payClick }) => {

  const dispatch = useDispatch();
  const { notify } = bindActionCreators(notificationCreators, dispatch);
  const { setLike } = bindActionCreators(postCreators, dispatch);
  const token: any = useSelector((state: Root) => state.login);
  const post: any = useSelector((state: Root) => state.post);
  const [values, setValues] = useState<Values>({
    name: "",
    url: "",
  });

  const [thumb, setThumb] = useState<number>(0);
  const [likeClick, setLikeClick] = useState<boolean>(false);

  const setLikeHandler = async () => {
    setLikeClick(!likeClick);
    // if (post.like) {
    //   setThumb(thumb + 1);
    // } else if(!post.like) {
    //   setThumb(thumb - 1);
    // }
    
    await axios.put(`${process.env.REACT_APP_API_URL}/put-like`, {
      name: values.name,
      title: data.title,
    });
  };

  const userInfoHandler = async () => {
    if (token.OAuth.OAuth) {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/mypage`,
          {
            email: token.OAuth.email,
            name: token.OAuth.name,
            OAuth: token.OAuth.OAuth,
          },
          {
            headers: {
              authorization: `Bearer ${token.accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          const { name, url } = res.data.data.userInfo;
          setValues({ ...values, name: name, url: url });
        });
    } else {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/mypage`, {
          headers: {
            authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          const { name, url } = res.data.data.userInfo;
          setValues({ ...values, name: name, url: url });
        });
    }
  };

  const getLikeHandler = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/post-like`, {
        title: data.title,
      })
      .then((res) => {
        const likeNum = res.data.data.likeTable.length;
        setThumb(likeNum);
      });
  };

  const isLoginHandler = () => {
    if (!token.accessToken) {
      notify("로그인이 필요합니다.");
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (token.accessToken) {
      userInfoHandler();
    }
    getLikeHandler();
  }, []);

  return (
    <div className="accident__detail">
      <img src={data.url} alt="" className="accident__img"></img>
      <h2 className="accident__title">{data.title}</h2>
      <div className="text__group">
        <div className="people__text">인명 피해 : {data.casualty}</div>
        <div className="day__text">사건 발생일 : {data.date}</div>
        
      </div>
      <div className="acc__btn__group">
        <button className="detail__btn" onClick={() => onClick(data)}>
          자세히보기
        </button>
          <button className="detail__btn" onClick={() => {
            let result = isLoginHandler();
            if(result) {
              payClick(data);
              //console.log(data)
            }
            }}>
            후원하기
          </button>
      </div>
      {/* <span>{thumb}</span> */}
      <Like>
          <span>
            {/* <p className= {likeClick ? "heart-after is_animating" : "heart" } onClick={setLikeHandler}></p> */}
            <div className={likeClick ? "press" : ""} onClick={() => setLikeClick(!likeClick)}>Remember!</div>
            <i className={likeClick ? "press" : ""} onClick={() => setLikeClick(!likeClick)}></i>
          </span>
        </Like>
    </div>
  );
};

export default AccidentListItem;

const Like = styled.div`
  margin:0;
  font-family:'open sans',sans-serif;
  height: 0;
  text-align: center;

  span {
    height:100px;
    // position: relative;
  }

  i {
    cursor:pointer;
    padding:10px 12px 8px;
    background:#fff;
    border-radius:50%;
    display:inline-block;
    color:#aaa;
    transition:.2s;
  }

  i:hover {
    color:#666;
  }

  i:before {
    font-family:fontawesome;
    content:'\f4d6';
    font-style:normal;
  }

  div {
    left:0;
    right:0;
    visibility: hidden;
    transition:.6s;
    z-index:-2;
    font-size:14px;
    color:transparent;
    font-weight:400;
    
  }

  i.press {
    // animation: size .4s;
    color:#e23b3b;
  }

  div.press {
    font-size:14px;
    visibility:visible;
    animation: fade 1s;

  }

  @keyframes fade {
    0% {color:#transparent;}
    50% {color:#e23b3b;}
    100% {color:#transparent;}
  }

  @keyframes size {
    0% {padding:10px 12px 8px;}
    50% {padding:14px 16px 12px;  
      margin-top:-4px;}
    100% {padding:10px 12px 8px;}
  }
`