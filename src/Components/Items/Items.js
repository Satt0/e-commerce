import React from "react";
import {useSelector} from 'react-redux'
import ItemList from './ItemList/ItemList';

import './Items.scss';

const Items =()=> {
  const data=useSelector(state=>state.items);
  
  
 
    return <div className="Items">
      {data.length===0?<h2 style={{marginLeft:'50px',color:'#f0df4d',textShadow:'1px 1px 5px black'}}>No Item Yet!</h2>:data.map((e,i)=><ItemList key={i} item={e}/>)}
    </div>;
  
}

export default Items;
