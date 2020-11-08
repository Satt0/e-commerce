import React,{useState,useEffect} from 'react'

export default function Timer() {
    const [time,setTime]=useState(3);
    useEffect(()=>{
        let a;
        if(time>0)
        {
      a=  setTimeout(()=>{
            setTime(Math.max(time-1,0));
           },1000)
        }
        
        return(()=>{
            clearTimeout(a);
        })
    },[time])
    
    return (
        <span>
            ({time})
        </span>
    )
}
