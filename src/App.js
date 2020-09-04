import React, { useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { url } from "./API";
import socketIOClient from "socket.io-client";
import API from './API';


//use socket.io to update items in real time.
const ENDPOINT = url; //socket.io endpoint, same as api endpoint.
const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const status = useSelector((state) => state.transaction.state);
  const view = useSelector((state) => state.view);
  let currentview = null;
  switch (view) {
    case "home":
      currentview = <HomeContainer />;
      break;
    case "cart":
      currentview = <CartContainer />;
      break;
    case "login":
      currentview = <LoginContainer />;
      break;
    default:
      currentview = <HomeContainer />;
      break;
  }
  useEffect(()=>{
    API.getAll().then(res=>{
      dispatch({type:'updateItem',payload:res})
    })
    API.getInfor().then(res=>{
      if(res.result===true)
      {
        dispatch({type:'logIn',payload:res.user})
      }
    })
  },[])
  useEffect(() => {
    //socket.io implementation, updates items based on transacton status(redux state)
    const socket = socketIOClient(ENDPOINT);

    if (status === "success") {
      socket.emit("update", cart);
    }

    socket.on("updateItem", (msg) => {
      dispatch({ type: "updateStock", payload: msg });
    });

    return () => socket.disconnect();
  }, [status]);
  return (
    <div className="App">
      <NavBar />
      {currentview}
    </div>
  );
};

export default App;
