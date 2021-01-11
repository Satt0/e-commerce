import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/reducer";
import thunk from "redux-thunk";
console.log(process.env.NODE_ENV);
const middleWare = [thunk];
export default createStore(
  reducer,process.env.NODE_ENV==='development'?
  compose(
    applyMiddleware(...middleWare),
    // // disable the second parameter for redux to work on mobile device!!!!
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
  ):applyMiddleware(...middleWare)
);
