import React,{useEffect} from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import { useSelector ,useDispatch} from "react-redux";
import {url} from './API'
import socketIOClient from "socket.io-client";

const ENDPOINT=url;
const App = () => {
  const dispatch = useDispatch()
  const cart=useSelector(state=>state.cart);
  const status=useSelector(state=>state.transaction.state)
  const view = useSelector((state) => state.view);
  const promtLogin=useSelector(state=>state.user.promtLogin)
  let currentview = <HomeContainer />;
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
    const socket = socketIOClient(ENDPOINT);
    
   if(status==='success' || status==='failed')
   {
    
        socket.emit('update',cart)
   }
  
   socket.on('updateItem',(msg)=>{
    dispatch({type:'updateStock',payload:msg})
    
   })

    return () => socket.disconnect();
},[status])
  return (
    <div className="App">
      <NavBar />
      {currentview}
     {promtLogin?<LoginContainer/>:<></>}
    </div>
  );
};

export default App;
