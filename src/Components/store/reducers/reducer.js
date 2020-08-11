import { combineReducers } from "redux";

const initState = {
  items: [],
  view:'home',
  sort:'all',
  cart:[],
  user:{
    loggedIn:false,
    id:null,
    money:null
  }
};

const items = (state = initState.items, action) => {
  if (action.type === "updateItem") {
    return action.payload;
  }
 
   else {
    return state;
  }
};
const view=(state=initState.view,action)=>{
  if(action.type==='setView')
  {
    return action.payload;
  }
  else{
    return state
  }

}
const cart=(state=initState.cart,action)=>{
  if(action.type==='addToCart')

  {
    let index=state.findIndex(e=>e._id===action.payload._id);
    if(index!==-1)
    {
      return state.map((e,i)=>{
        if(i===index)
        {
          return {...e,thisQuantity:e.thisQuantity+1};
        }
        else{
          return e
        }
      })
    }
    else{
      return [...state,action.payload]
    }
    
   
    
  }
  else if(action.type==='addQuantity')
  {
        let arr=[...state];
        if(Number(action.payload.count)<=Number(arr[action.payload.id].quantity))
        {
        arr[action.payload.id].thisQuantity=action.payload.count;
        }
        return arr;
  }
  else if (action.type==='deleteFromCart')
  {
    if(state[action.payload])
    {
      return [...state].filter((e,i)=>i!==action.payload)
    }
  }
  else{
    return state
  }
}
const user=(state=initState.user,action)=>{
  if(action.type==='logIn')
  {
    return {
      ...state,loggedIn:true,id:action.payload
    }
  }
  else if(action.type==='logOut')
  {
    return {
      ...state,loggedIn:false
    }
  }
  return state;
}
const sort=(state=initState.sort,action)=>{
  if(action.type==='setSort'){
    return action.payload;
  }
  else{
    return state;
  }
}
export default combineReducers({
  items: items,
  view:view,
  cart:cart,
  user:user,
  sort:sort
});
