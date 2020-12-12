
import React,{useState} from 'react'
import {Button} from "react-bootstrap";
export default function MainInfor({props,addToCart,isAdded}) {
  
   
    return (
        <div className="main-infor">
        <div className="hover-container">
          <div className="img-container" style={{backgroundImage:`url(${props.item.url})`}}>
            {/* <img
              className="img"
              src={props.item.url}
              alt={props.item.description}
            /> */}
          </div>

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
            <h5 className="price">{props.item.price} VND</h5>
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
