import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "API";
import "./UserProfile.scss";
import userAction from 'store/action/userAction'
import {Button} from 'react-bootstrap'
export default function UserProfile() {
  const dispatch = useDispatch();
  const refreshId=useSelector(state=>state.user.id)
  const token=useSelector(state=>state.user.JWT)
  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user);

  const onLogout = async () => {
  await  API.logOut(refreshId).then((res) => {
      if (res.result) {
        localStorage.clear('refreshToken')
        dispatch({ type: userAction.logOut });
      }
    });
  };

  useEffect(() => {
    API.getHistory(token).then((res) => {
      if (res) {
        // setHistory(res.history);
      } else {
        setHistory([]);
      }
    
    });
    return ()=>{
      setHistory([])
    }
  }, [token]);
  return (
    <div className="UserProfile">
      <div className="UserProfile-Infor">
        <div className="UserProfile-Infor-User">
          <h4>username:{user.name}</h4>
          <h5>cash:{user.money}</h5>
          
          <Button variant="success" onClick={onLogout}>  Log out</Button>
        </div>
        
      </div>
    </div>
  );
}
