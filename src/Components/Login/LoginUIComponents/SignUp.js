import React,{useState} from "react";
import API from '../../../API'
export default function SignUp() {
  const [state,setState]=useState('')
  const name = React.createRef();
  const username = React.createRef();
  const password = React.createRef();
  const submit = (e) => {
    e.preventDefault();
    const infor ={name:name.current.value,username:username.current.value,password:password.current.value};
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
        <input type="text" ref={name} placeholder="name" />
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
        <button>sign up</button>
  <h3>{state}</h3>
      </form>
    </div>
  );
}
