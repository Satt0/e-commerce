import React, { useState ,useRef,useEffect} from "react";
import API from "API";
import userAction from 'store/action/userAction'
import { useDispatch } from "react-redux";
import {Form,Button} from 'react-bootstrap'
export default function SignIn({sign}) {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const username = useRef(null);
  const password = useRef(null);
  const name=useRef(null)
  const submit = (e) => {
    e.preventDefault();
    const infor = sign==='signin'? {
      username: username.current.value,
      password: password.current.value,
    }:{name:name.current.value,username:username.current.value,password:password.current.value,money:'100000000'};
    console.log(infor);
    if(sign==='signin')
    {

      API.SignIn(infor).then((res) => {
        if (res.result === true) {
          localStorage.setItem('refreshToken',res.refreshToken);
          dispatch({
            type: userAction.logIn,
            payload: { name: res.name, money: res.money,id:res.id, token:res.token,refresh:res.refreshToken },
          });
        } else {
          if (res.log === "not_found") {
            setState("Username not found!!");
          } else {
            setState("Wrong password!");
          }
        }
      });
    

    }
    else{
      API.SignUp(infor).then(res=>{
        if(res.result===true)
        {
          setState("You have signed up successfully!")
        }
        else{
          setState("Username exists!!!")
        }
      })
    }
  
  };
 useEffect(()=>{
      setState('')
 },[sign])
  return (
    <div className="SignIn">
  

<Form onSubmit={submit}>
  {sign==='signup'?<Form.Group controlId="formBasicEmail">
    <Form.Label>Your name</Form.Label>
    <Form.Control ref={name} type="text" placeholder="Enter your name" />
   
  </Form.Group>:<></>}
  <Form.Group controlId="formBasicEmail">
    <Form.Label>User's name</Form.Label>
    <Form.Control ref={username} type="text" placeholder="Enter username" />
   
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control ref={password} type="password" placeholder="Password" />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  <h5>{state}</h5>


    </div>
  );
}
