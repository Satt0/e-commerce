import { combineReducers } from "redux";

const initState = {
  items: [],
  view: "home",
  sort: "all",
  cart: [],
  user: {
    loggedIn: false,
    name: null,
    money: null,
    id: null,
  },
  transaction: {
    state: "ready",
    id: null,
    count: 0,
  },
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
  } else {
    return state;
  }
};
const view = (state = initState.view, action) => {
  if (action.type === "setView") {
    return action.payload;
  } else {
    return state;
  }
};
const cart = (state = initState.cart, action) => {
  if (action.type === "addToCart") {
    let index = state.findIndex((e) => e._id === action.payload._id);
    if (index !== -1) {
      return [...state];
    } else {
      return [...state, action.payload];
    }
  } else if (action.type === "addQuantity") {
    let arr = [...state];

    arr[action.payload.id].thisQuantity = Number(action.payload.count);

    return arr;
  } else if (action.type === "deleteFromCart") {
    return [...state].filter((e, i) => e._id !== action.payload);
  } else if (action.type === "itemStatus") {
    const success = action.payload.success;
    const failure = action.payload.failure;

    let arr = [...state];
    success.forEach((element) => {
      const index = arr.findIndex((e) => e._id === element.id);
      arr[index].status = element.status;
    });
    failure.forEach((element) => {
      const index = arr.findIndex((e) => e._id === element.id);
      arr[index].status = element.status;
    });

    return arr;
  } else {
    return state;
  }
};
const user = (state = initState.user, action) => {
  if (action.type === "logIn") {
    return {
      ...state,
      loggedIn: true,
      name: action.payload.name,
      money: action.payload.money,
      id: action.payload.id,
    };
  } else if (action.type === "logOut") {
    return {
      ...state,
      loggedIn: false,
      name: null,
      id: null,
    };
  }
  return state;
};
const transaction = (state = initState.transaction, action) => {
  if (action.type === "setState") {
    return { ...state, state: "pending" };
  } else if (action.type === "setId") {
    return { ...state, id: action.payload };
  } else if (action.type === "commitTransaction") {
    return { ...state, state: "success", id: null, count: state.count + 1 };
  } else if (action.type === "rollbackTransaction") {
    return { ...state, state: "failed", id: null, count: state.count + 1 };
  } else if (action.type === "renewTransaction") {
    return { ...state, state: "ready", id: null };
  } else {
    return state;
  }
};
const sort = (state = initState.sort, action) => {
  if (action.type === "setSort") {
    return action.payload;
  } else {
    return state;
  }
};
export default combineReducers({
  items: items,
  view: view,
  cart: cart,
  user: user,
  sort: sort,
  transaction: transaction,
});
