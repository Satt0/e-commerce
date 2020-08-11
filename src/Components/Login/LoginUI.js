import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignIn from "./LoginUIComponents/SignIn";
import SignUp from "./LoginUIComponents/SignUp";
export default function LoginUI() {
  const dispatch = useDispatch();
  const [state, setState] = useState("signin");
  const change = (e) => {
    setState(e.target.id);
  };

  return (
    <div className="LoginUI">
      <div className="change">
        <div
          id="signin"
          className={state === "signin" ? "selected" : ""}
          onClick={change}
        >
          Sign In
        </div>
        <div
          id="signup"
          className={state === "signup" ? "selected" : ""}
          onClick={change}
        >
          Sign Up
        </div>
      </div>
      {state === "signin" ? <SignIn /> : <SignUp />}
    </div>
  );
}
