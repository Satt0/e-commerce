// import React from "react";
// import {useDispatch,useSelector} from 'react-redux'
// import API from '../../API';
// import './SidePanel.scss';

// function SidePanel() {
//   const state=useSelector(state=>state.sort);
//   const dispatch = useDispatch()
//   function getTag(e){
//     if(e.target.id!==''){
//     if(state!==e.target.id)
//     {
//        dispatch({type:'setSort',payload:e.target.id})
//     }

// API.getByTag(e.target.id).then(res=>{

//   dispatch({type:'updateItem',payload:res})
// })
// }
//   }
//   function getA(e){
//    if(e.target.id!==''){
//     if(state!==e.target.id)
//     {
//       dispatch({type:'setSort',payload:e.target.id})
//     }
//     API.getAll().then(res=>{
//       dispatch({type:'updateItem',payload:res})
//     })
//    }

//   }
//   return <div className="SidePanel">
//       <ul>
//         <h3>Filter:</h3>
//       <li id="all" className={state==='all'?'checked':''} onClick={getA}><div className="checkbox"></div>All</li>
//         <li id="weapon" className={state==='weapon'?'checked':''} onClick={getTag}><div className="checkbox"></div>Vũ khí</li>
//         <li id="shirt" className={state==='shirt'?'checked':''} onClick={getTag}><div className="checkbox"></div>Áo</li>
//         <li id="hat" className={state==='hat'?'checked':''} onClick={getTag}><div className="checkbox"></div>Nón</li>
//         <li id="subWeapon" className={state==='subWeapon'?'checked':''} onClick={getTag}><div className="checkbox"></div>Vũ khí phụ</li>
//         <li id="ring" className={state==='ring'?'checked':''} onClick={getTag}><div className="checkbox"></div>Trang sức</li>
//         <li id="pet" className={state==='pet'?'checked':''} onClick={getTag}><div className="checkbox"></div>Trứng pet</li>
//         <li id="petWeapon" className={state==='petWeapon'?'checked':''} onClick={getTag}><div className="checkbox"></div>Vũ khí pet</li>
//         <li id="item" className={state==='item'?'checked':''} onClick={getTag}><div className="checkbox"></div>Đạo cụ</li>
//       </ul>

//   </div>;
// }

// export default SidePanel;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector, useDispatch } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  landscape: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "no-wrap",
    overflow:'scroll'
  },
}));

export default function CheckboxList() {
  const tag = [
    { tag: "all", name: "all" },
    { tag: "weapon", name: "vu khi" },
    { tag: "pet", name: "pet" },
    { tag: "item", name: "item" },
    { tag: "shirt", name: "ao" },
    { tag: "hat", name: "non" },
    { tag: "petWeapon", name: "vk pet" },
  ];
  const items = useSelector((state) => state.items);
  const matches = useMediaQuery("(orientation:portrait)");

  const classes = useStyles();

  const checked = useSelector((state) => state.sort.view);
 
  const dispatch = useDispatch();
  const handleToggle = (value) => async () => {
    dispatch({ type: "setSort", payload: { view: value.tag, items: items } });
  };
 
  return (
    <List className={!matches ? classes.root : classes.landscape}>
      {tag.map((value, index) => {
        const labelId = `checkbox-list-label-${value.name}`;
       
        return (
          <ListItem
            key={index}
            role={undefined}
            dense
            button
            onClick={handleToggle(value)}
          >
           
            <ListItemIcon>
              <Checkbox
                edge="start"
                label="secondary"
                checked={checked===value.tag}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments"></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
