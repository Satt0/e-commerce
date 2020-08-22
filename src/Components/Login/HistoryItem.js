import React,{useState} from 'react'
import './HistoryItem.scss'
import { useSelector } from "react-redux";
export default function HistoryItem({history:{infor:{date}},data}) {
    const [hidden,setHidden]=useState(true);
    const items=useSelector(state=>state.items);
  
    data=data.map(e=>{
        const found=items.find(item=>item._id===e._id);
        console.log(found);
        return {...e,name:found.name,price:found.price}
    })
    
    return (
        <div className="HistoryItem">
            <h5 onClick={()=>{setHidden(!hidden)}}>Transaction on {date.substring(0,24)}</h5>
            <ul className={hidden?"HistoryItem-Hidden":"HistoryItem-Show"}>
    {data.map(e=><li>{e.name}x{e.thisQuantity}: {' '}{Number(e.price)*Number(e.thisQuantity)} {' '}coin.</li>)}
   
            </ul>
        </div>
    )
}
