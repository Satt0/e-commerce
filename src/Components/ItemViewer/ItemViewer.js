import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'


import Helmet from 'react-helmet'
import './ItemViewer.scss'
import DisplayImage from './DisplayImage'
import DisplayInfor from './DisplayInfor'
export default function ItemViewer() {
    const id=useLocation().pathname.split('/')[2];
    const items=useSelector(state=>state.items)
    const [item,setItem]=useState({})
    useEffect(()=>{
            const item=items.find(e=>e._id===id);
            if(item)
            {
                
                setItem(item)
            }
            return ()=>{
                setItem({})
            }
    },[items])
  
    return (
        <div className="ItemViewer">
          <Helmet>
          <meta charSet="utf-8" />
                <title>{(item.name?item.name+' |':'') +' webshop-tan'}</title>
                <link rel="canonical" href="https://webshop-tan.web.app" />
                <meta name="description" content={item.name+ ', ' +item.description}/>
          </Helmet>
            <DisplayImage img={item.url} alt={item.name}/>
            <DisplayInfor data={item}/>
            

        </div>
    )
}
