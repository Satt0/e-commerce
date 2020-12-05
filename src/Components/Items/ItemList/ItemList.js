import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainInfor from './MainInfor'
export default function ItemList(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  
  const isAdded = useSelector((state) =>
    state.cart.findIndex((e) => e._id === props.item._id)
  );

  async function addToCart() {
    await setAdd(!add);
    if (!add) {
      await dispatch({
        type: "addToCart",
        payload: {
          _id: props.item._id,
          thisQuantity: 1,
          status: "ready",
        },
      });
    } else {
      await dispatch({ type: "deleteFromCart", payload: props.item._id });
    }
  }

  return (
    <div className="ItemList">
        <MainInfor addToCart={addToCart} props={props} isAdded={isAdded}/>

      <div className={isAdded !== -1 ? "addedToCart add" : "addedToCart"}>
        <h4>{isAdded !== -1 ? "Added" : "Removed"}</h4>
      </div>
    </div>
  );
}
