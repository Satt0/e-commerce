import React, { useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { url } from "./API";
import socketIOClient from "socket.io-client";
import API from "./API";
import { Switch, Route } from "react-router-dom";
import Button from "./SmallComponents/Button";
//use socket.io to update items in real time.
const ENDPOINT = url; //socket.io endpoint, same as api endpoint.
const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const status = useSelector((state) => state.transaction.state);

  useEffect(() => {
    API.getAll().then((res) => {
      dispatch({ type: "updateItem", payload: res });
    });
  }, [dispatch]);
 
  useEffect(() => {
    API.getInfor().then((res) => {
      if (res.result === true) {
        dispatch({ type: "logIn", payload: res.user });
      }
    });
  });
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
  }, [status, dispatch, cart]);
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
