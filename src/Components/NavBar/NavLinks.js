import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './NavLinks.scss';
import {Link} from 'react-router-dom';
import CartCounter from './smallerComponents/CartCounter'
export default function NavLinks() {
    const view=useSelector(state=>state.view);
    const count=useSelector(state=>state.cart.length)
    const user=useSelector(state=>state.user.name);
     const dispatch = useDispatch();
     function setView(e){
      if (view!==e.target.id)
      { dispatch({type:'setView',payload:e.target.id})
       }
     }

    return (
        <div className="links">
           <div className='logo-container'><a style={{cursor:'pointer'}} onClick={()=>{window.open('http://idgunny.360game.vn'); return false;}}> <img src='https://ddtmobile.com/static/official_site/en_mobile/img/index_logo.png' alt='logo'/></a></div>
          <ul>
            <li><Link to="/"><li>Home</li></Link></li>
            <li><Link to="/cart"><CartCounter count={count}/></Link></li>
            <li><Link to="/user"><li>{user?user:'Login'}</li></Link></li>
          </ul>
        </div>
    )
}

// <li id='home' className={view==='home'?'checked':''} onClick={setView}>Home</li>
//     
//             <li id='login'style={user?{color:'yellow'}:{}} className={view==='login'?'checked':''} onClick={setView}>{user?user:'Login'}</li>