import React,{useState,useEffect} from 'react'

export default function Timer() {
    const [time,setTime]=useState(3);
    useEffect(()=>{
        if(time>0)
        {
        setTimeout(()=>{
            setTime(Math.max(time-1,0));
           },1000)
        }
        
        
    },[time])
    
    return (
        <span>
            ({time})
        </span>
    )
}
