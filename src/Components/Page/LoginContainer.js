import React from "react";
import LoginUI from "../Login/LoginUI";
import { useSelector, useDispatch } from "react-redux";
import UserProfile from '../Login/UserProfile'
import '../Login/Login.scss';
export default function LoginContainer() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  function onClose() {
    dispatch({ type: "closeLoginUI" });
  }
  
  return (
    <div className={loggedIn!=="in"?"Login-Container":"Login-Container user-in"}>
      {loggedIn!==null?loggedIn==="in" ? <UserProfile /> : <LoginUI onClose={onClose} />:''}
    </div>
  );
}
