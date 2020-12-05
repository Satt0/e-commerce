import React from 'react'
import {useLocation} from 'react-router-dom'
export default function Button({show,toggleSearch}) {
  const location=useLocation().pathname
    return location==='/'?(<button id="dropdown-btn" onClick={toggleSearch.bind(this)} className={show?"have-border":''}>
          
    <div className={show?"hamburgur top":"hamburgur"}></div>
    <div className={show?"hamburgur middle":"hamburgur"}></div>
    <div className={show?"hamburgur bottom":"hamburgur"}></div>
  </button>):<></>
}
