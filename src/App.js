import React, { useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { url } from "./API";
// import socketIOClient from "socket.io-client";
import API from "./API";
import { Switch, Route } from "react-router-dom";
//use socket.io to update items in real time.
// const ENDPOINT = url; //socket.io endpoint, same as api endpoint.
const App = () => {
  const dispatch = useDispatch();
  // const cart = useSelector((state) => state.cart);
  // const status = useSelector((state) => state.transaction.state);
  useEffect(() => {
    API.getAll().then((res) => {
      
      dispatch({ type: "updateItem", payload: res.map(e=>{return  {...e,cart:false,thisQuantity:1}}) });
    });
  }, [dispatch]);
 
  const key=useSelector((state)=>state.user.refresh)
  const status=useSelector(state=>state.user.loggedIn)
   
  // useEffect(() => {
  //   //socket.io implementation, updates items based on transacton status(redux state)
  //   const socket = socketIOClient(ENDPOINT);

  //   if (status === "success") {
  //     socket.emit("update", cart);
  //   }

  //   socket.on("updateItem", (msg) => {
  //     dispatch({ type: "updateStock", payload: msg });
  //   });

  //   return () => socket.disconnect();
  // }, [status,cart,dispatch]);

  useEffect(()=>{
    let a=null;
    if(key){
     a= setInterval(()=>{
        API.getInfor(key).then(res=>{
          if(res.token)
          {
              if(status!=='out')
                      {
                        
                        dispatch({type:'logIn',payload:{name:res.user.name,money:res.user.money,token:res.token,refresh:key}})
                      }


          }
          else{
            dispatch({type:"logOut"})
            clearInterval(a);
          }
        

        })
      },280000)
    }
    else{
      clearInterval(a)
    }
    return ()=>{
      clearInterval(a)
    }
  },[key,status,dispatch])
  
  useEffect(()=>{
      
        const refresh=localStorage.getItem('refreshToken')
        if(refresh){
          API.getInfor(refresh).then(res=>{
            if(res.token)
            {
                if(status!=='out')
                        {
                          
                          dispatch({type:'logIn',payload:{name:res.user.name,money:res.user.money,token:res.token,refresh:key}})
                        }
  
  
            }
            else{
              dispatch({type:"logOut"})
             
            }})
          }
        

   
  },[])
  
  return (
    <div className="App">
      <NavBar />
      {/* {currentview} */}

      <Switch>
        <Route path="/cart">
          <CartContainer />
        </Route>
        <Route path="/user">
          <LoginContainer />;
        </Route>
        <Route path="/">
          <HomeContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
