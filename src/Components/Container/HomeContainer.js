import React from "react";
import SidePanel from "Components/SidePanel/SidePanel";
import Items from "./HomeComponents/Items/Items";
import {Switch,Route} from 'react-router-dom';
import ItemViewer from 'Components/ItemViewer/ItemViewer'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height:'100vh',
    flexDirection:'row',
    [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    }
  }
}));



export default function HomeContainer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
      <Route path="/item">
        <ItemViewer/>
        </Route>
        <Route path="/">
        <SidePanel />
      <Items />
        </Route>
      </Switch>
    </div>
  );
}
