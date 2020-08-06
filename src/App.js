import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import SidePanel from "./Components/SidePanel/SidePanel";
import Items from "./Components/Items/Items";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import API from "./API";
const App = () => {
  const dispatch = useDispatch();
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

      <div className="main">
        <SidePanel />
        <Items />
      </div>
    </div>
  );
};

export default App;
