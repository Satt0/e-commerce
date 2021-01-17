import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import ulti from 'ultilities/ulti'
export default function DisplayInfor({data}) {
    const [state,setState]=useState({});
    
    useEffect(()=>{
        setState(data)
    },[data])
    return (
        <div className="DisplayInfor"> 
            {!state.name?<Loading/>:<Data data={data}/>}
        </div>
    )
}

const Data=(data)=>{
    const dispatch = useDispatch();
  const click=()=>{
      
      dispatch({type:"items/addToCart",payload:{_id:data.data._id}})
  }
    return <div className="Data">
        <h1>name: {data.data.name}</h1>
        <h3>price: {ulti.currencyConvert(data.data.price)}</h3>
        <h3>quantity: {data.data.quantity}</h3>
        <Button onClick={click} variant={data.data.cart?"danger":"primary"}>{data.data.cart?"Remove from Cart":"Add to Cart"}</Button>
    </div>
}
const Loading=()=>{

    return <div className="Loading">
        <div className='loading md'></div>
        <div className='loading sm'></div>
        <div className='loading sm'></div>
    </div>
}