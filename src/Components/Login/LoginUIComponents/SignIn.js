import React, { useState } from "react";
import API from "../../../API";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const username = React.createRef();
  const password = React.createRef();
  const submit = (e) => {
    e.preventDefault();
    const infor = {
      username: username.current.value,
      password: password.current.value,
    };
    API.SignIn(infor).then((res) => {
      if (res.result === true) {
       
        dispatch({ type: "logIn", payload: {name:res.name,money:res.money} });
      } else {
        if (res.log === "not_found") {
          setState("Username not found!!");
        } else {
          setState("Wrong password!");
        }
      }
    });
  };
  return (
    <div className="SignIn">
      <h2>Sign In</h2>
      <form autoComplete="off" onSubmit={submit}>
        <input
          type="text"
          ref={username}
          minLength="8"
          required
          placeholder="username"
        />
        <input
          type="password"
          ref={password}
          minLength="8"
          required
          placeholder="password"
        />
        <button>sign in</button>
        <h3>{state}</h3>
      </form>
    </div>
  );
}
