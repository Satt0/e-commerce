import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import ulti from "ultilities/ulti";
const useStyles = makeStyles((theme) => ({
  root:  ({
    display: "flex",
    width: "100%",
    // maxWidth:200,
    height: "100%",
    backgroundColor: 'whitesmoke',
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    "&.cart": {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  }),
  imgContainer: {
    // width: "100%",

    // minWidth: 150,
    maxWidth: 200,
    // height: "60%",
    // overflow: "hidden",
    // "&.cart": {
    //   width: "auto",
    //   height: "auto",
    // },
  },

  img: {
    width: "100%",
    height: "100%",
    maxWidth: "180px",
    minHeight: "200px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  textWrapper: {
    // flexGrow:2,

    // fontFamily: 'Helvetica Neue,Helvetica,Arial,文泉驛正黑,WenQuanYi Zen Hei,Hiragino Sans GB,儷黑 Pro,LiHei Pro,Heiti TC,微軟正黑體,Microsoft JhengHei UI,Microsoft JhengHei,sans-serif',

    width: "100%",
    textAlign: "center",
    "& > h6": {
      color: "green",
    },
  },
  button: {
   
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "& > button": {
      margin: "2px",
      wordWrap:'nowrap',
      whiteSpace: 'nowrap'
    },
  },
  form: {
    width: "40%",
    transform: "translateY(-5px)",
    "&.ofs > label,& > label": {
      color: "red !important",
      fontSize: ".7rem",
    },
  },
}));
export default function MainInfor({ props, isAdded, type }) {
  const styles = useStyles({ backgroundColor: "red" });
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const addCart = () => {
    dispatch({ type: "items/addToCart", payload: { _id: props.item._id } });
  };
  const changeHandler = () => {
    dispatch({
      type: "items/changeCartQuantity",
      payload: {
        _id: props.item._id,
        quantity: Math.min(inputRef.current.value, props.item.quantity),
      },
    });
  };

  return (
    <>
      <div
        className={`${styles.root} ${type === "cart" ? "cart" : ""}`}
        title={props.item.name}
      >
        <div
          // className={`${styles.imgContainer} ${type === "cart" ? "cart" : ""}`}
        >
            <Container
              className={styles.imgContainer}
            >
          <Link to={`/item/${ulti.generateURL(props.item.name)}`}>
            {/* <div
            className={styles.img}
            title="click to see more"
            style={{ backgroundImage: `url(${props.item.url})` }}
          ></div> */}
              <CardMedia
                component="img"
                alt={props.item.name}
                width="140"
                image={props.item.url}
              />
          </Link>
            </Container>
        </div>
        <div className="text-button">
          <Container maxWidth="sm">
            <Typography gutterBottom variant="h6" component="h4">
              {props.item.name.length > 10 && type === "home"
                ? props.item.name.substring(0, 10).trim() + "..."
                : props.item.name}
            </Typography>
           {type!=='cart'? <Typography align='center' component="subtitle1" style={{color:'green'}}>
              {ulti.currencyConvert(props.item.price)}
            </Typography>:<></>}
          </Container>

          <Container maxWidth="sm" className={styles.button}>
            {type === "cart" ? (
              <TextField
                id="standard-number"
                label={`${props.item.quantity} left`}
                className={`${styles.form} ${
                  props.item.quantity - props.item.thisQuantity === 0
                    ? "ofs"
                    : ""
                }`}
                type="number"
                inputRef={inputRef}
                onChange={changeHandler}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: parseInt(props.item.quantity),
                    value: parseInt(props.item.thisQuantity),
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (
              <></>
            )}
            <Button
              disabled={props.item.quantity <= 0}
              onClick={addCart}
              variant="outlined"
              color={
                props.item.quantity <= 0
                  ? "secondary"
                  : !isAdded
                  ? "secondary"
                  : "primary"
              }
            >
              {props.item.quantity <= 0
                ? "Out of Stock"
                : isAdded
                ? "Add to cart"
                : "Remove"}
            </Button>
          </Container>
        </div>
      </div>
    </>
  );
}
