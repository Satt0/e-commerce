import React from "react";
import SidePanel from "../SidePanel/SidePanel";
import Items from "./HomeComponents/Items/Items";
import {Switch,Route} from 'react-router-dom';
import ItemViewer from './HomeComponents/ItemViewer/ItemViewer'
export default function HomeContainer() {
  return (
    <div className="main">
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
