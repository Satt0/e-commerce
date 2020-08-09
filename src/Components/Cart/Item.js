import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Item({
  id,
  item: { name, URL, quantity, thisQuantity, tag, price },
}) {
  //input quantity
  const inputRef = React.createRef();
  // state's quantity
  const count = useSelector((state) => state.cart[id].thisQuantity);

  const dispatch = useDispatch();
  function changeQuantity(e) {
    if (inputRef.current.value <= Number(quantity)) {
      dispatch({
        type: "addQuantity",
        payload: { id: id, count: inputRef.current.value },
      });
    } else {
      window.alert(`There is only ${quantity} pieces left, you have entered ${inputRef.current.value} !`);
      inputRef.current.value=Math.floor(inputRef.current.value/10)
    }
  }
  function deleteFromCart(){
    dispatch({type:'deleteFromCart',payload:id})
  }
  return (
    <div className="Cart-List-Item">
      <h4>{name}</h4>
      <img src={URL} alt={name} />
      <form>
        <label for="count">count</label>
        <input
          id="count"
          type="number"
          min="1"
          ref={inputRef}
          defaultValue={thisQuantity}
          max={Number(quantity)}
          step="1"
          onChange={() => {
            changeQuantity();
          }}
        />
      </form>
        
      <h4 className="price">$: {count * Number(price)}</h4>
      <button onClick={deleteFromCart}>delete</button>
    </div>
  );
}
