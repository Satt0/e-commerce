import { combineReducers } from "redux";

const initState = {
  items: [],
};

const items = (state = initState.items, action) => {
  if (action.type === "updateItem") {
    return action.payload;
  }
 
   else {
    return state;
  }
};

export default combineReducers({
  items: items,
});
