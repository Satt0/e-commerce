import React,{useEffect,useState} from 'react'

export default function Timer() {
    const [time,setTime]=useState(3);
    useEffect(()=>{
       const a= setInterval(()=>{
            setTime(time=>Math.max(time-1,0))
        },1000)

        return ()=>{
            clearInterval(a)
        }
    })
    return (
        <span>
            {time}
        </span>
    )
}
