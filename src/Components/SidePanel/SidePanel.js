import React from "react";
import {useDispatch} from 'react-redux'
import API from '../../API';
import './SidePanel.scss'
function SidePanel(props) {
  const dispatch = useDispatch()
  function getTag(e){
API.getByTag(e.target.id).then(res=>{
  
  dispatch({type:'updateItem',payload:res})
})

  }
  function getA(){
    API.getAll().then(res=>{
      dispatch({type:'updateItem',payload:res})
    })
  }
  return <div className="SidePanel">
      <ul>
      <li id="" onClick={getA}><div className="checkbox"></div>All</li>
        <li id="weapon" onClick={getTag}><div className="checkbox"></div>Vũ khí</li>
        <li id="shirt" onClick={getTag}><div className="checkbox"></div>Áo</li>
        <li id="hat" onClick={getTag}><div className="checkbox"></div>Nón</li>
        <li id="subWeapon" onClick={getTag}><div className="checkbox"></div>Vũ khí phụ</li>
        <li id="ring" onClick={getTag}><div className="checkbox"></div>Trang sức</li>
        <li id="pet" onClick={getTag}><div className="checkbox"></div>Trứng pet</li>
        <li id="petWeapon" onClick={getTag}><div className="checkbox"></div>Vũ khí pet</li>
        <li id="item" onClick={getTag}><div className="checkbox"></div>Đạo cụ</li>
      </ul>

  </div>;
}

export default SidePanel;
