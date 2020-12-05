import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '../../SmallComponents/Button'
export default function Item({
  id,
  item: {_id,thisQuantity ,status}
}) {
  //input quantity
  const inputRef = React.createRef();
  // state's quantity
  const count = useSelector((state) => state.cart[id].thisQuantity);
  
  const item=useSelector(state=>state.items)
  const src=item.find(e=>e._id===_id);

  const dispatch = useDispatch();

//  
  function changeQuantity(e) {
    if (inputRef.current.value <= Number(src.quantity)) {
      dispatch({
        type: "addQuantity",
        payload: { id: id, count: inputRef.current.value },
      });
    } else {
      window.alert(`There is only ${src.quantity} pieces left, you have entered ${inputRef.current.value} !`);
      inputRef.current.value=Math.floor(inputRef.current.value/10)
    }
  }
  function deleteFromCart(){
    dispatch({type:'deleteFromCart',payload:_id})
  }
  return (
    <div className="Cart-List-Item">
      <h5>{src.name.length>12?src.name.substring(0,10).trim()+'...':src.name}</h5>
      <img src={src.URL} alt={src.name} />
      <form>
        {/* <label htmlFor="count">quantity</label> */}
        <input
          id="count"
          type="number"
          min="1"
          ref={inputRef}
          defaultValue={thisQuantity}
          max={Number(src.quantity)}
          step="1"
          onChange={() => {
            changeQuantity();
          }}
        />
      </form>
        <h5>{src.quantity} left</h5>
      <h4 className="price">$: {count * Number(src.price)}</h4>
      <Button onClick={deleteFromCart} title="delete" theme={{width:'76px',height:'25px',color:'red'}}/>
        <h6>{status}</h6>
    </div>
  );
}
