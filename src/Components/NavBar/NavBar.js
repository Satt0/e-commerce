// import React, { useState } from "react";
// //
// import Button from "./Button";
// import Search from "./Search";
// import NavLinks from "./NavLinks";

// const NavBar = () => {
//   const [show, toggle] = useState(false);
//   function toggleSearch(e) {
//     e.preventDefault();
//     toggle(!show);
//   }

//   return (
//     <div className="NavBar">
//       <NavLinks />
//       <Button show={show} toggleSearch={toggleSearch} />
//       <Search visibility={show} />
//     </div>
//   );
// };

// export default NavBar;

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import CartCounter from "./smallerComponents/CartCounter";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import API from "../../API";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 123123123,
    position: "relative",
    width: "100%",
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  IconButton: {
    width: 50,
    height: "auto",
  },
  title: {
    flexGrow: 2,

    color: "white",
    marginLeft: 20,
    zIndex: 123123,
    overflow: "visible",
    display: "flex",
    alignItems: "center",
    // [
    //   theme.breakpoints.down("sm")
    // ]:{
    //   display:'inline-block'
    // },
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  icon: {
    width: "auto",
    height: "auto",
  },
  search: {
    position: "absolute",
    right: 5,

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      display: "none",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    zIndex: 12333,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const count = useSelector((state) => state.cart).length;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const ref = React.createRef();
  function test(e) {
    e.preventDefault();
    if (ref.current.value.trim() !== "") {
      API.getItemByName(ref.current.value).then((items) => {
        dispatch({ type: "searchItem", payload: items });
      });
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <a
              href={`http://idgunny.360game.vn/login-game?&sid=none&err=1#loaded`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className={classes.IconButton}
                src="https://ddtmobile.com/static/official_site/en_mobile/img/index_logo.png"
                alt="ddtank-logo"
              />
            </a>
          </IconButton>

          <Link to="/">
            {" "}
            <Typography className={classes.title} variant="h6" noWrap>
              Home
            </Typography>
          </Link>
          <Link to="/cart">
            {" "}
            <Typography className={classes.title} variant="h6" noWrap>
              <CartCounter count={count} />
            </Typography>
          </Link>
          <Link to="/user">
            {" "}
            <Typography className={classes.title} variant="h6" noWrap>
              {user.loggedIn ? user.name : "Login"}
            </Typography>
          </Link>
          <Switch>
            <Route path="/user"></Route>
            <Route path="/cart"></Route>
            <Route path="/">
              <div className={classes.search}>
                <div className={classes.searchIcon} onClick={test}>
                  <SearchIcon />
                </div>
                <form onSubmit={test}>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputRef={ref}
                    inputProps={{ "aria-label": "search" }}
                  />
                </form>
              </div>
            </Route>
          </Switch>
        </Toolbar>
      </AppBar>
    </div>
  );
}
