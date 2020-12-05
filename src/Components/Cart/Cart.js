import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Item from "./Item";
import API from "../../API";
import "./Cart.scss";
import Timer from "./Timer";
import Button from "../../SmallComponents/Button";
export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.loggedIn);
  const userId = useSelector((state) => state.user.id);
  const status = useSelector((state) => state.transaction.state);
  let transactionStatus = null;

  switch (status) {
    case "ready":
      transactionStatus = "";
      break;
    case "pending":
      transactionStatus = "Uploading transaction";
      break;
    case "failed":
      transactionStatus = "Transaction failed";
      break;
    case "success":
      transactionStatus = "Successfully!!";
      break;
    case "error":
      transactionStatus = "Some Item are out of stock!";
      break;
    default:
      break;
  }

  const dispatch = useDispatch();

  async function makeDeal() {
    if (!user) {
      window.location.href = "/user";
    } else {
      if (cart.length > 0 && status === "ready") {
        dispatch({ type: "setState" });
        await API.transaction(userId).then(async (res) => {
          if (res.id) {
            dispatch({ type: "setId", payload: res.id });

            await API.commitTransaction(cart, res.id, userId).then((res) => {
              if (res.res) {
                dispatch({ type: "commitTransaction" });
                dispatch({ type: "itemStatus", payload: res.res });
              } else {
                dispatch({ type: "rollbackTransaction" });
              }
            });
          } else {
            dispatch({ type: "rollbackTransaction" });
          }
        });
      }
    }
  }

  useEffect(() => {
    if (status === "success" || status === "failed") {
      API.getAll().then((res) => {
        dispatch({ type: "updateItem", payload: res });
      });

      setTimeout(() => {
        dispatch({ type: "renewTransaction" });
      }, 3000);
    }
  }, [status, dispatch]);

  return (
    <div className="Cart">
      <div className="Cart-List">
        {cart.length > 0 ? (
          cart.map((e, i) => <Item id={i} key={i} item={e} />)
        ) : (
          <h3 className="Cart-List-Text">Cart is Empty!!!</h3>
        )}
      </div>
      <div className="Cart-Payment">
        {status === "ready" ? (
          <Button
            onClick={makeDeal}
            theme={{ width: "150px", height: "50px", color: "blue" }}
            title="Buy All"
          />
        ) : (
          <></>
        )}
        <h3>
          {transactionStatus}
          {status === "success" ? <Timer /> : ""}
        </h3>
      </div>
    </div>
  );
}
