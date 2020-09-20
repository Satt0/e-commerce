import React from 'react'

export default function CartCounter({count}) {
    return (
   
            <li id='cart'>Cart<div className="cart-count">{count}</div></li>
        
    )
}
