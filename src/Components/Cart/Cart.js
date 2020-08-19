import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Item from './Item'
import API from '../../API'
import './Cart.scss';
import socketIOClient from "socket.io-client";
// const ENDPOINT = "https://lit-stream-93368.herokuapp.com/";
const ENDPOINT="http://localhost:4000"


export default function Cart() {
    const cart=useSelector(state=>state.cart);
    const user=useSelector(state=>state.user.loggedIn);
    const status=useSelector(state=>state.transaction.state)
    let transactionStatus=null;
    switch(status){
        case 'ready': transactionStatus='Ready to commit';break;
        case 'pending': transactionStatus='Uploading transaction';break;
        case 'failed':transactionStatus='Transaction failed';break;
        case 'success':transactionStatus='Successfully!!';break;
        default:break;
    }
    if(status==='success' || status==='failed')
    {
        API.getAll().then(res=>{
            dispatch({type:'updateItem',payload:res})
          })
        
        setTimeout(()=>{
            dispatch({type:'renewTransaction'});
            
        },2000)
    }
    const dispatch = useDispatch()
    
   
   async function makeDeal(){
        
        if(!user){
            dispatch({type:'setView',payload:'login'});
        }
        else{
            if(cart.length>0 && status==='ready'){
                dispatch({type:'setState'});
              await  API.transaction().then(async (res)=>{
                    if(res.id)
                    {
                         dispatch({type:'setId',payload:res.id});
                         
                   await API.commitTransaction(cart,res.id).then(res=>{
                 
                     if(res.res)
                     {
                         dispatch({type:'commitTransaction'})
                         dispatch({type:'itemStatus',payload:res.res})

                     }
                     else{
                         
                         dispatch({type:'rollbackTransaction'})
                     }
                 })
                    }
                    else{
                        dispatch({type:'rollbackTransaction'})
                    }
                   

                })
                
            }
    
            
        }
    }

    useEffect(()=>{
        const socket = socketIOClient(ENDPOINT);
        
       if(status==='success' || status==='failed')
       {
        
            socket.emit('update',cart)
       }
      
       socket.on('updateItem',(msg)=>{
        dispatch({type:'updateStock',payload:msg})
        
       })

        return () => socket.disconnect();
    },[status])
    return (
        <div className="Cart">
            <div className="Cart-List">
                    {cart.length>0?cart.map((e,i)=><Item id={i} key={i} item={e}/>):<h3 className='Cart-List-Text'>Cart is Empty!!!</h3>}
            </div>
            <div className="Cart-Payment">
   
    {status==='ready'?<><button onClick={makeDeal}>Buy All</button></>:<></>}
    <h3>{transactionStatus}</h3>
            </div>
        </div>
    )
}
