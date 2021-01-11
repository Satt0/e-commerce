import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import MainInfor from 'Components/Container/HomeComponents/Items/ItemList/MainInfor'
const useStyle=makeStyles((theme)=>({
   root:{
    height:'100%',
    width:'60%',
    backgroundColor:'whitesmoke',
    display:'flex',
    flexWrap:'nowrap',
    justifyContent:'flex-start',
   flexDirection:'column',
   overflowY:'scroll',
   msOverflowStyle: 'none',  /* IE and Edge */
  scrollbarWidth: 'none', 
  
  '&::-webkit-scrollbar':{
    display: 'none'
  },
   [theme.breakpoints.down('sm')]:{
      
     
       
       width:'100%',
       height:'85%'
   },
   '& > .cart-item-container':{
       margin:theme.spacing(3),
     
       
       width:'95%',
       display:'flex',
       justifyContent:"center",
       
       
   }
   
   }
}))

export default function ItemCart({cart}) {
    
    const styles=useStyle();
    
    return (
        <div className={styles.root}>
          {cart.map((e,i)=><div key={i*8181}  className="cart-item-container"><MainInfor  props={{item:e}} type='cart'  isAdded={!e.cart}/></div>)}
        </div>
    )
}


