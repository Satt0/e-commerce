import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../SmallComponents/Button";
export default function Item({ id, item }) {
  //input quantity
  const inputRef = useRef(null);
  // state's quantity

  const src = item;

  const dispatch = useDispatch();

  //
  function changeQuantity() {
    if (
      inputRef.current.value <= Number(item.quantity) &&
      inputRef.current.value >= 1
    ) {
      dispatch({
        type: "changeQuantity",
        payload: { _id: item._id, quantity: Number(inputRef.current.value) },
      });
    } else {
      alert("too much");
      inputRef.current.value = item.quantity;
    }
  }
  function deleteFromCart() {
    dispatch({ type: "addToCart", payload: {_id:item._id }});
  }
  return (
    <div className="Cart-List-Item">
      <h5>
        {src.name.length > 12
          ? src.name.substring(0, 10).trim() + "..."
          : src.name}
      </h5>
      <img src={src.url} alt={src.name} />
      <form>
        {/* <label htmlFor="count">quantity</label> */}
        <input
          id="count"
          type="number"
          min="1"
          ref={inputRef}
          defaultValue={item.thisQuantity}
          max={src.quantity}
          step="1"
          onChange={() => {
            changeQuantity();
          }}
        />
      </form>
      <h5>{src.quantity} left</h5>
      <h4 className="price">$: {Number(item.price) * item.thisQuantity}</h4>
      <Button
        onClick={deleteFromCart}
        title="delete"
        theme={{ width: "76px", height: "25px", color: "red" }}
      />
      {/* <h6>{status}</h6> */}
    </div>
  );
}
