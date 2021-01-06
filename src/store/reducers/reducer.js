import { combineReducers } from "redux";

const initState = {
  items: [{name:null}],

  sort: {
    view: "all",
    sort: "",
    specific:""
  },

  cart: [],
  user: {
    loggedIn: null,
    name: null,
    money: null,
    id: null,
    JWT: null,
    refresh: null,
  },
};

const items = (state = initState.items, action) => {
  if (action.type === "items/updateItem") {
    return action.payload;
  }
  if (action.type === "items/updateStock") {
    const item = action.payload;
    let arr = [...state];
    for (let id in item) {
      arr = arr.map((e) => {
        if (e._id === item[id]._id) {
          return {
            ...e,
            quantity: Math.max(
              -Number(item[id].thisQuantity) + Number(e.quantity),
              0
            ).toString(),
          };
        }
        return e;
      });
    }

    return arr;
  } else if (action.type === "items/addToCart") {
  
    return state.map((e) =>
      e._id === action.payload._id ? { ...e, cart: !e.cart } : e
    );
  } else if (action.type === "items/changeQuantity") {
    return state.map((e) =>
      e._id === action.payload._id
        ? { ...e, thisQuantity: action.payload.quantity }
        : e
    );
  } 
  else if (action.type==='items/changeCartQuantity'){
    const newState=state.map(e=>(e._id===action.payload._id?({...e,thisQuantity:action.payload.quantity}):e))
    
    return newState
  }
  
  else {
    return state;
  }
};

const user = (state = initState.user, action) => {
  if (action.type === "user/logIn") {
    return {
      ...state,
      loggedIn: "in",
      name: action.payload.name,
      money: action.payload.money,
      id: action.payload.id,
      JWT: action.payload.token,
      refresh: action.payload.refresh,
    };
  } else if (action.type === "user/logOut") {
    return {
      ...state,
      loggedIn: "out",
      name: null,
      id: null,
      JWT: null,
      money: null,
      refresh: null,
    };
  } else if (action.type === "user/refreshToken") {
    return { ...state, refresh: action.payload };
  }
  return state;
};

const sort = (state = initState.sort, action) => {
  if (action.type === "sort/setSort") {
    return {
      ...state,
      view: action.payload.view,
      specific:action.payload.specific||"",
      sort: "",
    };
  } else if (action.type === "sort/searchItem") {
    return { ...state, view: "custom", sort: action.payload };
  } else {
    return { ...state };
  }
};
export default combineReducers({
  items: items,

  user: user,
  sort: sort,
});
