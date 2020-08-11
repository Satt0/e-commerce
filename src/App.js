import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import { useSelector } from "react-redux";




const App = () => {


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

  return (
    <div className="App">
      <NavBar />
      {currentview}
     {promtLogin?<LoginContainer/>:<></>}
    </div>
  );
};

export default App;
