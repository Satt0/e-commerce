import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import API from "API";
import Confirm from "./Confirm";
import ItemCart from "./SubComponents/ItemCart";
import Counter from "./SubComponents/Counter";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "400px",
    display: "flex",
    flexWrap: "nowrap",
    height: "94vh",
    width: "100%",
    backgroundColor: "gray",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      position: "relative",

      minHeight: 600,
    },
  },
}));

export default function Cart() {
  const style = useStyle();
  const url = useHistory();
  const cart = useSelector((state) => state.items.filter((e) => e.cart));
  const user = useSelector((state) => state.user.loggedIn);
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.JWT);
  const refresh = useSelector((state) => state.user.refresh);

  const dispatch = useDispatch();

   async function makeDeal() {
    if (user !== "in") {
      url.push("/user");
    } else {
      if (cart.length > 0) {
       return API.transaction(cart, token).then((res) => {
          
          if (res.result === false) {
            dispatch({ type: "user/logOut" });
            return {ok:false}
          } else {
            console.log(res);
            return {ok:true}
          }
        });
      }
    }
  }

  return (
    <div className={style.root}>
      
        
        

        
          <ItemCart cart={cart} />
          <Counter action={makeDeal}/>
        
      
    </div>
  );
}
