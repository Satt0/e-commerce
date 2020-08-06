import React from 'react'

export default function ItemList(props) {
    return (
        <div className="ItemList">
            <div className="main-infor">
            <img className="img" src={props.item.URL} alt={props.item.description}/>
            <h4>{props.item.name.length>10?props.item.name.substring(0,10)+'...':props.item.name}</h4>
            <button className="add-btn">Add to cart</button>
    </div>
    <div className="hover-container">
    <h5>{props.item.name}</h5>
    <h5>stock:{props.item.quantity.substring(0,10)}</h5>
    <h5>{props.item.description}</h5>
    <h5>{props.item.perfection}</h5>
    <h5>{props.item.lastFor}</h5>
    
    </div>
        </div>
    )
}
