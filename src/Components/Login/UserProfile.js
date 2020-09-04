import React,{useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import HistoryItem from './HistoryItem'
import API from "../../API";
import './UserProfile.scss'
export default function UserProfile() {
  const dispatch = useDispatch();

  const [history,setHistory]=useState([]);
  const user = useSelector((state) => state.user);
 
  const onLogout = () => {
    API.logOut().then(res=>{
      if(res.result)
      {
        dispatch({type:'logOut'})
      }
    })
  };
 
useEffect(()=>{
  
API.getHistory(user.id).then(res=>{

  if(res)
  {
    setHistory(res.history);
  }
  else{
    setHistory([])
  }
})
},[user.id])
  return (
    <div className="UserProfile">
      <div className="UserProfile-Infor">
        <div className="UserProfile-Infor-User">
  <h4>username:{user.name}</h4>
  <h5>cash:{user.money}</h5>
  <button className="UserProfile-Infor-Logout" onClick={onLogout}> Log out</button>
        </div>
        <div className="UserProfile-Infor-History">
        <h3 className="title">Transaction History.</h3>  
          <ul>
  {history.map((e,i)=><HistoryItem key={i} history={e} data={e.infor.item}/>).reverse()}
          </ul>
        </div>
      </div>
       
     
    </div>
  );
}
