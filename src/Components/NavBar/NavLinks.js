import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './NavLinks.scss'
export default function NavLinks() {
    const view=useSelector(state=>state.view);
    const count=useSelector(state=>state.cart.length)
    
     const dispatch = useDispatch();
     function setView(e){
      if (view!==e.target.id)
      { dispatch({type:'setView',payload:e.target.id})
       }
     }
    return (
        <div className="links">
           <div className='logo-container'><img src='https://ddtmobile.com/static/official_site/en_mobile/img/index_logo.png' alt='logo'/></div>
          <ul>
            <li id='home' className={view==='home'?'checked':''} onClick={setView}>Home</li>
    <li id='cart' className={view==='cart'?'checked':''} onClick={setView}>Cart<div className="cart-count">{count}</div></li>
            <li id='login' className={view==='login'?'checked':''} onClick={setView}>Login</li>
          </ul>
        </div>
    )
}
