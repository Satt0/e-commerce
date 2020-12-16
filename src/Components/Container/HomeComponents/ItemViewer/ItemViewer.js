import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
export default function ItemViewer() {
    const id=useLocation().pathname.split('/')[2];
    const items=useSelector(state=>state.items).filter(e=>e._id===id)
    const [item,setItem]=useState({})
    useEffect(()=>{
            const item=items[0]
            if(item)
            {
                setItem(item)
            }
            return ()=>{
                setItem({})
            }
    },[items])
    return (
        <div>
            <Link to="/">Return</Link>
                <h1>{item.name}</h1>
                <h1>{item.price?item.price+' vnd':''}</h1>
                <h1>{item.quantity}</h1>
                <h1>{item.description}</h1>
                <img src={item.url} width="500px" height="auto"/>
            

        </div>
    )
}
