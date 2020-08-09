import React from 'react'
import {useSelector} from 'react-redux';
import Item from './Item'
import './Cart.scss'
export default function Cart() {
    const cart=useSelector(state=>state.cart);
    let total=0;
    cart.forEach(e=>{total+=Number(e.thisQuantity)*Number(e.price)})
    
    return (
        <div className="Cart">
            <div className="Cart-List">
                    {cart.length>0?cart.map((e,i)=><Item id={i} item={e}/>):'buy something:(('}
            </div>
            <div className="Cart-Payment">
    <h2>Total $: {total}</h2>
    <button>Buy All</button>
            </div>
        </div>
    )
}
