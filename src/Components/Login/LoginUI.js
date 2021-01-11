import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import SignIn from "Components/LoginUIComponents/SignIn";
export default function LoginUI() {
  // const dispatch = useDispatch();
  const [state, setState] = useState("signin");
  const change = (value) => {
    return () => {
      setState(value);
    };
  };

  return (
    <div className="LoginUI">
      <div className="change">
        <div
          className={state === "signin" ? "selected" : ""}
          onClick={change("signin")}
        >
          Sign In
        </div>
        <div
          className={state === "signup" ? "selected" : ""}
          onClick={change("signup")}
        >
          Sign Up
        </div>
      </div>
      <SignIn sign={state} />
    </div>
  );
}
