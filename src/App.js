import React, {useEffect} from "react";
import NavBar from "./Components/NavBar/NavBar";
import "./App.scss";
import LoginContainer from "./Components/Container/LoginContainer";
import HomeContainer from "./Components/Container/HomeContainer";
import CartContainer from "./Components/Container/CartContainer";
import {useDispatch, useSelector} from "react-redux";
import {url} from "API";
import "bootstrap/dist/css/bootstrap.min.css";
import itemsAction from "store/action/itemsAction";
import userAction from "store/action/userAction";
import API from "./API";
import Helmet from "react-helmet";
import {Route, Switch} from "react-router-dom";
import NotFound from "Components/NotFound/NotFound";
import ItemViewer from "Components/ItemViewer/ItemViewer";
//use socket.io to update items in real time.
const ENDPOINT = url; //socket.io endpoint, same as api endpoint.
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    API.getAll().then((res) => {
      dispatch({
        type: itemsAction.updateItems,
        payload: res.map((e) => {
          return { ...e, cart: false, thisQuantity: 1 };
        }),
      });
    });
  }, [dispatch]);

  const key = useSelector((state) => state.user.refresh);
  const status = useSelector((state) => state.user.loggedIn);

  // useEffect(() => {
  //   //socket.io implementation, updates items based on transacton status(redux state)
  //   const socket = socketIOClient(ENDPOINT);

  //   // if (status === "success") {
  //   //   socket.emit("update", cart);
  //   // }

  //   socket.on("updateItem", (msg) => {
  //    console.log(msg);
  //   });

  //   return () => socket.disconnect();
  // }, []);


  
// regenerate JWT after a period of 28 mins
  useEffect(() => {
    let a = null;
    if (key) {
      a = setInterval(() => {
        API.getInfor(key).then((res) => {
          if (res.token) {
            if (status !== "out") {
              dispatch({
                type: userAction.logIn,
                payload: {
                  name: res.user.name,
                  money: res.user.money,
                  token: res.token,
                  id: res.user.id,
                  refresh: key,
                },
              });
            }
          } else {
            dispatch({ type: userAction.logOut });
            localStorage.clear("refreshToken");
            clearInterval(a);
          }
        });
      }, 280000);
    } else {
      clearInterval(a);
    }
    return () => {
      clearInterval(a);
    };
  }, [key, status, dispatch]);
// get user infor onload
  useEffect(() => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) {
      API.getInfor(refresh).then((res) => {
        if (res.token) {
          if (status !== "out") {
            console.log(res.user.id);
            dispatch({
              type: userAction.logIn,
              payload: {
                name: res.user.name,
                money: res.user.money,
                token: res.token,
                id: res.user.id,
                refresh: key,
              },
            });
          } else {
            dispatch({ type: userAction.logOut });
          }
        } else {
          dispatch({ type: userAction.logOut });

          localStorage.clear("refreshToken");
        }
      });
    } else {
      dispatch({ type: userAction.logOut });
    }
  }, []);

  return (
    <div className="App">
      <Helmet>
        <meta
          name="description"
          content="Shoping electronics, accessories, ultitilities"
        />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
      <NavBar />

      <Switch>
        <Route strict  path='/cart'>
          <CartContainer />
        </Route>
        <Route exact path="/user">
          <LoginContainer />;
        </Route>
        <Route exact path="/">
          <HomeContainer />
        </Route>
        <Route strict path="/item/">
          <ItemViewer />
        </Route>

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
      {/* <AdSense.Google
  client='ca-pub-7301220330128784'
  slot='7806394673'
/> */}
    </div>
  );
};

export default App;
