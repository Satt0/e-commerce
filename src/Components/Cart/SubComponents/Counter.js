import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Sum from './Sum';
import Checkout from './Checkout'



const useStyle=makeStyles((theme)=>({
   root:{
    height:'100%',
    width:'40%',
    minWidth:'300px',
    backgroundColor:'whitesmoke',
    display:'flex',
    flexDirection:'column',
    justifyContent:"center",
    alignItems:"center",
    overflow:'hidden',
    [theme.breakpoints.down('sm')]:{
        
       flexDirection:"row",
        width:'100%',
        height:'15%',
        minWidth:'auto',
        position:'relative',
       
       

    }
   }
}))

export default function Counter({action}) {
    const style=useStyle();
    
    return (
        <div className={style.root}>
            <Sum/>
            <Checkout action={action}/>
        </div>
    )
}
