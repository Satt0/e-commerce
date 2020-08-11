import React from 'react'
import {useDispatch} from 'react-redux';

import '../../../JQuery/fly.min.css';
export default function ItemList(props) {
    const dispatch = useDispatch();
    function addToCart(){
        dispatch({type:'addToCart',payload:{
            name:props.item.name,
            _id:props.item._id,
            quantity:props.item.quantity,
            URL:props.item.URL,
            tag:props.item.tag,
            price:props.item.price,
            thisQuantity:1
        }})
    }
   
    return (
        <div className="ItemList">
            <div className="main-infor">
              <div className="hover-container">   
              <div className="img-container">
                   <img className="img" src={props.item.URL} alt={props.item.description}/>
              </div>
           
            <div className="hover">
            <h5><span className="title-text">vật phẩm: </span>{props.item.name}</h5>
   
    <h5><span className="title-text">mô tả:  </span>{props.item.description}</h5>
    <h5><span className="title-text">phẩm chất: </span>{props.item.perfection}</h5>
    <h5><span className="title-text">hiệu lực:  </span>{props.item.lastFor}</h5>
    <h5><span className="title-text">số lượng:  </span>{props.item.quantity.substring(0,10)}</h5>
    <h5><span className="title-text">giá: </span> {props.item.price} coin</h5>
    
            </div>

   </div>
            <h4>{props.item.name.length>10?props.item.name.substring(0,10)+'...':props.item.name}</h4>
    <h5 className="price">$: {props.item.price} coin</h5>
            <button className="add-btn" onClick={addToCart}>Add to cart</button>
    </div>
   
   
    
 
        </div>
    )
}

