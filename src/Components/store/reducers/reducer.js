import { combineReducers } from "redux";

const initState = {
  items: [],

  sort: {
    view: "all",
    sort: "",
  },

  cart: [],
  user: {
    loggedIn: null,
    name: null,
    money: null,
  
    JWT:null,
    refresh:null
  }
};

const items = (state = initState.items, action) => {
  if (action.type === "updateItem") {
    return action.payload;
  }
  if (action.type === "updateStock") {
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
  } else if (action.type === "addToCart") {
    
    return state.map((e) =>
      e._id === action.payload._id ? { ...e, cart: !e.cart } : e
    );
  } else if (action.type === "changeQuantity") {
    return state.map((e) =>
      e._id === action.payload._id
        ? { ...e, thisQuantity: action.payload.quantity }
        : e
    );
  } else {
    return state;
  }
};

// const cart = (state = initState.cart, action) => {
//   if (action.type === "addToCart") {
//     let index = state.findIndex((e) => e._id === action.payload._id);
//     if (index !== -1) {
//       return [...state];
//     } else {
//       return [...state, action.payload];
//     }
//   } else if (action.type === "addQuantity") {
//     let arr = [...state];

//     arr[action.payload.id].thisQuantity = Number(action.payload.count);

//     return arr;
//   } else if (action.type === "deleteFromCart") {
//     return [...state].filter((e, i) => e._id !== action.payload);
//   } else if (action.type === "itemStatus") {
//     const success = action.payload.success;
//     const failure = action.payload.failure;

//     let arr = [...state];
//     success.forEach((element) => {
//       const index = arr.findIndex((e) => e._id === element.id);
//       arr[index].status = element.status;
//     });
//     failure.forEach((element) => {
//       const index = arr.findIndex((e) => e._id === element.id);
//       arr[index].status = element.status;
//     });

//     return arr;
//   } else {
//     return state;
//   }
// };
const user = (state = initState.user, action) => {
  if (action.type === "logIn") {
    return {
      ...state,
      loggedIn: "in",
      name: action.payload.name,
      money: action.payload.money,
      
      JWT:action.payload.token,
      refresh:action.payload.refresh
    };
  } else if (action.type === "logOut") {
    return {
      ...state,
      loggedIn: "out",
      name: null,
     
      JWT:null,
      money:null,
      refresh:null
    };
  }
  else if (action.type==="refreshToken")
  {
      return {...state,refresh:action.payload}
  }
  return state;
};

const sort = (state = initState.sort, action) => {
  if (action.type === "setSort") {
    return {
      ...state,
      view: action.payload.view,
      sort: "",
    };
  } else if (action.type === "searchItem") {
    return { ...state, view: "custom", sort: action.payload };
  } else {
    return { ...state };
  }
};
export default combineReducers({
  items: items,

  // cart: cart,
  user: user,
  sort: sort,
});
