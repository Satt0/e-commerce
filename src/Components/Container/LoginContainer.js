import React from "react";
import Login from "../Login/Login";
import LoginUI from "../Login/LoginUI";
import { useSelector, useDispatch } from "react-redux";
export default function LoginContainer() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  
  function onClose() {
    dispatch({ type: "closeLoginUI" });
  }
  
  return (
    <div className="Login-Container">
      {loggedIn==="in" ? <Login /> : <LoginUI onClose={onClose} />}
    </div>
  );
}
