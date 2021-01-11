import React from "react";
import { useSelector, useDispatch } from "react-redux";
import API from "API";
import "./UserProfile.scss";
import userAction from "store/action/userAction";
import { Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container'
import HistoryItem from './HistoryItem'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    textAlign: "center",
    height: "100%",
    // backgroundColor: "whitesmoke",
    width: "100%",
    overflowY: "scroll",
  },
  inforContainer: {
   
   marginTop:theme.spacing(1),
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    // "& > h4": {},
  },
  historyContainer:{
    width:'80%',
    margin:'0 auto',
    [theme.breakpoints.down('sm')]:{

      width:'95%',
    }
  }
}));

export default function UserProfile() {
  const dispatch = useDispatch();
  const refreshId = useSelector((state) => state.user.id);
 
  const user = useSelector((state) => state.user);
  const styles = useStyles();
  const onLogout = async () => {
    await API.logOut(refreshId).then((res) => {
      if (res.result) {
        localStorage.clear("refreshToken");
        dispatch({ type: userAction.logOut });
      }
    });
  };


  return (
    <div className={styles.root}>
      
      <Container maxWidth="sm" className={styles.inforContainer}>
        <h4>User: {user.name}</h4>
        {/* <h5>cash: {user.money}</h5> */}

        <Button variant="success" onClick={onLogout}>
          {" "}
          Log out
        </Button>
      </Container>
      <div>
        <h2>History</h2>
      </div>
      <div className={styles.historyContainer}>
        <HistoryItem />
       
      </div>
    </div>
  );
}
