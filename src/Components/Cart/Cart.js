import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import API from "../../API";
import "./Cart.scss";
import Timer from "./Timer";
import Button from "../../SmallComponents/Button";
import {useHistory} from 'react-router-dom'
export default function Cart() {
  const url=useHistory();
  const cart = useSelector((state) => state.items.filter(e=>e.cart));
  const user = useSelector((state) => state.user.loggedIn);
  const userId = useSelector((state) => state.user.id);
  const token=useSelector(state=>state.user.JWT)
    const refresh=useSelector(state=>state.user.refresh)


  const dispatch = useDispatch();

  async function makeDeal() {
    if (!user) {
      url.push('/user')
    } else {
      if (cart.length > 0) {
        
        API.transaction(cart,token).then(res=>{
          if(res)
          {
            console.log(res);
          }
        })
       
      
    }
  }
  }

  return (
    <div className="Cart">
      <div className="Cart-List">
        {cart.length > 0 ? (
          cart.map((e, i) => <Item key={e._id} item={e} />)
        ) : (
          <h3 className="Cart-List-Text">Cart is Empty!!!</h3>
        )}
      </div>
      <div className="Cart-Payment">
        
          <Button
            onClick={makeDeal}
            theme={{ width: "150px", height: "50px", color: "blue" }}
            title="Buy All"
          />
        
      
      </div>
    </div>
  );
}
