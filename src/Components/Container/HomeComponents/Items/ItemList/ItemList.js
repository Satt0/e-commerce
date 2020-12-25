import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainInfor from './MainInfor'
import itemsAction from 'store/action/itemsAction'
export default function ItemList(props) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  
  const isAdded = useSelector((state) =>
    state.items.findIndex((e) => e._id === props.item._id && e.cart)
  );

   function addToCart() {
    
   
       dispatch({
        type: itemsAction.addToCart,
        payload: {
          _id: props.item._id,
         
        }
      });
  
  }

  return (
    <div className="ItemList">
        <MainInfor addToCart={addToCart} props={props} isAdded={isAdded>=0?0:1}/>

      
    </div>
  );
}
