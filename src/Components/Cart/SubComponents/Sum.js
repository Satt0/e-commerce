import React,{useState,useEffect} from 'react'
import {makeStyles} from '@material-ui/core'
import {useSelector} from 'react-redux'
import ult from 'ultilities/ulti'
const useStyles=makeStyles((theme)=>({
    root:{
        color:theme.palette.light,
       
        width:'100%',
        height:'50%',
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        
        [theme.breakpoints.down('sm')]:{
            height:'100%'
        }
        
    },
    container:{
        
        textAlign:'center',

        '& > *':{
            fontSize:'2rem',
            margin:0,
            [theme.breakpoints.down('sm')]:{
                fontSize:'1.3rem'
            }
        }
        
    }
}))
export default function Sum() {
    const total=useSelector(state=>state.items).filter(e=>e.cart).map(e=>({quantity:e.thisQuantity,price:e.price}))
    const [state,setState]=useState(0);
    const styles=useStyles()
useEffect(() => {
    if(total.length>1)
    {
        const sum=total.reduce((a,c)=>{
            
            if(typeof a!== 'number')
            {
                a=parseInt(a.quantity)*parseInt(a.price)
            }
            return a + c.quantity*c.price
        })
        
        setState(sum)

    }
    else if(total.length===1){
        const sum=total[0].price*total[0].quantity
        setState(sum)
    }
    else{
        setState(0)
    }
}, [total])
    return (
        <div className={styles.root}> 
            <div className={styles.container}> 
                <p>Total: <span>{ult.currencyConvert(state)}</span></p>
                
                
                   

            </div>
            
        </div>
    )
}
