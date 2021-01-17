import React from "react";
import ReactDOM from "react-dom";
//import redux store
import store from "./store/store";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from 'Main'


ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <Router>
        {/* <App /> */}
        <Main/>
      </Router>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
