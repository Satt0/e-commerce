import React,{useState} from "react";
import API from '../../../API'
export default function SignUp() {
  const [state,setState]=useState('')
  const name = React.createRef();
  const username = React.createRef();
  const password = React.createRef();
  const submit = (e) => {
    e.preventDefault();
    const infor ={name:name.current.value,username:username.current.value,password:password.current.value,money:'100000000'};
    console.log(infor);
    API.SignUp(infor).then(res=>{
      if(res.result===true)
      {
        setState("You have signed up successfully!")
      }
      else{
        setState("Username exists!!!")
      }
    })
  };
  return (
    <div className="SignUp">
      <h2>Sign Up</h2>
      <form autoComplete="off" onSubmit={submit}>
        <div className="input-container">
          <div className="SignIn Name"></div>
        <input type="text" ref={name} placeholder="name" />
        
        </div>
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

        <button>sign up</button>
  <h3>{state}</h3>
      </form>
    </div>
  );
}
