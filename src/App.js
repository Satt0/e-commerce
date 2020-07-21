import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import SidePanel from "./Components/SidePanel/SidePanel";
import Items from "./Components/Items/Items";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="main">
          <SidePanel />
          <Items />
        </div>
      </div>
    );
  }
}
export default App;
