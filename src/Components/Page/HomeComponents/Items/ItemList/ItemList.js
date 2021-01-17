import React from "react";
// import { useDispatch } from "react-redux";
import MainInfor from './MainInfor'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';
// import itemsAction from 'store/action/itemsAction'
import {makeStyles} from '@material-ui/styles'
const useStyles=makeStyles((theme)=>({
  //inside grid item, no specific width and height...
  root:{
   
    height:'100%',

    backgroundColor:'white'
  }
}))
export default function ItemList(props) {
  // const dispatch = useDispatch();
  // const [add, setAdd] = useState(false);
  const styles=useStyles()
 

  

  return (
    <div className={styles.root}>
        { props.item.name? <MainInfor type='home' props={props} isAdded={!props.item.cart}/> :<SkelectonLoader/>}

      
    </div>
  );


}
const SkelectonLoader=()=>{

  const style={
    display:'flex',
    flexDirection:"column",
    justifyContent:"space-around",
    textAlign:'center',
    backgroundColor:'white',
    padding:'5% 0'
  }


  return (<SkeletonTheme  color="#fff" highlightColor="#C0C0C0">
    <div style={style}>
    <Skeleton height={200} width="90%"/>
    <Skeleton height={20} width="90%"/>
    <Skeleton height={20} width="90%"/>
    <Skeleton height={20} width="90%"/>
    </div>
</SkeletonTheme>
  )
}