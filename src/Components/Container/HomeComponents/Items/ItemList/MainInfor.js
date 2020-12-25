
import React,{useState} from 'react'
import {Button} from "react-bootstrap";
import {Link} from 'react-router-dom'

import ulti from 'ultilities/ulti'
export default function MainInfor({props,addToCart,isAdded}) {

  
    return (
        <div className="main-infor">
        <div className="hover-container">
         <Link to={`/item/${props.item._id}`}>
         
         <div className="img-container" title="click to see more" style={{backgroundImage:`url(${props.item.url})`}}>
              
            </div>
  
         </Link>

{/* 
          <div className="hover">
            <h5>
              <span className="title-text">vật phẩm: </span>
              {props.item.name}
            </h5>

            <h5>
              <span className="title-text">mô tả: </span>
              {props.item.description}
            </h5>
            
            
            <h5>
              <span className="title-text">số lượng: </span>
              {props.item.quantity.substring(0, 10)}
            </h5>
            <h5>
              <span className="title-text">giá: </span> {props.item.price} VND
            </h5>
          </div>
        */}
       
       
        </div>
        <h5>
          {props.item.name.length > 10
            ? props.item.name.substring(0, 10).trim() + "..."
            : props.item.name}
        </h5>
        {/* <h5>{props.item.quantity > 0 ? `${props.item.quantity} left` : ""}</h5> */}

        {props.item.quantity > 0 ? (
          <>
            {" "}
            <h5 className="price">{ulti.currencyConvert(props.item.price)} VND</h5>
            <Button
             
              // theme={{ height: "28px", color: 'red', width: "150px" }}
              onClick={addToCart}
              variant={!isAdded?'danger':'primary'}
              
            >{isAdded  ? "Add to cart" : "Remove"}</Button>
          </>
        ) : (
          <h5 className="price OFS">out of stock!!</h5>
        )}
        
      </div>
    )
}
