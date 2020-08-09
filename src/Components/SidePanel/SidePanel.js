import React,{useState} from "react";
import {useDispatch} from 'react-redux'
import API from '../../API';
import './SidePanel.scss';

function SidePanel() {
  const [state,setState]=useState('all')
  const dispatch = useDispatch()
  function getTag(e){
    if(e.target.id!==''){
    if(state!==e.target.id)
    {
       setState(e.target.id);
    }
  
   
API.getByTag(e.target.id).then(res=>{
  
  dispatch({type:'updateItem',payload:res})
})
}
  }
  function getA(e){
   if(e.target.id!==''){
    if(state!==e.target.id)
    {
       setState(e.target.id);
    }
    API.getAll().then(res=>{
      dispatch({type:'updateItem',payload:res})
    })
   }
   
  }
  return <div className="SidePanel">
      <ul>
        <h3>Filter:</h3>
      <li id="all" className={state==='all'?'checked':''} onClick={getA}><div className="checkbox"></div>All</li>
        <li id="weapon" className={state==='weapon'?'checked':''} onClick={getTag}><div className="checkbox"></div>Vũ khí</li>
        <li id="shirt" className={state==='shirt'?'checked':''} onClick={getTag}><div className="checkbox"></div>Áo</li>
        <li id="hat" className={state==='hat'?'checked':''} onClick={getTag}><div className="checkbox"></div>Nón</li>
        <li id="subWeapon" className={state==='subWeapon'?'checked':''} onClick={getTag}><div className="checkbox"></div>Vũ khí phụ</li>
        <li id="ring" className={state==='ring'?'checked':''} onClick={getTag}><div className="checkbox"></div>Trang sức</li>
        <li id="pet" className={state==='pet'?'checked':''} onClick={getTag}><div className="checkbox"></div>Trứng pet</li>
        <li id="petWeapon" className={state==='petWeapon'?'checked':''} onClick={getTag}><div className="checkbox"></div>Vũ khí pet</li>
        <li id="item" className={state==='item'?'checked':''} onClick={getTag}><div className="checkbox"></div>Đạo cụ</li>
      </ul>

  </div>;
}

export default SidePanel;
