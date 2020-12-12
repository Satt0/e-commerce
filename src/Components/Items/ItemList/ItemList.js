import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainInfor from './MainInfor'
export default function ItemList(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  
  const isAdded = useSelector((state) =>
    state.items.findIndex((e) => e._id === props.item._id && e.cart)
  );

   function addToCart() {
    
   
       dispatch({
        type: "addToCart",
        payload: {
          _id: props.item._id,
         
        }
      });
  
  }

  return (
    <div className="ItemList">
        <MainInfor addToCart={addToCart} props={props} isAdded={isAdded>=0?0:1}/>

      {/* <div className={isAdded !== -1 ? "addedToCart add" : "addedToCart"}>
        <h4>{isAdded !== -1 ? "Added" : "Removed"}</h4>
      </div> */}
    </div>
  );
}
