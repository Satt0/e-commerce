import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import API from "./API";


const App = () => {
  const dispatch = useDispatch();

  const view = useSelector((state) => state.view);
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
  useEffect(() => {
    API.getAll().then((res) => {
      if (res) {
        dispatch({ type: "updateItem", payload: res });
      } else {
        console.log("res undefined");
      }
    });
  });
  return (
    <div className="App">
      <NavBar />
      {currentview}
    </div>
  );
};

export default App;
