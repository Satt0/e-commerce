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
        dispatch({
          type: "logIn",
          payload: { name: res.name, money: res.money, id: res.id },
        });
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
        <div className="input-container">
          <div className="SignIn Username"></div>
          <input
            id="SignIn-Username"
            type="text"
            ref={username}
            minLength="8"
            required
            placeholder="username"
          />
        </div>

        <div className="input-container">
          <div className="SignIn Password"></div>
          <input
            id="SignIn-Password"
            type="password"
            ref={password}
            minLength="8"
            required
            placeholder="password"
          />
        </div>

        <button type="submit">sign in</button>
        <h3>{state}</h3>
      </form>
    </div>
  );
}
