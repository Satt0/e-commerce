import React,{useState,useEffect} from 'react'
import './HistoryItem.scss'
import { useSelector } from "react-redux";
export default function HistoryItem({history:{infor:{date}},data}) {
    const [hidden,setHidden]=useState(true);
    const items=useSelector(state=>state.items);
    const [datas,setData]=useState([])
    useEffect(()=>{

        const temp=data.map(e=>{
            const found=items.find(item=>item._id===e._id);
           
            return {...e,name:found.name,price:found.price}
        })
        setData(temp)
    },[data,items])
    return (
        <div className="HistoryItem">
            <div className="HistoryItem-Dropdown" onClick={()=>{setHidden(!hidden)}}>
            <div className={hidden?"triangle":"triangle rotate"}></div>
            <h5 >{date.substring(0,24)}</h5>
            </div>
            
            <ul className={hidden?"HistoryItem-Hidden":"HistoryItem-Show"}>
    {datas.map((e,i)=><li key={i}>{e.name}x{e.thisQuantity}: {' '}{Number(e.price)*Number(e.thisQuantity)} {' '}coin.</li>)}
   
            </ul>
        </div>
    )
}
