import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import cookie from "react-cookies";
import API from "../../API";
import './UserProfile.scss'
export default function UserProfile() {
  const dispatch = useDispatch();
  
  
  const user = useSelector((state) => state.user);
  const onLogout = () => {
    API.logOut().then(res=>{
      if(res.result)
      {
        dispatch({type:'logOut'})
      }
    })
  };

  return (
    <div className="UserProfile">
      <div className="UserProfile-Infor">
        <div className="UserProfile-Infor-User">
  <h4>username:{user.name}</h4>
  <h5>cash:{user.money}</h5>
  <button className="UserProfile-Infor-Logout" onClick={onLogout}> Log out</button>
        </div>
        <div className="UserProfile-Infor-History"></div>
      </div>
       
     
    </div>
  );
}
