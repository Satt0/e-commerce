import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HistoryItem from "./HistoryItem";
import API from "../../API";
import "./UserProfile.scss";
import {Button} from 'react-bootstrap'
export default function UserProfile() {
  const dispatch = useDispatch();
  const refreshId=useSelector(state=>state.user.refresh)

  const [history, setHistory] = useState([]);
  const user = useSelector((state) => state.user);

  const onLogout = async () => {
  await  API.logOut(refreshId).then((res) => {
      if (res.result) {
        localStorage.clear('refreshToken')
        dispatch({ type: "logOut" });
      }
    });
  };

  // useEffect(() => {
  //   API.getHistory(user.id).then((res) => {
  //     if (res) {
  //       setHistory(res.history);
  //     } else {
  //       setHistory([]);
  //     }
  //   });
  //   return ()=>{
  //     setHistory([])
  //   }
  // }, []);
  return (
    <div className="UserProfile">
      <div className="UserProfile-Infor">
        <div className="UserProfile-Infor-User">
          <h4>username:{user.name}</h4>
          <h5>cash:{user.money}</h5>
          {/* <button className="UserProfile-Infor-Logout" onClick={onLogout}>
            {" "}
           
          </button> */}
          <Button variant="success" onClick={onLogout}>  Log out</Button>
        </div>
        <div className="UserProfile-Infor-History">
          <h3 className="title">Transaction History.</h3>
          <ul>
            {history ? (
              history
                .map((e, i) => (
                  <HistoryItem key={i} history={e} data={e.infor.item} />
                ))
                .reverse()
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
