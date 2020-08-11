import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Item from './Item'
import './Cart.scss'
export default function Cart() {
    const cart=useSelector(state=>state.cart);
    const user=useSelector(state=>state.user.loggedIn);
    const dispatch = useDispatch()
    let total=0;
    cart.forEach(e=>{total+=Number(e.thisQuantity)*Number(e.price)})
    function makeDeal(){
        if(!user){
            dispatch({type:'setView',payload:'login'});
        }
        else{
            console.log('deal');
        }
    }
    return (
        <div className="Cart">
            <div className="Cart-List">
                    {cart.length>0?cart.map((e,i)=><Item id={i} key={i} item={e}/>):<h3 className='Cart-List-Text'>Cart is Empty!!!</h3>}
            </div>
            <div className="Cart-Payment">
    <h2>Total $: {total}</h2>
    <button onClick={makeDeal}>Buy All</button>
            </div>
        </div>
    )
}
