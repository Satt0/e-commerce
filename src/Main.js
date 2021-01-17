import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useTransition, animated} from 'react-spring'

// import { url } from "API";
import "bootstrap/dist/css/bootstrap.min.css";
import itemsAction from "store/action/itemsAction";
import userAction from "store/action/userAction";
import App from "App";
import API from 'API'
import Loading from 'Components/Loading/Loading'
export default function Main() {

    const [toggle, set] = useState(false)
const transitions = useTransition(toggle, null, {
from: { position: 'absolute', opacity: 0 ,width:'100%',height:'100%'},
enter: { opacity: 1 },
leave: { opacity: 0 },
})
    const dispatch = useDispatch();

    useEffect(() => {
      API.getAll().then((res) => {
          set(true)
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
    const token = useSelector((state) => state.user.JWT);
    
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
              dispatch({
                type: userAction.logIn,
                payload: {
                  name: res.user.name,
                  money: res.user.money,
                  token: res.token,
                  id: res.user.id,
                  refresh: refresh,
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
    }, [dispatch,status]);
    useEffect(() => {
      if (token) {
        API.getHistory(token).then((res) => {
          if (res) {
            dispatch({
              type: "history/updateHistory",
              payload: { history: res.history },
            });
          }
        });
      }
    }, [token,dispatch]);
    return transitions.map(({ item, key, props }) => 
item
  ? <animated.div style={props}><App/></animated.div>
  : <animated.div style={props}><Loading/></animated.div>
)
}
