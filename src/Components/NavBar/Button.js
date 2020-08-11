import React from 'react'
import {useSelector} from 'react-redux'
export default function Button({show,toggleSearch}) {
    const view=useSelector(state=>state.view)
    return view==='home'?(<button onClick={toggleSearch.bind(this)} className={show?"have-border":''}>
          
    <div className={show?"hamburgur top":"hamburgur"}></div>
    <div className={show?"hamburgur middle":"hamburgur"}></div>
    <div className={show?"hamburgur bottom":"hamburgur"}></div>
  </button>):<></>
}
